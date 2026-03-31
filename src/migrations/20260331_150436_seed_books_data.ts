import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const booksPath = path.resolve(dirname, '../../seed-books.json')
  const categoriesPath = path.resolve(dirname, '../../seed-categories.json')

  if (!fs.existsSync(categoriesPath) || !fs.existsSync(booksPath)) {
    payload.logger.error('Seed files not found. Skipping seeding.')
    return
  }

  const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'))
  const booksData = JSON.parse(fs.readFileSync(booksPath, 'utf8'))

  payload.logger.info(`Seeding ${categoriesData.length} categories...`)

  const categoryMap = new Map<string, number>()

  // 1. Seed Categories
  for (const category of categoriesData) {
    const existing = await payload.find({
      collection: 'book-categories',
      where: {
        slug: { equals: category.slug },
      },
      limit: 1,
      req,
    })

    if (existing.docs.length > 0) {
      categoryMap.set(category.title, existing.docs[0].id)
    } else {
      const created = await payload.create({
        collection: 'book-categories',
        data: {
          title: category.title,
          slug: category.slug,
        },
        req,
      })
      categoryMap.set(category.title, created.id)
    }
  }

  payload.logger.info(`Seeding ${booksData.length} books...`)

  // 2. Seed Books
  for (const book of booksData) {
    const bookCategoryIds = (book.categories || [])
      .map((catName: string) => categoryMap.get(catName))
      .filter((id: number | undefined): id is number => typeof id === 'number')

    // Format receivedDate if it exists
    let receivedDate = null
    if (book.receivedDate) {
      try {
        receivedDate = new Date(book.receivedDate).toISOString()
      } catch (e) {
        payload.logger.warn(`Invalid date format for book ${book.itemCode}: ${book.receivedDate}`)
      }
    }

    await payload.create({
      collection: 'books',
      data: {
        itemCode: book.itemCode,
        title: book.title,
        author: book.author || 'Unknown',
        description: book.description,
        categories: bookCategoryIds,
        topics: book.topics,
        coverImageUrl: book.coverImageUrl,
        isbn_issn: book.isbn_issn,
        edition: book.edition,
        seriesTitle: book.seriesTitle,
        publisher: book.publisher,
        publishYear: book.publishYear,
        placeOfPublication: book.placeOfPublication,
        language: book.language || 'Indonesia',
        callNumber: book.callNumber,
        classification: book.classification,
        collation: book.collation,
        receivedDate,
        bookSource: book.bookSource,
        quantity: book.quantity || 1,
        site: book.site === 'Grati' || book.site === 'Labruk' ? book.site : 'Grati',
        gmd: book.gmd,
        price: book.price || 0,
        priceCurrency: book.priceCurrency || 'Rupiah',
        remarks: book.remarks,
        status: book.status || 'available',
        borrowCount: book.borrowCount || 0,
      },
      req,
    })
  }

  payload.logger.info('Seeding completed successfully.')
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // We won't delete data in down migration to avoid accidental data loss
  // but we could delete added books if needed.
  payload.logger.info('Down migration: skipping data deletion.')
}
