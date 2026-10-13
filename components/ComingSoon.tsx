import { Inter_Tight } from 'next/font/google';
import { RefreshCw } from 'lucide-react';
import styles from './ComingSoon.module.css';

const display = Inter_Tight({ subsets: ['latin', 'latin-ext'], weight: ['600', '700'], display: 'swap' });

const SLOGANS = [
    ['Yeni', 'tasarım.'],
    ['Yeni', 'içerik.'],
    ['Aynı', 'Beest.'],
];

const WIND_TIMING = [
    { animationDuration: '10s', animationDelay: '0s' },
    { animationDuration: '13s', animationDelay: '-2s' },
    { animationDuration: '16s', animationDelay: '-4s' },
    { animationDuration: '19s', animationDelay: '-6s' },
];

const WIND = {
    sm: {
        width: 390,
        height: 844,
        viewBox: '0 0 390 844',
        blur: 16,
        filterBox: { x: -300, y: -300, width: 1000, height: 1400 },
        verticalMask: 'linear-gradient(180deg, transparent 0%, #000 12%, #000 48%, transparent 66%)',
        horizontalMask: 'linear-gradient(90deg, #000 0%, #000 50%, transparent 100%)',
        animationClass: styles.windSm,
        paths: [
            { d: 'M -100 150 C 50 80, 160 120, 250 150 S 400 100, 490 130', strokeWidth: 60, opacity: 0.16 },
            { d: 'M -100 230 C 50 160, 160 200, 250 230 S 400 180, 490 210', strokeWidth: 95, opacity: 0.13 },
            { d: 'M -100 315 C 50 245, 160 285, 250 315 S 400 265, 490 295', strokeWidth: 75, opacity: 0.15 },
            { d: 'M -100 385 C 50 315, 160 355, 250 385 S 400 335, 490 365', strokeWidth: 55, opacity: 0.1 },
        ],
    },
    lg: {
        width: 900,
        height: 900,
        viewBox: '0 -90 900 900',
        blur: 28,
        filterBox: { x: -400, y: -400, width: 1700, height: 1500 },
        verticalMask: 'linear-gradient(180deg, transparent 0%, #000 16%, #000 80%, transparent 96%)',
        horizontalMask: 'linear-gradient(90deg, #000 0%, #000 55%, transparent 100%)',
        animationClass: styles.wind,
        paths: [
            { d: 'M -200 200 C 120 60, 360 150, 560 210 S 900 100, 1100 160', strokeWidth: 120, opacity: 0.16 },
            { d: 'M -200 360 C 120 220, 360 310, 560 370 S 900 260, 1100 320', strokeWidth: 190, opacity: 0.13 },
            { d: 'M -200 530 C 120 390, 360 480, 560 540 S 900 430, 1100 490', strokeWidth: 150, opacity: 0.15 },
            { d: 'M -200 670 C 120 530, 360 620, 560 680 S 900 570, 1100 630', strokeWidth: 110, opacity: 0.1 },
        ],
    },
};

