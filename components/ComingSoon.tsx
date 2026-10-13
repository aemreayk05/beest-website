export default function ComingSoon() {
    return (
        <main className="flex-1 min-h-screen flex items-center justify-center bg-white px-6 py-16">
            <div className="max-w-xl w-full flex flex-col items-center text-center">
                <p className="mb-6 text-[0.65rem] font-bold tracking-[0.18em] uppercase text-neon-purple">
                    Yakında
                </p>

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

                <h1 className="mt-10 text-4xl md:text-6xl font-black tracking-tighter text-jet-black leading-[0.95]">
                    Yeni sitemiz çok yakında.
                </h1>
                <p className="mt-6 text-base md:text-lg text-black/55 leading-relaxed">
                    Beest Studio&apos;yu yeniliyoruz. Çok yakında yeni yüzümüzle buradayız.
                </p>
            </div>
        </main>
    );
}
