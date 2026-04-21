'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Veri ─────────────────────────────────────────────────────────────────────
const ADIMLAR = [
    {
        no: '01',
        baslik: 'Tanışma ve\nİhtiyaç Analizi',
        aciklama:
            'İşletmenizi, hedeflerinizi ve dijitalde ulaşmak istediğiniz noktayı birlikte değerlendiririz.',
        soz: 'Doğru soruyu sormak,\ndoğru çözümün yarısıdır.',
    },
    {
        no: '02',
        baslik: 'Strateji ve\nYol Haritası',
        aciklama:
            'Sektörünüz ve rekabet ortamı analiz edilerek işletmenize özel bir dijital strateji ve proje planı oluşturulur.',
        soz: 'Net bir yol haritası olmadan\nhiçbir rüzgar yardımcı olmaz.',
    },
    {
        no: '03',
        baslik: 'Tasarım ve\nGeliştirme Süreci',
        aciklama:
            'Web sitesi ve dijital altyapınız modern, hızlı ve güvenilir bir teknoloji altyapısı ile geliştirilir.',
        soz: 'Güzellik ve hız\nbir arada mümkündür.',
    },
    {
        no: '04',
        baslik: 'Yayın ve\nDijital Görünürlük',
        aciklama:
            'Projeniz yayına alınır ve markanızın dijital dünyada görünür olması için gerekli çalışmalar başlatılır.',
        soz: 'Dijital varlığınız\nartık sahne alıyor.',
    },
    {
        no: '05',
        baslik: 'Performans\nTakibi',
        aciklama:
            'SEO, trafik ve kullanıcı davranışları düzenli olarak analiz edilerek performans ölçülür.',
        soz: 'Ölçülemeyen şey\ngeliştirilemez.',
    },
    {
        no: '06',
        baslik: 'Sürekli\nGelişim',
        aciklama:
            'Dijital altyapınız ve pazarlama çalışmalarınız düzenli olarak optimize edilerek sürdürülebilir büyüme sağlanır.',
        soz: 'Durağanlık, dijital dünyada\nbir lüks değildir.',
    },
] as const;

// ─── Karşı Taraf: Büyük şeffaf numara + özlü söz (Varyasyon A) ────────────────────
function KarsiTaraf({
    adim,
    index,
    textAlign,
}: {
    adim: (typeof ADIMLAR)[number];
    index: number;
    textAlign: 'left' | 'right' | 'center';
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08 + 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
                minHeight: '180px',
                overflow: 'hidden',
                padding: '1rem 0',
            }}
        >
            {/* Büyük şeffaf numara — tipografik derinlik */}
            <span
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: textAlign === 'center' ? '50%' : textAlign === 'left' ? '0' : 'auto',
                    right: textAlign === 'right' ? '0' : 'auto',
                    transform: textAlign === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
                    fontSize: 'clamp(7rem, 14vw, 12rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    color: '#111111',
                    opacity: 0.045,
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                }}
            >
                {adim.no}
            </span>

            {/* Özlü söz */}
            <blockquote
                style={{
                    position: 'relative',
                    margin: 0,
                    padding: 0,
                    textAlign: textAlign,
                }}
            >
                {/* Tırnak işareti dekor */}
                <span
                    aria-hidden="true"
                    style={{
                        display: 'block',
                        fontSize: '3rem',
                        lineHeight: 0.6,
                        color: '#7F00FF',
                        opacity: 0.35,
                        marginBottom: '0.5rem',
                        fontFamily: 'Georgia, serif',
                    }}
                >
                    &ldquo;
                </span>
                <p
                    style={{
                        fontSize: 'clamp(1.2rem, 2.2vw, 1.75rem)',
                        fontWeight: 700,
                        fontStyle: 'italic',
                        lineHeight: 1.3,
                        letterSpacing: '-0.02em',
                        color: '#111111',
                        whiteSpace: 'pre-line',
                        margin: 0,
                    }}
                >
                    {adim.soz}
                </p>
            </blockquote>
        </motion.div>
    );
}

