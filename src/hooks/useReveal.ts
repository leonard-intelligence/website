import { useEffect, useRef } from 'react';

export function useReveal() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            // Trigger when element is 100px inside viewport (not at edge)
            rootMargin: '0px 0px -100px 0px',
            // Require 15% of element visible (not just 5%)
            threshold: 0.15
        };

        observerRef.current = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Function to observe elements
        const observeElements = (elements: NodeListOf<Element> | HTMLElement[]) => {
            elements.forEach(el => observerRef.current?.observe(el));
        };

        // Define selector for all reveal-able elements
        const revealSelector = '.reveal, .reveal-left, .reveal-up, .reveal-right, .reveal-scale';

        // Wait for DOM to stabilize before starting observation
        // During React's initial render, IntersectionObserver may report all elements as intersecting
        const initTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                // Initial scan - only observe elements not already in viewport
                const elements = document.querySelectorAll(revealSelector);
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

                    if (isInViewport) {
                        // Elements already visible get immediate activation
                        el.classList.add('active');
                    } else {
                        // Elements below fold get observed for scroll reveal
                        observerRef.current?.observe(el);
                    }
                });
            });
        }, 100);

        // Mutation Observer to catch lazy loaded modules (debounced for performance)
        let pendingMutations: MutationRecord[] = [];
        let idleCallbackId: number | null = null;

        const processMutations = () => {
            pendingMutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) {
                        // Check if the node itself is revealable
                        if (node.matches(revealSelector)) {
                            observerRef.current?.observe(node);
                        }
                        // Check for revealable children
                        const children = node.querySelectorAll(revealSelector);
                        if (children.length > 0) {
                            observeElements(children);
                        }
                    }
                });
            });
            pendingMutations = [];
            idleCallbackId = null;
        };

        const mutationObserver = new MutationObserver((mutations) => {
            pendingMutations.push(...mutations);

            // Debounce using requestIdleCallback (or setTimeout fallback)
            if (idleCallbackId === null) {
                const ric = (window as Window & { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback;
                if (ric) {
                    idleCallbackId = ric(processMutations, { timeout: 100 });
                } else {
                    idleCallbackId = setTimeout(processMutations, 50) as unknown as number;
                }
            }
        });

        // Observe the entire body for added nodes
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Safety timeout fallback
        const safetyTimeout = setTimeout(() => {
            const revealedElements = document.querySelectorAll(revealSelector);
            revealedElements.forEach(el => {
                const htmlEl = el as HTMLElement;
                if (window.getComputedStyle(htmlEl).opacity === '0') {
                    htmlEl.classList.add('active');
                }
            });
        }, 3000);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            mutationObserver.disconnect();
            clearTimeout(safetyTimeout);
            clearTimeout(initTimeout);
        };
    }, []);
}
