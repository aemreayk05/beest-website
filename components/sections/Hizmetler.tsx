'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

// ─── Veri ─────────────────────────────────────────────────────────────────────
const HIZMETLER = [
    {
        no: '01',
        baslik: 'Web Sitesi ve\nDijital Altyapı',
        aciklama:
            'Markanızın dijitalde güçlü, güven veren ve profesyonel bir şekilde temsil edilmesi için modern web siteleri ve sağlam altyapılar geliştiriyoruz.',
        etiketler: [
            'Kurumsal web sitesi tasarımı ve geliştirme',
            'Hızlı, güvenli ve mobil uyumlu dijital altyapı yapılandırması',
            'İhtiyaca özel sayfa yapıları ve web çözümü geliştirmeleri',
        ],
        gorsel: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2600&auto=format&fit=crop',
    },
    {
        no: '02',
        baslik: 'SEO ve Google\nGörünürlüğü',
        aciklama:
            'Markanızın Google\'daki görünürlüğünü artırmak ve doğru hedef kitle tarafından daha kolay bulunmasını sağlamak için stratejik SEO süreçleri yürütüyoruz.',
        etiketler: [
            'Teknik SEO ve site içi optimizasyon süreçleri',
            'Anahtar kelime stratejisi, sayfa yapısı ve içerik planlaması',
            'Google Haritalar ve yerel arama görünürlüğü çalışmaları',
        ],
        gorsel: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2600&auto=format&fit=crop',
    },
    {
        no: '03',
        baslik: 'Dijital Reklam\nYönetimi',
        aciklama:
            'Markanızın reklam süreçlerini planlı ve kontrollü şekilde yöneterek daha doğru kitleye daha verimli biçimde ulaşmasını sağlıyoruz.',
        etiketler: [
            'Google ve sosyal medya reklam kampanyalarının yönetimi',
            'Hedef kitleye uygun kampanya planlaması ve reklam kurgusu',
            'Reklam performansının izlenmesi ve düzenli raporlanması',
        ],
        gorsel: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2600&auto=format&fit=crop',
    },
    {
        no: '04',
        baslik: 'Performans Analizi\nve İyileştirme',
        aciklama:
            'Yayına alınan dijital çalışmaların performansını veriye dayalı olarak takip ediyor, elde edilen bulgular doğrultusunda düzenli iyileştirmeler gerçekleştiriyoruz.',
        etiketler: [
            'Site ve reklam verilerinin düzenli olarak analiz edilmesi',
            'Kullanıcı davranışlarına göre geliştirme alanlarının belirlenmesi',
            'Performansı güçlendirmeye yönelik sürekli iyileştirme çalışmaları',
        ],
        gorsel: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2600&auto=format&fit=crop',
    },
] as const;


