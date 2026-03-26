'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- Data ---
const GROUP_1 = [
    {
        title: 'Stratejik Yaklaşım',
        desc: 'Her projeye işletmenizin hedeflerini ve sektörünü analiz ederek başlar, doğru dijital stratejiyi oluştururuz.',
    },
    {
        title: '30 / 60 / 90 Gün Yol Haritası',
        desc: 'Her projeye net bir planla başlarız. İlk 90 gün içerisinde yapılacak tüm çalışmalar ve hedefler baştan belirlenir.',
    },
    {
        title: 'Ölçülebilir Sonuçlar',
        desc: 'SEO, web ve reklam çalışmalarının performansını düzenli raporlarla takip eder ve şeffaf şekilde paylaşırız.',
    },
    {
        title: 'Müşteri Kazanım Sistemleri',
        desc: 'Web sitenizi sadece tanıtım için değil, yeni müşteri kazanmanızı sağlayan bir dijital sistem haline getiririz.',
    },
];

const GROUP_2 = [
    {
        title: 'Kurumsal Altyapı',
        desc: 'Geliştirdiğimiz web siteleri hızlı, güvenli ve kullanıcı deneyimi yüksek altyapılar üzerine kurulur.',
    },
    {
        title: 'İşletmeye Özel Çözümler',
        desc: 'Her markanın ihtiyacı farklıdır. Bu nedenle hazır paketler yerine işletmenize özel çözümler geliştiririz.',
    },
    {
        title: 'Site Bakım ve Güvenlik',
        desc: 'Web sitenizin güvenli, hızlı ve sorunsuz çalışması için düzenli bakım, güvenlik ve teknik destek hizmeti sunarız.',
    },
    {
        title: 'Uzun Vadeli İş Ortaklığı',
        desc: 'Amacımız tek bir proje değil, işletmenizin dijital büyümesinde uzun vadeli teknoloji partneri olmaktır.',
    },
];

const GROUP_FINAL = [
    {
        title: 'Sürekli Destek',
        desc: 'Proje tamamlandıktan sonra da teknik destek ve danışmanlık hizmeti sunarak dijital altyapınızı sürdürülebilir hale getiririz. Sizi asla yalnız bırakmıyoruz.',
    },
];

// --- Sub-component for individual sticky card ---
interface CardProps {
    item: { title: string; desc: string };
    index: number;
    globalIndexOffset: number; // To keep numbering correct (e.g. 05 instead of 01 for group 2)
    totalCards: number;
    progress: MotionValue<number>;
    isFinal?: boolean;
}

