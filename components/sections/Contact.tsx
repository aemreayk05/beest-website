'use client';

import { Instagram, Linkedin, Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function WhatsAppIcon({ size = 24 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M11.996 21.999c-1.637 0-3.238-.432-4.646-1.25L2.5 21.5l.771-4.807A9.957 9.957 0 0 1 2 11.996C2 6.48 6.482 2 12.004 2 17.52 2 22 6.48 22 11.996c0 5.518-4.482 9.998-10.004 10.003z" />
        </svg>
    );
}

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const successHeadingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!isSuccess) return;
        successHeadingRef.current?.focus();
    }, [isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        const honeypot = formData.get('bot-check') as string;

        const data = {
            name,
            email,
            details: message,
            packageName: 'Genel İletişim',
            honeypot,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                setSubmitError(null);
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setIsSuccess(false), 4000);
            } else {
                const body = await response.json().catch(() => ({}));
                setSubmitError(
                    typeof body.message === 'string'
                        ? body.message
                        : 'Gönderim başarısız. Lütfen tekrar deneyin.'
                );
            }
        } catch (error) {
            console.error('Ağ hatası:', error);
            setSubmitError(
                'Bağlantı hatası. Lütfen tekrar deneyin veya WhatsApp üzerinden yazın.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatsappHref = 'https://wa.me/905373748454';
    const instagramHref = 'https://www.instagram.com/beeststudio/';
    const linkedinHref = 'https://www.linkedin.com/company/beest-studio/';

    return (
        <section
            id="contact"
            className="w-full bg-[#F3F3F3] py-20 lg:py-40 relative overflow-hidden max-lg:!pt-6 max-lg:!pb-8 max-lg:!mt-0"
            aria-label="İletişim"
        >
            {/* ── MOBİL: Tek Kart ── */}
            <div className="lg:hidden px-6">
                <div
                    className="rounded-[1.75rem] bg-white border border-black/10 overflow-hidden"
                    style={{
                        boxShadow: '0 12px 40px -12px rgba(17,17,17,0.12), 0 0 0 1px rgba(127,0,255,0.06)',
                    }}
                >
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="mobile-success"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="px-6 py-10 flex flex-col items-center text-center"
                            >
                                <div className="w-14 h-14 bg-[#7F00FF]/10 text-[#7F00FF] flex justify-center items-center rounded-full mb-4">
                                    <Check size={28} strokeWidth={3} />
                                </div>
                                <h3
                                    ref={successHeadingRef}
                                    tabIndex={-1}
                                    className="text-xl font-black text-[#111111] mb-2 outline-none"
                                >
                                    Mesajın Alındı
                                </h3>
                                <p className="text-sm text-black/55 font-medium">
                                    En kısa sürede seninle iletişime geçeceğiz.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="mobile-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Başlık bloku */}
                                <div className="px-6 pt-6 pb-5">
                                    <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-3">
                                        İletişime Geçin
                                    </p>
                                    <h2
                                        className="font-black leading-[0.95] tracking-tight text-[#111111]"
                                        style={{ fontSize: 'clamp(2rem, 9vw, 2.75rem)' }}
                                    >
                                        Yeni bir hikaye
                                        <br />
                                        yazalım.
                                    </h2>
                                </div>

                                {/* Kanallar + sosyal */}
                                <div className="border-t border-black/10 px-6 py-5">
                                    <h4 className="text-xs font-bold text-[#111111] tracking-wider uppercase mb-3">
                                        İletişim
                                    </h4>
                                    <a
                                        href="mailto:hello@beeststudio.com"
                                        className="block text-base font-medium text-black/70 hover:text-[#7F00FF] transition-colors truncate"
                                    >
                                        hello@beeststudio.com
                                    </a>
                                    <a
                                        href="tel:+905373748454"
                                        className="block text-base font-medium text-black/70 hover:text-[#7F00FF] transition-colors mt-2"
                                    >
                                        +90 537 374 84 54
                                    </a>
                                    <div className="flex items-center gap-5 mt-5 pt-4 border-t border-black/5">
                                        <a
                                            href={instagramHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram"
                                            className="text-[#111111] hover:text-[#7F00FF] transition-colors"
                                        >
                                            <Instagram size={22} strokeWidth={1.5} />
                                        </a>
                                        <a
                                            href={linkedinHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="LinkedIn"
                                            className="text-[#111111] hover:text-[#7F00FF] transition-colors"
                                        >
                                            <Linkedin size={22} strokeWidth={1.5} />
                                        </a>
                                        <a
                                            href={whatsappHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="WhatsApp"
                                            className="text-[#111111] hover:text-[#7F00FF] transition-colors"
                                        >
                                            <WhatsAppIcon size={22} />
                                        </a>
                                    </div>
                                </div>

                                {/* Form bloku */}
                                <div className="border-t border-black/10 px-6 py-5">
                                    <p className="text-xs text-black/45 font-medium mb-4">
                                        Kısa bir not bırakın; en kısa sürede dönelim.
                                    </p>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <input
                                            type="text"
                                            name="bot-check"
                                            className="hidden"
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />

                                        <div>
                                            <label htmlFor="mobile-name" className="sr-only">Adınız</label>
                                            <input
                                                type="text"
                                                id="mobile-name"
                                                name="name"
                                                required
                                                autoComplete="name"
                                                placeholder="Adınız *"
                                                className="w-full min-h-11 bg-transparent border-0 border-b border-black/20 pb-2.5 text-base text-[#111111] font-medium placeholder-black/35 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mobile-email" className="sr-only">E-posta</label>
                                            <input
                                                type="email"
                                                id="mobile-email"
                                                name="email"
                                                required
                                                autoComplete="email"
                                                placeholder="E-posta *"
                                                className="w-full min-h-11 bg-transparent border-0 border-b border-black/20 pb-2.5 text-base text-[#111111] font-medium placeholder-black/35 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mobile-message" className="sr-only">Mesajınız</label>
                                            <textarea
                                                id="mobile-message"
                                                name="message"
                                                required
                                                rows={3}
                                                placeholder="Mesajınız *"
                                                className="w-full max-h-32 bg-transparent border-0 border-b border-black/20 pb-2.5 text-base text-[#111111] font-medium placeholder-black/35 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors resize-y"
                                            />
                                        </div>

                                        {submitError && (
                                            <p role="alert" className="text-sm text-red-600/90 font-medium" aria-live="polite">
                                                {submitError}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="mt-1 min-h-12 w-full rounded-full bg-[#111111] text-white text-sm font-bold tracking-wide hover:bg-[#7F00FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F00FF]/40 transition-colors disabled:opacity-70 flex justify-center items-center"
                                        >
                                            {isSubmitting ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                    className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                                                />
                                            ) : (
                                                'Talebi Gönder'
                                            )}
                                        </button>
                                        <p className="text-[0.65rem] text-black/40 leading-snug">
                                            Verileriniz{' '}
                                            <Link href="/gizlilik" className="underline hover:text-[#7F00FF] transition-colors">
                                                gizlilik politikamıza
                                            </Link>{' '}
                                            uygun olarak işlenmektedir.
                                        </p>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── MASAÜSTÜ: Mevcut iki sütun (değişmedi) ── */}
            <div className="hidden lg:grid max-w-7xl mx-auto px-12 grid-cols-2 gap-20">
                {/* Sol: Bilgiler */}
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4">
                            İletişime Geçin
                        </p>
                        <h2 className="text-7xl font-black leading-tight tracking-tight text-[#111111] mb-8">
                            Yeni bir hikaye
                            <br />
                            yazalım.
                        </h2>
                    </div>

                    <address className="not-italic flex flex-col gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-[#111111] tracking-wider uppercase mb-2">İletişim</h4>
                            <a
                                href="mailto:hello@beeststudio.com"
                                className="block text-lg text-black/60 hover:text-[#7F00FF] transition-colors duration-300"
                            >
                                hello@beeststudio.com
                            </a>
                            <a
                                href="tel:+905373748454"
                                className="block text-lg text-black/60 hover:text-[#7F00FF] transition-colors duration-300 mt-2"
                            >
                                +90 537 374 84 54
                            </a>
                        </div>
                    </address>

                    <div className="flex items-center gap-6 mt-12">
                        <a
                            href={instagramHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-[#111111] hover:text-[#7F00FF] transition-colors duration-300 hover:-translate-y-1 transform"
                        >
                            <Instagram size={24} strokeWidth={1.5} />
                        </a>
                        <a
                            href={linkedinHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-[#111111] hover:text-[#7F00FF] transition-colors duration-300 hover:-translate-y-1 transform"
                        >
                            <Linkedin size={24} strokeWidth={1.5} />
                        </a>
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="text-[#111111] hover:text-[#7F00FF] transition-colors duration-300 hover:-translate-y-1 transform"
                        >
                            <WhatsAppIcon size={24} />
                        </a>
                    </div>
                </div>

                {/* Sağ: Form */}
                <div className="flex flex-col gap-10 pl-10 border-l border-black/10">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="desktop-success"
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
                                key="desktop-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-10"
                                onSubmit={handleSubmit}
                            >
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
                                    />
                                </div>

                                {submitError && (
                                    <p role="alert" className="text-sm text-red-600/90 font-medium" aria-live="polite">
                                        {submitError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-6 self-start px-10 py-5 rounded-full bg-[#111111] text-white font-bold tracking-wide hover:bg-[#7F00FF] focus:outline-none focus:ring-4 focus:ring-[#7F00FF]/30 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(127,0,255,0.4)] disabled:opacity-70 flex justify-center items-center min-w-[200px]"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                            className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                                        />
                                    ) : (
                                        'Talebi Gönder'
                                    )}
                                </button>
                                <p className="text-xs text-black/40 mt-2">
                                    Verileriniz{' '}
                                    <Link href="/gizlilik" className="underline hover:text-[#7F00FF] transition-colors">
                                        gizlilik politikamıza
                                    </Link>{' '}
                                    uygun olarak işlenmektedir.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
