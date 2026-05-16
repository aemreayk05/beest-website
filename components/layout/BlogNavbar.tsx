'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { isBlogRoute } from '@/lib/isBlogRoute';

const MENU_ITEMS = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Hizmetler', href: '/#services' },
    { label: 'Neden Biz?', href: '/#neden-biz' },
    { label: 'Çalışmalarımız', href: '/#projects' },
    { label: 'Çalışma Süreci', href: '/surec' },
    { label: 'Paketler', href: '/#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '/#contact' },
];

const DESKTOP_NAV_ITEMS = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Hizmetler', href: '/#services' },
    { label: 'Paketler', href: '/#pricing' },
    { label: 'İletişim', href: '/#contact' },
];

function isMenuItemActive(pathname: string, href: string): boolean {
    if (href === '/blog') {
        return isBlogRoute(pathname);
    }
    return pathname === href;
}

export default function BlogNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    if (!isBlogRoute(pathname)) return null;

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 w-full z-50"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
                <div
                    className="relative overflow-hidden"
                    style={{
                        background: scrolled
                            ? 'rgba(243,243,243,0.72)'
                            : 'rgba(243,243,243,0.45)',
                        backdropFilter: 'blur(18px) saturate(160%)',
                        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                        border: scrolled
                            ? '1px solid rgba(17,17,17,0.12)'
                            : '1px solid rgba(17,17,17,0.07)',
                        boxShadow: scrolled
                            ? '0 4px 24px -4px rgba(127,0,255,0.10), 0 1px 0 rgba(255,255,255,0.6) inset'
                            : '0 2px 12px -4px rgba(17,17,17,0.08)',
                        transition: 'background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease',
                    }}
                >
                    <div className="flex items-center justify-between px-4 lg:px-6 h-[52px] max-w-7xl mx-auto w-full">
                        <Link href="/" className="flex items-center select-none" aria-label="Ana sayfa">
                            <Image
                                src="/favicon.svg"
                                alt="Beest Studio"
                                width={44}
                                height={44}
                                className="h-11 w-11"
                                priority
                            />
                        </Link>

                        <nav
                            className="hidden lg:flex items-center gap-6 xl:gap-8"
                            aria-label="Blog navigasyonu"
                        >
                            {DESKTOP_NAV_ITEMS.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`text-sm font-bold tracking-wide transition-colors duration-200 ${
                                            active
                                                ? 'text-[#7F00FF]'
                                                : 'text-[#111111]/70 hover:text-[#7F00FF]'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
                            style={{ color: '#111111' }}
                            aria-label="Menüyü Aç"
                        >
                            <Menu size={22} strokeWidth={2.2} />
                        </button>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '20%',
                            right: '20%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(127,0,255,0.25), transparent)',
                            opacity: scrolled ? 1 : 0,
                            transition: 'opacity 0.4s ease',
                        }}
                    />
                </div>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] bg-[#111111] text-white flex flex-col px-6 py-10"
                    >
                        <motion.div
                            className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(127,0,255,0.18) 0%, transparent 70%)',
                            }}
                        />

                        <div className="flex justify-end items-center mb-16 relative z-10">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white hover:text-[#7F00FF] transition-colors"
                                aria-label="Menüyü Kapat"
                            >
                                <X size={30} strokeWidth={2} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-7 flex-1 justify-center pb-20 relative z-10">
                            {MENU_ITEMS.map((item, index) => {
                                const active = isMenuItemActive(pathname, item.href);
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 + index * 0.07, duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => {
                                                setIsOpen(false);
                                                if (item.href.includes('#') && pathname === '/') {
                                                    e.preventDefault();
                                                    const targetId = item.href.split('#')[1];
                                                    const element = document.getElementById(targetId);
                                                    if (element) {
                                                        setTimeout(() => {
                                                            const bodyRect = document.body.getBoundingClientRect().top;
                                                            const elementRect = element.getBoundingClientRect().top;
                                                            window.scrollTo({
                                                                top: elementRect - bodyRect,
                                                                behavior: 'smooth',
                                                            });
                                                        }, 400);
                                                    }
                                                }
                                            }}
                                            className={`group flex items-center gap-3 text-3xl font-black tracking-tight transition-colors duration-200 ${
                                                active ? 'text-[#7F00FF]' : 'text-white hover:text-[#7F00FF]'
                                            }`}
                                        >
                                            <span
                                                className="block w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                                                style={{
                                                    background: active ? '#7F00FF' : 'rgba(255,255,255,0.2)',
                                                }}
                                            />
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-between items-end border-t border-white/10 pt-6 relative z-10"
                        >
                            <a
                                href="mailto:hello@beeststudio.com"
                                className="text-sm font-medium text-white/40 hover:text-white transition-colors"
                            >
                                hello@beeststudio.com
                            </a>
                            <span className="text-xs text-white/20 font-mono">© 2025</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
