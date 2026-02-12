export type FocusThemeId =
    | 'animated-websites'
    | 'internal-tools'
    | 'ai-web-apps'
    | 'motion-graphics'
    | 'vibecoding';

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
        label: 'Building Animated Websites',
        shortLabel: 'Animated Websites',
        description: 'Scroll-driven animated websites with high-performance motion.',
        accentColor: '#FF5500',
        heroTitle: ['SHKR', '.DEV']
    },
    'internal-tools': {
        id: 'internal-tools',
        label: 'AI-Powered Internal Tools',
        shortLabel: 'Internal Tools',
        description: 'Automation-first internal tools to streamline operations.',
        accentColor: '#FF5500', // Keeping orange for now as per "Theme: Dark + Orange", but prompt says "Accent color affects buttons...". Prompt also says "Theme accent color: Orange". But under "Focus Themes", it implies themes switch things.
        // "Switching themes updates: ... Accent color ...". Maybe slight variations or just always Orange? 
        // "Theme: Dark only. Theme Color: Black + Orange".
        // I'll keep it Orange #FF5500 for all for now unless I interpret "Switching themes updates ... Accent color" as "Different themes have different accents".
        // Usually different themes have different colors. I'll stick to Orange as the Brand color unless specified.
        // Wait, prompt says: "Switching themes updates: ... Accent color". This implies they DO change.
        // But "Tech Constraints: Theme Color: Black + Orange".
        // I will use Orange as default but maybe vary slightly or stick to Orange if "Black + Orange" is a hard constraint.
        // I will use Orange for the main brand, but maybe I should stick to Orange for match.
        // Let's assume Orange is the KEY brand color.
        heroTitle: ['SHKR', '.TOOLS']
    },
    'ai-web-apps': {
        id: 'ai-web-apps',
        label: 'AI-Assisted Web Apps',
        shortLabel: 'AI Web Apps',
        description: 'Modern web apps powered by AI workflows.',
        accentColor: '#FF5500',
        heroTitle: ['SHKR', '.APP']
    },
    'motion-graphics': {
        id: 'motion-graphics',
        label: 'Motion Graphics for Web',
        shortLabel: 'Motion Graphics',
        description: 'Cinematic layout and motion design for the web.',
        accentColor: '#FF5500',
        heroTitle: ['SHKR', '.MOV']
    },
    'vibecoding': {
        id: 'vibecoding',
        label: 'Complete Beginner Vibecoding Path',
        shortLabel: 'Vibecoding',
        description: 'Learn to code with AI and "vibes".',
        accentColor: '#FF5500',
        heroTitle: ['SHKR', '.VIBE']
    }
};

export const DEFAULT_THEME: FocusThemeId = 'animated-websites';
