'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, MoveHorizontal } from 'lucide-react';
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
            'Kurumsal Web Sitesi Kurulumu (5 Sayfa)',
            'Modern ve Mobil Uyumlu Tasarım',
            'Temel SEO ve Entegrasyon',
            'Temel Google İşletme Kurulumları',
            'Yayına Alma ve Teslim Sonrası Destek',
        ],
        detailedFeatures: [
            { title: 'Kurumsal Web Sitesi Kurulumu', desc: 'İşletmenizi en iyi şekilde anlatan, 5 sayfaya kadar profesyonel bir dijital varlık.' },
            { title: 'Modern ve Mobil Uyumlu Tasarım', desc: 'Tüm cihazlarda kusursuz çalışan, modern ve kullanıcı dostu arayüz tasarımı.' },
            { title: 'Temel SEO ve Entegrasyon', desc: 'Google İşletme kaydı ve arama motorlarında bulunabilirliğinizi artıracak temel SEO altyapısı.' },
            { title: 'Temel Google İşletme Kurulumları', desc: 'Web siteniz için gerekli olan temel Google İşletmekurulumlarının yapılması.' },
            { title: 'Temel Teknik Altyapı ve Güvenlik', desc: 'Web sitesinin yayına hazır, güvenli ve stabil çalışması için temel teknik kurulumlar gerçekleştirilir.' },
            { title: 'İletişim ve Kullanıcı Erişimi', desc: 'Ziyaretçilerin firmaya hızlı ve kolay şekilde ulaşabilmesi için temel iletişim kanalları web sitesine entegre edilir.' },
            { title: 'Yayına Alma ve Teslim Sonrası Destek', desc: 'Proje tamamlandıktan sonra web sitesi yayına alınır, gerekli son kontroller yapılır ve kısa dönem hata desteği sağlanır.' },
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
            'Kurumsal Web Sitesi Kurulumu (8-12 Sayfa)',
            'Markaya Özel Premium Arayüz Tasarımı',
            'Teknik SEO Takibi ve Raporlama',
            'Yönetim Paneli ve İçerik Altyapısı',
            'SSS — Sık Sorulan Sorular Altyapısı',
        ],
        detailedFeatures: [
            { title: 'Kurumsal Web Sitesi Kurulumu (8-12 Sayfa)', desc: 'Sınırları ortadan kaldıran çok sayfalı yapı ve ziyaretçileri müşteriye dönüştürmeyi hedefleyen stratejik tasarım.' },
            { title: 'Teknik SEO Takibi ve Raporlama', desc: 'Web sitesinin arama motorları tarafından doğru şekilde taranması, anlaşılması ve uzun vadeli dijital görünürlük kazanması için kapsamlı teknik SEO altyapısı oluşturulur.' },
            { title: 'Yönetim Paneli ve İçerik Altyapısı', desc: 'Web sitesinin sürdürülebilir biçimde yönetilebilmesi için firma ihtiyaçlarına uygun, kullanımı kolay ve ölçeklenebilir içerik yönetim altyapısı sunulur.' },
            { title: 'SSS — Sık Sorulan Sorular altyapısı', desc: 'Kullanıcıların en çok merak ettiği konulara hızlı yanıt bulmasını sağlayan, güven artırıcı ve kullanıcı deneyimini güçlendiren SSS alanı oluşturulur. SEO açısından zengin içerik desteği sağlayarak sayfanın arama görünürlüğünü artırmaya katkı sunar.' },
            { title: 'Google Kurulumları, Ölçümleme ve Performans Takibi', desc: 'Web sitesinin Google ekosistemine doğru şekilde tanıtılması için gerekli kurulumlar yapılır. Bununla birlikte, sitenin ziyaretçi trafiği, kullanıcı davranışları ve dönüşüm performansı izlenebilir hale getirilerek dijital pazarlama süreçleri için ölçülebilir bir altyapı oluşturulur.' },
            { title: 'Teknik Altyapı ve Güvenlik', desc: 'Web sitesinin yayına hazır, güvenli ve stabil çalışması için teknik kurulumlar gerçekleştirilir.' },
            { title: 'İletişim ve Kullanıcı Erişimi', desc: 'Ziyaretçilerin firmaya hızlı ve kolay şekilde ulaşabilmesi için temel iletişim kanalları web sitesine entegre edilir.' },
            { title: 'Performans Takibi ve Temel Strateji Desteği', desc: 'Web sitesinin temel SEO, görünürlük ve performans gelişimini izlemek için düzenli kontrol ve yönlendirme desteği sağlanır.' },
        ],
        isPopular: true,
    },
    {
        name: 'Plus',
        description: 'Dijitalde sektör liderliği ve üst segment marka algısı hedefleyen işletmeler için tasarlanmıştır.',
        price: 'Profesyonel',
        pricingDetails: {
            setupFee: '₺45.000',
            monthlyFee: '₺10.000',
            monthlyDesc: 'İleri Seviye SEO',
        },
        features: [
            'Üst Segment Web Deneyimi',
            'Etkileşimli 3D Deneyim ve Gelişmiş Arayüz',
            'Gelişmiş SEO Mimarisi Kurulumu',
            'Google Ads / Meta Ads Reklam Yönetimi',
            'Blog Sistemi ve Yönetim Paneli',

        ],
        detailedFeatures: [
            { title: 'Üst Segment Web Deneyimi', desc: 'Markanın dijitalde sofistike, dikkat çekici ve güçlü bir ilk izlenim sunmasını sağlayan üst segment web deneyimi tasarlanır.' },
            { title: 'Etkileşimli 3D Deneyim ve Gelişmiş Arayüz', desc: 'Web sitesine daha güçlü, yenilikçi ve akılda kalıcı bir marka deneyimi kazandırmak için 3D sahne kullanımı, görsel kimlik dili ve tasarım sistemi birlikte ele alınır.' },
            { title: 'Gelişmiş SEO Mimarisi Kurulumu', desc: 'Web sitesinin Google’da daha güçlü konumlanabilmesi için ileri teknik SEO, sayfa mimarisi, hizmet yapısı ve içerik stratejisi bütüncül bir sistem olarak kurgulanır.' },
            { title: 'Google Ads / Meta Ads Reklam Yönetimi', desc: 'Google ve Meta platformlarında hedef kitleye uygun reklam kampanyaları kurgulanarak, marka görünürlüğü ve potansiyel müşteri kazanımı desteklenir.' },
            { title: 'Blog Sistemi ve Yönetim Paneli', desc: 'Firmanın web sitesine kolayca blog içerikleri ekleyebilmesi için SEO uyumlu, yönetilebilir bir blog paneli sunulur. Bu yapı, sitenin güncel kalmasını ve organik görünürlüğünün sürdürülebilir şekilde güçlenmesini destekler.' },
            { title: 'SSS — Sık Sorulan Sorular altyapısı', desc: 'Kullanıcıların en çok merak ettiği konulara hızlı yanıt bulmasını sağlayan, güven artırıcı ve kullanıcı deneyimini güçlendiren SSS alanı oluşturulur. SEO açısından zengin içerik desteği sağlayarak sayfanın arama görünürlüğünü artırmaya katkı sunar.' },
            { title: 'Google Kurulumları, Ölçümleme ve Performans Takibi', desc: 'Web sitesinin Google ekosistemine doğru şekilde tanıtılması için gerekli kurulumlar yapılır. Bununla birlikte, sitenin ziyaretçi trafiği, kullanıcı davranışları ve dönüşüm performansı izlenebilir hale getirilerek dijital pazarlama süreçleri için ölçülebilir bir altyapı oluşturulur.' },
            { title: 'Teknik Altyapı ve Güvenlik', desc: 'Web sitesinin yayına hazır, güvenli ve stabil çalışması için teknik kurulumlar gerçekleştirilir.' },
            { title: 'İletişim ve Kullanıcı Erişimi', desc: 'Ziyaretçilerin firmaya hızlı ve kolay şekilde ulaşabilmesi için temel iletişim kanalları web sitesine entegre edilir.' },
            { title: 'Stratejik Büyüme Danışmanlığı ve Premium Hizmet Süreci', desc: 'Markanın dijitalde daha doğru konumlanması, rakiplerinden ayrışması ve organik büyümesini sürdürülebilir hale getirmesi için stratejik danışmanlık, SEO takibi ve öncelikli hizmet süreci sunulur.' },
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
    const scrollRef = useRef<HTMLDivElement>(null);

    const allPackages = [...packages, customPackage];

    const displayPackages = [
        ...allPackages.map((p, i) => ({ ...p, isClone: true, uniqueId: `clone1-${i}` })),
        ...allPackages.map((p, i) => ({ ...p, isClone: false, uniqueId: `original-${i}` })),
        ...allPackages.map((p, i) => ({ ...p, isClone: true, uniqueId: `clone2-${i}` }))
    ] as (PackageType & { isClone: boolean, uniqueId: string })[];

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024 && scrollRef.current) {
            const container = scrollRef.current;
            // <style> tag is children[0]. displayPackages[5] is children[6].
            const premiumCard = container.children[6] as HTMLElement; 
            if (premiumCard) {
                setTimeout(() => {
                    container.scrollLeft = premiumCard.offsetLeft - (window.innerWidth / 2) + (premiumCard.clientWidth / 2);
                }, 100);
            }
        }
    }, []);

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (window.innerWidth >= 1024) return;

        const container = e.currentTarget;
        
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Kullanıcı kaydırmayı bıraktığında teleport işlemini yap (jank oluşmaması için)
        scrollTimeoutRef.current = setTimeout(() => {
            const card0 = container.children[1] as HTMLElement;
            const card4 = container.children[5] as HTMLElement;
            if (!card0 || !card4) return;
            
            // Gerçek set genişliği: 4 kartın aradaki boşluklarla birlikte tam pixel değeri
            const exactSetWidth = card4.offsetLeft - card0.offsetLeft;

            if (container.scrollLeft < exactSetWidth * 0.8) {
                // Snapping mekanizmasını anlık kapatıp pozisyonu değiştiriyoruz ki takılma hissi olmasın
                container.style.scrollSnapType = 'none';
                container.scrollLeft += exactSetWidth;
                requestAnimationFrame(() => {
                    container.style.scrollSnapType = 'x mandatory';
                });
            } else if (container.scrollLeft > exactSetWidth * 1.8) {
                container.style.scrollSnapType = 'none';
                container.scrollLeft -= exactSetWidth;
                requestAnimationFrame(() => {
                    container.style.scrollSnapType = 'x mandatory';
                });
            }
        }, 150);
    };

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
            className="max-lg:!pt-12 max-lg:!mt-4"
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
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory max-lg:scrollbar-hide max-lg:-mx-6 max-lg:px-6 max-lg:pt-6 max-lg:pb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style dangerouslySetInnerHTML={{ __html: `
                        .max-lg\\:scrollbar-hide::-webkit-scrollbar { display: none; }
                    `}} />
                    {displayPackages.map((pkg) => {
                        const isCustom = pkg.name === 'Özel Proje';

                        if (isCustom) {
                            return (
                                <div
                                    key={pkg.uniqueId}
                                    className={`${pkg.isClone ? 'max-lg:flex lg:hidden' : 'lg:col-span-3'} shrink-0 w-[85vw] lg:w-full snap-center snap-always mt-0 lg:mt-4 bg-[#111111] rounded-[1.5rem] p-8 lg:p-12 relative overflow-hidden group shadow-2xl flex flex-col justify-center`}
                                >
                                    {/* Masaüstü için ağır blur efektleri */}
                                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7F00FF]/20 rounded-full blur-[100px] pointer-events-none max-lg:hidden transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7F00FF]/10 rounded-full blur-[80px] pointer-events-none max-lg:hidden transition-transform duration-700 group-hover:scale-110" />
                                    
                                    {/* Mobil performansı için yüksek FPS veren gradient alternatifleri */}
                                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[radial-gradient(circle,rgba(127,0,255,0.15)_0%,transparent_60%)] rounded-full pointer-events-none lg:hidden" />
                                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[radial-gradient(circle,rgba(127,0,255,0.08)_0%,transparent_60%)] rounded-full pointer-events-none lg:hidden" />

                                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                        <div className="max-w-3xl">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#F3F3F3] tracking-tight mb-4">
                                                E-Ticaret & Özel Yazılım<br />
                                                <span className="text-[#7F00FF]">Gereksinimleriniz Mi Var?</span>
                                            </h3>
                                            <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                                                Standart paketlere sığmayan; yüksek dönüşüm odaklı e-ticaret platformları,
                                                mobil uygulamalar ve kurumsal SaaS tabanlı ekosistemlerini &quot;Beest&quot; mühendisliği ve mimari titizliğiyle sıfırdan inşa ediyoruz.
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
                            );
                        }

                        return (
                            <article
                                key={pkg.uniqueId}
                                className={`${pkg.isClone ? 'max-lg:flex lg:hidden' : 'flex'} flex-col shrink-0 w-[85vw] lg:w-auto snap-center snap-always`}
                                style={{
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
                                    if (window.innerWidth < 1024) return;
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = pkg.isPopular
                                        ? '0 20px 40px -10px rgba(127, 0, 255, 0.4)'
                                        : '0 20px 40px -10px rgba(17,17,17,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    if (window.innerWidth < 1024) return;
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = pkg.isPopular
                                        ? '0 10px 30px -10px rgba(127, 0, 255, 0.25)'
                                        : 'none';
                                }}
                            >
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
                        );
                    })}
                </div>

                <div className="flex items-center justify-center gap-2 mt-2 mb-6 text-black/40 lg:hidden pointer-events-none">
                    <MoveHorizontal size={18} className="animate-[pulse_2s_ease-in-out_infinite]" />
                    <span className="text-[0.65rem] font-bold tracking-widest uppercase opacity-70">Tüm paketleri görmek için kaydırın</span>
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
