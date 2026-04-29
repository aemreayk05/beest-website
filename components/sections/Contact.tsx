'use client';

import { Instagram, Linkedin, Twitter, Dribbble, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const company = formData.get('company') as string;
        const message = formData.get('message') as string;
        const honeypot = formData.get('bot-check') as string;

        const details = company ? `Şirket: ${company}\n\nMesaj: ${message}` : message;

        const data = {
            name,
            email,
            details,
            packageName: 'Genel İletişim',
            honeypot,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                (e.target as HTMLFormElement).reset();
                setTimeout(() => {
                    setIsSuccess(false);
                }, 4000);
            }
        } catch (error) {
            console.error('Ağ hatası:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <h4 className="text-sm font-bold text-[#111111] tracking-wider uppercase mb-2">İletişim</h4>
                            <a href="mailto:hello@beeststudio.com" className="block text-lg text-black/60 hover:text-[#7F00FF] transition-colors duration-300">
                                hello@beeststudio.com
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
                <div className="flex flex-col gap-10 lg:pl-10 lg:border-l border-black/10">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center text-center py-20 h-full"
                            >
                                <div className="w-24 h-24 bg-[#7F00FF]/10 text-[#7F00FF] flex justify-center items-center rounded-full mb-6">
                                    <Check size={48} strokeWidth={3} />
                                </div>
                                <h4 className="text-3xl font-bold mb-4 text-[#111111]">Mesajınız Alındı</h4>
                                <p className="text-[#111111]/60 text-lg">En kısa sürede sizinle iletişime geçeceğiz.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-10"
                                onSubmit={handleSubmit}
                            >
                                {/* HONEYPOT - Güvenlik (Botlar İçin) */}
                                <input type="text" name="bot-check" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

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
                                    disabled={isSubmitting}
                                    className="mt-6 self-start px-10 py-5 rounded-full bg-[#111111] text-white font-bold tracking-wide hover:bg-[#7F00FF] focus:outline-none focus:ring-4 focus:ring-[#7F00FF]/30 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(127,0,255,0.4)] disabled:opacity-70 flex justify-center items-center min-w-[200px]"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                                        />
                                    ) : (
                                        "Talebi Gönder"
                                    )}
                                </button>
                                <p className="text-xs text-black/40 mt-2">
                                    Verileriniz gizlilik politikamıza uygun olarak işlenmektedir.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