function StackedCard({ item, index, globalIndexOffset, totalCards, progress, isFinal = false }: CardProps) {
    // Target scale based on how deep in the stack this card is
    const targetScale = 1 - (totalCards - index) * 0.05;

    // The scroll range over which this card scales/fades
    const range = [index * 0.1, 1];

    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [1, 0.4]);

    return (
        <div
            className="sticky top-0 flex h-screen items-start justify-center pt-[15vh] md:pt-[22vh]"
            style={{ zIndex: index }}
        >
            <motion.div
                style={{
                    scale: isFinal ? 1 : scale,
                    opacity: 1, // NO MORE OPACITY FADE
                    top: isFinal ? 0 : `calc(${index * 1.5}rem)`, // Cards physically stack with a small vertical offset
                }}
                className={`relative flex w-[90%] md:w-[70%] max-w-[900px] flex-col justify-center rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_15px_50px_-15px_rgba(127,0,255,0.2)] origin-top border border-gray-100 ${isFinal ? 'bg-[#7F00FF] text-white' : 'bg-white text-[#111111]'}`}
            >
                <div className="flex flex-col gap-6 md:gap-8">
                    {/* Index Number Badge */}
                    <div className="flex items-center gap-4">
                        <span className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full text-[0.8rem] font-bold ${isFinal ? 'bg-white/20 text-white' : 'bg-purple-50 text-[#7F00FF]'}`}>
                            {String(index + 1 + globalIndexOffset).padStart(2, '0')}
                        </span>
                        <div className={`h-[2px] w-12 ${isFinal ? 'bg-white/30' : 'bg-[#7F00FF]'}`} />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className={`text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 ${isFinal ? 'text-white' : 'text-[#111111]'}`}>
                            {item.title}
                        </h3>
                        <p className={`text-lg md:text-xl leading-relaxed max-w-2xl font-medium ${isFinal ? 'text-white/90' : 'text-[#111111]/70'}`}>
                            {item.desc}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// --- Group Component handling its own local scroll progress ---
function CardGroup({ data, globalIndexOffset, title }: { data: typeof GROUP_1, globalIndexOffset: number, title: string }) {
    const groupRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: groupRef,
        offset: ['start start', 'end end'],
    });

    return (
        <div ref={groupRef} className="relative w-full">
            {/* Group Title pinned above cards */}
            <div className="sticky top-[6vh] md:top-[8vh] w-full flex justify-center z-[50] pointer-events-none">
                <div className="bg-[#F3F3F3] px-8 py-3 rounded-full border border-purple-200 shadow-[0_10px_30px_-10px_rgba(127,0,255,0.2)]">
                    <h3 className="text-lg md:text-2xl font-black text-[#7F00FF] tracking-widest uppercase">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="relative mt-[-10vh]">
                {data.map((item, index) => (
                    <StackedCard
                        key={index}
                        item={item}
                        index={index}
                        globalIndexOffset={globalIndexOffset}
                        totalCards={data.length}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
}

function FinalCard() {
    const { scrollYProgress } = useScroll(); // Provide a real motion value
    return (
        <div className="relative w-full h-[150vh] flex flex-col items-center justify-start"> {/* Extra scroll to let it pause gracefully */}
            <StackedCard
                item={GROUP_FINAL[0]}
                index={0}
                globalIndexOffset={8}
                totalCards={1}
                progress={scrollYProgress}
                isFinal={true}
            />
        </div>
    );
}

export default function NedenBiz() {
    return (
        <section
            id="why-us"
            className="relative z-10 bg-[#F3F3F3] pb-0"
            aria-label="Neden Beest Systems?"
        >
            {/* Header / Intro (Normal flow, not sticky over 900vh) */}
            <div className="flex flex-col items-center justify-center w-full px-6 py-32 z-0">
                <div className="flex flex-col items-center justify-center max-w-4xl text-center">
                    <p className="text-[#7F00FF] font-bold tracking-[0.18em] uppercase text-[0.65rem] md:text-xs mb-4">
                        Farkımız
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#111111] tracking-tight mb-6 leading-[1.1]">
                        Neden <span className="text-[#7F00FF]">Beest Systems?</span>
                    </h2>
                    <p className="text-sm md:text-lg text-[#111111]/60 font-medium max-w-2xl">
                        Sadece dijital bir ajans değil, işletmenizin büyümesinde sorumluluk alan ve ölçülebilir sonuçlar üreten teknoloji partneriniziz.
                    </p>
                </div>
            </div>

            {/* Group 1: Strategy */}
            <CardGroup data={GROUP_1} globalIndexOffset={0} title="Strateji" />

            {/* Spacer between groups so the previous cards scroll cleanly out of view */}
            <div className="h-[20vh] w-full bg-gradient-to-b from-[#F3F3F3] to-[#F3F3F3] relative z-20" />

            {/* Group 2: Infrastructure */}
            <CardGroup data={GROUP_2} globalIndexOffset={4} title="Altyapı" />

            {/* Spacer */}
            <div className="h-[20vh] w-full bg-gradient-to-b from-[#F3F3F3] to-[#F3F3F3] relative z-20" />

            {/* Group Final: Support */}
            <FinalCard />
        </section>
    );
}
