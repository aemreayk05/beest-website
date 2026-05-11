'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import ProjectCard from '../ui/ProjectCard';

export type ProjectData = {
    _id?: string;
    id?: string;
    baslik: string;
    musteri: string;
    kategori: string[];
    resim: string;
    link?: string;
};

const PROJELER: ProjectData[] = [
    {
        id: 'p1',
        baslik: 'Kurumsal Web Tasarımı & SEO Çalışması',
        musteri: 'Weart Mimarlık',
        kategori: ['Web Tasarım', 'Kurumsal Kimlik', 'SEO'],
        resim: '/weart.png',
        link: 'https://www.weartmimarlik.com',
    },
    {
        id: 'p2',
        baslik: 'Premium Cam & Ayna Çözümleri Platformu',
        musteri: 'Erdoğan Ayna',
        kategori: ['Web Geliştirme', 'Kurumsal', 'SEO'],
        resim: '/erdogan-ayna.png',
        link: 'https://www.erdoganayna.com',
    },
    {
        id: 'p3',
        baslik: 'Yapay Zeka Tabanlı Görsel Araçları',
        musteri: 'FAI App',
        kategori: ['Mobil Uygulama', 'React Native', 'Yapay Zeka'],
        resim: '/fai.png',
        link: '#',
    },
];

export default function Projects({ projects = [] }: { projects?: ProjectData[] }) {
    const sectionRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    const displayProjects = projects && projects.length > 0 ? projects : PROJELER;

    // RAF Loop tabanlı scroll tracking
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Performans Optimizasyonu: Masaüstü logici (>= 1024px) geçerli değilse döngüye girip hesaplama yapma
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);
        if (!desktop) return;

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
            className="relative z-20 bg-[#F3F3F3] h-[auto] lg:h-[300vh] max-lg:!mt-4"
            aria-label="Beest Tasarım Mimarisi"
        >
            {/* Yapışkan Konteyner */}
            <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col lg:justify-center z-10 max-lg:!relative max-lg:!h-auto max-lg:pb-10 max-lg:!pt-12">

                <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 mb-4 lg:mb-6">
                    <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4">
                        Seçili Çalışmalar
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-[#111111] mb-2">
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
                    style={isDesktop ? transformStyle : undefined}
                >
                    {displayProjects.map((project) => (
                        <ProjectCard
                            key={project._id || project.id}
                            baslik={project.baslik}
                            musteri={project.musteri}
                            kategori={project.kategori}
                            resim={project.resim}
                            link={project.link}
                        />
                    ))}

                    {/* Sonda bitiş mesajı kartı (Sadece Masaüstü) */}
                    <div className="hidden lg:flex flex-col items-center justify-center lg:w-[30vw] shrink-0 bg-white rounded-[2rem] p-10 text-center shadow-[0_10px_40px_-10px_rgba(127,0,255,0.08)]">
                        <h4 className="text-2xl font-bold text-[#111111] mb-6">Sıradaki neden<br />sizin projeniz olmasın?</h4>
                        <a
                            href="#contact"
                            className="inline-block px-8 py-4 rounded-full bg-[#7F00FF] text-white font-semibold text-sm tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_8px_24px_-8px_rgba(127,0,255,0.4)]"
                        >
                            Konuşalım
                        </a>
                    </div>

                    {/* Mobil Tümünü Gör Butonu */}
                    <div className="lg:hidden w-full px-6 mt-4 text-center">
                        <Link
                            href="/blog"
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
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)';
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px -8px rgba(127,0,255,0.6)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px -8px rgba(127,0,255,0.4)';
                            }}
                        >
                            TÜMÜNÜ GÖR
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
