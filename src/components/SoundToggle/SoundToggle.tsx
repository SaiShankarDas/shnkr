import { useRef, useState, useCallback, useEffect } from 'react';

export const SoundToggle: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeRef = useRef<number | null>(null);

    // Initialize audio element once
    useEffect(() => {
        const audio = new Audio('/audio/ambient.mp3');
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
            if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
        };
    }, []);

    // Smooth fade in/out
    const fadeTo = useCallback((target: number, duration = 1000) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
        const start = audio.volume;
        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            audio.volume = start + (target - start) * eased;

            if (progress < 1) {
                fadeRef.current = requestAnimationFrame(tick);
            } else {
                audio.volume = target;
                if (target === 0) audio.pause();
            }
        };
        fadeRef.current = requestAnimationFrame(tick);
    }, []);

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            fadeTo(0, 800);
            setIsPlaying(false);
        } else {
            audio.play().then(() => {
                fadeTo(0.35, 1200);
                setIsPlaying(true);
            }).catch(() => {
                // Autoplay blocked — ignore
            });
        }
    }, [isPlaying, fadeTo]);

    // Bar heights for the equalizer — staggered random delays
    const bars = [
        { delay: '0s', height: { active: '60%', idle: '25%' } },
        { delay: '0.15s', height: { active: '100%', idle: '25%' } },
        { delay: '0.05s', height: { active: '45%', idle: '25%' } },
        { delay: '0.25s', height: { active: '80%', idle: '25%' } },
        { delay: '0.1s', height: { active: '55%', idle: '25%' } },
    ];

    return (
        <button
            onClick={toggle}
            aria-label={isPlaying ? 'Mute audio' : 'Unmute audio'}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-50 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center gap-[3px] cursor-pointer hover:bg-white/[0.12] transition-colors duration-300 group"
        >
            {bars.map((bar, i) => (
                <span
                    key={i}
                    className="block w-[2.5px] rounded-full bg-white/70 transition-all"
                    style={{
                        height: isPlaying ? bar.height.active : bar.height.idle,
                        animation: isPlaying
                            ? `equalizer 0.8s ease-in-out ${bar.delay} infinite alternate`
                            : 'none',
                        transition: 'height 0.4s ease',
                    }}
                />
            ))}
        </button>
    );
};
