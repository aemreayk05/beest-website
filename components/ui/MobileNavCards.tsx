'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, MonitorSmartphone, Award, Tag, Mail, ArrowRight } from 'lucide-react';

const CARDS = [
    {
        title: 'Hizmetler',
        description: 'Dijital dünyadaki yeteneklerimiz.',
        icon: Layers,
        href: '/hizmetler',
        bgColor: 'bg-[#111111]',
        textColor: 'text-white',
        iconColor: 'text-[#7F00FF]',
    },
    {
        title: 'Projeler',
        description: 'Gurur duyduğumuz işler.',
        icon: MonitorSmartphone,
        href: '/projeler',
        bgColor: 'bg-white',
        textColor: 'text-[#111111]',
        iconColor: 'text-[#7F00FF]',
    },
    {
        title: 'Neden Biz?',
        description: 'Fark yaratan yaklaşımımız.',
        icon: Award,
        href: '/neden-biz',
        bgColor: 'bg-white',
        textColor: 'text-[#111111]',
        iconColor: 'text-[#7F00FF]',
    },
    {
        title: 'Fiyatlandırma',
        description: 'Şeffaf paket seçenekleri.',
        icon: Tag,
        href: '/fiyatlandirma',
        bgColor: 'bg-white',
        textColor: 'text-[#111111]',
        iconColor: 'text-[#7F00FF]',
    },
    {
        title: 'İletişim',
        description: 'Yeni bir hikaye yazalım.',
        icon: Mail,
        href: '/iletisim',
        bgColor: 'bg-[#7F00FF]',
        textColor: 'text-white',
        iconColor: 'text-white',
    },
];

export default function MobileNavCards({ className = '' }: { className?: string }) {
    return (
        <section className={`w-full px-6 py-12 flex flex-col gap-4 ${className}`}>
            <div className="mb-8">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-2">
                    Hızlı Erişim
                </p>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-[#111111]">
                    Keşfetmeye Başlayın.
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                {CARDS.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={card.href} className="block group">
                                <div className={`relative overflow-hidden rounded-[2rem] p-8 flex flex-col gap-6 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.08)] ${card.bgColor}`}>
                                    {/* Icon & Arrow Header */}
                                    <div className="flex justify-between items-start">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-black/5 ${card.iconColor}`}>
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-black/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#7F00FF] group-hover:border-transparent ${card.textColor} group-hover:text-white`}>
                                            <ArrowRight size={20} strokeWidth={1.5} className={card.bgColor === 'bg-[#7F00FF]' ? 'text-white' : ''} />
                                        </div>
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div>
                                        <h3 className={`text-2xl font-black mb-1 ${card.textColor}`}>
                                            {card.title}
                                        </h3>
                                        <p className={`text-sm opacity-60 font-medium ${card.textColor}`}>
                                            {card.description}
                                        </p>
                                    </div>
                                    
                                    {/* Hover Glow Effect (Subtle) */}
                                    <div className="absolute inset-0 border-[2px] border-transparent rounded-[2rem] transition-colors duration-500 group-hover:border-[#7F00FF]/20 pointer-events-none" />
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
