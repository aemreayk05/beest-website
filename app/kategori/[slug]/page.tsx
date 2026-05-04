import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategoryBySlug, getPostsByCategory } from '@/sanity/lib/queries';
import BlogCard from '@/components/blog/BlogCard';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};

  const title = category.seoTitle || category.title;
  const description = category.seoDescription || category.description || `${category.title} kategorisindeki tüm blog yazıları.`;

  return {
    title: `${title} — Beest Studio Blog`,
    description,
    alternates: { canonical: `/kategori/${params.slug}` },
    openGraph: { title, description, type: 'website' },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, posts] = await Promise.all([
    getCategoryBySlug(params.slug),
    getPostsByCategory(params.slug),
  ]);

  if (!category) notFound();

  return (
    <main className="bg-[#F3F3F3] min-h-screen">
      {/* ── BAŞLIK ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16">
        <nav className="flex items-center gap-2 text-xs font-semibold text-black/40 mb-8 flex-wrap">
          <a href="/" className="hover:text-[#7F00FF] transition-colors">Ana Sayfa</a>
          <span className="text-black/20">/</span>
          <a href="/blog" className="hover:text-[#7F00FF] transition-colors">Blog</a>
          <span className="text-black/20">/</span>
          <span className="text-[#111111]">{category.title}</span>
        </nav>

        <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4 block">
          Kategori
        </span>
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.03em] text-[#111111] mb-4">
          {category.title}
        </h1>
        {category.description && (
          <p className="text-lg font-medium text-black/60 max-w-xl leading-relaxed">
            {category.description}
          </p>
        )}

        <div className="w-16 h-[3px] bg-[#7F00FF] rounded-full mt-8 shadow-[0_0_15px_rgba(127,0,255,0.4)]" />
      </section>

      {/* ── YAZI LİSTESİ ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        {posts.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none m-0 p-0">
            {posts.map((post) => (
              <li key={post._id}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-32">
            <div className="w-16 h-16 rounded-full bg-[#7F00FF]/10 flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#7F00FF" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-[#111111] mb-3">Bu kategoride henüz yazı yok</h2>
            <p className="text-black/50 text-base font-medium mb-8">Yakında burada içerikler eklenecek.</p>
            <a
              href="/blog"
              className="inline-block px-8 py-4 rounded-full bg-[#7F00FF] text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_8px_24px_-8px_rgba(127,0,255,0.4)]"
            >
              Tüm Yazılara Dön
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
