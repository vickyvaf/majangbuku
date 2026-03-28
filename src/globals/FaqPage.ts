import { GlobalConfig } from 'payload'

export const FaqPage: GlobalConfig = {
  slug: 'faq-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'FAQ',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      defaultValue: 'Find your answers for the most asked questions',
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
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
      admin: {
        description: 'Pilih dan urutkan FAQ yang ingin ditampilkan (drag and drop di sini untuk mengubah urutan)',
      },
    },
  ],
}
