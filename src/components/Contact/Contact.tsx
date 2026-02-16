import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
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
        <section ref={containerRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 bg-accents w-full relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto w-full z-10">
                <p className="text-accent uppercase tracking-widest mb-8">Get in touch</p>

                <h2 ref={textRef} className="text-[12vw] leading-[0.9] font-bold text-white mb-12 tracking-tighter">
                    Let's work <br />
                    <span className="text-white/20">together.</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-12 md:gap-24 mt-12 border-t border-white/10 pt-12">
                    <div>
                        <h3 className="text-white/50 uppercase tracking-widest text-sm mb-4">Email</h3>
                        <a href="mailto:hello@shkr.dev" className="text-2xl md:text-3xl text-white hover:text-accent transition-colors">
                            hello@shkr.dev
                        </a>
                    </div>
                    <div>
                        <h3 className="text-white/50 uppercase tracking-widest text-sm mb-4">Socials</h3>
                        <div className="flex gap-8">
                            {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social) => (
                                <a key={social} href="#" className="text-xl text-white hover:text-accent transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-32 text-white/20 text-sm flex justify-between items-end">
                    <span>© 2024 SHKR.DEV</span>
                    <span>Designed & Developed by Sai Shankar Das</span>
                </div>
            </div>
        </section>
    );
};
