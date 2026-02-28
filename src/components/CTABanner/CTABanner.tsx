import { motion } from 'framer-motion';

export const CTABanner: React.FC = () => {
    return (
        <section className="relative py-20 md:py-28 px-4 md:px-12 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.03] to-background pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/[0.08] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-accent uppercase tracking-widest text-xs md:text-sm mb-6">Ready?</p>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                        Let's build something<br />
                        <span className="text-accent">cinematic.</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-10">
                        Have a project in mind? I'm currently accepting new clients
                        for Q2 2026. Let's talk about your vision.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#booking"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white text-sm md:text-base font-medium uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(242,84,15,0.3)]"
                        >
                            <span className="relative z-10">Start a Project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </a>
                        <a
                            href="mailto:shnkr.dev.in@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white/60 text-sm md:text-base uppercase tracking-wider rounded-full hover:border-white/30 hover:text-white transition-all duration-300"
                        >
                            shnkr.dev.in@gmail.com
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
