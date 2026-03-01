import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const WHATSAPP_NUMBER = '918249003677';

const MESSAGE_OPTIONS = [
    { emoji: '💬', label: 'Discuss a project', message: "Hi! I'd like to discuss a project." },
    { emoji: '💰', label: 'Get a quote', message: "Hi! I'd like to get a quote for my project." },
    { emoji: '🤝', label: 'Collaboration inquiry', message: "Hi! I'm interested in a collaboration opportunity." },
    { emoji: '📞', label: 'Book a discovery call', message: "Hi! I'd like to book a free discovery call." },
];

const getWhatsAppUrl = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WhatsAppCTA: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
                >
                    {/* Message Options Popup */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-2 p-3 rounded-2xl bg-[#111111]/95 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50 w-64"
                            >
                                <p className="text-white/40 text-xs uppercase tracking-wider px-2 pt-1 pb-1">
                                    Send a message
                                </p>
                                {MESSAGE_OPTIONS.map((option, i) => (
                                    <motion.a
                                        key={option.label}
                                        href={getWhatsAppUrl(option.message)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors duration-200 group/item"
                                    >
                                        <span className="text-lg">{option.emoji}</span>
                                        <span className="text-sm text-white/70 group-hover/item:text-white transition-colors duration-200">
                                            {option.label}
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="ml-auto text-white/20 group-hover/item:text-accent group-hover/item:translate-x-0.5 transition-all duration-200"
                                        >
                                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* FAB Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Chat on WhatsApp"
                        className="relative group"
                    >
                        {/* Pulse ring */}
                        {!isOpen && (
                            <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
                        )}
                        {/* Glow */}
                        <span className="absolute inset-0 rounded-full bg-accent/20 blur-lg scale-150 group-hover:bg-accent/30 transition-colors duration-300" />

                        <div className="relative w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/25 group-hover:shadow-accent/40 group-hover:scale-110 transition-all duration-300">
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.svg
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="whatsapp"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
