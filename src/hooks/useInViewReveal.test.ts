import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prefersReducedMotion } from './useInViewReveal';

describe('prefersReducedMotion', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns true when the user prefers reduced motion', () => {
        vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce'), media: q }));
        expect(prefersReducedMotion()).toBe(true);
    });

    it('returns false when no reduced-motion preference', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: false, media: '' }));
        expect(prefersReducedMotion()).toBe(false);
    });
});