// ─── Hook: RAF tabanlı aktif indeks (Lenis/native scroll bağımsız) ────────────
// Event listener'a güvenmek yerine requestAnimationFrame ile her frame
// getBoundingClientRect() okuyoruz. Bu yaklaşım her scroll kütüphanesiyle
// ve native scroll ile çalışır.
function useAktifIndex(containerRef: React.RefObject<HTMLDivElement>) {
    const [aktifIndex, setAktifIndex] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let rafId: number;
        let lastIdx = 0;

        const tick = () => {
            const rect = el.getBoundingClientRect();
            const scrollable = el.offsetHeight - window.innerHeight;
            if (scrollable > 0) {
                const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
                const idx = Math.min(
                    HIZMETLER.length - 1,
                    Math.floor(progress * HIZMETLER.length)
                );
                if (idx !== lastIdx) {
                    lastIdx = idx;
                    setAktifIndex(idx);
                }
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [containerRef]);

    return aktifIndex;
}


// ─── Ana bileşen ──────────────────────────────────────────────────────────────
export default function Hizmetler() {
    const containerRef = useRef<HTMLDivElement>(null);
    const aktifIndex = useAktifIndex(containerRef);
    const hizmet = HIZMETLER[aktifIndex];

    return (
        <section
            id="services"
            ref={containerRef}
            style={{ height: '200vh' }}
            className="relative bg-[#F3F3F3] max-lg:!h-auto max-lg:!mt-4"
            aria-label="Beest Hizmet Ekosistemi"
        >
            <div className="sticky top-0 h-screen flex items-center z-10 max-lg:!relative max-lg:!h-auto max-lg:!items-start max-lg:pb-10 max-lg:!pt-12">
                {/* İki kolon: Mobil -> Tek Sütun (Sağ kart gizli), Desktop -> İki Sütun */}
                <div
                    className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
                >
                    {/* ── Sol: Başlık + Hizmet listesi ── */}
                    <div className="w-full lg:w-[45%]">
                        {/* Bölüm etiketi */}
                        <p
                            style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: '#7F00FF',
                                marginBottom: '1.25rem',
                            }}
                        >
                            Hizmetlerimiz
                        </p>

                        {/* Ana başlık */}
                        <h2
                            style={{
                                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                color: '#111111',
                                marginBottom: '2.5rem',
                            }}
                        >
                            Beest ile markanızı bir{' '}
                            <span
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #7F00FF, #b94fff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                sonraki seviyeye
                            </span>{' '}
                            taşıyoruz.
                        </h2>

                        {/* Hizmet listesi (Masaüstü) */}
                        <ul className="hidden lg:block" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {HIZMETLER.map((h, i) => {
                                const aktif = i === aktifIndex;
                                return (
                                    <li
                                        key={h.no}
                                        style={{
                                            position: 'relative',
                                            borderBottom: '1px solid rgba(17,17,17,0.1)',
                                        }}
                                    >
                                        {/* Sol neon çizgi */}
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '3px',
                                                borderRadius: '9999px',
                                                background: '#7F00FF',
                                                height: aktif ? '2.5rem' : '0',
                                                opacity: aktif ? 1 : 0,
                                                transition: 'height 0.4s ease, opacity 0.4s ease',
                                            }}
                                        />
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '1.25rem',
                                                padding: '1.5rem 0 1.5rem 1.25rem',
                                                opacity: aktif ? 1 : 0.22,
                                                transition: 'opacity 0.4s ease',
                                                cursor: 'default',
                                                userSelect: 'none',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '0.6rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.18em',
                                                    paddingTop: '0.4rem',
                                                    flexShrink: 0,
                                                    color: aktif ? '#7F00FF' : '#111111',
                                                    transition: 'color 0.4s ease',
                                                }}
                                            >
                                                {h.no}
                                            </span>
                                            <h3
                                                style={{
                                                    fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
                                                    fontWeight: 900,
                                                    lineHeight: 1.1,
                                                    letterSpacing: '-0.02em',
                                                    whiteSpace: 'pre-line',
                                                    color: aktif ? '#111111' : '#888888',
                                                    transition: 'color 0.4s ease',
                                                }}
                                            >
                                                {h.baslik}
                                            </h3>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* ── Sadece Mobil: Yatay Kaydırmalı Kartlar (Apple-Style) ── */}
                    <div className="lg:hidden w-full w-screen -ml-6 px-6 overflow-x-auto snap-x snap-mandatory flex gap-6 pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style dangerouslySetInnerHTML={{ __html: `
                            .lg\\:hidden::-webkit-scrollbar { display: none; }
                        `}} />
                        {HIZMETLER.map((h, idx) => (
                            <article 
                                key={h.no} 
                                className="snap-center w-[85vw] md:w-[60vw] shrink-0 flex flex-col bg-white rounded-3xl overflow-hidden"
                                style={{ boxShadow: '0 10px 40px -10px rgba(127,0,255,0.15)' }}
                            >
                                <div className="relative w-full aspect-video bg-gray-100">
                                    <Image
                                        src={h.gorsel}
                                        alt={`${h.baslik.replace('\n', ' ')} - Beest Studio Hizmeti`}
                                        fill
                                        priority={idx === 0}
                                        sizes="(max-width: 768px) 85vw, 60vw"
                                        quality={85}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col gap-4">
                                    <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF]">
                                        {h.no} / {String(HIZMETLER.length).padStart(2, '0')}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-black leading-tight text-[#111111]">
                                        {h.baslik.replace('\n', ' ')}
                                    </h3>
                                    <p className="text-sm md:text-base leading-relaxed text-black/65">
                                        {h.aciklama}
                                    </p>
                                    <ul className="flex flex-col gap-3 mt-2 list-none">
                                        {h.etiketler.map((e) => (
                                            <li key={e} className="flex items-start gap-3 text-sm text-black/85">
                                                <Check size={16} color="#7F00FF" className="shrink-0 mt-[0.15rem]" />
                                                <span>{e}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                        {/* Sağdan boşluk bırakmak için sahte bir eleman */}
                        <div className="shrink-0 w-2 md:w-6" aria-hidden="true"></div>
                    </div>

                    {/* ── Sağ: Detay kartı — Sadece masaüstünde görünür ── */}
                    <div className="hidden lg:flex w-full lg:w-[55%]">
                        <div
                            style={{
                                background: '#ffffff',
                                borderRadius: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 10px 40px -10px rgba(127,0,255,0.18)',
                                overflow: 'hidden', // Resim köşelerden taşmasın diye
                                width: '100%',
                            }}
                        >
                            {/* ── Resim Alanı (Opacity Stacking / Pre-load optimizasyonu) ── */}
                            <div className="relative w-full h-64 md:h-72 bg-gray-100">
                                {HIZMETLER.map((h, idx) => (
                                    <Image
                                        key={`img-${h.no}`}
                                        src={h.gorsel}
                                        alt={h.baslik.replace('\n', ' ')}
                                        fill
                                        priority={idx === 0} // LCP optimization for the first image
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        quality={85}
                                        className="object-cover"
                                        style={{
                                            opacity: aktifIndex === idx ? 1 : 0,
                                            transition: 'opacity 0.7s ease-in-out',
                                            position: 'absolute',
                                            inset: 0,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* ── İçerik Alanı ── */}
                            <div className="flex flex-col gap-5 p-10">
                                {/* Numara */}
                                <span
                                    style={{
                                        fontSize: '0.6rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.18em',
                                        textTransform: 'uppercase',
                                        color: '#7F00FF',
                                    }}
                                >
                                    {hizmet.no} / {String(HIZMETLER.length).padStart(2, '0')}
                                </span>

                                {/* Başlık */}
                                <h4
                                    style={{
                                        fontSize: '1.6rem',
                                        fontWeight: 900,
                                        lineHeight: 1.15,
                                        letterSpacing: '-0.02em',
                                        color: '#111111',
                                        transition: 'all 0.35s ease',
                                    }}
                                >
                                    {hizmet.baslik.replace('\n', ' ')}
                                </h4>

                                {/* Neon ayraç */}
                                <div
                                    style={{
                                        width: '2.5rem',
                                        height: '2px',
                                        background: '#7F00FF',
                                        borderRadius: '9999px',
                                    }}
                                />

                                {/* Kısa açıklama */}
                                <p
                                    style={{
                                        fontSize: '0.9rem',
                                        lineHeight: '1.65',
                                        color: 'rgba(17,17,17,0.65)',
                                        margin: 0,
                                        transition: 'all 0.35s ease',
                                    }}
                                >
                                    {hizmet.aciklama}
                                </p>

                                {/* Etiketler (Maddeli Liste) */}
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.85rem',
                                        marginTop: '0.5rem',
                                    }}
                                >
                                    {hizmet.etiketler.map((e) => (
                                        <li
                                            key={e}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.5',
                                                color: 'rgba(17,17,17,0.85)',
                                            }}
                                        >
                                            <Check size={18} color="#7F00FF" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                                            <span>{e}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
