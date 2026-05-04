'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    return (
        <footer className="w-full bg-[#F3F3F3] border-t border-black/10 pt-20 pb-10 px-6 lg:px-12 flex flex-col justify-between">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                {/* Sol Taraf: Marka & Slogan */}
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

                {/* Sağ Taraf: Hızlı Menü */}
                <div className="flex flex-col items-center md:items-end justify-center">
                    <nav className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
                        <Link href="/" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Ana Sayfa</Link>
                        <Link href="/#services" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Hizmetlerimiz</Link>
                        <Link href="/#projects" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Çalışmalarımız</Link>
                        <Link href="/#pricing" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Paketlerimiz</Link>
                    </nav>
                </div>
            </div>

            {/* Alt Bilgi & Copyright */}
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 text-sm text-black/40 font-semibold text-center md:text-left">
                <p>&copy; {new Date().getFullYear()} Beest Studio. Tüm hakları saklıdır.</p>
                <div className="flex items-center justify-center gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-[#7F00FF] transition-colors duration-300">Gizlilik Politikası</a>
                    <a href="#" className="hover:text-[#7F00FF] transition-colors duration-300">Kullanım Şartları</a>
                </div>
            </div>
        </footer>
    );
}
