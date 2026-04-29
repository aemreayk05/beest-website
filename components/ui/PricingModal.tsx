'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type PackageType = {
    name: string;
    price: string;
    pricingDetails?: {
        setupFee: string;
        monthlyFee?: string;
        monthlyDesc?: string;
    };
    description: string;
    features: string[];
    detailedFeatures: { title: string; desc: string }[];
    isPopular?: boolean;
};

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
    pkg: PackageType | null;
    onNext?: () => void;
    onPrev?: () => void;
}

export default function PricingModal({ isOpen, onClose, pkg, onNext, onPrev }: PricingModalProps) {
    // Scroll lock & Lenis Pause
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (window.__lenis) window.__lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (window.__lenis) window.__lenis.start();
        }
        return () => {
            document.body.style.overflow = '';
            if (window.__lenis) window.__lenis.start();
        };
    }, [isOpen]);

    // Handle ESC and Arrow keys
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && onNext) onNext();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset success state when package changes
    useEffect(() => {
        setIsSuccess(false);
    }, [pkg]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            details: formData.get('details'),
            honeypot: formData.get('bot-check'), // Spam bot protection
            packageName: pkg?.name,
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
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                }, 3000);
            } else {
                console.error('Form gönderim hatası');
            }
        } catch (error) {
            console.error('Ağ hatası:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && pkg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pb-24 sm:p-6 sm:pb-24 lg:p-12">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Desktop Nav Buttons (Outside Modal) */}
                    {onPrev && (
                        <button onClick={onPrev} className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center backdrop-blur-sm transition-all shadow-lg border border-white/20 hover:scale-105" aria-label="Önceki Paket">
                            <ChevronLeft size={28} />
                        </button>
                    )}
                    {onNext && (
                        <button onClick={onNext} className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center backdrop-blur-sm transition-all shadow-lg border border-white/20 hover:scale-105" aria-label="Sonraki Paket">
                            <ChevronRight size={28} />
                        </button>
                    )}

                    {/* Mobile Nav Pill (Outside Modal) */}
                    <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center bg-[#111111] text-white p-1 rounded-full shadow-2xl border border-white/20">
                        {onPrev && (
                            <button onClick={onPrev} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                <ChevronLeft size={22} />
                            </button>
                        )}
                        <span className="text-[0.7rem] font-bold px-4 tracking-[0.18em] uppercase text-[#7F00FF] whitespace-nowrap">
                            {pkg.name}
                        </span>
                        {onNext && (
                            <button onClick={onNext} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                <ChevronRight size={22} />
                            </button>
                        )}
                    </div>

                    {/* Modal Content - Split Screen Architecture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                        className="relative w-full max-w-6xl bg-[#F3F3F3] rounded-3xl overflow-hidden shadow-2xl flex max-h-[90vh] lg:max-h-[85vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-30 text-[#F3F3F3] lg:text-[#111111] hover:text-[#7F00FF] lg:hover:text-[#7F00FF] transition-colors p-2 rounded-full bg-white/10 lg:bg-black/5 hover:bg-white/20 lg:hover:bg-black/10 backdrop-blur-sm"
                            aria-label="Kapat"
                        >
                            <X size={24} />
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={pkg.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col lg:flex-row w-full flex-1 overflow-y-auto lg:overflow-hidden"
                                data-lenis-prevent="true"
                            >
                                {/* LEFT: Package Details (Scrollable) */}
                                <div 
                                    className="w-full lg:w-[45%] lg:h-full bg-[#111111] text-[#F3F3F3] p-8 lg:p-12 lg:overflow-y-auto custom-scrollbar"
                                    data-lenis-prevent="true"
                                >
                            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-2 block">
                                SİZE ÖZEL
                            </span>
                            <h2 className="text-3xl lg:text-5xl font-black mb-4 tracking-tight">
                                {pkg.name} <span className="text-[#7F00FF]">Paketi</span>
                            </h2>
                            <p className="text-white/60 mb-10 leading-relaxed">
                                {pkg.description}
                            </p>

                            {/* Fiyat Özeti Kartı */}
                            {pkg.pricingDetails && (
                                <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-lg backdrop-blur-sm">
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Kurulum / Tek Seferlik</p>
                                        <p className="text-3xl md:text-4xl font-black text-white tracking-tight">{pkg.pricingDetails.setupFee}</p>
                                    </div>
                                    {pkg.pricingDetails.monthlyFee && (
                                        <div className="sm:text-right">
                                            <p className="text-xs text-[#7F00FF] uppercase tracking-widest font-bold mb-1">{pkg.pricingDetails.monthlyDesc || 'Aylık Ödeme'}</p>
                                            <p className="text-3xl md:text-4xl font-black text-[#7F00FF] tracking-tight">{pkg.pricingDetails.monthlyFee}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-6">
                                {pkg.detailedFeatures.map((feat, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="w-6 h-6 rounded-full bg-[#7F00FF]/20 flex items-center justify-center">
                                                <Check size={14} className="text-[#7F00FF]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{feat.title}</h4>
                                            <p className="text-sm text-white/50 leading-relaxed">
                                                {feat.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                                {/* RIGHT: Quote Form (Scrollable) */}
                                <div 
                                    className="w-full lg:w-[55%] lg:h-full bg-[#F3F3F3] p-8 lg:p-12 lg:overflow-y-auto"
                                    data-lenis-prevent="true"
                                >
                                    <div className="mb-8">
                                <h3 className="text-2xl lg:text-3xl font-black text-[#111111] tracking-tight mb-2">
                                    {pkg.name === 'Özel Proje' ? 'Projeyi Hayata Geçirelim' : 'Teklif Talebi Oluşturun'}
                                </h3>
                                <p className="text-[#111111]/60 text-sm">
                                    {pkg.name === 'Özel Proje' 
                                        ? 'Gereksinimlerinizden ve hayalinizdeki projeden kısaca bahsedin, mimarlarımız en kısa sürede sizinle iletişime geçsin.'
                                        : <>Seçtiğiniz <strong>{pkg.name}</strong> paketi için formu doldurun, en kısa sürede ekibimiz sizinle iletişime geçsin.</>
                                    }
                                </p>
                            </div>

                            {isSuccess ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center text-center py-20"
                                >
                                    <div className="w-20 h-20 bg-[#7F00FF]/10 text-[#7F00FF] flex justify-center items-center rounded-full mb-6">
                                        <Check size={40} strokeWidth={3} />
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2 text-[#111111]">Talebiniz Alındı</h4>
                                    <p className="text-[#111111]/60">Size çok yakında harika haberlerle dönüş yapacağız.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                    {/* HONEYPOT - Güvenlik (Botlar İçin) */}
                                    <input type="text" name="bot-check" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

                                    <div className="relative group">
                                        <label htmlFor="modal-name" className="sr-only">Adınız Soyadınız</label>
                                        <input
                                            type="text"
                                            id="modal-name"
                                            name="name"
                                            required
                                            placeholder="Adınız Soyadınız *"
                                            className="w-full bg-transparent border-0 border-b border-black/20 pb-3 text-lg md:text-xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <label htmlFor="modal-email" className="sr-only">E-posta Adresiniz</label>
                                        <input
                                            type="email"
                                            id="modal-email"
                                            name="email"
                                            required
                                            placeholder="E-posta Adresiniz *"
                                            className="w-full bg-transparent border-0 border-b border-black/20 pb-3 text-lg md:text-xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <label htmlFor="modal-phone" className="sr-only">Telefon Numaranız</label>
                                        <input
                                            type="tel"
                                            id="modal-phone"
                                            name="phone"
                                            placeholder="Telefon Numaranız (Opsiyonel)"
                                            className="w-full bg-transparent border-0 border-b border-black/20 pb-3 text-lg md:text-xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <label htmlFor="modal-details" className="sr-only">Proje Detayları</label>
                                        <textarea
                                            id="modal-details"
                                            name="details"
                                            rows={3}
                                            required
                                            placeholder="Projenizden veya işletmenizden kısaca bahsedin *"
                                            className="w-full bg-transparent border-0 border-b border-black/20 pb-3 text-lg md:text-xl text-[#111111] font-medium placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[#7F00FF] transition-colors duration-300 resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-4 px-8 py-4 rounded-full bg-[#111111] text-white font-bold tracking-wide hover:bg-[#7F00FF] focus:outline-none transition-all duration-300 shadow-xl disabled:opacity-70 flex justify-center items-center"
                                    >
                                        {isSubmitting ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                                            />
                                        ) : (
                                            "Gönder"
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
