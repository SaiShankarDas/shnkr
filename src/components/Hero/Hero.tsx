import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { IdentityBlock } from './IdentityBlock';
import { ValueBlock } from './ValueBlock';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';

export const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Fade out hero content on scroll
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]); // Subtle zoom on bg

    return (
        <div ref={containerRef} className="h-[250vh] relative">

            {/* 
        h-[250vh] gives us scroll space to drive the animation.
        The sticky container below stays fixed while we scroll through this height.
      */}

            <div className="sticky top-0 h-screen overflow-hidden bg-background rounded-b-[3rem] z-10">

                {/* Spotlight Effect */}
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                {/* Background Layer */}
                <motion.div style={{ scale }} className="absolute inset-0 z-0 bg-neutral-900 border-b border-white/10 rounded-b-[3rem] overflow-hidden">
                    {/* 3D Spline Robot */}
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-transparent to-[#000] opacity-60 pointer-events-none" />
                </motion.div>

                {/* Content Layer */}
                <motion.div style={{ opacity }} className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 items-center">
                    <IdentityBlock />
                    <ValueBlock />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/30 gap-2">
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-scrolldown" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
