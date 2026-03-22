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
  hooks: {
    afterChange: [
      async ({ doc, operation, req, previousDoc }) => {
        const bookId = typeof doc.book === 'object' ? doc.book.id : doc.book

        // Handle new borrow
        if (operation === 'create' && bookId) {
          try {
            const book = await req.payload.findByID({
              collection: 'books',
              id: bookId,
              req,
            })

            await req.payload.update({
              collection: 'books',
              id: bookId,
              data: {
                borrowCount: (book.borrowCount || 0) + 1,
                status: 'borrowed',
              },
              req,
            })
          } catch (err) {
            req.payload.logger.error(`Failed to update book on borrow: ${err}`)
          }
        }

        // Handle return
        if (
          operation === 'update' &&
          doc.status === 'returned' &&
          previousDoc?.status !== 'returned' &&
          bookId
        ) {
          try {
            await req.payload.update({
              collection: 'books',
              id: bookId,
              data: {
                status: 'available',
              },
              req,
            })
          } catch (err) {
            req.payload.logger.error(`Failed to update book on return: ${err}`)
          }
        }
      },
    ],
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

