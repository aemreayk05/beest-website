'use client';

import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroWordCycle from '@/components/ui/HeroWordCycle';

// Lazy-load Spline to avoid SSR issues and reduce initial bundle
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #F3F3F3 0%, #EDE8F5 50%, #D9CCF0 100%)',
            }}
        />
    ),
});

// ─── Hero Component ───────────────────────────────────────────────────────────
export default function Hero() {
    // Word-cycle fires onComplete when all 4 words have shown → reveal brand name
    const [settled, setSettled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    
    const handleCycleComplete = useCallback(() => setSettled(true), []);

    useEffect(() => {
        // Sadece client-side çalışır, ekran genişliğini kontrol et
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        handleResize(); // İlk açılışta kontrol
        
        // Yeniden boyutlandırma için event listener (isteğe bağlı ama önerilir)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
            if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
            } else {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}
            aria-label="Ana bölüm"
        >
            {/* ── Background (3D on Desktop, Video on Mobile) ────────────────────── */}
            <div
                style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    zIndex: 0,
                    backgroundColor: '#F3F3F3' // Dirty White Default Theme
                }}
                aria-hidden="true"
            >
                {isDesktop ? (
                    <Spline
                        scene="https://prod.spline.design/cYKgymvDXd6rGuOs/scene.splinecode"
                        style={{ width: '100%', height: '100%' }}
                    />
                ) : (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    >
                        <source src="/media/hero_video.mp4" type="video/mp4" />
                    </video>
                )}
            </div>

            {/* ── Foreground Content ── */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center',
                }}
            >
                {/* Üst — Badge */}
                <span
                    style={{
                        display: 'inline-block',
                        padding: '0.375rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        background: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(127,0,255,0.2)',
                        color: '#7F00FF',
                        boxShadow: '0 4px 16px -4px rgba(127,0,255,0.15)',
                        animation: 'heroFadeIn 0.8s ease 4.2s both',
                    }}
                >
                    Yaratıcı Dijital Ajans
                </span>

                {/* Alt — Animasyonlu Başlık + Butonlar */}
                <div
                    style={{
                        maxWidth: '42rem',
                        width: '100%',
                        marginBottom: '5rem',
                        animation: 'heroFadeIn 0.8s ease 4.5s both',
                    }}
                >
                    {/* Hero Heading: "Be [word]" → "Beest Systems" */}
                    <h1
                        className="text-4xl md:text-6xl font-black tracking-tight mb-4"
                        aria-label="Beest Systems — Yaratıcı Dijital Ajans"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25em',
                            minHeight: '4rem',
                            width: '100%',
                            color: '#111111',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {settled ? (
                                /* ── Final brand reveal: Beest Systems ── */
                                <motion.span
                                    key="settled"
                                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        duration: 0.75,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'baseline',
                                        gap: '0.3em',
                                    }}
                                >
                                    <span style={{ color: '#111111', flexShrink: 0 }}>Beest</span>
                                    <span
                                        style={{
                                            color: '#7F00FF',
                                            flexShrink: 0,
                                            textShadow:
                                                '0 0 40px rgba(127,0,255,0.4), 0 0 12px rgba(127,0,255,0.25)',
                                        }}
                                    >
                                        Systems
                                    </span>
                                </motion.span>
                            ) : (
                                /* ── Cycling phase: "Be" + animated word ── */
                                <motion.span
                                    key="cycling"
                                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.45, ease: [0.55, 0, 0.45, 1] }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25em',
                                    }}
                                >
                                    {/* "Be" — always visible, anchors the layout */}
                                    <span
                                        style={{
                                            flexShrink: 0,
                                            color: '#111111',
                                        }}
                                    >
                                        Be
                                    </span>
                                    {/* Cycling words rendered in neon purple */}
                                    <HeroWordCycle onComplete={handleCycleComplete} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </h1>



                    <p
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: 'rgba(17,17,17,0.6)',
                            fontWeight: 700,
                            lineHeight: 1.6,
                            marginBottom: '1.5rem',
                        }}
                    >
                        Strateji · Marka · Web Tasarım · Dijital Geliştirme
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <a
                            href="#projects"
                            onClick={(e) => handleScroll(e, 'projects')}
                            style={{
                                padding: '0.875rem 2rem',
                                borderRadius: '9999px',
                                background: '#7F00FF',
                                color: '#ffffff',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                letterSpacing: '0.04em',
                                textDecoration: 'none',
                                boxShadow: '0 8px 24px -8px rgba(127,0,255,0.4)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            aria-label="Projelerimizi görüntüle"
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)';
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px -8px rgba(127,0,255,0.6)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px -8px rgba(127,0,255,0.4)';
                            }}
                        >
                            Çalışmalarımız
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => handleScroll(e, 'contact')}
                            style={{
                                padding: '0.875rem 2rem',
                                borderRadius: '9999px',
                                border: '1px solid rgba(17,17,17,0.2)',
                                color: '#111111',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                letterSpacing: '0.04em',
                                textDecoration: 'none',
                                transition: 'border-color 0.2s ease, color 0.2s ease',
                            }}
                            aria-label="Bize ulaşın"
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#7F00FF';
                                (e.currentTarget as HTMLAnchorElement).style.color = '#7F00FF';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(17,17,17,0.2)';
                                (e.currentTarget as HTMLAnchorElement).style.color = '#111111';
                            }}
                        >
                            İletişime Geç
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Scroll Indicator ─────────────────────────────────────── */}
            <button
                onClick={(e) => handleScroll(e, 'services')}
                aria-label="Hizmetlere kaydır"
                style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '48.7%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(17,17,17,0.4)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    animation: 'heroFadeIn 0.8s ease 5.2s both',
                    transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#7F00FF'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(17,17,17,0.4)'; }}
            >
                <span
                    style={{
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}
                >
                    Kaydır
                </span>
                <div style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>
                    <ArrowDown size={18} strokeWidth={1.5} />
                </div>
            </button>

            {/* ── Keyframe CSS ────────────────────────────────────────── */}
            <style>{`
                @keyframes heroFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes scrollBounce {
                    0%, 100% { transform: translateY(0); }
                    50%       { transform: translateY(8px); }
                }
            `}</style>
        </section>
    );
}