// ─── MOBİL: Derinlikli İstifleme Bloğu ───────────────────────────────────────────
function MobileAdimBlock({
    adim,
    index,
}: {
    adim: (typeof ADIMLAR)[number];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', textAlign: 'center' }}
        >
            {/* Devasa transparan sayı — arkaplanda */}
            <span
                aria-hidden="true"
                style={{
                    display: 'block',
                    fontSize: 'clamp(8rem, 40vw, 14rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.06em',
                    lineHeight: 0.85,
                    color: '#7F00FF',
                    opacity: 0.06,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    marginBottom: '-2rem',
                }}
            >
                {adim.no}
            </span>

            {/* Özlü Söz */}
            <div style={{ position: 'relative', zIndex: 2, marginBottom: '1.25rem', padding: '0 1rem' }}>
                <span
                    aria-hidden="true"
                    style={{
                        display: 'block',
                        fontSize: '2rem',
                        lineHeight: 0.6,
                        color: '#7F00FF',
                        opacity: 0.5,
                        marginBottom: '0.5rem',
                        fontFamily: 'Georgia, serif',
                    }}
                >
                    &ldquo;
                </span>
                <p style={{
                    fontSize: 'clamp(1.1rem, 4.5vw, 1.4rem)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    lineHeight: 1.35,
                    color: '#111111',
                    whiteSpace: 'pre-line',
                    margin: 0,
                    letterSpacing: '-0.01em',
                }}>
                    {adim.soz}
                </p>
            </div>

            {/* Kart */}
            <AdimKart adim={adim} index={index} side="left" isMobile={true} />
        </motion.div>
    );
}

// ─── Tek Kart Bileşeni ────────────────────────────────────────────────────────
function AdimKart({
    adim,
    index,
    side,
    isMobile = false,
}: {
    adim: (typeof ADIMLAR)[number];
    index: number;
    side: 'left' | 'right';
    isMobile?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: side === 'left' ? -48 : 48, y: 24 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                background: isMobile ? 'rgba(255,255,255,0.82)' : '#ffffff',
                backdropFilter: isMobile ? 'blur(16px)' : undefined,
                WebkitBackdropFilter: isMobile ? 'blur(16px)' : undefined,
                borderRadius: '1.25rem',
                padding: '2.25rem 2rem',
                boxShadow: isMobile
                    ? '0 10px 40px -10px rgba(127, 0, 255, 0.18)'
                    : '0 10px 30px -10px rgba(127, 0, 255, 0.12)',
                border: isMobile
                    ? '1px solid rgba(127,0,255,0.12)'
                    : '1px solid rgba(127,0,255,0.08)',
                borderLeft: isMobile ? '4px solid #7F00FF' : '1px solid rgba(127,0,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'default',
                overflow: 'hidden',
                position: 'relative',
            }}
            whileHover={{
                y: -6,
                boxShadow: '0 20px 40px -12px rgba(127, 0, 255, 0.22)',
            }}
        >
            {/* Mobil: Üst neon gradient çizgisi */}
            {isMobile && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, #7F00FF 0%, #b94fff 60%, transparent 100%)',
                        borderRadius: '9999px 9999px 0 0',
                    }}
                />
            )}

            {/* Numara — Masaüstünde görünür, mobilde gizli (üstteki dev rakam yeterli) */}
            <span
                className="hidden lg:block"
                style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(135deg, #7F00FF 0%, #b94fff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                {adim.no}
            </span>

            {/* Neon ayraç */}
            <div
                style={{
                    width: '2rem',
                    height: '2px',
                    background: 'linear-gradient(90deg, #7F00FF, #b94fff)',
                    borderRadius: '9999px',
                }}
            />

            {/* Başlık */}
            <h3
                style={{
                    fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: '#111111',
                    whiteSpace: 'pre-line',
                    margin: 0,
                }}
            >
                {adim.baslik}
            </h3>

            {/* Açıklama */}
            <p
                style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.75,
                    color: 'rgba(17,17,17,0.62)',
                    margin: 0,
                }}
            >
                {adim.aciklama}
            </p>
        </motion.div>
    );
}

