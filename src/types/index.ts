export type FocusThemeId =
    | 'animated-websites'
    | 'internal-tools'
    | 'ai-web-apps'
    | 'motion-graphics'
    | 'saas-products';

export interface FocusTheme {
    id: FocusThemeId;
    label: string;
    shortLabel: string;
    description: string;
    accentColor: string; // Hex or tailwind class suffix? Hex is better for canvas/dynamic variables.
    heroTitle: string[];
}

export const FOCUS_THEMES: Record<FocusThemeId, FocusTheme> = {
    'animated-websites': {
        id: 'animated-websites',
        label: 'Custom Animated Websites',
        shortLabel: 'Custom Websites',
        description: 'Scroll-driven animations, cinematic layouts, and buttery-smooth interactions — built to convert.',
        accentColor: '#FF5500',
        heroTitle: ['SHNKR', '.DEV']
    },
    'internal-tools': {
        id: 'internal-tools',
        label: 'Dashboards & Internal Tools',
        shortLabel: 'Dashboards & Tools',
        description: 'Custom dashboards and workflow tools that eliminate busywork and move faster than off-the-shelf.',
        accentColor: '#FF5500',
        heroTitle: ['SHNKR', '.TOOLS']
    },
    'ai-web-apps': {
        id: 'ai-web-apps',
        label: 'Full-Stack Web Apps',
        shortLabel: 'Full-Stack Web Apps',
        description: 'Robust, scalable web applications — from frontend to backend, database to deployment.',
        accentColor: '#FF5500',
        heroTitle: ['SHNKR', '.APP']
    },
    'motion-graphics': {
        id: 'motion-graphics',
        label: 'Motion & Interaction Design',
        shortLabel: 'Motion & Interaction',
        description: 'Premium motion design that makes your brand feel alive — every scroll, every transition, intentional.',
        accentColor: '#FF5500',
        heroTitle: ['SHNKR', '.MOV']
    },
    'saas-products': {
        id: 'saas-products',
        label: 'SaaS & Landing Pages',
        shortLabel: 'SaaS & Landing Pages',
        description: 'High-converting landing pages and SaaS interfaces designed to turn visitors into paying customers.',
        accentColor: '#FF5500',
        heroTitle: ['SHNKR', '.SAAS']
    },
};

export const DEFAULT_THEME: FocusThemeId = 'animated-websites';
