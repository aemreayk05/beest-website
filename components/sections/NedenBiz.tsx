'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { Map, BarChart3, Target, ShieldCheck, BrainCircuit, Star, Zap, Activity, LucideProps } from 'lucide-react';

export type WhyUsData = {
    _id?: string;
    no: string;
    tag: string;
    iconName: string;
    title: string;
    desc: string;
};

type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;

const IconMap: Record<string, LucideIcon> = {
    Map, BarChart3, Target, ShieldCheck, BrainCircuit, Star, Zap, Activity
};

const veri: WhyUsData[] = [
    {
        no: '01',
        tag: 'ROTA & VİZYON',
        iconName: 'Map',
        title: '30 / 60 / 90 Gün Dijital Yol Haritası',
        desc: 'Her projeye net bir planla başlarız. İlk 90 gün içerisinde yapılacak tüm çalışmalar ve hedefler baştan belirlenir.'
    },
    {
        no: '02',
        tag: 'VERİ ŞEFFAFLIĞI',
        iconName: 'BarChart3',
        title: 'Şeffaf Performans Raporları',
        desc: 'Yapılan tüm çalışmalar düzenli raporlarla paylaşılır. Web sitesi trafiği, SEO gelişimi ve reklam performansı net şekilde takip edilir.'
    },
    {
        no: '03',
        tag: 'SÜREKLİ BÜYÜME',
        iconName: 'Target',
        title: 'Müşteri Kazanım Sistemleri',
        desc: 'Web sitenizi sadece tanıtım için değil, yeni müşteri kazanmanızı sağlayan bir dijital sistem haline getiririz.'
    },
    {
        no: '04',
        tag: 'KUSURSUZ ALTYAPI',
        iconName: 'ShieldCheck',
        title: 'Site Bakım ve Güvenlik Yönetimi',
        desc: 'Web sitenizin güvenli, hızlı ve sorunsuz çalışması için düzenli bakım, güvenlik ve teknik destek hizmeti sunarız.'
    },
    {
        no: '05',
        tag: 'STRATEJİK REHBERLİK',
        iconName: 'BrainCircuit',
        title: 'Strateji ve Dijital Danışmanlık',
        desc: 'İşletmenizin dijital dünyada doğru adımlar atabilmesi için sektöre ve hedef kitlenize uygun stratejik yönlendirmeler sağlarız.'
    }
];

