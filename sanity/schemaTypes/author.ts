import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Yazarlar (Authors)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'İsim Soyisim',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'role',
      title: 'Ünvan / Rol',
      type: 'string',
      description: 'Örn: Senior SEO Uzmanı',
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
