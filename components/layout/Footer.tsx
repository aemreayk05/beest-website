export default function Footer() {
    return (
        <footer className="w-full bg-[#F3F3F3] border-t border-black/10 pt-20 pb-10 px-6 lg:px-12 flex flex-col justify-between">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                {/* Sol Taraf: Marka & Slogan */}
                <div>
                    <h2 className="text-4xl md:text-6xl font-black text-[#111111] tracking-tighter leading-none mb-6">
                        BEEST<br />
                        <span className="text-[#7F00FF]">SYSTEMS</span>
                    </h2>
                    <p className="text-lg text-black/60 max-w-sm font-medium">
                        İsviçre tasarım prensipleriyle dijital ürünlerinizi geleceğe taşıyan yenilikçi ajans.
                    </p>
                </div>

                {/* Sağ Taraf: Hızlı Menü */}
                <div className="flex flex-col md:items-end justify-center">
                    <nav className="flex flex-col gap-4 text-left md:text-right">
                        <a href="#hero" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Ana Sayfa</a>
                        <a href="#services" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Hizmetlerimiz</a>
                        <a href="#projects" className="text-xl font-bold text-[#111111] hover:text-[#7F00FF] transition-colors duration-300">Çalışmalarımız</a>
                        <a href="#contact" className="text-xl font-bold text-[#7F00FF] hover:text-[#111111] transition-colors duration-300">Bize Ulaşın</a>
                    </nav>
                </div>
            </div>

            {/* Alt Bilgi & Copyright */}
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 text-sm text-black/40 font-semibold">
                <p>&copy; {new Date().getFullYear()} Beest Systems. Tüm hakları saklıdır.</p>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-[#7F00FF] transition-colors duration-300">Gizlilik Politikası</a>
                    <a href="#" className="hover:text-[#7F00FF] transition-colors duration-300">Kullanım Şartları</a>
                </div>
            </div>
        </footer>
    );
}
