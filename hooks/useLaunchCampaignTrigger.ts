'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const OPEN_DELAY_MS = 1000;
const SCROLL_FALLBACK_THRESHOLD = 0.45;
const FALLBACK_TIMEOUT_MS = 15000;

type Options = {
    enabled: boolean;
    onTrigger: () => void;
};

export function useLaunchCampaignTrigger({ enabled, onTrigger }: Options) {
    const pathname = usePathname();
    const triggeredRef = useRef(false);
    const pricingModalOpenRef = useRef(false);

    useEffect(() => {
        triggeredRef.current = false;
    }, [pathname]);

    const tryTrigger = useCallback(() => {
        if (triggeredRef.current) return;
        if (!enabled) return;
        if (pricingModalOpenRef.current) return;

        triggeredRef.current = true;
        window.setTimeout(() => {
            if (pricingModalOpenRef.current) return;
            onTrigger();
        }, OPEN_DELAY_MS);
    }, [enabled, onTrigger]);

    useEffect(() => {
        const handlePricingModal = (e: Event) => {
            const detail = (e as CustomEvent<{ open: boolean }>).detail;
            pricingModalOpenRef.current = detail?.open ?? false;
        };

        window.addEventListener('beest:pricing-modal', handlePricingModal);
        return () => window.removeEventListener('beest:pricing-modal', handlePricingModal);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const pricingEl = document.getElementById('pricing');
        let observer: IntersectionObserver | null = null;
        let fallbackTimer: number | null = null;

        if (pricingEl) {
            observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry?.isIntersecting) {
                        tryTrigger();
                        observer?.disconnect();
                    }
                },
                { threshold: 0.3, rootMargin: '0px' }
            );
            observer.observe(pricingEl);
        }

        const checkScrollDepth = () => {
            if (triggeredRef.current) return;

            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight <= 0) return;

            const progress = window.scrollY / scrollHeight;
            if (progress >= SCROLL_FALLBACK_THRESHOLD) {
                tryTrigger();
            }
        };

        window.addEventListener('scroll', checkScrollDepth, { passive: true });

        const pollId = window.setInterval(checkScrollDepth, 400);

        fallbackTimer = window.setTimeout(() => {
            if (!triggeredRef.current && !pricingEl) {
                checkScrollDepth();
            }
        }, FALLBACK_TIMEOUT_MS);

        return () => {
            observer?.disconnect();
            if (fallbackTimer) window.clearTimeout(fallbackTimer);
            window.clearInterval(pollId);
            window.removeEventListener('scroll', checkScrollDepth);
        };
    }, [enabled, tryTrigger, pathname]);
}
