'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    return (
        <footer className="w-full bg-[#F3F3F3] border-t border-black/10">
            {/* Mobil Footer: Minimal Premium */}
            <div className="lg:hidden px-6 pt-8 pb-7">
                <div className="max-w-md mx-auto flex flex-col items-center text-center">
                    <div className="w-40 relative">
                        <Image
                            src="/beest_logo.svg"
                            alt="Beest Studio Logo"
                            width={240}
                            height={75}
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#7F00FF]/50 to-transparent" />

                    <nav className="mt-4 flex items-center justify-center gap-5 text-[0.78rem] font-semibold text-black/60">
                        <a
                            href="#"
                            className="min-h-10 inline-flex items-center hover:text-[#7F00FF] transition-colors duration-300"
                        >
                            Gizlilik Politikası
                        </a>
                        <a
                            href="#"
                            className="min-h-10 inline-flex items-center hover:text-[#7F00FF] transition-colors duration-300"
                        >
                            Kullanım Şartları
                        </a>
                    </nav>

                    <p className="mt-1 text-[0.72rem] font-semibold tracking-wide text-black/35">
                        &copy; {new Date().getFullYear()} Beest Studio
                    </p>
                </div>
            </div>

            {/* Desktop Footer: Mevcut yapı korunur */}
            <div className="hidden lg:flex pt-20 pb-10 px-12 flex-col justify-between">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-48 md:w-56 lg:w-72 mb-6 md:-ml-4 relative">
                            <Image
                                src="/beest_logo.svg"
                                alt="Beest Studio Logo"
                                width={288}
                                height={90}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end justify-center">
                        <nav className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
                            <Link href="/" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Ana Sayfa</Link>
                            <Link href="/#services" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Hizmetlerimiz</Link>
                            <Link href="/#projects" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Çalışmalarımız</Link>
                            <Link href="/#pricing" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Paketlerimiz</Link>
                        </nav>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 text-sm text-black/40 font-semibold text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} Beest Studio. Tüm hakları saklıdır.</p>
                    <div className="flex items-center justify-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#7F00FF] transition-colors duration-300">Gizlilik Politikası</a>
                        <a href="#" className="hover:text-[#7F00FF] transition-colors duration-300">Kullanım Şartları</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
