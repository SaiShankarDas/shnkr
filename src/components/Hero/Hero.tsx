import { useRef, useCallback } from 'react';
import { useScroll, useTransform, motion, useMotionValue, useSpring } from 'framer-motion';
import { IdentityBlock } from './IdentityBlock';
import { ValueBlock } from './ValueBlock';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';

const SPRING_CONFIG = { damping: 30, stiffness: 150, mass: 0.5 };

export const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Fade out hero content on scroll
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Cursor-tracking motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the tilt & translate
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), SPRING_CONFIG);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), SPRING_CONFIG);
    const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), SPRING_CONFIG);
    const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), SPRING_CONFIG);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = stickyRef.current?.getBoundingClientRect();
        if (!rect) return;
        // Normalize to -0.5 … 0.5
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="h-[250vh] relative">

            {/* 
        h-[250vh] gives us scroll space to drive the animation.
        The sticky container below stays fixed while we scroll through this height.
      */}

            <div
                ref={stickyRef}
                className="sticky top-0 h-screen overflow-hidden bg-background rounded-b-[3rem] z-10"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >

                {/* Spotlight Effect */}
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                {/* Background Layer — follows cursor with 3D tilt */}
                <motion.div
                    style={{
                        scale,
                        rotateX,
                        rotateY,
                        translateX,
                        translateY,
                        transformPerspective: 1200,
                    }}
                    className="absolute inset-0 z-0 bg-neutral-900 border-b border-white/10 rounded-b-[3rem] overflow-hidden will-change-transform"
                >
                    {/* 3D Spline Robot */}
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-transparent to-[#000] opacity-60 pointer-events-none" />
                </motion.div>

                {/* Content Layer */}
                <motion.div style={{ opacity }} className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-4 md:px-6 pt-20 md:pt-12 pb-8 md:py-12 flex flex-col justify-center gap-8 lg:grid lg:grid-cols-2 lg:items-center">
                    <IdentityBlock />
                    <ValueBlock />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div style={{ opacity }} className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center text-white/30 gap-2">
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-scrolldown" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
