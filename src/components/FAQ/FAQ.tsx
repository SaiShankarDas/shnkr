import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        question: "How long does a typical project take?",
        answer: "Most projects are delivered within a week. I focus on fast turnarounds without compromising on quality. Complex projects with custom animations may take slightly longer, but I'll always give you a clear timeline upfront during our discovery call."
    },
    {
        question: "What's your pricing like?",
        answer: "Pricing depends on scope, features, and complexity. Every project is different, so I provide a custom quote after understanding your requirements during a discovery call. No hidden fees, no surprises — just transparent pricing tailored to your needs."
    },
    {
        question: "Do you work with clients outside India?",
        answer: "Absolutely. I work with clients globally. Communication happens async via Slack/email, with calls scheduled across time zones. Most of my workflow is designed for remote collaboration."
    },
    {
        question: "What tech stack do you use?",
        answer: "React, Next.js, TypeScript, Tailwind CSS, GSAP, and Framer Motion are my core tools. For backends, I use Node.js, Firebase, or Supabase depending on the project. Every stack choice is driven by performance and maintainability."
    },
    {
        question: "Do you offer ongoing support after launch?",
        answer: "Yes. I offer continued support packages that include bug fixes, content updates, performance monitoring, and feature additions. Your site doesn't stop evolving after launch."
    },
    {
        question: "Can you redesign my existing website?",
        answer: "Definitely. I've helped multiple clients transform outdated sites into modern, high-converting platforms. I'll audit your current site, identify improvement areas, and rebuild it from the ground up."
    },
];

const FAQItem: React.FC<{ item: typeof faqData[0]; index: number; isOpen: boolean; onToggle: () => void }> = ({ item, index, isOpen, onToggle }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="border-b border-white/[0.06]"
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-6 md:py-8 text-left group cursor-pointer"
            >
                <span className="flex items-center gap-4 md:gap-6">
                    <span className="text-white/10 text-xs md:text-sm font-mono shrink-0">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base md:text-xl text-white group-hover:text-accent transition-colors duration-200">
                        {item.question}
                    </span>
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/30 text-xl md:text-2xl shrink-0 ml-4"
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm md:text-base text-white/40 leading-relaxed pb-6 md:pb-8 pl-8 md:pl-14 max-w-2xl">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 md:py-32 px-4 md:px-12 bg-background">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-12 lg:gap-24">
                    {/* Left column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-accent uppercase tracking-widest text-xs md:text-sm mb-3">FAQ</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Questions<br />
                            <span className="text-white/30">answered.</span>
                        </h2>
                        <p className="text-sm md:text-base text-white/30 max-w-sm">
                            Everything you need to know before we start working together.
                        </p>
                    </motion.div>

                    {/* Right column — questions */}
                    <div className="border-t border-white/[0.06]">
                        {faqData.map((item, i) => (
                            <FAQItem
                                key={i}
                                item={item}
                                index={i}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
