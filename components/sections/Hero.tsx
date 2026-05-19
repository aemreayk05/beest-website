'use client';

import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SITE_SECTIONS } from '@/lib/siteSections';

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
                    className="box-border flex w-full max-w-full flex-wrap items-center justify-center gap-3.5 px-6 max-[400px]:flex-nowrap max-[400px]:gap-[clamp(0.625rem,3vw,0.875rem)] max-[400px]:px-[clamp(0.5rem,3vw,1.25rem)]"
                >
                    <a
                        href={`#${SITE_SECTIONS.projeler}`}
                        onClick={(e) => handleScroll(e, SITE_SECTIONS.projeler)}
                        className="inline-block whitespace-nowrap rounded-full py-3.5 px-8 text-center text-sm font-semibold tracking-wide no-underline max-[400px]:min-w-0 max-[400px]:shrink max-[400px]:py-[clamp(0.625rem,2.25vw,0.875rem)] max-[400px]:px-[clamp(0.75rem,5vw,1.375rem)] max-[400px]:text-[clamp(0.6875rem,3.2vw,0.875rem)]"
                        style={{
                            background: '#7F00FF',
                            color: '#ffffff',
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
                        href={`#${SITE_SECTIONS.iletisim}`}
                        onClick={(e) => handleScroll(e, SITE_SECTIONS.iletisim)}
                        className="inline-block whitespace-nowrap rounded-full border border-[rgba(17,17,17,0.2)] py-3.5 px-8 text-center text-sm font-semibold tracking-wide text-[#111111] no-underline max-[400px]:min-w-0 max-[400px]:shrink max-[400px]:py-[clamp(0.625rem,2.25vw,0.875rem)] max-[400px]:px-[clamp(0.75rem,5vw,1.375rem)] max-[400px]:text-[clamp(0.6875rem,3.2vw,0.875rem)]"
                        style={{
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
                </motion.div>
            </div>

            {/* ── Scroll Indicator ─────────────────────────────────────────── */}
            <motion.button
                key={`scroll-${d}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: d + 1.5, duration: 0.8 }}
                onClick={(e) => handleScroll(e, SITE_SECTIONS.hizmetler)}
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
