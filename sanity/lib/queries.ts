import { client } from './client';
import { BlogPost, BlogPostListItem, Category, Tag } from '@/types/blog';

// Geliştirme modunda cache devre dışı, production'da 1 saatlik ISR
const REVALIDATE = process.env.NODE_ENV === 'development' ? 0 : 3600;

export async function getPosts(): Promise<BlogPostListItem[]> {
  // isPublished != false → alanı hiç set edilmemiş dökümanları da kapsar
  const query = `*[_type == "post" && isPublished != false] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      title,
      slug
    },
    publishedAt,
    readingTime,
    featured
  }`;
  return client.fetch(query, {}, { cache: REVALIDATE === 0 ? 'no-store' : 'force-cache', next: { revalidate: REVALIDATE } });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug && isPublished != false][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    "coverImage": coverImage.asset->url,
    coverImageAlt,
    author->{
      _id,
      name,
      slug,
      "image": image.asset->url,
      role,
      bio
    },
    category->{
      _id,
      title,
      slug
    },
    tags[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    updatedAt,
    isPublished,
    seoTitle,
    seoDescription,
    canonicalUrl,
    "ogImage": ogImage.asset->url,
    readingTime,
    featured
  }`;
  return client.fetch(query, { slug }, { cache: REVALIDATE === 0 ? 'no-store' : 'force-cache', next: { revalidate: REVALIDATE } });
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPostListItem[]> {
  const query = `*[_type == "post" && category->slug.current == $categorySlug && isPublished != false] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      title,
      slug
    },
    publishedAt,
    readingTime,
    featured
  }`;
  return client.fetch(query, { categorySlug }, { cache: REVALIDATE === 0 ? 'no-store' : 'force-cache', next: { revalidate: REVALIDATE } });
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPostListItem[]> {
  const query = `*[_type == "post" && $tagSlug in tags[]->slug.current && isPublished != false] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      title,
      slug
    },
    publishedAt,
    readingTime,
    featured
  }`;
  return client.fetch(query, { tagSlug }, { cache: REVALIDATE === 0 ? 'no-store' : 'force-cache', next: { revalidate: REVALIDATE } });
}

export async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`;
  return client.fetch(query, {}, { next: { revalidate: REVALIDATE } });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    seoTitle,
    seoDescription
  }`;
  return client.fetch(query, { slug }, { next: { revalidate: REVALIDATE } });
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const query = `*[_type == "tag" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description
  }`;
  return client.fetch(query, { slug }, { next: { revalidate: REVALIDATE } });
}

export async function getRelatedPosts(categorySlug: string, currentPostId: string): Promise<BlogPostListItem[]> {
  const query = `*[_type == "post" && category->slug.current == $categorySlug && _id != $currentPostId && isPublished != false] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      title,
      slug
    },
    publishedAt,
    readingTime
  }`;
  return client.fetch(query, { categorySlug, currentPostId }, { cache: REVALIDATE === 0 ? 'no-store' : 'force-cache', next: { revalidate: REVALIDATE } });
}
