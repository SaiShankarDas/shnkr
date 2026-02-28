import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "Sai completely transformed our digital presence. The website isn't just beautiful — it's driving real bookings and our clients love the experience.",
        name: "Bharat Escapes",
        role: "Travel Experience Platform",
        metric: "3x more enquiries",
    },
    {
        quote: "The attention to detail is incredible. Every interaction, every animation, every pixel feels intentional. Our site went from generic to jaw-dropping.",
        name: "WildFrame Safari",
        role: "Luxury Safari Website",
        metric: "Pixel-perfect delivery",
    },
    {
        quote: "Working with Sai felt like having a technical co-founder. He understood our vision immediately and delivered something better than we imagined.",
        name: "Jawai Wild Soul",
        role: "Boutique Safari Website",
        metric: "2x time on site",
    },
    {
        quote: "Fast turnaround, clean code, stunning design. The website has become our strongest sales tool. Worth every penny.",
        name: "Nityog Impex",
        role: "Spice Export Company",
        metric: "40% more conversions",
    },
];

export const Testimonials: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.stack-card');

        // Each card gets pinned and the next card slides up over it
        cards.forEach((card, i) => {
            // Pin each card as it reaches the top
            ScrollTrigger.create({
                trigger: card,
                start: 'top top',
                end: i < cards.length - 1 ? `+=${window.innerHeight}` : 'bottom bottom',
                pin: i < cards.length - 1, // Don't pin the last card
                pinSpacing: false,
            });

            // Scale down and dim previous cards as next card stacks on top
            if (i < cards.length - 1) {
                gsap.to(card.querySelector('.stack-card-inner'), {
                    scale: 0.9 - i * 0.02,
                    opacity: 0.4,
                    filter: 'blur(4px)',
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 0.5,
                    },
                });
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-background">
            {/* Section header */}
            <div className="py-16 md:py-24 px-4 md:px-12">
                <div className="max-w-[1600px] mx-auto">
                    <p className="text-accent uppercase tracking-widest text-xs md:text-sm mb-3">Testimonials</p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                        What clients<br />
                        <span className="text-white/30">are saying.</span>
                    </h2>
                </div>
            </div>

            {/* Stacking cards */}
            {testimonials.map((t, i) => (
                <div
                    key={i}
                    className="stack-card h-screen w-full flex items-center justify-center px-4 md:px-12"
                >
                    <div
                        className="stack-card-inner w-full max-w-5xl mx-auto rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-8 md:p-14 lg:p-20 origin-top will-change-transform"
                        style={{
                            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.04)',
                        }}
                    >
                        <div className="flex flex-col items-center text-center">
                            {/* Quote number */}
                            <span className="text-white/10 text-sm uppercase tracking-[0.3em] mb-8 block">
                                {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                            </span>

                            {/* Quote */}
                            <blockquote className="text-xl md:text-3xl lg:text-4xl font-light text-white/90 leading-relaxed tracking-tight mb-10 max-w-3xl">
                                "{t.quote}"
                            </blockquote>

                            {/* Attribution */}
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-accent text-sm md:text-base font-medium uppercase tracking-wider">
                                    {t.name}
                                </span>
                                <span className="text-white/30 text-xs md:text-sm uppercase tracking-widest">
                                    {t.role}
                                </span>
                            </div>

                            {/* Metric badge */}
                            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-xs md:text-sm text-accent uppercase tracking-wider">{t.metric}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};
