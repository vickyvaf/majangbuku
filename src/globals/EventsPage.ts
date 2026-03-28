import { GlobalConfig } from 'payload'

export const EventsPage: GlobalConfig = {
  slug: 'events-page',
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
      defaultValue: 'Kegiatan',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      defaultValue: 'Daftar kegiatan terbaru yang akan datang',
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
  ],
}
