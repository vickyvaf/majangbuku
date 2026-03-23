import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { FAQ } from './collections/FAQ'
import { SocialMedia } from './collections/SocialMedia'
import { BiographyPage } from './globals/BiographyPage'
import { EventsPage } from './globals/EventsPage'
import { FaqPage } from './globals/FaqPage'
import { BookCategories } from './collections/BookCategories'
import { Books } from './collections/Books'
import { BorrowingRecords } from './collections/BorrowingRecords'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const sanitizeUrl = (url?: string) => {
  const fallback = 'postgresql://postgres:postgres@localhost:5435/majangbuku'
  let u = (url || '').trim()
  if (!u || u === 'undefined' || u === 'null') return fallback

  // Remove possible quotes and prefixes
  u = u
    .replace(/^["']|["']$/g, '')
    .replace('DATABASE_URL=', '')
    .trim()

  if (!u.includes('://')) {
    console.warn('DATABASE_URL is missing protocol, using fallback')
    return fallback
  }
  return u
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Majang Buku',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/Graphics/Logo#Logo',
        Icon: '/components/Graphics/Icon#Icon',
      },
    },
  },
  collections: [Users, Media, Events, FAQ, SocialMedia, BookCategories, Books, BorrowingRecords],
  globals: [BiographyPage, EventsPage, FaqPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: sanitizeUrl(process.env.DATABASE_URL),
    },
  }),
  sharp,
  plugins: [],
})
