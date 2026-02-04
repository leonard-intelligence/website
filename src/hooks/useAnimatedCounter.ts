import { useEffect, useRef, useState } from 'react';

interface UseAnimatedCounterOptions {
    duration?: number;
    startOnView?: boolean;
    prefix?: string;
    suffix?: string;
}

/**
 * Hook to animate a number counting up from 0 to target value.
 * Uses requestAnimationFrame for smooth 60fps animation.
 * Triggered by IntersectionObserver when element enters viewport.
 */
export function useAnimatedCounter(
    target: number,
    options: UseAnimatedCounterOptions = {}
) {
    const {
        duration = 2000,
        startOnView = true,
        prefix = '',
        suffix = ''
    } = options;

    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!startOnView) {
            // Animate immediately if not waiting for view
            animateCount();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        animateCount();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [hasAnimated, startOnView]);

    const animateCount = () => {
        const startTime = performance.now();
        const startValue = 0;

        const easeOutQuart = (t: number): number => {
            return 1 - Math.pow(1 - t, 4);
        };

        const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentCount = Math.round(startValue + (target - startValue) * easedProgress);

            setCount(currentCount);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(updateCount);
            }
        };

        frameRef.current = requestAnimationFrame(updateCount);
    };

    const displayValue = `${prefix}${count}${suffix}`;

    return { ref: elementRef, displayValue, count };
}
