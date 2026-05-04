import { PortableTextBlock } from '@portabletext/types';

export interface Author {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    image?: any;
    bio?: string;
    role?: string;
}

export interface Category {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    description?: string;
    seoTitle?: string;
    seoDescription?: string;
}

export interface Tag {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    description?: string;
}

export interface BlogPost {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    excerpt: string;
    content: PortableTextBlock[];
    coverImage: any;
    coverImageAlt?: string;
    author: Author;
    category: Category;
    tags?: Tag[];
    publishedAt: string;
    updatedAt: string;
    isPublished: boolean;
    seoTitle?: string;
    seoDescription?: string;
    canonicalUrl?: string;
    ogImage?: any;
    readingTime?: number;
    featured?: boolean;
}

export interface BlogPostListItem {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    excerpt: string;
    coverImage: any;
    category: Category;
    publishedAt: string;
    readingTime?: number;
    featured?: boolean;
}
