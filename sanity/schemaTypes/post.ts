import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Yazıları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Yazı Başlığı',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Yayınlandı mı?',
      type: 'boolean',
      description: 'Kapalıysa sitede görünmez (Taslak modu)',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan Yazı',
      type: 'boolean',
      description: 'Blog ana sayfasında üstte büyük görünür',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Kısa Özet (Excerpt)',
      type: 'text',
      description: 'Blog kartlarında ve özetlerde görünecek 1-2 cümlelik açıklama',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'İçerik (Body)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Kapak Görseli SEO Alt Metni',
      type: 'string',
      description: 'Görselin ne anlattığını açıklayan SEO uyumlu kısa metin',
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'reference',
      to: { type: 'author' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: { type: 'category' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Okuma Süresi (Dakika)',
      type: 'number',
      description: 'Örn: 5',
    }),
    
    // SEO ALANLARI (Bir grup halinde gösterilebilir ama basitlik için direkt ekliyoruz)
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Özel)',
      type: 'string',
      description: 'Arama motorlarında görünecek başlık. Boş bırakırsanız yazının normal başlığı kullanılır.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Özel)',
      type: 'text',
      description: 'Arama motorlarında görünecek açıklama. Boş bırakırsanız "Kısa Özet (Excerpt)" kullanılır.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Eğer bu yazı başka bir siteden alıntıysa, orijinal linki buraya yapıştırın. Yoksa boş bırakın.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph (Sosyal Medya) Görseli',
      type: 'image',
      description: 'Twitter, WhatsApp vb. yerlerde paylaşıldığında çıkacak görsel. Boşsa Kapak Görseli kullanılır.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `Yazar: ${author}` }
    },
  },
})
