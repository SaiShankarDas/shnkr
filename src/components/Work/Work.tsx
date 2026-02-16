import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Neon Horizon",
        category: "Creative Coding",
        year: "2024",
        description: "An interactive WebGL experience exploring light and motion.",
    },
    {
        id: 2,
        title: "Velvet UI",
        category: "Design System",
        year: "2023",
        description: "A comprehensive React component library focusing on accessibility.",
    },
    {
        id: 3,
        title: "Echo",
        category: "E-Commerce",
        year: "2023",
        description: "A headless Shopify storefront with advanced filtering and search.",
    },
    {
        id: 4,
        title: "Flux",
        category: "Portfolio",
        year: "2024",
        description: "Minimalist portfolio template for creative professionals.",
    }
];

export const Work: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.project-card');

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                end: () => "+=" + (scrollContainerRef.current?.offsetWidth || 0),
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-background overflow-hidden">
            <div ref={scrollContainerRef} className="flex h-screen w-[400vw]">
                {projects.map((project) => (
                    <div key={project.id} className="project-card w-screen h-screen flex flex-col justify-center px-12 md:px-24 border-r border-white/5 relative">
                        <div className="absolute top-12 left-12 md:top-24 md:left-24 text-white/30 text-sm uppercase tracking-widest">
                            {project.id.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                        </div>

                        <div className="max-w-4xl">
                            <h3 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter">
                                {project.title}
                            </h3>
                            <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-xl md:text-2xl text-white/60">
                                <span>{project.category}</span>
                                <span>{project.year}</span>
                            </div>
                            <p className="mt-8 text-lg text-white/40 max-w-xl">
                                {project.description}
                            </p>
                        </div>

                        <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24">
                            <button className="text-accent uppercase tracking-widest text-sm hover:text-white transition-colors">
                                View Case Study
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
