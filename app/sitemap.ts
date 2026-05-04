import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://beeststudio.com';

async function getBlogSlugs() {
  return client.fetch<{ slug: string; publishedAt: string; updatedAt?: string }[]>(
    `*[_type == "post" && isPublished == true] { "slug": slug.current, publishedAt, updatedAt }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

async function getCategorySlugs() {
  return client.fetch<{ slug: string }[]>(
    `*[_type == "category"] { "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

async function getTagSlugs() {
  return client.fetch<{ slug: string }[]>(
    `*[_type == "tag"] { "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, tags] = await Promise.all([
    getBlogSlugs(),
    getCategorySlugs(),
    getTagSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/neden-biz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/surec`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/hizmetler`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projeler`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/fiyatlandirma`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/kategori/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE_URL}/etiket/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages, ...categoryPages, ...tagPages];
}