// Sol taraftaki bulanık mor bantlar; mobil ve masaüstü için ayrı kompozisyon
function WindBands({ size, className }: { size: keyof typeof WIND; className: string }) {
    const wind = WIND[size];
    const filterId = `wind-blur-${size}`;

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 ${className}`}
            style={{ width: wind.width, height: wind.height, maskImage: wind.verticalMask, WebkitMaskImage: wind.verticalMask }}
        >
            <div style={{ width: wind.width, height: wind.height, maskImage: wind.horizontalMask, WebkitMaskImage: wind.horizontalMask }}>
                <svg width={wind.width} height={wind.height} viewBox={wind.viewBox} className="block">
                    <defs>
                        <filter id={filterId} filterUnits="userSpaceOnUse" {...wind.filterBox}>
                            <feGaussianBlur stdDeviation={wind.blur} />
                        </filter>
                    </defs>
                    {wind.paths.map((path, i) => (
                        <path
                            key={path.d}
                            d={path.d}
                            stroke="#9b3dff"
                            strokeWidth={path.strokeWidth}
                            strokeLinecap="round"
                            fill="none"
                            opacity={path.opacity}
                            filter={`url(#${filterId})`}
                            className={wind.animationClass}
                            style={WIND_TIMING[i]}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}

function LockIcon({ className }: { className: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
    );
}

// Yeni sitenin yapım aşamasındaki tarayıcı maketi
function BrowserMockup() {
    return (
        <div className="absolute right-0 top-0 flex h-[262px] w-[300px] max-w-full flex-col overflow-hidden rounded-[18px] border border-[#e4e4e8] bg-white md:h-[440px] md:w-[560px] md:rounded-3xl">
            <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#efeff2] px-3 md:h-[52px] md:gap-4 md:px-[18px]">
                <span className="flex w-9 shrink-0 gap-[5px] md:w-[58px] md:gap-[7px]">
                    {[0, 1, 2].map((i) => (
                        <span key={i} className="h-[7px] w-[7px] rounded-full bg-[#d6d6db] md:h-2.5 md:w-2.5" />
                    ))}
                </span>
                <span className="flex flex-grow justify-center">
                    <span className="inline-flex h-6 items-center gap-[5px] rounded-full bg-dirty-white px-2.5 text-[11px] font-medium text-[#5a5a60] md:h-[30px] md:gap-[7px] md:px-4 md:text-[13px]">
                        <LockIcon className="h-2.5 w-2.5 md:h-3 md:w-3" />
                        beeststudio.com
                    </span>
                </span>
                <span className="w-9 shrink-0 md:w-[58px]" />
            </div>

            <div aria-hidden="true" className="flex flex-grow flex-col px-[18px] pb-[18px] pt-4 md:px-[30px] md:pb-[30px] md:pt-[26px]">
                <div className="flex items-center justify-between">
                    <span className={`${styles.sk} h-2.5 w-[52px] rounded bg-[#e4e4e8] md:h-3.5 md:w-[78px] md:rounded-md`} />
                    <span className="flex items-center gap-2 md:gap-3.5">
                        <span className={`${styles.sk} h-1.5 w-[26px] rounded-full bg-[#ececef] md:h-2 md:w-[42px]`} />
                        <span className={`${styles.sk} h-1.5 w-[26px] rounded-full bg-[#ececef] md:h-2 md:w-[42px]`} />
                        <span className={`${styles.sk} hidden h-2 w-[42px] rounded-full bg-[#ececef] md:block`} />
                        <span className={`${styles.sk} h-4 w-11 rounded-full bg-[#efe3ff] md:h-[26px] md:w-[74px]`} />
                    </span>
                </div>

                <div className="mt-4 flex flex-col gap-[7px] md:mt-[34px] md:gap-3">
                    <span className={`${styles.sk} h-[15px] w-[190px] rounded-md bg-[#e4e4e8] md:h-6 md:w-[340px] md:rounded-lg`} />
                    <span className="flex items-center gap-1 md:gap-1.5">
                        <span className={`${styles.sk} h-[15px] w-[136px] rounded-md bg-[#e4e4e8] md:h-6 md:w-[236px] md:rounded-lg`} />
                        <span className={`${styles.caret} h-[19px] w-0.5 rounded-[1px] bg-neon-purple md:h-[30px] md:w-[3px] md:rounded-sm`} />
                    </span>
                </div>

                <div className="mt-2.5 flex flex-col gap-[9px] md:mt-5">
                    <span className={`${styles.sk} h-1.5 w-[210px] rounded-full bg-[#ececef] md:h-[9px] md:w-[380px]`} />
                    <span className={`${styles.sk} hidden h-[9px] w-[300px] rounded-full bg-[#ececef] md:block`} />
                </div>

                <div className="mt-3 flex gap-1.5 md:mt-[22px] md:gap-2.5">
                    <span className={`${styles.sk} h-[22px] w-[70px] rounded-full bg-[#efe3ff] md:h-[34px] md:w-[116px]`} />
                    <span className={`${styles.sk} h-[22px] w-14 rounded-full bg-[#ececef] md:h-[34px] md:w-24`} />
                </div>

                <div className="mt-auto grid grid-cols-3 gap-2 md:gap-3">
                    {[0, 1, 2].map((i) => (
                        <span key={i} className={`${styles.sk} h-10 rounded-[10px] bg-dirty-white md:h-20 md:rounded-[14px]`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Mor kart: "Yeni tasarım. / Yeni içerik. / Aynı Beest." sırayla döner
function SloganCard() {
    return (
        <div className={`${styles.slogan} absolute left-0 top-[178px] flex h-[168px] w-[168px] flex-col justify-between overflow-hidden rounded-[20px] bg-neon-purple p-4 text-white md:top-[320px] md:h-60 md:w-60 md:rounded-3xl md:p-[22px]`}>
            <span className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/[0.16] md:h-10 md:w-10 md:rounded-xl">
                <RefreshCw aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <div className="relative z-[1] flex-grow">
                {SLOGANS.map(([first, second], i) => (
                    <div key={second} className={`${styles.sloganItem} absolute inset-x-0 bottom-0`}>
                        <p className={`${display.className} text-[28px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[40px]`}>
                            <span className={styles.mask}>
                                <span className={styles.word} style={{ animationDelay: `${i * 4}s` }}>{first}</span>
                            </span>
                            <br />
                            <span className={styles.mask}>
                                <span className={styles.word} style={{ animationDelay: `${i * 4 + 0.08}s` }}>{second}</span>
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ComingSoon() {
    return (
        <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-dirty-white text-jet-black">
            {/* Sağ üstte mor ışıma */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[-300px] top-[-270px] h-[560px] w-[560px] rounded-full opacity-[0.18] md:right-[-260px] md:top-[-300px] md:h-[800px] md:w-[800px]"
                style={{ background: 'radial-gradient(circle, #b94fff 0%, rgba(0,0,0,0) 65%)' }}
            />
            <WindBands size="sm" className="md:hidden" />
            <WindBands size="lg" className="hidden md:block" />

            <header className="relative flex h-16 shrink-0 items-center justify-between px-5 md:h-20 md:px-10 xl:px-20">
                <div className="flex flex-col leading-none">
                    <span className={`${display.className} text-2xl font-bold tracking-[-0.04em] md:text-[30px]`}>
                        Beest<span className="text-[#ac60f8]">.</span>
                    </span>
                    <span className="-mt-0.5 self-end text-[10px] font-medium md:ml-[52px] md:mt-0.5 md:self-auto md:text-[11px] md:font-semibold">
                        Studio
                    </span>
                </div>
                <p className="inline-flex min-h-[34px] items-center gap-2 rounded-full border border-[#e4e4e8] bg-white pl-3 pr-[13px] text-[13px] font-medium md:min-h-10 md:gap-2.5 md:pl-3.5 md:pr-4 md:text-sm">
                    <span aria-hidden="true" className={`${styles.pulse} relative h-[7px] w-[7px] shrink-0 rounded-full bg-neon-purple md:h-2 md:w-2`} />
                    Yenileme sürüyor
                </p>
            </header>

            <main className="relative flex flex-grow flex-col pb-8 md:pb-16 xl:grid xl:grid-cols-12 xl:items-center xl:gap-6 xl:px-20 xl:pb-0">
                <div className="flex flex-col px-5 pt-10 md:px-10 md:pt-16 xl:col-span-6 xl:p-0">
                    <p className="text-[13px] font-semibold text-[#6200cc] md:text-sm">Çok yakında</p>
                    <h1 className={`${display.className} mt-3.5 text-[50px] font-semibold leading-none tracking-[-0.04em] md:mt-[22px] md:text-[clamp(64px,6.4vw,92px)] md:leading-[0.98] md:tracking-[-0.045em]`}>
                        Sitemizi yeniliyoruz<span className="text-neon-purple">.</span>
                    </h1>
                    <p className="mt-[18px] text-[17px] leading-[1.55] text-[#3a3a40] md:mt-[30px] md:max-w-[500px] md:text-xl">
                        Yeni tasarımımız ve içeriklerimiz üzerinde çalışıyoruz. Kısa süre sonra buradayız.
                    </p>
                </div>

                <div className="relative mx-5 mt-11 h-[346px] max-w-[350px] md:mx-10 md:mt-14 md:h-[560px] md:max-w-[628px] xl:col-span-6 xl:col-start-7 xl:m-0 xl:max-w-none">
                    <BrowserMockup />
                    <SloganCard />
                </div>
            </main>

            <footer className="relative mx-5 flex shrink-0 flex-col gap-1 border-t border-[#d6d6db] pb-6 pt-[18px] text-[13px] leading-normal text-[#5a5a60] md:mx-10 md:h-[72px] md:flex-row md:items-center md:justify-between md:py-0 md:text-sm xl:mx-20">
                <span>© {new Date().getFullYear()} Beest Studio</span>
                <span>Web, e-ticaret ve özel yazılım stüdyosu</span>
            </footer>
        </div>
    );
}
