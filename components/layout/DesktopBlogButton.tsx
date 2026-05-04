'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesktopBlogButton() {
    const pathname = usePathname();

    // Admin panelinde ve /blog sayfalarında gösterme
    if (pathname.startsWith('/admin') || pathname.startsWith('/blog')) return null;

    return (
        /* Hamburger ile aynı teknik:
           mix-blend-difference + text-white wrapper div üzerinde.
           Bu sayede koyu zeminde beyaz, açık zeminde siyah görünür. */
        <div className="hidden lg:flex fixed top-0 right-0 z-50 p-6 items-center mix-blend-difference text-white pointer-events-none">
            <Link
                href="/blog"
                className="pointer-events-auto flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs tracking-[0.15em] uppercase border border-white transition-transform duration-300 hover:scale-105"
                aria-label="Blog sayfasına git"
            >
                {/* Neon nokta */}
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                Blog
            </Link>
        </div>
    );
}
