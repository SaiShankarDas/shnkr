import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { FOCUS_THEMES, type FocusThemeId, type FocusTheme, DEFAULT_THEME } from '../types';

interface ThemeFocusContextType {
    currentThemeId: FocusThemeId;
    currentTheme: FocusTheme;
    setTheme: (id: FocusThemeId) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const ThemeFocusContext = createContext<ThemeFocusContextType | undefined>(undefined);

export const ThemeFocusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentThemeId, setCurrentThemeId] = useState<FocusThemeId>(DEFAULT_THEME);
    const [isLoading, setIsLoading] = useState(false);

    const setTheme = (id: FocusThemeId) => {
        if (id === currentThemeId) return;
        setIsLoading(true);
        // Simulate loading or wait for resources
        // In real app, we might wait for images/content to load here
        setCurrentThemeId(id);

        // Fallback/Simulated load
        setTimeout(() => setIsLoading(false), 500);
    };

    const currentTheme = FOCUS_THEMES[currentThemeId];

    return (
        <ThemeFocusContext.Provider value={{ currentThemeId, currentTheme, setTheme, isLoading, setIsLoading }}>
            {children}
        </ThemeFocusContext.Provider>
    );
};

export const useThemeFocus = () => {
    const context = useContext(ThemeFocusContext);
    if (!context) {
        throw new Error('useThemeFocus must be used within a ThemeFocusProvider');
    }
    return context;
};
