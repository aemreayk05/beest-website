'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Map, BarChart3, Target, ShieldCheck, BrainCircuit } from 'lucide-react';

const veri = [
    {
        no: '01',
        tag: 'ROTA & VİZYON',
        icon: Map,
        title: '30 / 60 / 90 Gün Dijital Yol Haritası',
        desc: 'Her projeye net bir planla başlarız. İlk 90 gün içerisinde yapılacak tüm çalışmalar ve hedefler baştan belirlenir.'
    },
    {
        no: '02',
        tag: 'VERİ ŞEFFAFLIĞI',
        icon: BarChart3,
        title: 'Şeffaf Performans Raporları',
        desc: 'Yapılan tüm çalışmalar düzenli raporlarla paylaşılır. Web sitesi trafiği, SEO gelişimi ve reklam performansı net şekilde takip edilir.'
    },
    {
        no: '03',
        tag: 'SÜREKLİ BÜYÜME',
        icon: Target,
        title: 'Müşteri Kazanım Sistemleri',
        desc: 'Web sitenizi sadece tanıtım için değil, yeni müşteri kazanmanızı sağlayan bir dijital sistem haline getiririz.'
    },
    {
        no: '04',
        tag: 'KUSURSUZ ALTYAPI',
        icon: ShieldCheck,
        title: 'Site Bakım ve Güvenlik Yönetimi',
        desc: 'Web sitenizin güvenli, hızlı ve sorunsuz çalışması için düzenli bakım, güvenlik ve teknik destek hizmeti sunarız.'
    },
    {
        no: '05',
        tag: 'STRATEJİK REHBERLİK',
        icon: BrainCircuit,
        title: 'Strateji ve Dijital Danışmanlık',
        desc: 'İşletmenizin dijital dünyada doğru adımlar atabilmesi için sektöre ve hedef kitlenize uygun stratejik yönlendirmeler sağlarız.'
    }
];

function DialItem({ item, index, progress, isDesktop }: { item: typeof veri[0], index: number, progress: MotionValue<number>, isDesktop: boolean }) {
    const Icon = item.icon;

    const getDistance = (p: number) => {
        // "Tam Ekran" hissiyatı için Deadzone ekstrem seviyeye (0.40) çıkarıldı!
        // Kullanıcı Neden Biz'e girip tüm siyah efekti görüp "bir tam" ekran scroll edene kadar KİLİTLİ.
        let val = 0;
        if (p <= 0.40) val = 0;
        else if (p >= 0.90) val = 4;
        else val = ((p - 0.40) / 0.50) * 4;
        return val - index;
    };

    const R = 800; // px
    const angleStepDesktop = 28; 

    const desktopX = useTransform(progress, (p) => {
        const d = getDistance(p);
        const angleRad = (d * angleStepDesktop * Math.PI) / 180;
        return (1 - Math.cos(angleRad)) * R;
    });

    const desktopY = useTransform(progress, (p) => {
        const d = getDistance(p);
        const angleRad = (d * angleStepDesktop * Math.PI) / 180;
        return Math.sin(angleRad) * R;
    });

    const desktopOpacity = useTransform(progress, (p) => {
        const d = getDistance(p);
        return 1 - Math.abs(d) * 0.45;
    });

    const desktopScale = useTransform(progress, (p) => {
        const d = getDistance(p);
        return 1 - Math.abs(d) * 0.15;
    });


    // MOBİL
    const slotAngleStep = 35; 

    const mobileY = useTransform(progress, (p) => {
        const d = getDistance(p);
        return d * 130;
    });

    const mobileRotateX = useTransform(progress, (p) => {
        const d = getDistance(p);
        return d * -slotAngleStep;
    });

    const mobileScale = useTransform(progress, (p) => {
        const d = getDistance(p);
        return 1 - Math.abs(d) * 0.2;
    });

    const mobileOpacity = useTransform(progress, (p) => {
        const d = getDistance(p);
        return 1 - Math.abs(d) * 0.55;
    });

    const mobileZIndex = useTransform(progress, (p) => {
        const d = getDistance(p);
        return Math.floor(100 - Math.abs(d) * 10);
    });

    // Ortak
    const isCenter = useTransform(progress, (p) => Math.abs(getDistance(p)) < 0.2);
    // Metin ve ikon renkleri Karanlık Moda uygun olarak beyaz/gri (#F3F3F3) ayarlanıyor
    const titleColor = useTransform(progress, (p) => Math.abs(getDistance(p)) < 0.2 ? '#F3F3F3' : 'rgba(243,243,243,0.3)');
    const descColor = useTransform(progress, (p) => Math.abs(getDistance(p)) < 0.2 ? 'rgba(243,243,243,0.7)' : 'rgba(243,243,243,0.1)');

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                marginTop: '-100px', 
                x: isDesktop ? desktopX : 0,
                y: isDesktop ? desktopY : mobileY,
                rotateX: isDesktop ? 0 : mobileRotateX,
                scale: isDesktop ? desktopScale : mobileScale,
                opacity: isDesktop ? desktopOpacity : mobileOpacity,
                filter: 'none',
                zIndex: isDesktop ? 10 : mobileZIndex,
                width: '100%',
                transformOrigin: 'center center',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
            }}
            className="flex flex-col gap-2 origin-left md:origin-center px-4 max-w-[90vw] md:max-w-2xl"
        >
            {/* Arkaplan Dev İkon (Eski numaraların yerine) */}
            <div className="absolute top-1/2 left-0 md:left-[-15%] -translate-y-1/2 -z-10 opacity-[0.03] md:opacity-[0.02] text-white">
                <Icon size={isDesktop ? 320 : 200} strokeWidth={1} />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                {/* Neon Güç Etiketi */}
                <motion.div 
                    style={{
                        borderColor: isCenter ? '#7F00FF' : 'rgba(127, 0, 255, 0.1)',
                        boxShadow: isCenter ? '0 0 20px rgba(127,0,255,0.4)' : 'none',
                    }}
                    className="flex items-center gap-2 border rounded-full px-3 py-1.5 w-fit transition-all duration-300 bg-[#7F00FF]/5"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7F00FF] shadow-[0_0_8px_#7F00FF] animate-pulse" />
                    <span 
                        style={{ color: isCenter ? '#7F00FF' : 'rgba(127,0,255,0.6)' }}
                        className="font-bold text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] uppercase"
                    >
                        {item.tag}
                    </span>
                </motion.div>
                
                <motion.h3 
                    style={{ color: titleColor }}
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.05] tracking-tight transition-colors duration-300"
                >
                    {item.title}
                </motion.h3>
                
                <motion.p 
                    style={{ color: descColor }}
                    className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-medium transition-colors duration-300"
                >
                    {item.desc}
                </motion.p>
            </div>
        </motion.div>
    );
}

