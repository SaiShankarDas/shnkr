import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        // Section crossfade — fade in as you scroll into view
        gsap.from(containerRef.current, {
            opacity: 0,
            y: 80,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'top 60%',
                scrub: true,
            },
        });

        gsap.from(textRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-20 pb-12 md:py-24 bg-accents w-full relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto w-full z-10">
                <p className="text-accent uppercase tracking-widest text-xs md:text-base mb-6 md:mb-8">Get in touch</p>

                <h2 ref={textRef} className="text-[11vw] md:text-[12vw] leading-[0.9] font-bold text-white mb-8 md:mb-12 tracking-tighter">
                    Let's work <br />
                    <span className="text-white/20">together.</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-8 md:gap-24 mt-8 md:mt-12 border-t border-white/10 pt-8 md:pt-12">
                    <div>
                        <h3 className="text-white/50 uppercase tracking-widest text-sm mb-4">Email</h3>
                        <a href="mailto:hello@shnkr.dev" className="text-xl md:text-2xl lg:text-3xl text-white hover:text-accent transition-colors break-all">
                            hello@shnkr.dev
                        </a>
                    </div>
                    <div>
                        <h3 className="text-white/50 uppercase tracking-widest text-sm mb-4">Socials</h3>
                        <div className="flex flex-wrap gap-4 md:gap-8">
                            {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social) => (
                                <a key={social} href="#" className="text-base md:text-xl text-white hover:text-accent transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 md:mt-32 text-white/20 text-xs md:text-sm flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center md:items-end">
                    <span>© 2024 SHNKR.DEV</span>
                    <span>Designed & Developed by Sai Shankar Das</span>
                </div>
            </div>
        </section>
    );
};
