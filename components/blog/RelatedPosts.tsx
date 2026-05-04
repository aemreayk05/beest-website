import { getRelatedPosts } from '@/sanity/lib/queries';
import BlogCard from './BlogCard';

export default async function RelatedPosts({ categorySlug, currentPostId }: { categorySlug: string, currentPostId: string }) {
    const relatedPosts = await getRelatedPosts(categorySlug, currentPostId);

    if (!relatedPosts || relatedPosts.length === 0) {
        return null;
    }

    return (
        <section className="py-20 border-t border-black/10">
            <div className="mb-12 text-center md:text-left">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-4">
                    İlgini Çekebilir
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-[#111111] tracking-tight">
                    İlgili Yazılar
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}
