'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PricingModal, { PackageType } from '../ui/PricingModal';

const packages: PackageType[] = [
    {
        name: 'Basic',
        description: 'Dijital dünyada profesyonel bir başlangıç yapmak isteyen işletmeler için.',
        price: 'Başlangıç',
        pricingDetails: {
            setupFee: '₺15.000',
        },
        features: [
            '5 sayfaya kadar kurumsal web sitesi',
            'Mobil uyumlu modern tasarım',
            'Temel SEO altyapısı',
            'Google İşletme entegrasyonları',
            'Yayına alma ve temel teslim sonrası destek',
        ],
        detailedFeatures: [
            { title: 'Kurumsal Web Sitesi', desc: 'İşletmenizi en iyi şekilde anlatan, 5 sayfaya kadar profesyonel bir dijital varlık.' },
            { title: 'Modern ve Mobil Uyumlu', desc: 'Tüm cihazlarda kusursuz çalışan, modern ve kullanıcı dostu arayüz tasarımı.' },
            { title: 'SEO ve Entegrasyon', desc: 'Google İşletme kaydı ve arama motorlarında bulunabilirliğinizi artıracak temel SEO altyapısı.' },
            { title: 'Destek ve İletişim', desc: 'Müşterilerinizin size kolayca ulaşmasını sağlayan form ve teslimat sonrası temel teknik destek.' },
        ],
        isPopular: false,
    },
    {
        name: 'Premium',
        description: 'Web sitesini müşteri kazanan güçlü bir dijital kanala dönüştürmek isteyen işletmeler için.',
        price: 'Tavsiye Edilen',
        pricingDetails: {
            setupFee: '₺25.000',
            monthlyFee: '₺5.000',
            monthlyDesc: 'Aylık SEO Ödemesi',
        },
        features: [
            'Basic pakette yer alan tüm hizmetler',
            'Çok sayfalı, gelişmiş kurumsal web sitesi',
            'Yönetim paneli',
            'SSS — Sık Sorulan Sorular altyapısı',
            'Aylık SEO çalışması ve anahtar kelime takibi',
        ],
        detailedFeatures: [
            { title: 'Gelişmiş Web Sitesi', desc: 'Sınırları ortadan kaldıran çok sayfalı yapı ve ziyaretçileri müşteriye dönüştürmeyi hedefleyen stratejik tasarım.' },
            { title: 'Kolay İçerik Yönetimi', desc: 'Sitenizdeki metin ve görselleri kimseye ihtiyaç duymadan güncelleyebileceğiniz kullanıcı dostu panel.' },
            { title: 'Aktif SEO Çalışması', desc: 'Sektörünüzdeki anahtar kelimelerde üst sıralara çıkmanız için düzenli SEO takibi ve optimizasyon.' },
            { title: 'Genişletilmiş Altyapı', desc: 'Kullanıcıların aklındaki soruları yanıtlayan SSS bölümü ve genişletilebilir sayfa mimarisi.' },
        ],
        isPopular: true,
    },
    {
        name: 'Plus',
        description: 'Premium bir dijital deneyim sunmak ve uzun vadeli dijital büyüme hedefleyen işletmeler için.',
        price: 'Profesyonel',
        pricingDetails: {
            setupFee: '₺45.000',
            monthlyFee: '₺10.000',
            monthlyDesc: 'İleri Seviye SEO',
        },
        features: [
            'Premium pakette yer alan tüm hizmetler',
            '3D model destekli etkileyici web deneyimi',
            'Logo ve görsel marka kimliği desteği',
            'İleri seviye SEO mimarisi ve içerik stratejisi',
            'Blog sistemi altyapısı',
        ],
        detailedFeatures: [
            { title: 'Premium Arayüz ve 3D', desc: 'Markanıza tamamen özgün, ziyaretçiyi büyüleyen 3D animasyonlu "Swiss-Style" lüks tasarım.' },
            { title: 'Marka Kimliği Desteği', desc: 'Logo tasarımı ve kurumsal kimliğinizi yansıtan modern görsel materyallerin oluşturulması.' },
            { title: 'İleri Seviye Strateji', desc: 'Rakiplerinizi analiz ederek hazırlanan kapsamlı SEO mimarisi ve etkili içerik planlaması.' },
            { title: 'Blog Ekosistemi', desc: 'Sektörel otoritenizi artıracak ve organik trafiğinizi büyütecek gelişmiş blog altyapısı.' },
        ],
        isPopular: false,
    },
];

const customPackage: PackageType = {
    name: 'Özel Proje',
    price: 'Özel Bütçelendirme',
    description: 'E-Ticaret platformları, mobil uygulamalar veya sadece size has geliştirilen kompleks yazılım ekosistemleri.',
    features: [],
    detailedFeatures: [
        { title: 'E-Ticaret & Pazaryeri', desc: 'Binlerce ürünü, sepeti ve kargo süreçlerini sorunsuz yöneten, dönüşüm (satış) odaklı e-ticaret altyapıları.' },
        { title: 'Mobil Uygulama (iOS/Android)', desc: 'İşletmenizi veya girişiminizi kullanıcıların cebine taşıyan, kusursuz çalışan yerel (native) uygulamalar.' },
        { title: 'Özel API Entegrasyonları', desc: 'Muhasebe programlarınız, ERP sistemleriniz veya üçüncü taraf servislerle çift yönlü haberleşen mimariler.' },
        { title: 'SaaS & Web Platformları', desc: 'Kullanıcı panelli, üyelik sistemli ve size özgü iş kurallarını barındıran web portalı çözümleri.' },
    ],
    isPopular: false,
};

