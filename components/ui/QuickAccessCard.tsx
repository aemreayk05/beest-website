'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface QuickAccessCardProps {
    titleLine1: string;
    titleLine2: string;
    imageSrc: string;
    href: string;
    className?: string;
    outlineLine?: 1 | 2; // Hangi satırın outline olacağını belirler
}

export default function QuickAccessCard({
    titleLine1,
    titleLine2,
    imageSrc,
    href,
    className = '',
    outlineLine = 2
}: QuickAccessCardProps) {
    const outlineStyle = {
        WebkitTextStroke: '1.5px white',
        color: 'transparent',
    };

    const solidStyle = {
        color: 'white',
    };

    return (
        <div className={`w-full px-6 py-3 lg:hidden ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
                <Link href={href} className="block group" aria-label={`${titleLine1} ${titleLine2} sayfasına git`}>
                    <div
                        className="relative overflow-hidden rounded-[2rem] flex flex-col justify-end"
                        style={{
                            height: '70svh',
                            boxShadow: '0 15px 50px -12px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* ── ARKA PLAN GÖRSELİ ── */}
                        <Image
                            src={imageSrc}
                            alt={`${titleLine1} ${titleLine2} arka plan görseli`}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />

                        {/* ── GÜÇLÜ SİNEMATİK OVERLAY ── */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
                            }}
                            aria-hidden="true"
                        />

                        {/* ── İÇERİK (Direct Overlay) ── */}
                        <div className="relative z-10 px-8 pb-10 flex flex-col gap-6">
                            {/* Başlık — Editorial Swiss Style */}
                            <div className="flex flex-col">
                                <h3
                                    className="font-black leading-[0.85] tracking-[-0.04em] uppercase"
                                    style={{ fontSize: 'clamp(3.5rem, 15vw, 5rem)' }}
                                >
                                    <span style={outlineLine === 1 ? outlineStyle : solidStyle}>
                                        {titleLine1}
                                    </span>
                                    <br />
                                    <span 
                                        className="inline-block"
                                        style={{ 
                                            ...(outlineLine === 2 ? outlineStyle : solidStyle),
                                            marginTop: '0.1em'
                                        }}
                                    >
                                        {titleLine2}
                                    </span>
                                </h3>
                            </div>

                            {/* Ok Butonu ve Aksan Çizgisi */}
                            <div className="flex items-center justify-between mt-2">
                                <div className="h-[2px] w-12 bg-white/30 rounded-full" />
                                <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-white text-white transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-110">
                                    <ArrowUpRight size={24} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}
