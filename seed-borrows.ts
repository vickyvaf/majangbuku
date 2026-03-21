import { getPayload } from 'payload'
import config from './src/payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding borrowing records...')

  const { docs: books } = await payload.find({ collection: 'books', limit: 3 })
  
  if (books.length > 0) {
    await payload.create({
      collection: 'borrowing-records',
      data: {
        book: books[0].id,
        borrowerName: 'Vicky Adi',
        borrowDate: new Date().toISOString(),
        expectedReturn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
      },
    })
    
    await payload.create({
      collection: 'borrowing-records',
      data: {
        book: books[1].id,
        borrowerName: 'Budi Santoso',
        borrowDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        expectedReturn: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
      },
    })
  }

  console.log('Seeding completed!')
  process.exit(0)
}

seed()
