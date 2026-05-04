import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTagBySlug, getPostsByTag } from '@/sanity/lib/queries';
import BlogCard from '@/components/blog/BlogCard';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug);
  if (!tag) return {};

  const description = tag.description || `"${tag.title}" etiketiyle işaretlenmiş tüm blog yazıları.`;

  return {
    title: `#${tag.title} — Beest Studio Blog`,
    description,
    alternates: { canonical: `/etiket/${params.slug}` },
    openGraph: { title: `#${tag.title}`, description, type: 'website' },
  };
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const [tag, posts] = await Promise.all([
    getTagBySlug(params.slug),
    getPostsByTag(params.slug),
  ]);

  if (!tag) notFound();

  return (
    <main className="bg-[#F3F3F3] min-h-screen">
      {/* ── BAŞLIK ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16">
        <nav className="flex items-center gap-2 text-xs font-semibold text-black/40 mb-8 flex-wrap">
          <a href="/" className="hover:text-[#7F00FF] transition-colors">Ana Sayfa</a>
          <span className="text-black/20">/</span>
          <a href="/blog" className="hover:text-[#7F00FF] transition-colors">Blog</a>
          <span className="text-black/20">/</span>
          <span className="text-[#111111]">#{tag.title}</span>
        </nav>

        <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4 block">
          Etiket
        </span>
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.03em] text-[#111111] mb-4">
          #{tag.title}
        </h1>
        {tag.description && (
          <p className="text-lg font-medium text-black/60 max-w-xl leading-relaxed">
            {tag.description}
          </p>
        )}

        <div className="w-16 h-[3px] bg-[#7F00FF] rounded-full mt-8 shadow-[0_0_15px_rgba(127,0,255,0.4)]" />
      </section>

      {/* ── YAZI LİSTESİ ─────────────────────────── */}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 10V5a2 2 0 012-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-[#111111] mb-3">Bu etikette henüz yazı yok</h2>
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
