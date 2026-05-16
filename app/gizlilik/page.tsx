import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası | Beest Studio',
    description: 'Beest Studio gizlilik politikası ve kişisel verilerin korunması.',
    robots: { index: true, follow: true },
};

const LAST_UPDATED = '16 Mayıs 2026';

export default function GizlilikPage() {
    return (
        <main className="bg-dirty-white min-h-screen pt-28 pb-20 px-6">
            <article className="max-w-3xl mx-auto">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-neon-purple mb-4">
                    Yasal
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-jet-black tracking-tight">
                    Gizlilik Politikası
                </h1>
                <p className="mt-2 text-sm text-black/45">Son güncelleme: {LAST_UPDATED}</p>

                <div className="mt-10 space-y-8 text-base text-black/70 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">1. Veri sorumlusu</h2>
                        <p>
                            Bu politika, Beest Studio (&quot;biz&quot;) tarafından işletilen{' '}
                            <Link href="/" className="text-neon-purple hover:underline">
                                beeststudio.com
                            </Link>{' '}
                            web sitesi ve iletişim kanalları için geçerlidir. Sorularınız için:{' '}
                            <a href="mailto:hello@beeststudio.com" className="text-neon-purple hover:underline">
                                hello@beeststudio.com
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">2. Toplanan veriler</h2>
                        <p>
                            İletişim formları aracılığıyla ad, e-posta, telefon (isteğe bağlı), mesaj içeriği ve
                            seçtiğiniz paket bilgisi toplanabilir. Teknik olarak IP adresi, tarayıcı türü ve
                            çerez verileri otomatik işlenebilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">3. Kullanım amaçları</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Talebinize yanıt vermek ve teklif sürecini yürütmek</li>
                            <li>Hizmet kalitesini artırmak ve güvenliği sağlamak</li>
                            <li>Yasal yükümlülükleri yerine getirmek</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">4. Saklama ve paylaşım</h2>
                        <p>
                            Verileriniz yalnızca gerekli süre boyunca saklanır. E-posta gönderimi için SMTP
                            sağlayıcıları, barındırma için hosting sağlayıcıları ve (yapılandırıldıysa) bildirim
                            servisleriyle paylaşılabilir. Verileriniz üçüncü taraflara satılmaz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">5. Haklarınız</h2>
                        <p>
                            KVKK kapsamında erişim, düzeltme, silme ve itiraz haklarınızı kullanmak için{' '}
                            <a href="mailto:hello@beeststudio.com" className="text-neon-purple hover:underline">
                                hello@beeststudio.com
                            </a>{' '}
                            adresine yazabilirsiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">6. Çerezler</h2>
                        <p>
                            Site deneyimini iyileştirmek için zorunlu ve analitik çerezler kullanılabilir.
                            Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
                        </p>
                    </section>
                </div>

                <Link
                    href="/"
                    className="mt-12 inline-flex min-h-11 items-center text-sm font-bold text-neon-purple hover:underline"
                >
                    ← Ana sayfaya dön
                </Link>
            </article>
        </main>
    );
}
