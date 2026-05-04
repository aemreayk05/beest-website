import { defineField, defineType } from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Etiketler',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Etiket Adı',
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
      name: 'description',
      title: 'Kısa Açıklama',
      type: 'text',
    }),
  ],
})
