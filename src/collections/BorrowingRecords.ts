import type { CollectionConfig } from 'payload'

export const BorrowingRecords: CollectionConfig = {
  slug: 'borrowing-records',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['book', 'borrowerName', 'borrowDate', 'expectedReturn'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'book',
      type: 'relationship',
      relationTo: 'books',
      required: true,
    },
    {
      name: 'borrowerName',
      type: 'text',
      required: true,
    },
    {
      name: 'borrowDate',
      type: 'date',
      required: true,
    },
    {
      name: 'expectedReturn',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Returned', value: 'returned' },
      ],
    },
  ],
}
