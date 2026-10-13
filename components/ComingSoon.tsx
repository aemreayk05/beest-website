export default function ComingSoon() {
    return (
        <main className="relative flex-1 min-h-screen flex items-center justify-center overflow-hidden bg-dirty-white px-6 py-16">
            {/* Arka planda yumuşak mor ışıma */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple/10 blur-3xl"
            />

            <div className="relative max-w-xl w-full flex flex-col items-center text-center">
                {/* SVG logo için düz img kullanıyoruz; Next/Image CSS resize uyarısını engeller. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/beest_logo.svg"
                    alt="Beest Studio"
                    width={220}
                    height={68}
                    style={{ width: 'clamp(200px, 20vw, 220px)', height: 'auto', display: 'block' }}
                    decoding="async"
                    fetchPriority="high"
                />

                <p className="mt-10 text-[0.65rem] font-bold tracking-[0.18em] uppercase text-neon-purple">
                    Yakında
                </p>
                <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-jet-black leading-[0.95]">
                    Yeni sitemiz çok yakında.
                </h1>
                <p className="mt-6 text-base md:text-lg text-black/55 leading-relaxed">
                    Beest Studio&apos;yu yeniliyoruz. Çok yakında yeni yüzümüzle buradayız.
                </p>

                <div className="mt-10 h-1 w-16 rounded-full bg-neon-purple shadow-neon-glow" />
            </div>
        </main>
    );
}
