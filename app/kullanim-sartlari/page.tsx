import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Kullanım Şartları | Beest Studio',
    description: 'Beest Studio web sitesi kullanım şartları.',
    robots: { index: true, follow: true },
};

const LAST_UPDATED = '16 Mayıs 2026';

export default function KullanimSartlariPage() {
    return (
        <main className="bg-dirty-white min-h-screen pt-28 pb-20 px-6">
            <article className="max-w-3xl mx-auto">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-neon-purple mb-4">
                    Yasal
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-jet-black tracking-tight">
                    Kullanım Şartları
                </h1>
                <p className="mt-2 text-sm text-black/45">Son güncelleme: {LAST_UPDATED}</p>

                <div className="mt-10 space-y-8 text-base text-black/70 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">1. Kabul</h2>
                        <p>
                            Bu siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. Kabul etmiyorsanız
                            lütfen siteyi kullanmayınız.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">2. Hizmet kapsamı</h2>
                        <p>
                            Sitede yer alan içerikler bilgilendirme amaçlıdır. Paket fiyatları, kapsamlar ve
                            teslim süreleri ön bilgi niteliğindedir; nihai teklif yazılı sözleşme ile belirlenir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">3. Fikri mülkiyet</h2>
                        <p>
                            Metin, görsel, logo ve tasarımlar Beest Studio&apos;ya aittir. İzinsiz kopyalama,
                            çoğaltma veya ticari kullanım yasaktır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">4. Kullanıcı yükümlülükleri</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Formlarda doğru ve güncel bilgi vermek</li>
                            <li>Siteyi yasa dışı veya zararlı amaçlarla kullanmamak</li>
                            <li>Otomatik bot veya spam faaliyetlerinde bulunmamak</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">5. Sorumluluk sınırı</h2>
                        <p>
                            Site &quot;olduğu gibi&quot; sunulur. Kesintisiz veya hatasız erişim garanti edilmez.
                            Dolaylı zararlardan sorumluluk kabul edilmez; yasal zorunlu haller saklıdır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-jet-black mb-3">6. Değişiklikler ve iletişim</h2>
                        <p>
                            Bu şartları güncelleyebiliriz. Güncel metin bu sayfada yayımlanır. Sorular için:{' '}
                            <a href="mailto:hello@beeststudio.com" className="text-neon-purple hover:underline">
                                hello@beeststudio.com
                            </a>
                            . Kişisel veriler için{' '}
                            <Link href="/gizlilik" className="text-neon-purple hover:underline">
                                Gizlilik Politikası
                            </Link>{' '}
                            geçerlidir.
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
