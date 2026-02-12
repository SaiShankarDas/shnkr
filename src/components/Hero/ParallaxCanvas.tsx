import React, { useRef, useEffect } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

interface ParallaxCanvasProps {
    images: HTMLImageElement[];
    className?: string;
    scrollRef: React.RefObject<HTMLElement | null>;
}

export const ParallaxCanvas: React.FC<ParallaxCanvasProps> = ({ images, className, scrollRef }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });

    // Smooth out the progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress (0-1) to frame index (0 - images.length-1)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, images.length - 1]);

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx || images.length === 0) return;

            const idx = Math.min(
                images.length - 1,
                Math.max(0, Math.floor(frameIndex.get()))
            );

            const img = images[idx];
            if (!img) return;

            // Maintain aspect ratio cover
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [images, frameIndex]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
        />
    );
};
