import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Hizmet',
  type: 'document',
  fields: [
    defineField({
      name: 'no',
      title: 'Hizmet Numarası',
      type: 'string',
      description: 'Örn: 01, 02, 03',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'baslik',
      title: 'Hizmet Başlığı',
      type: 'text',
      rows: 2,
      description: 'Hizmetin adı (Satır atlamak için Enter tuşuna basın)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'text',
      description: 'Hizmetin uzun açıklaması',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'etiketler',
      title: 'Özellik Etiketleri',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Maddeler halinde özellikler',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'gorsel',
      title: 'Hizmet Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'baslik',
      subtitle: 'no',
      media: 'gorsel',
    },
  },
})