export default function NedenBiz() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] 
    });

    // Dark Mode Arkaplan Geçişi (%0-10 arası tam kararma)
    const bgOpacity = useTransform(scrollYProgress, [0, 0.10, 0.90, 1], [0, 1, 1, 0]);
    
    // Sol Başlık Renk Geçişleri Siyah/Beyaz
    const titleColor = useTransform(scrollYProgress, [0, 0.10, 0.90, 1], ['#111111', '#F3F3F3', '#F3F3F3', '#111111']);
    const subtitleColor = useTransform(scrollYProgress, [0, 0.10, 0.90, 1], ['rgba(17,17,17,0.5)', 'rgba(243,243,243,0.5)', 'rgba(243,243,243,0.5)', 'rgba(17,17,17,0.5)']);

    // Ambiyans Işıkları (Lava Orbs) Parallax hareketi
    const topOrbY = useTransform(scrollYProgress, [0, 1], [0, 600]);
    const bottomOrbY = useTransform(scrollYProgress, [0, 1], [0, -500]);

    // Bütün içeriği sayfa sonuna doğru yavaşça eritme (Exit Fade-out Transition)
    const contentOpacity = useTransform(scrollYProgress, [0, 0.88, 0.98], [1, 1, 0]);

    return (
        <section ref={containerRef} id="neden-biz" className="relative w-full bg-[#F3F3F3] h-[350vh]">
            
            {/* DARK MODE YÜZEYİ */}
            <motion.div 
                style={{ opacity: bgOpacity }} 
                className="absolute inset-0 bg-[#0a0a0a] z-0 pointer-events-none" // Çok koyu griden siyaha geçiş #0a0a0a
            />

            {/* AMBİYANS IŞIKLARI (LAVA ORBS - PERFORMANS ODAKLI) */}
            <motion.div 
                style={{ opacity: bgOpacity }}
                className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0"
            >
                <motion.div 
                    style={{ 
                        y: topOrbY,
                        background: 'radial-gradient(circle, rgba(127, 0, 255, 0.15) 0%, rgba(127, 0, 255, 0) 70%)',
                        willChange: 'transform'
                    }}
                    className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vh] rounded-full" 
                />
                <motion.div 
                    style={{ 
                        y: bottomOrbY,
                        background: 'radial-gradient(circle, rgba(185, 79, 255, 0.1) 0%, rgba(185, 79, 255, 0) 70%)',
                        willChange: 'transform'
                    }}
                    className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vh] rounded-full" 
                />
            </motion.div>
            
            {/* GÖSTERİM ÇERÇEVESİ */}
            <motion.div 
                style={{ opacity: contentOpacity }}
                className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden max-w-7xl mx-auto px-6 lg:px-12 z-10"
            >
                
                {/* SOL: Başlık Alanı */}
                <div className="w-full lg:w-[40%] flex-shrink-0 flex flex-col items-start pt-24 lg:pt-0">
                    <span className="text-[0.65rem] font-bold tracking-[0.18em] text-[#7F00FF] uppercase mb-4">
                        Ayrıcalıklar
                    </span>
                    
                    <motion.h2 
                        style={{ color: titleColor }}
                        className="text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[0.95] tracking-[-0.03em] transition-colors duration-300"
                    >
                        Neden <br />
                        <span 
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #7F00FF, #b94fff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Beest <br className="hidden lg:block"/> Studio?
                        </span>
                    </motion.h2>

                    <div className="w-16 h-[3px] bg-[#7F00FF] rounded-full mt-6 shadow-[0_0_15px_rgba(127,0,255,0.5)]" />
                    
                    <motion.p 
                        style={{ color: subtitleColor }}
                        className="text-sm md:text-base font-medium max-w-xs leading-relaxed mt-6 hidden lg:block transition-colors duration-300"
                    >
                        Standart ajans yaklaşımlarının ötesinde, ölçülebilir ve garantili büyüme sunan mimariler inşa ediyoruz.
                    </motion.p>
                </div>

                {/* SAĞ: Dial / Slot Alanı */}
                <div className="w-full lg:w-[60%] flex-1 relative h-[60vh] lg:h-full mt-10 lg:mt-0 perspective-[1000px]">
                    {veri.map((item, index) => (
                        <DialItem 
                            key={item.no} 
                            item={item} 
                            index={index} 
                            progress={scrollYProgress} 
                            isDesktop={isDesktop} 
                        />
                    ))}
                </div>

            </motion.div>
        </section>
    );
}
