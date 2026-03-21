import { getPayload } from 'payload'
import config from './src/payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding library data...')

  // 1. Create Categories
  const catNames = ['Anak-Anak', 'Remaja', 'Langka', 'Sastra Klasik', 'Filsafat', 'Sejarah']
  const categories = []
  for (const name of catNames) {
    const cat = await payload.create({
      collection: 'book-categories',
      data: {
        title: name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      },
    })
    categories.push(cat)
  }

  // 2. Create Media (Placeholder Images or use existing if any)
  // I'll just assume there's one media item or create a dummy record if possible.
  // Actually, I should probably check if any media exists first.
  const { docs: existingMedia } = await payload.find({ collection: 'media', limit: 1 })
  let dummyMediaId = existingMedia[0]?.id

  if (!dummyMediaId) {
     console.log('No media found, creating dummy books without images first...')
  }

  // 3. Create Books
  const booksData = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn_sku: '978-0743273565',
      owner_donator: 'Julian Vane',
      status: 'available',
      cats: ['Sastra Klasik'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn_sku: '978-0061120084',
      owner_donator: 'Elena Rossi',
      status: 'borrowed',
      cats: ['Sastra Klasik'],
    },
    {
      title: 'Meditations',
      author: 'Marcus Aurelius',
      isbn_sku: '978-0812968255',
      owner_donator: 'Archive Central',
      status: 'reference_only',
      cats: ['Filsafat'],
    },
    {
       title: '1984',
       author: 'George Orwell',
       isbn_sku: '978-0451524935',
       owner_donator: 'Marcus Thorne',
       status: 'available',
       cats: ['Sastra Klasik'],
    },
    {
       title: 'On Earth We\'re Briefly Gorgeous',
       author: 'Ocean Vuong',
       isbn_sku: '978-0525562023',
       owner_donator: 'S. Whitely',
       status: 'borrowed',
       cats: ['Sastra Klasik', 'Remaja'],
    },
    {
       title: 'The Odyssey',
       author: 'Homer',
       isbn_sku: '978-0140268867',
       owner_donator: 'Archive Central',
       status: 'reference_only',
       cats: ['Sastra Klasik', 'Langka'],
    }
  ]

  for (const book of booksData) {
    const bookCats = categories.filter(c => book.cats.includes(c.title)).map(c => c.id)
    await payload.create({
      collection: 'books',
      data: {
        title: book.title,
        author: book.author,
        isbn_sku: book.isbn_sku,
        owner_donator: book.owner_donator,
        status: book.status as any,
        categories: bookCats as any,
        coverImage: dummyMediaId as any,
        borrowCount: Math.floor(Math.random() * 50),
      },
    })
  }

  console.log('Seeding completed!')
  process.exit(0)
}

seed()
