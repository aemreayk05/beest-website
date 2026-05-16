import { useEffect, RefObject } from 'react';

const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
    containerRef: RefObject<HTMLElement | null>,
    isActive: boolean,
    onEscape?: () => void
) {
    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;
        const previouslyFocused = document.activeElement as HTMLElement | null;

        const focusables = () =>
            Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
                (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
            );

        const first = focusables()[0];
        first?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onEscape?.();
                return;
            }
            if (e.key !== 'Tab') return;

            const nodes = focusables();
            if (nodes.length === 0) return;

            const firstNode = nodes[0];
            const lastNode = nodes[nodes.length - 1];

            if (e.shiftKey && document.activeElement === firstNode) {
                e.preventDefault();
                lastNode.focus();
            } else if (!e.shiftKey && document.activeElement === lastNode) {
                e.preventDefault();
                firstNode.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocused?.focus?.();
        };
    }, [isActive, containerRef, onEscape]);
}
