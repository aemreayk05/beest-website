import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getPostBySlug, getPosts } from '@/sanity/lib/queries';
import PortableTextRenderer from '@/components/blog/PortableTextRenderer';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogCTA from '@/components/blog/BlogCTA';

export const revalidate = 3600;

// ── Statik param üretimi (ISR/SSG) ─────────────────────────────────
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

// ── Dynamic Metadata ────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beeststudio.com';
  const canonicalUrl = post.canonicalUrl || `${siteUrl}/blog/${post.slug.current}`;
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const ogImageUrl = post.ogImage || post.coverImage;

  return {
    title: `${title} | Beest Studio Blog`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

// ── Ana sayfa bileşeni ──────────────────────────────────────────────
export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beeststudio.com';
  const canonicalUrl = post.canonicalUrl || `${siteUrl}/blog/${post.slug.current}`;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  // JSON-LD: BlogPosting Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Beest Studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Beest Studio',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/beest_logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  // JSON-LD: BreadcrumbList Schema
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <main className="bg-[#F3F3F3] min-h-screen">
        {/* ── BREADCRUMB ──────────────────────────────────────────── */}
        <nav className="max-w-4xl mx-auto px-6 lg:px-12 pt-28 pb-0" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-semibold text-black/40 flex-wrap list-none m-0 p-0">
            <li><a href="/" className="hover:text-[#7F00FF] transition-colors">Ana Sayfa</a></li>
            <li><span className="text-black/20">/</span></li>
            <li><a href="/blog" className="hover:text-[#7F00FF] transition-colors">Blog</a></li>
            <li><span className="text-black/20">/</span></li>
            <li><a href={`/kategori/${post.category.slug.current}`} className="hover:text-[#7F00FF] transition-colors">{post.category.title}</a></li>
            <li><span className="text-black/20">/</span></li>
            <li className="text-[#111111] line-clamp-1">{post.title}</li>
          </ol>
        </nav>

        {/* ── BAŞLIK ALANI ────────────────────────────────────────── */}
        <header className="max-w-4xl mx-auto px-6 lg:px-12 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <a
              href={`/kategori/${post.category.slug.current}`}
              className="px-3 py-1 text-[0.65rem] font-bold tracking-wider uppercase rounded-full border border-[#7F00FF]/30 text-[#7F00FF] bg-[#7F00FF]/5 hover:bg-[#7F00FF]/10 transition-colors"
            >
              {post.category.title}
            </a>
            <span className="text-xs font-semibold text-black/40">
              {formattedDate} {post.readingTime && `• ${post.readingTime} dk okuma`}
            </span>
          </div>

          <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#111111] mb-6">
            {post.title}
          </h1>

          <p className="text-xl font-medium text-black/60 leading-relaxed mb-10">
            {post.excerpt}
          </p>

          {/* Yazar Bilgisi */}
          {post.author && (
            <div className="flex items-center gap-4 pb-10 border-b border-black/10">
              {post.author.image ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7F00FF] to-[#b94fff] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-lg">{post.author.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="font-bold text-[#111111] text-sm">{post.author.name}</p>
                {post.author.role && (
                  <p className="text-xs font-medium text-black/40">{post.author.role}</p>
                )}
              </div>
            </div>
          )}
        </header>

        {/* ── KAPAK GÖRSELİ ───────────────────────────────────────── */}
        {post.coverImage && (
          <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-16">
            <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
        )}

        {/* ── MAKALE İÇERİĞİ ──────────────────────────────────────── */}
        <article className="max-w-4xl mx-auto px-6 lg:px-12 pb-8">
          <PortableTextRenderer value={post.content} />
        </article>

        {/* ── ETİKETLER ───────────────────────────────────────────── */}
        {post.tags && post.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 border-t border-black/10">
            <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
              {post.tags.map((tag) => (
                <li key={tag._id}>
                  <a
                    href={`/etiket/${tag.slug.current}`}
                    className="px-4 py-2 rounded-full text-xs font-bold border border-black/10 text-[#111111]/60 hover:border-[#7F00FF] hover:text-[#7F00FF] transition-colors duration-300"
                  >
                    #{tag.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── BLOG CTA ────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <BlogCTA />
        </div>

        {/* ── İLGİLİ YAZILAR ──────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
          <RelatedPosts
            categorySlug={post.category.slug.current}
            currentPostId={post._id}
          />
        </div>
      </main>
    </>
  );
}
