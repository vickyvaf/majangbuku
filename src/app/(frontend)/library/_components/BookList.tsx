import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ScrollReveal } from './ScrollReveal'

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
            <div className="loading-skeleton" style={{ width: '25%', height: '18px', borderRadius: '2px' }} />
          </div>
          <div className="loading-skeleton" style={{ width: '80%', height: '24px', marginBottom: '1rem' }} />
          <div style={{ padding: '0.5rem 0', borderTop: '1px solid #e0e0e0', marginTop: 'auto' }}>
            <div className="loading-skeleton" style={{ width: '40%', height: '12px', marginBottom: '8px' }} />
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
  availableOnly
}: {
  category: string;
  search: string;
  sort: string;
  availableOnly: boolean;
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

  const { docs: books } = await payload.find({
    collection: 'books',
    where,
    sort,
    depth: 1,
  })

  return (
    <div className="books-grid">
      {books.length === 0 ? (
        <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
          <p>Tidak ada buku yang ditemukan sesuai dengan kriteria Anda.</p>
        </div>
      ) : (
        books.map((book, index) => (
          <ScrollReveal key={book.id} delay={(index % 3) * 100}>
            <div className="book-card">
              <div className="book-cover-wrapper">
                {book.coverImage && typeof book.coverImage !== 'number' ? (
                  <img
                    src={book.coverImage.url || ''}
                    alt={book.title}
                    className="book-cover"
                  />
                ) : (
                  <div className="book-cover loading-skeleton" />
                )}
              </div>
              <div className="book-card-header">
                <div className="book-author">{book.author}</div>
                <div className={`badge badge-${book.status === 'reference_only' ? 'reference' : (book.status as string)?.replace('_', '-')}`}>
                  {book.status === 'available' ? '1 Tersedia' :
                    book.status === 'borrowed' ? '0 Tersedia' :
                      book.status === 'reference_only' ? 'Dilokasi' :
                        (book.status as string)?.replace('_', ' ') || ''}
                </div>
              </div>
              <h3 className="book-title">{book.title}</h3>
              <div
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#888',
                }}
              >
                <span className="meta-label">ISBN-13</span><br />
                <span className="meta-value">{book.isbn_sku || 'N/A'}</span>
              </div>

              {book.status === 'available' && (
                <a
                  href={`https://wa.me/6281234567890?text=Halo Majang Buku, saya ingin meminjam buku "${book.title} - ${book.author}"`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="borrow-button"
                >
                  Pinjam Buku
                </a>
              )}
            </div>
          </ScrollReveal>
        ))
      )}
    </div>
  )
}
