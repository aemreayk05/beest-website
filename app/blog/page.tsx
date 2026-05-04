import type { Metadata } from 'next';
import Image from 'next/image';
import { getPosts, getCategories } from '@/sanity/lib/queries';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPostListItem, Category } from '@/types/blog';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog — Beest Studio | Dijital Pazarlama & Web Tasarım İpuçları',
  description: 'SEO, web tasarımı, dijital pazarlama ve daha fazlası hakkında uzman içerikler. Markanızı büyütecek stratejileri keşfedin.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — Beest Studio',
    description: 'SEO, web tasarımı ve dijital pazarlama alanında uzman içerikler.',
    type: 'website',
    url: '/blog',
  },
};

export default async function BlogPage() {
  const [posts, categories]: [BlogPostListItem[], Category[]] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <main className="bg-[#F3F3F3] min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative w-full pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        {/* Arkaplan Işık Orb */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#7F00FF]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4 block">
            Beest Blog
          </span>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-[-0.03em] text-[#111111] mb-6">
            Dijital dünyayı
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F00FF] to-[#b94fff]">
              keşfediyoruz.
            </span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-black/60 max-w-xl leading-relaxed">
            SEO, web tasarımı, dijital pazarlama ve büyüme stratejileri üzerine derinlemesine yazılar.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        {/* ── KATEGORİ FİLTRELERİ ─────────────────────────────────── */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-16">
            <span className="px-5 py-2 rounded-full bg-[#111111] text-white text-sm font-bold tracking-wide">
              Tümü
            </span>
            {categories.map((cat) => (
              <a
                key={cat._id}
                href={`/kategori/${cat.slug.current}`}
                className="px-5 py-2 rounded-full border border-black/10 text-[#111111] text-sm font-bold tracking-wide hover:border-[#7F00FF] hover:text-[#7F00FF] transition-colors duration-300"
              >
                {cat.title}
              </a>
            ))}
          </div>
        )}

        {/* ── ÖNCÜLENEN YAZILAR ─────────────────────────────────── */}
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[2px] bg-[#7F00FF]" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF]">
                Öne Çıkan Yazılar
              </span>
            </div>

            {/* Hero Öne Çıkan (İlk kart büyük) */}
            {featuredPosts[0] && (
              <a
                href={`/blog/${featuredPosts[0].slug.current}`}
                className="group relative flex flex-col lg:flex-row gap-0 w-full bg-white rounded-[2rem] overflow-hidden mb-8 transition-transform duration-500 hover:-translate-y-1"
                style={{ boxShadow: '0 10px 60px -10px rgba(127,0,255,0.12)' }}
              >
                <div className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto lg:min-h-[400px]">
                  {featuredPosts[0].coverImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={featuredPosts[0].coverImage}
                        alt={featuredPosts[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#EDE8F5] to-[#D9CCF0]" />
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12 lg:w-[45%]">
                  <span className="inline-block px-3 py-1 text-[0.65rem] font-bold tracking-wider uppercase rounded-full border border-[#7F00FF]/20 text-[#7F00FF] bg-[#7F00FF]/5 w-fit mb-4">
                    {featuredPosts[0].category.title}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-[#111111] group-hover:text-[#7F00FF] transition-colors duration-300 mb-4">
                    {featuredPosts[0].title}
                  </h2>
                  <p className="text-base font-medium text-black/60 leading-relaxed mb-8">
                    {featuredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#7F00FF]">
                      Devamını Oku
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 13L13 1M13 1H4M13 1V10" stroke="#7F00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </a>
            )}

            {/* Geri kalan öne çıkanlar (küçük grid) */}
            {featuredPosts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.slice(1).map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── TÜM YAZILAR ─────────────────────────────────────────── */}
        {regularPosts.length > 0 ? (
          <section>
            {featuredPosts.length > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[2px] bg-[#111111]" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#111111]/60">
                  Tüm Yazılar
                </span>
              </div>
            )}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none m-0 p-0">
              {regularPosts.map((post) => (
                <li key={post._id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          </section>
        ) : posts.length === 0 ? (
          /* ── BOŞ DURUM ─────────────────────────────────────────── */
          <div className="text-center py-32">
            <div className="w-16 h-16 rounded-full bg-[#7F00FF]/10 flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#7F00FF" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-[#111111] mb-3">Henüz yazı yok</h2>
            <p className="text-black/50 text-base font-medium">
              Yakında burada değerli içerikler paylaşılacak. Takipte kalın!
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
