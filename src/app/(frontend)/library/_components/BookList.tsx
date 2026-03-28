import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { InfiniteBookList } from './InfiniteBookList'
import { Book } from '@/payload-types'

export const BookGridSkeleton = () => {
  return (
    <div className="books-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="book-card" style={{ gap: '0.5rem' }}>
          <div className="book-cover-wrapper">
            <div className="book-cover loading-skeleton" />
          </div>
          <div className="book-card-header">
            <div className="loading-skeleton" style={{ width: '40%', height: '14px' }} />
            <div
              className="loading-skeleton"
              style={{ width: '25%', height: '18px', borderRadius: '2px' }}
            />
          </div>
          <div
            className="loading-skeleton"
            style={{ width: '80%', height: '24px', marginBottom: '1rem' }}
          />
          <div style={{ padding: '0.5rem 0', borderTop: '1px solid #e0e0e0', marginTop: 'auto' }}>
            <div
              className="loading-skeleton"
              style={{ width: '40%', height: '12px', marginBottom: '8px' }}
            />
            <div className="loading-skeleton" style={{ width: '60%', height: '12px' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export async function BookList({
  category,
  search,
  sort,
  availableOnly,
}: {
  category: string
  search: string
  sort: string
  availableOnly: boolean
}) {
  const payload = await getPayload({ config })

  let where: any = {
    and: [],
  }

  if (category !== 'all') {
    where.and.push({
      'categories.slug': {
        equals: category,
      },
    })
  }

  if (search) {
    where.and.push({
      or: [
        { title: { contains: search } },
        { author: { contains: search } },
        { isbn_sku: { contains: search } },
      ],
    })
  }

  if (availableOnly) {
    where.and.push({
      status: {
        equals: 'available',
      },
    })
  }

  if (where.and.length === 0) {
    where = {}
  }

  const {
    docs: books,
    hasNextPage,
    nextPage,
  } = await payload.find({
    collection: 'books',
    where,
    sort,
    depth: 1,
    limit: 12, // Load more on start
  })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const whatsappNumber = siteSettings?.whatsappNumber || ''

  if (books.length === 0) {
    return (
      <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
        <p>Tidak ada buku yang ditemukan sesuai dengan kriteria Anda.</p>
      </div>
    )
  }

  return (
    <InfiniteBookList
      initialBooks={books as Book[]}
      category={category}
      search={search}
      sort={sort}
      availableOnly={availableOnly}
      initialHasNextPage={hasNextPage}
      initialNextPage={nextPage}
      whatsappNumber={whatsappNumber}
    />
  )
}