export default function Pricing() {
    const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);

    const allPackages = [...packages, customPackage];

    const handleNext = () => {
        if (!selectedPackage) return;
        const currentIndex = allPackages.findIndex(p => p.name === selectedPackage.name);
        const nextIndex = (currentIndex + 1) % allPackages.length;
        setSelectedPackage(allPackages[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedPackage) return;
        const currentIndex = allPackages.findIndex(p => p.name === selectedPackage.name);
        const prevIndex = (currentIndex - 1 + allPackages.length) % allPackages.length;
        setSelectedPackage(allPackages[prevIndex]);
    };

    return (
        <section
            id="pricing"
            style={{
                width: '100%',
                padding: '8rem 1.5rem',
                backgroundColor: '#F3F3F3', // Dirty White
            }}
            aria-label="Hizmet Paketleri"
        >
            <div
                style={{
                    maxWidth: '80rem',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* ── Üst Bilgi (Header) ── */}
                <div
                    style={{
                        marginBottom: '4rem',
                        textAlign: 'center',
                    }}
                >
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: '#7F00FF',
                            marginBottom: '1rem',
                        }}
                    >
                        HIZMET PAKETLERI
                    </span>
                    <h2
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            color: '#111111',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                        }}
                    >
                        Net Vizyon, <span style={{ color: '#7F00FF' }}>Şeffaf Çözümler</span>.
                    </h2>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {packages.map((pkg, index) => (
                        <article
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '2.5rem',
                                backgroundColor: pkg.isPopular ? '#111111' : '#F3F3F3',
                                border: pkg.isPopular ? '2px solid #7F00FF' : '1px solid rgba(17,17,17,0.1)',
                                borderRadius: '1rem',
                                color: pkg.isPopular ? '#F3F3F3' : '#111111',
                                boxShadow: pkg.isPopular ? '0 10px 30px -10px rgba(127, 0, 255, 0.25)' : 'none',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                                (e.currentTarget as HTMLElement).style.boxShadow = pkg.isPopular
                                    ? '0 20px 40px -10px rgba(127, 0, 255, 0.4)'
                                    : '0 20px 40px -10px rgba(17,17,17,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                (e.currentTarget as HTMLElement).style.boxShadow = pkg.isPopular
                                    ? '0 10px 30px -10px rgba(127, 0, 255, 0.25)'
                                    : 'none';
                            }}
                        >
                            {/* Popüler Etiketi (Eğer varsa) */}
                            {pkg.isPopular && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-14px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: '#7F00FF',
                                        color: '#ffffff',
                                        padding: '0.25rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    En Çok Tercih Edilen
                                </div>
                            )}

                            {/* Paket Başı */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                                    {pkg.name}
                                </h3>
                                <p style={{ fontSize: '0.875rem', opacity: 0.7, minHeight: '3rem' }}>
                                    {pkg.description}
                                </p>
                            </div>

                            <div style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 900 }}>
                                {pkg.price}
                            </div>

                            {/* Özellikler Listesi */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1, marginBottom: '2.5rem' }}>
                                {pkg.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            marginBottom: '1rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        <Check
                                            size={18}
                                            color="#7F00FF"
                                            style={{ flexShrink: 0, marginTop: '0.1rem' }}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Eylem Çağrısı Butonu */}
                            <button
                                onClick={() => setSelectedPackage(pkg)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: pkg.name === 'Premium' ? '#7F00FF' : 'transparent',
                                    color: pkg.name === 'Premium' ? '#ffffff' : '#111111',
                                    border: pkg.name === 'Premium' ? 'none' : '1px solid rgba(17,17,17,0.2)',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease, border-color 0.2s',
                                    gap: '0.25rem',
                                }}
                                onMouseEnter={(e) => {
                                    if (pkg.name !== 'Premium') {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#111111';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (pkg.name !== 'Premium') {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(17,17,17,0.2)';
                                    }
                                }}
                            >
                                <span style={{ fontWeight: 800, fontSize: '1.125rem' }}>
                                    Paketi İncele
                                </span>
                            </button>
                        </article>
                    ))}
                </div>

                {/* ── Enterprise / Custom Project Banner ── */}
                <div
                    className="mt-12 w-full bg-[#111111] rounded-[1.5rem] p-8 lg:p-12 relative overflow-hidden group shadow-2xl"
                >
                    {/* Arkaplan dekor parlaması */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7F00FF]/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7F00FF]/10 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="max-w-3xl">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#F3F3F3] tracking-tight mb-4">
                                E-Ticaret & Özel Yazılım<br />
                                <span className="text-[#7F00FF]">Gereksinimleriniz Mi Var?</span>
                            </h3>
                            <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                                Standart paketlere sığmayan; yüksek dönüşüm odaklı e-ticaret platformları,
                                {'mobil uygulamalar ve kurumsal SaaS tabanlı ekosistemlerini "Beest" mühendisliği ve mimari titizliğiyle sıfırdan inşa ediyoruz.'}
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <button
                                onClick={() => setSelectedPackage(customPackage)}
                                className="px-8 py-5 rounded-full bg-[#7F00FF] text-white font-bold tracking-wide hover:bg-white hover:text-[#111111] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(127,0,255,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1 transform whitespace-nowrap"
                            >
                                Özel Proje Görüşmesi Ayarla
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <PricingModal
                isOpen={selectedPackage !== null}
                onClose={() => setSelectedPackage(null)}
                pkg={selectedPackage}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </section>
    );
}
