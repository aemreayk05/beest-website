import Link from 'next/link';

export default function BlogCTA() {
    return (
        <section className="my-20 p-8 md:p-16 rounded-[2rem] bg-gradient-to-br from-[#111111] to-[#1a1a1a] text-center md:text-left relative overflow-hidden group">
            {/* Arkaplan Işık Efekti */}
            <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#7F00FF]/30 blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3 py-1 bg-white/5 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7F00FF] shadow-[0_0_8px_#7F00FF] animate-pulse" />
                        <span className="font-bold text-[0.6rem] tracking-[0.2em] uppercase text-white/80">Projeniz İçin</span>
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white mb-4">
                        Web sitenizi <span className="text-[#7F00FF]">SEO uyumlu</span> hale getirelim.
                    </h3>
                    <p className="text-base md:text-lg font-medium text-white/60 leading-relaxed">
                        Markanız için hızlı, modern ve arama motorlarına uygun bir web sitesi altyapısı oluşturalım.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <Link
                        href="/#contact"
                        className="px-8 py-4 rounded-full bg-[#7F00FF] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#6a00d6] hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(127,0,255,0.6)] text-center"
                    >
                        Teklif Al
                    </Link>
                    <Link
                        href="/#services"
                        className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center"
                    >
                        Hizmetleri İncele
                    </Link>
                </div>
            </div>
        </section>
    );
}
