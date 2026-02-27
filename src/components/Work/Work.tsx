import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Bharat Escapes",
        category: "Travel Experience Platform",
        year: "2025",
        link: "https://www.bharatescapes.com/",
        video: "/videos/desktop/project1_compressed.mp4",
        videoMobile: "/videos/mobile/project1_compressed.mp4",
    },
    {
        id: 2,
        title: "WildFrame Safari",
        category: "Luxury Safari Website",
        year: "2025",
        link: "https://wildframe-hxd1.vercel.app",
        video: "/videos/desktop/project2_compressed.mp4",
        videoMobile: "/videos/mobile/project2_compressed.mp4",
    },
    {
        id: 3,
        title: "Jawai Wild Soul",
        category: "Boutique Safari Website",
        year: "2026",
        link: "https://www.jawaiwildsoul.in/",
        video: "/videos/desktop/project3_compressed.mp4",
        videoMobile: "/videos/mobile/project3_compressed.mp4",
    },
    {
        id: 4,
        title: "Nityog Impex",
        category: "Spice Export Company Website",
        year: "2026",
        link: "https://nityog.vercel.app/",
        video: "/videos/desktop/project4_compressed.mp4",
        videoMobile: "/videos/mobile/project4_compressed.mp4",
    }
];

export const Work: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>('.project-card');

        const scrollTween = gsap.to(sections, {
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

        // Staggered content entrance for each card
        sections.forEach((card) => {
            const animElements = card.querySelectorAll('.card-anim');
            gsap.from(animElements, {
                y: 40,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: 'left 80%',
                    toggleActions: 'play none none reset',
                },
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-background overflow-hidden">
            <div ref={scrollContainerRef} className="flex h-screen w-[400vw]">
                {projects.map((project) => (
                    <div key={project.id} className="project-card w-screen h-screen flex flex-col justify-end pb-24 md:justify-center md:pb-0 px-6 md:px-12 lg:px-24 border-r border-white/5 relative">

                        {/* Video Background — Desktop */}
                        {project.video && (
                            <div className="absolute inset-0 z-0 hidden md:block">
                                <video
                                    src={project.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                            </div>
                        )}

                        {/* Video Background — Mobile */}
                        {project.videoMobile && (
                            <div className="absolute inset-0 z-0 md:hidden">
                                <video
                                    src={project.videoMobile}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                            </div>
                        )}

                        {/* Pagination — absolute on desktop, inline on mobile */}
                        <div className="card-anim hidden md:block absolute top-24 left-12 lg:left-24 text-white/30 text-sm uppercase tracking-widest z-10">
                            {project.id.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                        </div>

                        <div className="max-w-4xl relative z-10">
                            {/* Mobile-only pagination inline */}
                            <div className="card-anim md:hidden text-white/30 text-xs uppercase tracking-widest mb-6">
                                {project.id.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                            </div>

                            <h3 className="card-anim text-[8vw] md:text-6xl lg:text-8xl font-bold text-white mb-3 md:mb-8 tracking-tighter leading-[1.1] whitespace-nowrap">
                                {project.title}
                            </h3>

                            <div className="card-anim flex items-center gap-3 text-sm md:text-xl lg:text-2xl text-white/50">
                                <span>{project.category}</span>
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                <span>{project.year}</span>
                            </div>

                            {project.link ? (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-anim inline-flex items-center gap-2 mt-6 md:mt-10 text-accent uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors"
                                >
                                    Visit Website
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4">
                                        <path d="M7 17L17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </a>
                            ) : (
                                <div className="card-anim mt-6 md:mt-10 h-5 md:h-6" aria-hidden="true" />
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};
