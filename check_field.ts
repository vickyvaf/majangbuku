import { getPayload } from 'payload'
import config from './src/payload.config'

async function checkField() {
  const payload = await getPayload({ config })
  const book = await payload.find({
    collection: 'books',
    limit: 1,
  })
  console.log('Book structure:', JSON.stringify(book.docs[0], null, 2))
  process.exit(0)
}

checkField()
