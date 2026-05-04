import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

const customComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // Assuming Sanity image object structure is handled properly via GROQ or here
      // For now, if we have a direct asset URL or sanity URL
      const imageUrl = value.asset?.url || value?.url;
      if (!imageUrl) return null;

      return (
        <div className="relative w-full aspect-video my-10 rounded-[1.5rem] overflow-hidden bg-[#F3F3F3] shadow-lg">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog Görseli'}
            fill
            className="object-cover"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60 backdrop-blur-sm text-center">
              <span className="text-white text-sm">{value.caption}</span>
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-black text-[#111111] mt-16 mb-6 tracking-tight leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-[#111111] mt-12 mb-4 tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-black/70 font-medium leading-[1.8] mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#7F00FF] pl-6 py-2 my-8 italic text-xl text-black/60 bg-[#7F00FF]/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-lg text-black/70 font-medium leading-[1.8] mb-8 space-y-2 pl-4 marker:text-[#7F00FF]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-lg text-black/70 font-medium leading-[1.8] mb-8 space-y-2 pl-4 marker:text-[#7F00FF] marker:font-bold">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#111111]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[#111111]">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-[#111111]/5 text-[#7F00FF] px-1.5 py-0.5 rounded-md font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-[#7F00FF] underline underline-offset-4 decoration-2 decoration-[#7F00FF]/30 hover:decoration-[#7F00FF] transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="max-w-none">
      <PortableText value={value} components={customComponents} />
    </div>
  );
}
