import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sayfa Bulunamadı | Beest Studio',
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <main className="flex-1 flex items-center justify-center bg-dirty-white px-6 py-32">
            <div className="max-w-lg w-full text-center">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-neon-purple mb-4">
                    404
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-jet-black tracking-tight">
                    Sayfa bulunamadı
                </h1>
                <p className="mt-4 text-base text-black/55 leading-relaxed">
                    Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="min-h-12 px-8 inline-flex items-center justify-center rounded-full bg-jet-black text-white text-sm font-bold tracking-wide hover:bg-neon-purple transition-colors duration-300"
                    >
                        Ana Sayfa
                    </Link>
                    <Link
                        href="/iletisim"
                        className="min-h-12 px-8 inline-flex items-center justify-center rounded-full border border-black/15 text-jet-black text-sm font-bold tracking-wide hover:border-neon-purple hover:text-neon-purple transition-colors duration-300"
                    >
                        İletişime Geç
                    </Link>
                </div>
            </div>
        </main>
    );
}
