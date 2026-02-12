import React from 'react';
import { motion } from 'framer-motion';
import { useThemeFocus } from '../../context/ThemeFocusContext';

export const ValueBlock: React.FC = () => {
    const { currentTheme } = useThemeFocus();

    return (
        <div className="flex flex-col items-end text-right gap-6 z-20 pointer-events-none">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-bold text-white max-w-lg leading-tight"
            >
                Build Cinematic Websites & <br /> AI Products Faster.
            </motion.h2>

            <motion.p
                key={currentTheme.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/70 max-w-md text-lg leading-relaxed"
            >
                {currentTheme.description}
                <br />
                Clean visuals. Real conversions. Production-ready systems.
            </motion.p>
        </div>
    );
};