// ─── Ana Bileşen ──────────────────────────────────────────────────────────────
export default function CalismaGecisi() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-60px 0px' });

    return (
        <section
            id="process"
            style={{
                width: '100%',
                padding: '8rem 1.5rem',
                backgroundColor: '#F3F3F3',
                position: 'relative',
                overflow: 'hidden',
            }}
            aria-label="Çalışma Sürecimiz"
        >
            {/* Arka plan dekor */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60vw',
                    height: '60vw',
                    maxWidth: '700px',
                    maxHeight: '700px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(127,0,255,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    maxWidth: '80rem',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4rem',
                }}
            >
                {/* ── Üst Başlık ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 32 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ textAlign: 'center' }}
                >
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: '#7F00FF',
                            marginBottom: '1.25rem',
                        }}
                    >
                        Çalışma Sürecimiz
                    </span>
                    <h2
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            color: '#111111',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                            margin: 0,
                        }}
                    >
                        Başarıya giden yol,{' '}
                        <span
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #7F00FF, #b94fff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            net adımlarla
                        </span>{' '}
                        başlar.
                    </h2>
                </motion.div>

                {/* ── Timeline ── */}
                <div style={{ position: 'relative' }}>
                    {/* Merkez dikey çizgi — sadece desktop */}
                    <div
                        aria-hidden="true"
                        className="hidden lg:block"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            transform: 'translateX(-50%)',
                            width: '2px',
                            background:
                                'linear-gradient(to bottom, transparent 0%, #7F00FF 15%, #b94fff 50%, #7F00FF 85%, transparent 100%)',
                            borderRadius: '9999px',
                        }}
                    />

                    {/* Mobil sol kenar çizgi -- KALDIRILDI (Alternatif 1 ile artık gerekmez) */}

                    <ul
                        style={{ listStyle: 'none', padding: 0, margin: 0 }}
                        className="flex flex-col gap-16 lg:gap-16"
                    >
                        {ADIMLAR.map((adim, index) => {
                            const side = index % 2 === 0 ? 'left' : 'right';
                            return (
                                <li
                                    key={adim.no}
                                    className="lg:pl-0"
                                    style={{ position: 'relative' }}
                                >
                                    {/* ── Desktop: 3 kolon (kart | nokta | karşı taraf) ── */}
                                    <div
                                        className="hidden lg:grid"
                                        style={{
                                            gridTemplateColumns: '1fr 80px 1fr',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* Sol slot */}
                                        <div style={{ padding: '0 2.5rem 0 0' }}>
                                            {side === 'left' ? (
                                                <AdimKart adim={adim} index={index} side="left" />
                                            ) : (
                                                <KarsiTaraf adim={adim} index={index} textAlign="right" />
                                            )}
                                        </div>

                                        {/* Merkez nokta */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '14px',
                                                    height: '14px',
                                                    borderRadius: '50%',
                                                    background: '#7F00FF',
                                                    boxShadow:
                                                        '0 0 0 4px rgba(127,0,255,0.18), 0 0 16px rgba(127,0,255,0.35)',
                                                    flexShrink: 0,
                                                }}
                                            />
                                        </div>

                                        {/* Sağ slot */}
                                        <div style={{ padding: '0 0 0 2.5rem' }}>
                                            {side === 'right' ? (
                                                <AdimKart adim={adim} index={index} side="right" />
                                            ) : (
                                                <KarsiTaraf adim={adim} index={index} textAlign="left" />
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Mobil: Derinlikli İstifleme (MobileAdimBlock) ── */}
                                    <div className="lg:hidden px-2">
                                        <MobileAdimBlock adim={adim} index={index} />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
