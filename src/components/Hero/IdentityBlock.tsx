import React from 'react';
import { motion } from 'framer-motion';
import { FOCUS_THEMES } from '../../types';
import { useThemeFocus } from '../../context/ThemeFocusContext';

export const IdentityBlock: React.FC = () => {
    const { currentTheme } = useThemeFocus();

    return (
        <div className="flex flex-col items-start gap-8 z-20 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-accent text-sm font-medium tracking-widest uppercase"
            >
                Hey, welcome to
            </motion.div>

            <div className="flex flex-col leading-[0.85] font-black tracking-tighter text-white mix-blend-difference">
                <motion.h1
                    key={currentTheme.heroTitle[0]} // Re-animate on change
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[12rem] lg:text-[14rem]"
                >
                    {currentTheme.heroTitle[0]}
                </motion.h1>
                <motion.h1
                    key={currentTheme.heroTitle[1]}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[12rem] lg:text-[14rem] text-accent"
                >
                    {currentTheme.heroTitle[1]}
                </motion.h1>
            </div>

            <div className="flex flex-col gap-2 mt-8 pointer-events-auto">
                {Object.values(FOCUS_THEMES).map((theme, idx) => (
                    <div key={theme.id} className="flex items-center gap-4 text-white/50 text-sm">
                        <span className="font-mono text-xs opacity-50">#{String(idx + 1).padStart(2, '0')}</span>
                        <span className={theme.id === currentTheme.id ? 'text-accent font-bold' : ''}>
                            {theme.shortLabel}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
