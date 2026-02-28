import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Discovery',
        description: 'We start with a deep-dive into your goals, audience, and brand. I learn what makes your business unique so the website reflects it perfectly.',
    },
    {
        number: '02',
        title: 'Design & Prototype',
        description: 'I create high-fidelity designs and interactive prototypes. You see exactly what your site will look and feel like before a single line of code is written.',
    },
    {
        number: '03',
        title: 'Build & Iterate',
        description: 'Clean, high-performance code. Every component is hand-crafted with animations, responsiveness, and SEO baked in. We iterate until it\'s perfect.',
    },
    {
        number: '04',
        title: 'Launch & Support',
        description: 'Deployment, performance optimization, and analytics setup. I stick around post-launch to ensure everything runs flawlessly.',
    },
];

export const Process: React.FC = () => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-12 bg-background">
            <div className="max-w-[1600px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24"
                >
                    <p className="text-accent uppercase tracking-widest text-xs md:text-sm mb-3">How I Work</p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                        From idea to launch,<br />
                        <span className="text-white/30">seamlessly.</span>
                    </h2>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            className="group relative p-6 md:p-8 border-l border-white/[0.06] first:border-l-0 md:first:border-l"
                        >
                            {/* Step number */}
                            <span className="text-6xl md:text-7xl font-bold text-white/[0.04] absolute top-4 right-6 select-none">
                                {step.number}
                            </span>

                            {/* Accent dot */}
                            <div className="w-2 h-2 rounded-full bg-accent mb-6 group-hover:scale-150 transition-transform duration-300" />

                            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
