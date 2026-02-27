import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Assets to preload — detect mobile vs desktop
const isMobile = () => window.innerWidth < 768;

const getVideoAssets = () => {
    const prefix = isMobile() ? '/videos/mobile' : '/videos/desktop';
    return [
        `${prefix}/project1_compressed.mp4`,
        `${prefix}/project2_compressed.mp4`,
        `${prefix}/project3_compressed.mp4`,
        `${prefix}/project4_compressed.mp4`,
    ];
};

const IMAGE_ASSETS = [
    'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80',
];

const MIN_DURATION = 2800; // Minimum time the loader stays visible (ms)

const preloadVideo = (src: string): Promise<void> =>
    new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.src = src;
        video.oncanplaythrough = () => resolve();
        video.onerror = () => resolve();
        setTimeout(resolve, 8000);
    });

const preloadImage = (src: string): Promise<void> =>
    new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
        setTimeout(resolve, 5000);
    });

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);
    const counterValue = useRef({ val: 0 });
    const progressRef = useRef(0);
    const startTime = useRef(Date.now());

    // Smoothly animate the counter number with GSAP
    useEffect(() => {
        if (!counterRef.current) return;

        gsap.to(counterValue.current, {
            val: displayProgress,
            duration: 1.2,
            ease: 'power4.out',
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = String(
                        Math.round(counterValue.current.val)
                    ).padStart(3, '0');
                }
            },
        });
    }, [displayProgress]);

    // Smooth progress interpolation — gradually ramp up even between asset loads
    useEffect(() => {
        let raf: number;
        const tick = () => {
            const elapsed = Date.now() - startTime.current;
            const timeProgress = Math.min(elapsed / MIN_DURATION, 1);

            // Blend real progress with time-based progress for smoothness
            // Real progress dominates, but time ensures constant visual movement
            const blended = Math.max(
                progressRef.current,
                timeProgress * 90 // Time alone can push to 90%
            );
            setDisplayProgress(Math.min(Math.round(blended), 100));

            if (blended < 100) {
                raf = requestAnimationFrame(tick);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    // Preload all assets
    useEffect(() => {
        const videos = getVideoAssets();
        const allAssets = [...IMAGE_ASSETS, ...videos];
        let loaded = 0;

        const loadAsset = async (asset: string) => {
            if (asset.endsWith('.mp4')) {
                await preloadVideo(asset);
            } else {
                await preloadImage(asset);
            }
            loaded++;
            progressRef.current = Math.round((loaded / allAssets.length) * 100);
        };

        Promise.all(allAssets.map(loadAsset)).then(() => {
            // Wait for minimum duration
            const elapsed = Date.now() - startTime.current;
            const remaining = Math.max(0, MIN_DURATION - elapsed);

            setTimeout(() => {
                progressRef.current = 100;
                setDisplayProgress(100);

                // Hold at 100 for a beat, then exit
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(onComplete, 1400);
                }, 800);
            }, remaining);
        });
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    key="loader"
                    exit={{
                        clipPath: 'inset(0 0 100% 0)',
                        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
                    }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
                >
                    {/* Subtle radial glow behind logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)',
                        }}
                    />

                    {/* Logo with glow pulse */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative mb-12"
                    >
                        <img
                            src="/logo-icon.svg"
                            alt="SHNKR.DEV"
                            className="w-10 h-10 md:w-14 md:h-14 relative z-10"
                        />
                        {/* Pulsing glow ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.3, 0, 0.3],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute inset-0 rounded-full border border-accent/30"
                        />
                    </motion.div>

                    {/* Percentage Counter — large cinematic numbers */}
                    <div className="relative flex items-baseline gap-0.5">
                        <motion.span
                            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            ref={counterRef}
                            className="text-7xl md:text-[120px] font-extralight text-white/90 tracking-[-0.05em] leading-none"
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                            000
                        </motion.span>
                    </div>

                    {/* Progress Bar — slim and elegant */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0.8 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-10 w-32 md:w-48 h-[1px] bg-white/[0.06] overflow-hidden"
                    >
                        <motion.div
                            className="h-full origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: displayProgress / 100 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.8))',
                            }}
                        />
                    </motion.div>

                    {/* Decorative corner marks */}
                    <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-white/[0.06]" />
                    <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-white/[0.06]" />
                    <div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-white/[0.06]" />
                    <div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-white/[0.06]" />

                    {/* Bottom text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2"
                    >
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/20 font-light">
                            shnkr.dev
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
