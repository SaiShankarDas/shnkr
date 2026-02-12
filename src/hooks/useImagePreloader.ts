import { useState, useEffect } from 'react';

export const useImagePreloader = (frameCount: number) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let count = 0;

        const loadImages = async () => {
            // Verified Path: /images/frame_000_delay-0.04s.webp
            console.log(`Starting load for ${frameCount} frames...`);

            for (let i = 0; i < frameCount; i++) {
                if (!isMounted) return;

                const img = new Image();
                const indexStr = String(i + 1).padStart(4, '0');
                img.src = `/images/frame_${indexStr}.webp`;

                const onLoadOrError = () => {
                    if (!isMounted) return;
                    count++;
                    setLoadedCount(count);
                    if (count === frameCount) {
                        setImages(loadedImages);
                        setIsLoading(false);
                    }
                };

                img.onload = onLoadOrError;
                img.onerror = (e) => {
                    console.error(`Failed to load frame ${i}`, e);
                    onLoadOrError(); // Fail gracefully
                };

                loadedImages[i] = img;
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [frameCount]);

    return { images, loadedCount, isLoading, progress: Math.round((loadedCount / frameCount) * 100) };
};
