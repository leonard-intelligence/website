import { useEffect, useRef, useState } from 'react';

export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reveals once when the element enters the viewport.
 * Returns a ref to attach and a boolean `shown`.
 * If the user prefers reduced motion, `shown` is true immediately (no animation gating).
 */
export function useInViewReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
    const ref = useRef<T | null>(null);
    const [shown, setShown] = useState(() => prefersReducedMotion());

    useEffect(() => {
        if (shown) return;
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setShown(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [shown, threshold]);

    return { ref, shown } as const;
}
