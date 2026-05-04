'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: 'Neden Biz?', href: '/neden-biz' },
    { label: 'Çalışmalarımız', href: '/projeler' },
    { label: 'Çalışma Süreci', href: '/surec' },
    { label: 'Paketler', href: '/fiyatlandirma' },
    { label: 'İletişim', href: '/iletisim' },
];

export default function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Sayfa değiştiğinde menüyü kapat
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Menü açıkken scroll'u kilitle
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div className="lg:hidden">
            {/* Navbar Header (Sabit) */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-end items-center mix-blend-difference text-white pointer-events-none">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 pointer-events-auto"
                    aria-label="Menüyü Aç"
                >
                    <Menu size={32} strokeWidth={2} />
                </button>
            </div>

            {/* Tam Ekran Menü */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] bg-[#111111] text-white flex flex-col px-6 py-10"
                    >
                        {/* Kapatma Butonu */}
                        <div className="flex justify-between items-center mb-16">
                            <span className="font-black text-xl tracking-widest text-white/50">MENÜ</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white hover:text-[#7F00FF] transition-colors"
                                aria-label="Menüyü Kapat"
                            >
                                <X size={36} strokeWidth={2} />
                            </button>
                        </div>

                        {/* Menü Linkleri */}
                        <nav className="flex flex-col gap-8 flex-1 justify-center pb-20">
                            {MENU_ITEMS.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`text-4xl md:text-6xl font-black tracking-tight hover:text-[#7F00FF] transition-colors ${
                                            pathname === item.href ? 'text-[#7F00FF]' : 'text-white'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        
                        {/* Alt Bilgi */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-between items-end border-t border-white/10 pt-6"
                        >
                            <a href="mailto:hello@beeststudio.com" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                                hello@beeststudio.com
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
