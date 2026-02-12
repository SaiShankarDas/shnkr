import React from 'react';
import { cn } from '../../lib/utils'; // Adjust path based on location

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
            outline: 'border border-accent text-accent hover:bg-accent/10',
            ghost: 'hover:bg-accent/10 text-accent-foreground',
        };

        const sizes = {
            sm: 'h-9 px-4 text-xs',
            md: 'h-11 px-8 text-sm',
            lg: 'h-14 px-10 text-base',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';
