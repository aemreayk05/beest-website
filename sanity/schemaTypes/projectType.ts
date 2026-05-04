import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Çalışmalarımız (Projeler)',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNo',
      title: 'Sıra Numarası',
      type: 'number',
      description: 'Projelerin hangi sırayla gösterileceğini belirler (Örn: 1, 2, 3)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'baslik',
      title: 'Proje Başlığı',
      type: 'string',
      description: 'Örn: Kurumsal Web Tasarımı & SEO Çalışması',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'musteri',
      title: 'Müşteri Adı',
      type: 'string',
      description: 'Örn: Weart Mimarlık',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategoriler',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Maddeler halinde projede yapılan işlemler (Örn: Web Tasarım, SEO)',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'resim',
      title: 'Proje Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Proje Linki',
      type: 'url',
      description: 'Projenin canlı bağlantısı (Boş bırakırsanız karta tıklanmaz)',
      validation: (rule) => rule.uri({ allowRelative: true }),
    }),
  ],
  preview: {
    select: {
      title: 'baslik',
      subtitle: 'musteri',
      media: 'resim',
    },
  },
})
