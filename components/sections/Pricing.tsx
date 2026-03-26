'use client';

import React from 'react';
import { Check } from 'lucide-react';

const packages = [
    {
        name: 'Basic',
        description: 'Dijital dünyada varlık göstermek isteyen yeni markalar için.',
        price: 'Başlangıç',
        features: [
            'Kurumsal Web Sitesi (Tek Sayfa)',
            'Temel SEO Optimizasyonu',
            'Mobil Uyumlu Tasarım',
            'Standart İletişim Formu',
        ],
        isPopular: false,
    },
    {
        name: 'Premium',
        description: 'Sıra dışı tasarımlar ve gelişmiş etkileşimlerle fark yaratın.',
        price: 'Tavsiye Edilen',
        features: [
            'Özel "Swiss-Style" Tasarım',
            'Kapsamlı SEO & Hız Optimizasyonu',
            '3D Animasyonlar & Smooth Scroll',
            'Gelişmiş Formlar & API Entegrasyonu',
            'Öncelikli Teknik Destek',
        ],
        isPopular: true,
    },
    {
        name: 'Plus',
        description: 'Büyüyen işletmeler için dinamik ve yönetilebilir çözümler.',
        price: 'Profesyonel',
        features: [
            'Çok Sayfalı Dinamik Web Sitesi',
            'Gelişmiş SEO & Performans',
            'İçerik Yönetim Sistemi (CMS)',
            'Temel Animasyonlar (Framer)',
        ],
        isPopular: false,
    },
];

export default function Pricing() {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
            id="pricing"
            style={{
                width: '100%',
                padding: '8rem 1.5rem',
                backgroundColor: '#F3F3F3', // Dirty White
            }}
            aria-label="Hizmet Paketleri"
        >
            <div
                style={{
                    maxWidth: '80rem',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* ── Üst Bilgi (Header) ── */}
                <div
                    style={{
                        marginBottom: '4rem',
                        textAlign: 'center',
                    }}
                >
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: '#7F00FF',
                            marginBottom: '1rem',
                        }}
                    >
                        HIZMET PAKETLERI
                    </span>
                    <h2
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            color: '#111111',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                        }}
                    >
                        Net Vizyon, <span style={{ color: '#7F00FF' }}>Şeffaf Çözümler</span>.
                    </h2>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {packages.map((pkg, index) => (
                        <article
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '2.5rem',
                                backgroundColor: pkg.isPopular ? '#111111' : '#F3F3F3',
                                border: pkg.isPopular ? '2px solid #7F00FF' : '1px solid rgba(17,17,17,0.1)',
                                borderRadius: '1rem',
                                color: pkg.isPopular ? '#F3F3F3' : '#111111',
                                boxShadow: pkg.isPopular ? '0 10px 30px -10px rgba(127, 0, 255, 0.25)' : 'none',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                                (e.currentTarget as HTMLElement).style.boxShadow = pkg.isPopular
                                    ? '0 20px 40px -10px rgba(127, 0, 255, 0.4)'
                                    : '0 20px 40px -10px rgba(17,17,17,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                (e.currentTarget as HTMLElement).style.boxShadow = pkg.isPopular
                                    ? '0 10px 30px -10px rgba(127, 0, 255, 0.25)'
                                    : 'none';
                            }}
                        >
                            {/* Popüler Etiketi (Eğer varsa) */}
                            {pkg.isPopular && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-14px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: '#7F00FF',
                                        color: '#ffffff',
                                        padding: '0.25rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    En Çok Tercih Edilen
                                </div>
                            )}

                            {/* Paket Başı */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                                    {pkg.name}
                                </h3>
                                <p style={{ fontSize: '0.875rem', opacity: 0.7, minHeight: '3rem' }}>
                                    {pkg.description}
                                </p>
                            </div>

                            <div style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 900 }}>
                                {pkg.price}
                            </div>

                            {/* Özellikler Listesi */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1, marginBottom: '2.5rem' }}>
                                {pkg.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            marginBottom: '1rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        <Check
                                            size={18}
                                            color="#7F00FF"
                                            style={{ flexShrink: 0, marginTop: '0.1rem' }}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Eylem Çağrısı Butonu */}
                            <a
                                href="#contact"
                                onClick={(e) => handleScroll(e, 'contact')}
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: pkg.isPopular ? '#7F00FF' : 'transparent',
                                    color: pkg.isPopular ? '#ffffff' : '#111111',
                                    border: pkg.isPopular ? 'none' : '1px solid rgba(17,17,17,0.2)',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'background-color 0.2s ease, border-color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    if (!pkg.isPopular) {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = '#111111';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!pkg.isPopular) {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(17,17,17,0.2)';
                                    }
                                }}
                            >
                                Seç & İlerlet
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
