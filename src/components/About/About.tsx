import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
            .from(textRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen overflow-hidden">

            {/* Liquid Background Effect */}
            <div className="absolute inset-0 z-0">
                <LiquidEffectAnimation
                    imageUrl="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80"
                />
                {/* Dark overlay to match site background */}
                <div className="absolute inset-0 bg-background/85" />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-20 pb-16 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto min-h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
                    <div>
                        <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 text-white tracking-tight">
                            About
                        </h2>
                    </div>
                    <div>
                        <p ref={textRef} className="text-base md:text-xl lg:text-2xl leading-relaxed text-white/80 max-w-2xl">
                            I craft modern, high-performance websites that turn ideas into digital experiences.
                            <br /><br />
                            With a strong foundation in frontend architecture and user-centric design, I build scalable web platforms that are fast, elegant, and <span className="text-accent">engineered for growth</span>.
                            <br /><br />
                            Every project is built from scratch — no templates, no shortcuts — just clean architecture and intentional design.
                        </p>

                        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-sm uppercase tracking-widest text-white/40">
                            <div>
                                <h3 className="text-white mb-4">Stack</h3>
                                <ul className="space-y-2">
                                    <li>React / Next.js</li>
                                    <li>TypeScript</li>
                                    <li>Tailwind CSS</li>
                                    <li>Node.js</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white mb-4">Services</h3>
                                <ul className="space-y-2">
                                    <li>Custom Website Development</li>
                                    <li>UI/UX Implementation</li>
                                    <li>Landing Page Engineering</li>
                                    <li>Performance Optimization</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

