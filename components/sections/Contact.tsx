'use client';

import { Instagram, Linkedin, Twitter, Dribbble } from 'lucide-react';

export default function Contact() {
    return (
        <section
            id="contact"
            className="w-full bg-[#F3F3F3] py-20 lg:py-40 relative overflow-hidden"
            aria-label="İletişim"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

                {/* Sol Taraf: İletişim Bilgileri (Adres) */}
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4">
                            İletişime Geçin
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-[#111111] mb-8">
                            Yeni bir hikaye
                            <br />
                            yazalım.
                        </h2>
                    </div>

                    <address className="not-italic flex flex-col gap-8 mt-12 lg:mt-0">
                        <div>
                            <h4 className="text-sm font-bold text-[#111111] tracking-wider uppercase mb-2">Merkez Ofis</h4>
                            <p className="text-lg text-black/60 leading-relaxed">
                                Levent, Büyükdere Cd. No:1<br />
                                34330 Beşiktaş/İstanbul<br />
                                Türkiye
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-[#111111] tracking-wider uppercase mb-2">İletişim</h4>
                            <a href="mailto:hello@beeststudio.com" className="block text-lg text-black/60 hover:text-[#7F00FF] transition-colors duration-300">
                                hello@beeststudio.com
                            </a>
                            <a href="tel:+902120000000" className="block text-lg text-black/60 hover:text-[#7F00FF] transition-colors duration-300">
                                +90 (212) 000 00 00
                            </a>
                        </div>
                    </address>

                    {/* Sosyal Medya İkonları */}
                    <div className="flex items-center gap-6 mt-12">
                        <a href="#" aria-label="Instagram" className="text-[#111111] hover:text-[#7F00FF] transition-colors duration-300 hover:-translate-y-1 transform">
                            <Instagram size={24} strokeWidth={1.5} />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-[#111111] hover:text-[#7F00FF] transition-colors duration-300 hover:-translate-y-1 transform">
                            <Twitter size={24} strokeWidth={1.5} />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="text-[#111111] hover:text-[#7F00FF] transition-colors duration-300 hover:-translate-y-1 transform">
                            <Linkedin size={24} strokeWidth={1.5} />
                        </a>
                        <a href="#" aria-label="Dribbble" className="text-[#111111] hover:text-[#7F00FF] transition-colors duration-300 hover:-translate-y-1 transform">
                            <Dribbble size={24} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

                {/* Sağ Taraf: İletişim Formu (Swiss Minimalist) */}
                <form
                    className="flex flex-col gap-10 lg:pl-10 lg:border-l border-black/10"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="relative group">
                        <label htmlFor="name" className="sr-only">Adınız</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Adınız *"
                            className="w-full bg-transparent border-0 border-b border-black/20 pb-4 text-xl md:text-2xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300"
                        />
                    </div>

                    <div className="relative group">
                        <label htmlFor="email" className="sr-only">E-posta Adresiniz</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="E-posta Adresiniz *"
                            className="w-full bg-transparent border-0 border-b border-black/20 pb-4 text-xl md:text-2xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300"
                        />
                    </div>

                    <div className="relative group">
                        <label htmlFor="company" className="sr-only">Şirketiniz (Opsiyonel)</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder="Şirketiniz (Opsiyonel)"
                            className="w-full bg-transparent border-0 border-b border-black/20 pb-4 text-xl md:text-2xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300"
                        />
                    </div>

                    <div className="relative group">
                        <label htmlFor="message" className="sr-only">Nasıl yardımcı olabiliriz?</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            placeholder="Nasıl yardımcı olabiliriz? *"
                            className="w-full bg-transparent border-0 border-b border-black/20 pb-4 text-xl md:text-2xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300 resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 self-start px-10 py-5 rounded-full bg-[#111111] text-white font-bold tracking-wide hover:bg-[#7F00FF] focus:outline-none focus:ring-4 focus:ring-[#7F00FF]/30 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(127,0,255,0.4)]"
                    >
                        Talebi Gönder
                    </button>
                    <p className="text-xs text-black/40 mt-2">
                        Verileriniz gizlilik politikamıza uygun olarak işlenmektedir.
                    </p>
                </form>

            </div>
        </section>
    );
}
