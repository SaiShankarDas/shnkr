import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Section crossfade — fade out as you scroll past
        gsap.to(containerRef.current, {
            opacity: 0,
            y: -60,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'bottom 60%',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Title — clip-path wipe reveal
        gsap.from(titleRef.current, {
            clipPath: 'inset(0 100% 0 0)',
            duration: 1,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1,
            },
        });

        // Paragraph — split into lines, reveal each line on scroll
        const split = SplitText.create(textRef.current, {
            type: 'lines',
            linesClass: 'split-line',
            mask: 'lines',
        });

        gsap.from(split.lines, {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
                end: 'bottom 50%',
                scrub: 1,
            },
        });

        // Stack & Services — stagger from left
        const items = stackRef.current?.querySelectorAll('li');
        if (items) {
            gsap.from(items, {
                x: -30,
                opacity: 0,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stackRef.current,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1,
                },
            });
        }

        // Headings for Stack/Services
        const headings = stackRef.current?.querySelectorAll('h3');
        if (headings) {
            gsap.from(headings, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stackRef.current,
                    start: 'top 88%',
                    end: 'top 60%',
                    scrub: 1,
                },
            });
        }

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

                        {/* Headshot */}
                        <div className="flex flex-col items-center lg:items-start mt-4 md:mt-8">
                            <div className="relative group">
                                {/* Outer glow */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Border ring */}
                                <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full p-[3px] bg-gradient-to-br from-accent via-accent/50 to-accent/20">
                                    <img
                                        src="/headshot.webp"
                                        alt="Sai Shankar Das"
                                        className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="mt-5 text-center lg:text-left">
                                <p className="text-white font-semibold text-base md:text-lg tracking-tight">Sai Shankar Das</p>
                                <p className="text-accent text-xs md:text-sm uppercase tracking-widest mt-1">Freelance Developer & Designer</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p ref={textRef} className="text-base md:text-xl lg:text-2xl leading-relaxed text-white/80 max-w-2xl">
                            I craft modern, high-performance websites that turn ideas <span className="whitespace-nowrap">into digital experiences.</span>
                            <br /><br />
                            With a strong foundation in frontend architecture and user-centric design, I build scalable web platforms that are fast, elegant, and <span className="text-accent">engineered for growth</span>.
                            <br /><br />
                            Every project is built from scratch — no templates, no shortcuts — just clean architecture and intentional design.
                        </p>

                        <div ref={stackRef} className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-sm uppercase tracking-widest text-white/40">
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

