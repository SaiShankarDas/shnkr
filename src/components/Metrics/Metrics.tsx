import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

interface CounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    label: string;
}

const Counter: React.FC<CounterProps> = ({ target, suffix = '', prefix = '', label }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                {prefix}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {isInView ? (
                        <AnimatedNumber target={target} />
                    ) : '0'}
                </motion.span>
                {suffix}
            </div>
            <p className="mt-2 md:mt-3 text-xs md:text-sm uppercase tracking-[0.2em] text-white/30">{label}</p>
        </div>
    );
};

const AnimatedNumber: React.FC<{ target: number }> = ({ target }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    if (!hasAnimated.current && ref.current) {
        hasAnimated.current = true;
    }

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <CountUp target={target} duration={3500} />
        </motion.span>
    );
};

const CountUp: React.FC<{ target: number; duration: number }> = ({ target, duration }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const animated = useRef(false);

    const startAnimation = () => {
        if (animated.current || !ref.current) return;
        animated.current = true;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            if (ref.current) ref.current.textContent = String(current);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    // Start animation on mount
    if (typeof window !== 'undefined') {
        requestAnimationFrame(startAnimation);
    }

    return <span ref={ref}>0</span>;
};

const metrics = [
    { target: 40, suffix: '+', label: 'Projects Delivered', prefix: '' },
    { target: 200, suffix: '%', label: 'Avg ROI', prefix: '' },
    { target: 200, suffix: '%', label: 'Faster Load Times', prefix: '' },
    { target: 100, suffix: '%', label: 'Client Satisfaction', prefix: '' },
];

export const Metrics: React.FC = () => {
    return (
        <section className="py-16 md:py-24 px-4 md:px-12 bg-background border-y border-white/[0.04]">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Counter {...m} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
