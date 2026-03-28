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
import { HomePage } from './globals/HomePage'
import { BiographyPage } from './globals/BiographyPage'
import { EventsPage } from './globals/EventsPage'
import { FaqPage } from './globals/FaqPage'
import { BookCategories } from './collections/BookCategories'
import { Books } from './collections/Books'
import { BorrowingRecords } from './collections/BorrowingRecords'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const sanitizeUrl = (url?: string) => {
  const fallback = ''
  let u = (url || '').trim()
  if (!u || u === 'undefined' || u === 'null') return fallback

  // Remove possible quotes and prefixes
  u = u
    .replace(/^["']|["']$/g, '')
    .replace('DATABASE_URI=', '')
    .trim()

  if (!u.includes('://')) {
    console.warn('DATABASE_URI is missing protocol, using fallback')
    return fallback
  }
  return u
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.URL || 'http://localhost:3000',
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
  globals: [HomePage, BiographyPage, EventsPage, FaqPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: sanitizeUrl(process.env.DATABASE_URI),
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `https://sjltryvtdubwdkkczftn.supabase.co/storage/v1/object/public/media/${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true, // Required for Supabase
      },
    }),
  ],
})
