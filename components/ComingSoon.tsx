import { Instrument_Sans } from 'next/font/google';
import styles from './ComingSoon.module.css';

const sans = Instrument_Sans({ subsets: ['latin', 'latin-ext'], display: 'swap' });

// Blok kompozisyonu (Yön C): mavi blok, cam kart, hap ve satırlar. Mobilde metnin üstünde, masaüstünde sağında.
const BLOCKS = {
    sm: {
        accent: { left: 24, top: 128, width: 156, height: 332 },
        glass: { left: 32, top: 340, width: 140, height: 112 },
        pill: { left: 196, top: 148, width: 96, height: 40 },
        rows: { left: 196, tops: [204, 268, 332, 396], width: 234, height: 56 },
    },
    lg: {
        accent: { left: 0, top: -28, width: 336, height: 620 },
        glass: { left: 8, top: 408, width: 320, height: 176 },
        pill: { left: 352, top: 168, width: 136, height: 56 },
        rows: { left: 352, tops: [240, 328, 416, 504], width: 404, height: 80 },
    },
};

function Blocks({ size, className }: { size: keyof typeof BLOCKS; className: string }) {
    const b = BLOCKS[size];

    return (
        <div className={`absolute top-0 ${className}`}>
            <div className={`${styles.sq} absolute rounded-[28px] bg-[#3155d9]`} style={b.accent} />
            <div className={`${styles.sq} ${styles.glass} absolute rounded-[20px]`} style={b.glass} />
            <div className="absolute rounded-full bg-[#34525f]" style={b.pill} />
            {b.rows.tops.map((top, i) => (
                <div
                    key={top}
                    className={`${styles.sq} absolute overflow-hidden rounded-[20px] ${i === 0 ? 'bg-[#34525f]' : 'bg-[#f5f4ef]'}`}
                    style={{ left: b.rows.left, top, width: b.rows.width, height: b.rows.height }}
                >
                    {i === 0 && <div className={`${styles.loading} absolute inset-y-0 left-0 w-[64%] rounded-[20px] bg-[#f5f4ef]`} />}
                </div>
            ))}
        </div>
    );
}

export default function ComingSoon() {
    return (
        <div className={`${sans.className} relative flex min-h-screen flex-1 flex-col overflow-hidden bg-[#162c38] text-[#f5f4ef] antialiased`}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <Blocks size="sm" className="left-0 lg:hidden" />
                <Blocks size="lg" className="left-[max(660px,51.67%)] hidden lg:block" />
            </div>

            <header className="relative flex h-28 shrink-0 items-start px-6 pt-8 lg:h-[136px] lg:px-20 lg:pt-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/beest-logo-yazilim.svg"
                    alt="Beest Yazılım Teknolojileri"
                    width={200}
                    height={57}
                    className="h-auto w-[180px] lg:w-[200px]"
                    fetchPriority="high"
                />
            </header>

            {/* Mobilde üst boşluk, kısa ekranlarda metnin bloklarla çakışmasını önler */}
            <main className="relative flex flex-grow flex-col items-start justify-end gap-4 px-6 pb-8 pt-[368px] lg:gap-6 lg:px-20 lg:pb-16 lg:pt-0">
                <span className="inline-flex h-6 items-center whitespace-nowrap rounded-full bg-[#24366f] px-2.5 text-xs font-semibold leading-4 tracking-[0.01em] text-[#9db2ff]">
                    Yenileniyor
                </span>
                <h1 className="text-[40px] font-medium leading-[46px] tracking-[-0.025em] lg:max-w-[560px] lg:text-[64px] lg:leading-[68px] lg:tracking-[-0.035em]">
                    Sitemizi yeniliyoruz.
                </h1>
                <p className="text-[17px] leading-6 tracking-[-0.004em] text-[#a9b8c0] lg:max-w-[520px] lg:text-[21px] lg:leading-8 lg:tracking-[-0.01em]">
                    Yeni tasarımımız ve içeriklerimiz üzerinde çalışıyoruz. Kısa süre sonra yeni yüzümüzle buradayız.
                </p>
            </main>

            <footer className="relative mx-6 flex h-16 shrink-0 items-center justify-between border-t border-[#37535f] text-[13px] leading-[18px] tracking-[0.004em] text-[#a9b8c0] lg:mx-20 lg:h-[72px]">
                <span>© {new Date().getFullYear()} Beest Yazılım Teknolojileri</span>
                <span className="hidden lg:inline">Fikrinizden ilk sürüme, tasarım ve yazılım bir arada.</span>
            </footer>
        </div>
    );
}
