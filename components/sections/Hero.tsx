'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
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

    // Desktop 4s Spline bekler, mobilde video var → 0.5s
    const d = mounted && isDesktop ? 4.0 : 0.5;

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
                            poster="/media/hero_video_poster.jpg"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        >
                            <source src="/media/hero_video.mp4" type="video/mp4" />
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
                    paddingBottom: '3.5rem',
                }}
            >
                {/* ① Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: '1.1rem' }}
                >
                    <Image
                        src="/beest_wostudio.svg"
                        alt="Beest Logo"
                        width={220}
                        height={68}
                        style={{ width: 'clamp(150px, 20vw, 220px)', height: 'auto', display: 'block' }}
                        priority
                    />
                </motion.div>

                {/* ② Neon Divider */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '5rem', opacity: 1 }}
                    transition={{ delay: d + 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        height: '2px',
                        background: 'linear-gradient(90deg, #7F00FF 0%, #b94fff 100%)',
                        borderRadius: '9999px',
                        marginBottom: '1.5rem',
                        flexShrink: 0,
                    }}
                />

                {/* ③ CTA Butonları */}
                <motion.div
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
                <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
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
