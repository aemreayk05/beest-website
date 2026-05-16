'use client';

import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <div style={{ position: 'absolute', inset: 0, background: '#F3F3F3' }} />,
});


// ── Hero Component ───────────────────────────────────────────────────────────
export default function Hero() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
        targetId: string
    ) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
            if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
            else el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // SSR'da animasyonun hemen başlamaması için default 6.0s beklet, sonra duruma göre karar ver.
    const d = !mounted ? 6.0 : (isDesktop ? 5.0 : 1.5);

    return (
        <section
            id="hero"
            style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
            aria-label="Ana bölüm"
        >
            {/* ── Background ──────────────────────────────────────────────── */}
            <div
                style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#F3F3F3' }}
                aria-hidden="true"
            >
                {mounted && (
                    isDesktop ? (
                        <Spline
                            scene="https://prod.spline.design/cYKgymvDXd6rGuOs/scene.splinecode"
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <video
                            autoPlay loop muted playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        >
                            <source src="/media/hero_video.webm" type="video/webm" />
                        </video>
                    )
                )}
            </div>

            {/* ── Foreground: sütun, alta hizalı ─────────────────────────── */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: '6.5rem', // Butonların kaydır animasyonu ile çakışmaması için artırıldı
                }}
            >
                <h1 className="sr-only">
                    Beest Studio — Premium dijital deneyimler, web tasarımı ve SEO
                </h1>

                {/* ① Logo — masaüstünde opacity+slide animasyonu; mobilde LCP için opacity:1 sabit */}
                <motion.div
                    key={`logo-${d}`}
                    initial={isDesktop ? { opacity: 0, y: 18 } : { y: 18 }}
                    animate={isDesktop ? { opacity: 1, y: 0 } : { y: 0 }}
                    transition={{ delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    {/* SVG logo için düz img kullanıyoruz; Next/Image CSS resize uyarısını engeller. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/beest_logo.svg"
                        alt="Beest Logo"
                        width={220}
                        height={68}
                        style={{ width: 'clamp(200px, 20vw, 220px)', height: 'auto', display: 'block' }}
                        decoding="async"
                        fetchPriority="high"
                    />
                </motion.div>

                {/* ③ CTA Butonları */}
                <motion.div
                    key={`cta-${d}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: d + 0.75, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.875rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0 1.5rem',
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
                            display: 'inline-block',
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
                            display: 'inline-block',
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
                </motion.div>
            </div>

            {/* ── Scroll Indicator ─────────────────────────────────────────── */}
            <motion.button
                key={`scroll-${d}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: d + 1.5, duration: 0.8 }}
                onClick={(e) => handleScroll(e, 'services')}
                aria-label="Hizmetlere kaydır"
                style={{
                    position: 'absolute',
                    bottom: '1.75rem',
                    left: '50%',
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
                    transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#7F00FF'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(17,17,17,0.4)'; }}
            >
                <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Kaydır
                </span>
                <div style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>
                    <ArrowDown size={18} strokeWidth={1.5} />
                </div>
            </motion.button>

            {/* ── Keyframes ─────────────────────────────────────────────────── */}
            <style>{`
                @keyframes heroMarqueeScroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes scrollBounce {
                    0%, 100% { transform: translateY(0); }
                    50%       { transform: translateY(8px); }
                }
            `}</style>
        </section>
    );
}
