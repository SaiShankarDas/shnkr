import { useState, useEffect, useRef } from 'react';

const CONCURRENCY = 6;
const READY_THRESHOLD = 0.33; // Show animation at 33% loaded

/**
 * Loads a single image and returns a promise.
 */
const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });

/**
 * Generates the frame URL for a given index (1-based).
 */
const frameSrc = (i: number) =>
    `/images/frame_${String(i).padStart(4, '0')}.webp`;

/**
 * Builds a priority-ordered list of frame indices.
 * Keyframes first (evenly spaced), then fills in between.
 */
const buildLoadOrder = (total: number): number[] => {
    const order: number[] = [];
    const added = new Set<number>();

    // Pass 1: Keyframes — every 3rd frame for quick coverage
    for (let i = 1; i <= total; i += 3) {
        order.push(i);
        added.add(i);
    }
    // Always include the last frame
    if (!added.has(total)) {
        order.push(total);
        added.add(total);
    }

    // Pass 2: Fill in remaining frames
    for (let i = 1; i <= total; i++) {
        if (!added.has(i)) {
            order.push(i);
        }
    }

    return order;
};

export const useImagePreloader = (frameCount: number) => {
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);       // enough frames for animation
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(
        new Array(frameCount).fill(null)
    );

    useEffect(() => {
        let cancelled = false;
        const loadOrder = buildLoadOrder(frameCount);
        let loaded = 0;

        const processQueue = async () => {
            let cursor = 0;

            const loadNext = async (): Promise<void> => {
                while (cursor < loadOrder.length) {
                    if (cancelled) return;
                    const frameIdx = loadOrder[cursor];
                    cursor++;

                    try {
                        const img = await loadImage(frameSrc(frameIdx));
                        if (cancelled) return;
                        imagesRef.current[frameIdx - 1] = img; // 0-indexed storage
                        loaded++;
                        setLoadedCount(loaded);

                        if (!cancelled && loaded >= Math.ceil(frameCount * READY_THRESHOLD)) {
                            setIsReady(true);
                        }
                    } catch {
                        // Skip failed frames gracefully
                        loaded++;
                        setLoadedCount(loaded);
                    }
                }
            };

            // Launch CONCURRENCY workers
            const workers = Array.from({ length: CONCURRENCY }, () => loadNext());
            await Promise.all(workers);

            if (!cancelled) {
                setIsReady(true);
                setIsFullyLoaded(true);
            }
        };

        processQueue();

        return () => {
            cancelled = true;
        };
    }, [frameCount]);

    return {
        images: imagesRef.current,
        loadedCount,
        isLoading: !isReady,
        isFullyLoaded,
        progress: Math.round((loadedCount / frameCount) * 100),
    };
};
