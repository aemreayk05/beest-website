import { defineField, defineType } from 'sanity'

export const whyUsType = defineType({
  name: 'whyUs',
  title: 'Neden Biz',
  type: 'document',
  fields: [
    defineField({
      name: 'no',
      title: 'Numara',
      type: 'string',
      description: 'Örn: 01, 02, 03',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Kısa Etiket',
      type: 'string',
      description: 'Örn: ROTA & VİZYON',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'İkon Adı (Lucide)',
      type: 'string',
      description: 'Lucide kütüphanesindeki ikon adı (Örn: Map, BarChart3, Target, ShieldCheck, BrainCircuit)',
      options: {
        list: [
          { title: 'Map (Harita)', value: 'Map' },
          { title: 'BarChart3 (Grafik)', value: 'BarChart3' },
          { title: 'Target (Hedef)', value: 'Target' },
          { title: 'ShieldCheck (Kalkan/Güvenlik)', value: 'ShieldCheck' },
          { title: 'BrainCircuit (Yapay Zeka/Zeka)', value: 'BrainCircuit' },
          { title: 'Star (Yıldız)', value: 'Star' },
          { title: 'Zap (Hız/Şimşek)', value: 'Zap' },
          { title: 'Activity (Aktivite)', value: 'Activity' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Açıklama',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
    },
  },
})
