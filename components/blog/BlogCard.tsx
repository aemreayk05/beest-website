import Image from 'next/image';
import Link from 'next/link';
import { BlogPostListItem } from '@/types/blog';

export default function BlogCard({ post }: { post: BlogPostListItem }) {
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Link
            href={`/blog/${post.slug.current}`}
            className="group relative flex flex-col w-full bg-white rounded-[2rem] p-4 transition-transform duration-500 ease-out hover:-translate-y-2"
            style={{
                boxShadow: '0 10px 40px -10px rgba(127,0,255,0.08)',
            }}
        >
            {/* Featured Badge */}
            {post.featured && (
                <div className="absolute top-8 right-8 z-10 flex items-center gap-2 border border-[#7F00FF]/20 rounded-full px-3 py-1 bg-white/90 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7F00FF] shadow-[0_0_8px_#7F00FF] animate-pulse" />
                    <span className="font-bold text-[0.6rem] tracking-[0.2em] uppercase text-[#7F00FF]">Öne Çıkan</span>
                </div>
            )}

            {/* Resim Alanı */}
            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-[#F3F3F3] mb-5">
                {post.coverImage ? (
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EDE8F5] to-[#D9CCF0] opacity-50 flex items-center justify-center">
                        <span className="text-[#7F00FF]/40 font-bold tracking-widest uppercase text-xs">Görsel Yok</span>
                    </div>
                )}
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 border-[2px] border-transparent rounded-[1.5rem] transition-colors duration-500 group-hover:border-[#7F00FF]/30 pointer-events-none" />
            </div>

            {/* Metin ve Etiket Alanı */}
            <div className="flex flex-col flex-1 px-2 pb-2">
                <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-[0.65rem] font-bold tracking-wider uppercase rounded-full border border-[#7F00FF]/20 text-[#7F00FF] bg-[#7F00FF]/5">
                        {post.category.title}
                    </span>
                    <span className="text-xs font-semibold text-black/40">
                        {formattedDate} {post.readingTime && `• ${post.readingTime} dk okuma`}
                    </span>
                </div>

                <h3 className="text-xl font-black leading-tight tracking-tight text-[#111111] group-hover:text-[#7F00FF] transition-colors duration-300 mb-3">
                    {post.title}
                </h3>
                
                <p className="text-sm font-medium text-black/60 leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#111111] group-hover:text-[#7F00FF] transition-colors duration-300">
                        Devamını Oku
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F3F3F3] text-[#111111] group-hover:bg-[#7F00FF] group-hover:text-white transition-colors duration-300">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
