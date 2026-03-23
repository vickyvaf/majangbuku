import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'book-categories',
      hasMany: true,
    },
    {
      name: 'isbn_sku',
      label: 'ISBN / SKU',
      type: 'text',
    },
    {
      name: 'owner_donator',
      label: 'Owner / Donator',
      type: 'text',
    },
    {
      name: 'borrowCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      required: true,
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Borrowed', value: 'borrowed' },
        { label: 'Reference Only', value: 'reference_only' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bookSource',
      label: 'Source',
      type: 'select',
      required: false,
      options: [
        { label: 'Rak', value: 'Rak' },
        { label: 'Donasi', value: 'Donasi' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Pilih atau ketik sumber buku baru jika tidak ada di daftar',
      },
      hasMany: false,
    },
  ],
}
