'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis instance'ına global erişim için tip tanımı
declare global {
    interface Window {
        __lenis: Lenis | undefined;
    }
}

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    useEffect(() => {
        // Performans: Mobilde native tarayıcı kaydırmasını kullan, ağır animasyon motoru (Lenis) yükleme
        if (window.innerWidth < 1024) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        // Global erişim: başka component'ler lenis.on('scroll') kullanabilsin
        window.__lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.__lenis = undefined;
        };
    }, []);

    return <>{children}</>;
}
