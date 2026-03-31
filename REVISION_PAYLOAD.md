// Books
import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['itemCode', 'title', 'author', 'status', 'site'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informasi Utama',
          fields: [
            {
              name: 'title',
              label: 'Judul Buku',
              type: 'text',
              required: true,
            },
            {
              name: 'author',
              label: 'Penyusun / Pengarang',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Sinopsis / Catatan',
              type: 'textarea',
              required: false,
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'book-categories',
              hasMany: true,
            },
            {
              name: 'topics',
              label: 'Topik / Subjek',
              type: 'text', // In csv expressed as <Topic1><Topic2>
              admin: {
                description: 'Contoh: <Fiksi><Novel><Romantis>',
              },
            },
            {
              name: 'coverImage',
              label: 'Cover Image (Upload)',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'coverImageUrl',
              label: 'Cover Image URL',
              type: 'text',
              required: false,
              admin: {
                description: 'Gunakan jika gambar di-hosting di luar.',
              },
            },
          ],
        },
        {
          label: 'Data Bibliografis',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isbn_issn',
                  label: 'ISBN / ISSN',
                  type: 'text',
                },
                {
                  name: 'edition',
                  label: 'Edisi',
                  type: 'text',
                },
              ],
            },
            {
              name: 'seriesTitle',
              label: 'Judul Seri',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'publisher',
                  label: 'Penerbit',
                  type: 'text',
                },
                {
                  name: 'publishYear',
                  label: 'Tahun Terbit',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'placeOfPublication',
                  label: 'Tempat Terbit',
                  type: 'text',
                },
                {
                  name: 'language',
                  label: 'Bahasa',
                  type: 'text',
                  defaultValue: 'Indonesia',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'callNumber',
                  label: 'Nomor Panggil (Call Number)',
                  type: 'text',
                },
                {
                  name: 'classification',
                  label: 'Klasifikasi',
                  type: 'text',
                },
              ],
            },
            {
              name: 'collation',
              label: 'Kolasi (Deskripsi Fisik)',
              type: 'text',
              admin: {
                description: 'Contoh: 120 hlm. ; 18 cm.',
              },
            },
          ],
        },
        {
          label: 'Manajemen & Inventaris',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'itemCode',
                  label: 'No Inventaris / Item Code',
                  type: 'text',
                  required: true,
                  unique: true,
                },
                {
                  name: 'receivedDate',
                  label: 'Tanggal Diterima',
                  type: 'date',
                  admin: {
                    date: {
                      displayFormat: 'dd/MM/yyyy',
                    },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'bookSource',
                  label: 'Sumber Buku',
                  type: 'text',
                  admin: {
                    description: 'Contoh: Donasi, Rak, atau Nama Donor',
                  },
                },
                {
                  name: 'quantity',
                  label: 'Jumlah Eksemplar',
                  type: 'number',
                  defaultValue: 1,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'site',
                  label: 'Lokasi (Site)',
                  type: 'select',
                  options: [
                    { label: 'Grati', value: 'Grati' },
                    { label: 'Labruk', value: 'Labruk' },
                  ],
                },
                {
                  name: 'gmd',
                  label: 'GMD (General Material Designation)',
                  type: 'text',
                  admin: {
                    description: 'Contoh: Text, Art Original',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  label: 'Harga',
                  type: 'number',
                },
                {
                  name: 'priceCurrency',
                  label: 'Mata Uang',
                  type: 'text',
                  defaultValue: 'Rupiah',
                },
              ],
            },
            {
              name: 'remarks',
              label: 'Keterangan',
              type: 'textarea',
            },
          ],
        },
      ],
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
  ],
}

// Book Category
export const BookCategories: CollectionConfig = {
  slug: 'book-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Nama Kategori',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
