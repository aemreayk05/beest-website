'use client';

import { useRef, useState, useEffect } from 'react';
import ProjectCard from '../ui/ProjectCard';

const PROJELER = [
    {
        id: 'p1',
        baslik: 'Fintech Devrimi: Global Ödeme Aracı arayüzü',
        musteri: 'PayNova',
        kategori: ['UI/UX Tasarım', 'Design System', 'Next.js'],
        resim: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 'p2',
        baslik: 'Premium E-Ticaret Deneyimi',
        musteri: 'Lumina',
        kategori: ['Web Geliştirme', 'E-Ticaret', 'Stripe API'],
        resim: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 'p3',
        baslik: 'Yapay Zeka Destekli İçerik Platformu',
        musteri: 'Nexus AI',
        kategori: ['Web Geliştirme', 'Frontend Mimarisi', 'React'],
        resim: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 'p4',
        baslik: 'Kurumsaldan Dijitale: Marka Dönüşümü',
        musteri: 'Vanguard Group',
        kategori: ['Marka Kimliği', 'Strateji', 'Web Tasarım'],
        resim: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
        link: '#',
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    // RAF Loop tabanlı scroll tracking
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Performans Optimizasyonu: Masaüstü logici (>= 1024px) geçerli değilse döngüye girip hesaplama yapma
        if (window.innerWidth < 1024) return;

        let rafId: number;
        let lastProgress = 0;

        const tick = () => {
            const rect = el.getBoundingClientRect();
            // Scroll edilebilir alan: Toplam Yükseklik - Ekran Yüksekliği
            const scrollable = el.offsetHeight - window.innerHeight;

            if (scrollable > 0) {
                // rect.top negatif oldukça progress artar
                let currentProgress = -rect.top / scrollable;
                // Değeri 0 ile 1 arasına sabitle
                currentProgress = Math.max(0, Math.min(1, currentProgress));

                // Çok ufak değişimleri state'e yansıtmamak için (performans)
                if (Math.abs(currentProgress - lastProgress) > 0.001) {
                    lastProgress = currentProgress;
                    setProgress(currentProgress);
                }
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // translateX hesabında, kartların toplam genişliği ekranı aşan miktar kadar kaydırılacak
    // calc(-100% + 100vw) formülü, track'in en sağ noktasının ekranın en sağıyla hizalanmasını garantiler.
    const transformStyle = {
        transform: `translateX(calc(${progress} * (-100% + 100vw)))`,
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            // Masaüstünde scroll space yaratmak için uzun bir bölüm (300vh)
            // Mobilde auto height çünkü normal stack layout olacak
            className="relative z-20 bg-[#F3F3F3] h-[auto] lg:h-[300vh]"
            aria-label="Çalışmalarımız"
        >
            {/* Yapışkan Konteyner */}
            <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center py-20 lg:py-0">

                <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 mb-8 lg:mb-12">
                    <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4">
                        Seçili Çalışmalar
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-[#111111] mb-6">
                        Dijitalin sınırlarını
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F00FF] to-[#b94fff]">
                            yeniden çiziyoruz.
                        </span>
                    </h2>
                </div>

                {/* 
                    Mobilde: flex-col, alt alta normal flow
                    Masaüstünde: flex-row, gap-8, w-max (container tam boyut) translate X ile yana kayma
                */}
                <div
                    className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-6 lg:px-[10vw] items-center lg:w-max will-change-transform"
                    style={typeof window !== 'undefined' && window.innerWidth >= 1024 ? transformStyle : {}}
                >
                    {PROJELER.map((project) => (
                        <ProjectCard
                            key={project.id}
                            baslik={project.baslik}
                            musteri={project.musteri}
                            kategori={project.kategori}
                            resim={project.resim}
                            link={project.link}
                        />
                    ))}

                    {/* Sonda bitiş mesajı kartı */}
                    <div className="flex flex-col items-center justify-center w-[85vw] md:w-[60vw] lg:w-[30vw] shrink-0 bg-white rounded-[2rem] p-10 text-center shadow-[0_10px_40px_-10px_rgba(127,0,255,0.08)]">
                        <h4 className="text-2xl font-bold text-[#111111] mb-6">Sizin projeniz<br />sıradaki neden olmasın?</h4>
                        <a
                            href="#contact"
                            className="inline-block px-8 py-4 rounded-full bg-[#7F00FF] text-white font-semibold text-sm tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_8px_24px_-8px_rgba(127,0,255,0.4)]"
                        >
                            Konuşalım
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
