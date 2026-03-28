import { GlobalConfig } from 'payload'

export const BiographyPage: GlobalConfig = {
  slug: 'biography-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Biography',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'text',
      admin: {
        description: 'Jika gambar tidak ada, gunakan URL gambar dari luar (opsional).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
    },
  ],
}
