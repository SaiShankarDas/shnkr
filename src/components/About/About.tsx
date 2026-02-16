import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
                <div>
                    <h2 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tight">
                        About
                    </h2>
                </div>
                <div>
                    <p ref={textRef} className="text-xl md:text-2xl leading-relaxed text-white/80 max-w-2xl">
                        I am a creative developer passionate about crafting数字 experiences that are both beautiful and functional.
                        <br /><br />
                        With a strong foundation in modern web technologies, I specialize in building performant, accessible, and
                        <span className="text-accent"> visually stunning</span> applications. My work is driven by a desire to push the boundaries of what's possible on the web.
                    </p>

                    <div className="mt-12 grid grid-cols-2 gap-8 text-sm uppercase tracking-widest text-white/40">
                        <div>
                            <h3 className="text-white mb-4">Stack</h3>
                            <ul className="space-y-2">
                                <li>React / Next.js</li>
                                <li>TypeScript</li>
                                <li>Tailwind CSS</li>
                                <li>WebGL / Three.js</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white mb-4">Services</h3>
                            <ul className="space-y-2">
                                <li>Web Development</li>
                                <li>UI/UX Engineering</li>
                                <li>Performance Optimization</li>
                                <li>Creative Coding</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
