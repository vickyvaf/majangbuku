import { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'defaultSubtitle',
      type: 'text',
      label: 'Default Subtitle',
      defaultValue: 'Selamat Datang di Majang Buku',
      required: true,
    },
    {
      name: 'defaultTitle',
      type: 'text',
      label: 'Default Title',
      defaultValue: 'Kegiatan Pilihan',
      required: true,
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Default Description',
      defaultValue: 'Jelajahi berbagai inisiatif literasi bersama kami',
      required: true,
    },
    {
      name: 'strips',
      type: 'array',
      label: 'Carousel Strips',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'imageUrl',
          label: 'External Image URL',
          type: 'text',
          admin: {
            description: 'If no image is uploaded, use this external URL.',
          },
        },
      ],
    },
  ],
}
