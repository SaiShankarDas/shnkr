import { motion } from 'framer-motion';

const rows = [
    {
        feature: 'Custom Design & Animations',
        me: true,
        others: false,
    },
    {
        feature: 'Direct Communication',
        me: true,
        others: false,
    },
    {
        feature: 'Fast Turnaround (Under 1 Week)',
        me: true,
        others: false,
    },
    {
        feature: 'Scroll-Driven Motion & GSAP',
        me: true,
        others: false,
    },
    {
        feature: 'Mobile-First Responsive',
        me: true,
        others: true,
    },
    {
        feature: 'SEO & Performance Optimized',
        me: true,
        others: false,
    },
    {
        feature: 'Post-Launch Support',
        me: true,
        others: false,
    },
    {
        feature: 'Transparent Pricing',
        me: true,
        others: false,
    },
];

const Check = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const Cross = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/15">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const Comparison: React.FC = () => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-12 bg-background">
            <div className="max-w-[900px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 md:mb-20"
                >
                    <p className="text-accent uppercase tracking-widest text-xs md:text-sm mb-3">Why Choose Me</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Not your average<br />
                        <span className="text-white/30">web developer.</span>
                    </h2>
                </motion.div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="border border-white/[0.06] rounded-2xl overflow-hidden"
                >
                    {/* Table header */}
                    <div className="grid grid-cols-[1fr,80px,80px] md:grid-cols-[1fr,120px,120px] items-center px-5 md:px-8 py-4 bg-white/[0.02] border-b border-white/[0.06]">
                        <span className="text-xs uppercase tracking-widest text-white/20">Feature</span>
                        <span className="text-xs uppercase tracking-widest text-accent text-center">SHNKR</span>
                        <span className="text-xs uppercase tracking-widest text-white/20 text-center">Others</span>
                    </div>

                    {/* Rows */}
                    {rows.map((row, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="grid grid-cols-[1fr,80px,80px] md:grid-cols-[1fr,120px,120px] items-center px-5 md:px-8 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.01] transition-colors"
                        >
                            <div>
                                <span className="text-sm md:text-base text-white/70">{row.feature}</span>
                            </div>
                            <div className="flex justify-center">{row.me ? <Check /> : <Cross />}</div>
                            <div className="flex justify-center">{row.others ? <Check /> : <Cross />}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
