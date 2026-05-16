'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface LaunchCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDismiss: () => void;
    onPrimaryCta: () => void;
    onSecondaryCta: () => void;
}

function ModalContent({
    onClose,
    onDismiss,
    onPrimaryCta,
    onSecondaryCta,
    showHandle,
}: Omit<LaunchCampaignModalProps, 'isOpen'> & { showHandle: boolean }) {
    return (
        <>
            {showHandle && (
                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" aria-hidden />
            )}
            <div className="flex items-start justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-2 border border-[#7F00FF]/30 rounded-full px-3 py-1 bg-[#7F00FF]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7F00FF] shadow-[0_0_8px_#7F00FF]" />
                    <span className="font-bold text-[0.6rem] tracking-[0.2em] uppercase text-[#7F00FF]">
                        Lansmana Özel
                    </span>
                </span>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                    aria-label="Kampanyayı kapat"
                >
                    <X size={20} strokeWidth={2} />
                </button>
            </div>

            <h2
                id="launch-campaign-title"
                className="text-2xl lg:text-3xl font-black leading-tight tracking-tight text-white mb-4"
            >
                Dijital Varlığınızı Avantajlı Başlangıçla Kurun
            </h2>

            <p
                id="launch-campaign-description"
                className="text-sm lg:text-base font-medium text-white/60 leading-relaxed mb-8"
            >
                Beest Studio&apos;nun kurumsal web sitesi, SEO altyapısı ve dijital büyüme paketleri lansman
                dönemine özel fiyatlarla sunuluyor.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                    type="button"
                    onClick={onPrimaryCta}
                    className="min-h-[48px] flex-1 px-6 py-3.5 rounded-full bg-[#7F00FF] text-white text-sm font-bold tracking-wide hover:bg-[#6a00d6] transition-colors shadow-[0_10px_30px_-10px_rgba(127,0,255,0.5)]"
                >
                    Paketleri İncele
                </button>
                <button
                    type="button"
                    onClick={onSecondaryCta}
                    className="min-h-[48px] flex-1 px-6 py-3.5 rounded-full bg-white/10 border border-white/15 text-white text-sm font-bold tracking-wide hover:bg-white/15 transition-colors"
                >
                    İletişime Geç
                </button>
            </div>

            <p className="text-xs text-white/40 mb-4">Sınırlı dönem için geçerlidir.</p>

            <button
                type="button"
                onClick={onDismiss}
                className="min-h-[44px] w-full text-sm font-semibold text-white/45 hover:text-white/70 transition-colors"
            >
                Şimdilik kapat
            </button>
        </>
    );
}

export default function LaunchCampaignModal({
    isOpen,
    onClose,
    onDismiss,
    onPrimaryCta,
    onSecondaryCta,
}: LaunchCampaignModalProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useFocusTrap(panelRef, isOpen, onClose);

    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        if (window.__lenis) window.__lenis.stop();

        return () => {
            document.body.style.overflow = prevOverflow;
            if (window.__lenis) window.__lenis.start();
        };
    }, [isOpen]);

    const transition = reduceMotion
        ? { duration: 0 }
        : { ease: [0.22, 1, 0.36, 1] as const, duration: 0.45 };

    const panelInitial = reduceMotion
        ? { opacity: 0 }
        : isMobile
          ? { opacity: 0, y: '100%' }
          : { opacity: 0, scale: 0.96, y: 8 };

    const panelAnimate = reduceMotion
        ? { opacity: 1 }
        : isMobile
          ? { opacity: 1, y: 0 }
          : { opacity: 1, scale: 1, y: 0 };

    const panelExit = panelInitial;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[105] flex items-end lg:items-center justify-center p-0 lg:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                >
                    <button
                        type="button"
                        aria-label="Arka planı kapat"
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="launch-campaign-title"
                        aria-describedby="launch-campaign-description"
                        initial={panelInitial}
                        animate={panelAnimate}
                        exit={panelExit}
                        transition={transition}
                        className="relative z-10 w-full max-h-[55vh] overflow-y-auto rounded-t-[1.75rem] lg:rounded-3xl lg:max-h-none border border-white/10 border-b-0 lg:border-b bg-[#111111]/95 backdrop-blur-xl shadow-[0_0_60px_-12px_rgba(127,0,255,0.35)] ring-1 ring-[#7F00FF]/20 px-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:p-10 lg:max-w-[560px] lg:pt-10"
                    >
                        <ModalContent
                            showHandle={isMobile}
                            onClose={onClose}
                            onDismiss={onDismiss}
                            onPrimaryCta={onPrimaryCta}
                            onSecondaryCta={onSecondaryCta}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