function DialItem({ item, index, progress, isDesktop }: { item: WhyUsData, index: number, progress: MotionValue<number>, isDesktop: boolean }) {
    const Icon = IconMap[item.iconName] || Star;

    const getDistance = (p: number) => {
        // Sıfıra yakın ölü alan (%5), geri kalan her şey dönüş animasyonuna ait.
        let val = 0;
        if (p <= 0.05) val = 0;
        else if (p >= 0.95) val = 4;
        else val = ((p - 0.05) / 0.90) * 4;
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

function DesktopNedenBiz({ reasons }: { reasons: WhyUsData[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    // Geliş anını yakalayan ekstra ölçüm
    const { scrollYProgress: entryProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        const unsubscribe = entryProgress.on('change', (v) => {
            if (v >= 1 && !hasEntered) {
                setHasEntered(true);
                
                // Kapıya tam oturdu, animasyon için scroll'u kilitle
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const lenis = (window as any).__lenis;
                if (lenis) lenis.stop();

                // Animasyon hissiyatı bittikten 1.2s sonra serbest bırak
                setTimeout(() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if ((window as any).__lenis) (window as any).__lenis.start();
                }, 1200);
            }
        });
        return () => unsubscribe();
    }, [entryProgress, hasEntered]);

    // Asıl okuma ve çark döngüsü ekseni
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] 
    });
    
    // ÇIKARKEN Tema Aydınlanması (Scroll > %95)
    const titleColor = useTransform(scrollYProgress, [0.95, 1], ['#F3F3F3', '#111111']);
    const subtitleColor = useTransform(scrollYProgress, [0.95, 1], ['rgba(243,243,243,0.5)', 'rgba(17,17,17,0.5)']);

    const topOrbY = useTransform(scrollYProgress, [0, 1], [0, 600]);
    const bottomOrbY = useTransform(scrollYProgress, [0, 1], [0, -500]);

    // ÇIKARKEN Elementlerin uçarak kaybolması (Scroll > %95)
    const exitOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
    const exitY = useTransform(scrollYProgress, [0.95, 1], [0, -50]);

    return (
        <section ref={containerRef} className="relative w-full bg-[#F3F3F3] h-[300vh]">
            
            {/* ZEMİN ANA KATMANI - Kararma ve Çıkış */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: hasEntered ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                {/* ÇIKARKEN AYDINLANMA (Scroll ile) */}
                <motion.div 
                    style={{ opacity: exitOpacity }} 
                    className="absolute inset-0 bg-[#0a0a0a]"
                />

                {/* AMBİYANS IŞIKLARI */}
                <motion.div style={{ opacity: exitOpacity }} className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
                    <motion.div 
                        style={{ y: topOrbY, background: 'radial-gradient(circle, rgba(127, 0, 255, 0.15) 0%, rgba(127, 0, 255, 0) 70%)', willChange: 'transform' }}
                        className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vh] rounded-full" 
                    />
                    <motion.div 
                        style={{ y: bottomOrbY, background: 'radial-gradient(circle, rgba(185, 79, 255, 0.1) 0%, rgba(185, 79, 255, 0) 70%)', willChange: 'transform' }}
                        className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vh] rounded-full" 
                    />
                </motion.div>
            </motion.div>
            
            {/* GÖSTERİM ÇERÇEVESİ - Başlangıç Animasyonu */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 50 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="sticky top-0 h-screen w-full overflow-hidden max-w-7xl mx-auto z-10"
            >
                {/* İÇERİKLER - Çıkış Kaybolması */}
                <motion.div
                    style={{ opacity: exitOpacity, y: exitY }}
                    className="w-full h-full flex flex-col lg:flex-row items-center px-6 lg:px-12"
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
                    {reasons.map((item, index) => (
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
            </motion.div>
        </section>
    );
}

function MobileNedenBiz({ reasons }: { reasons: WhyUsData[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % reasons.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [activeIndex]); // Re-start timer when slide changes

    const currentItem = reasons[activeIndex];
    const Icon = IconMap[currentItem.iconName] || Star;

    return (
        <div className="w-full h-[85vh] min-h-[500px] flex flex-col relative overflow-hidden bg-[#F3F3F3]">
            {/* Story Progress Bars */}
            <div className="absolute top-24 left-0 w-full px-6 z-50 flex gap-2">
                {reasons.map((_, i) => {
                    const isActive = i === activeIndex;
                    const isPassed = i < activeIndex;

                    return (
                        <div key={i} className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden relative">
                            {isActive ? (
                                <motion.div 
                                    key={`active-${activeIndex}`}
                                    className="absolute top-0 left-0 h-full bg-[#7F00FF]"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 6, ease: 'linear' }}
                                />
                            ) : (
                                <div 
                                    className="absolute top-0 left-0 h-full bg-[#7F00FF]"
                                    style={{ width: isPassed ? '100%' : '0%' }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Click areas for Next/Prev */}
            <div className="absolute inset-0 z-40 flex">
                <div className="w-1/3 h-full" onClick={prevSlide} />
                <div className="w-2/3 h-full" onClick={nextSlide} />
            </div>

            {/* Content Area */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center px-8"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[#7F00FF] pointer-events-none">
                        <Icon size={350} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-mono text-4xl font-black text-[#7F00FF]">
                                {currentItem.no}
                            </span>
                            <div className="flex items-center gap-2 border border-[#7F00FF]/20 rounded-full px-4 py-1.5 bg-[#7F00FF]/5">
                                <div className="w-2 h-2 rounded-full bg-[#7F00FF] shadow-[0_0_8px_#7F00FF] animate-pulse" />
                                <span className="font-bold text-[0.7rem] tracking-[0.2em] uppercase text-[#7F00FF]">
                                    {currentItem.tag}
                                </span>
                            </div>
                        </div>
                        
                        <h3 className="text-[2.5rem] leading-[1.05] font-black tracking-tight text-[#111111] mb-6">
                            {currentItem.title}
                        </h3>
                        
                        <p className="text-lg leading-relaxed font-medium text-black/70">
                            {currentItem.desc}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Footer indicator */}
            <div className="absolute bottom-12 left-0 w-full text-center z-50 pointer-events-none">
                <p className="text-xs font-bold tracking-widest text-black/30 uppercase animate-pulse">
                    İlerlemek için dokunun
                </p>
            </div>
        </div>
    );
}

export default function NedenBiz({ reasons = [] }: { reasons?: WhyUsData[] }) {
    const displayReasons = reasons && reasons.length > 0 ? reasons : veri;

    return (
        <section id="neden-biz" className="w-full bg-[#F3F3F3]">
            <div className="hidden lg:block">
                <DesktopNedenBiz reasons={displayReasons} />
            </div>
            <div className="block lg:hidden">
                <MobileNedenBiz reasons={displayReasons} />
            </div>
        </section>
    );
}
