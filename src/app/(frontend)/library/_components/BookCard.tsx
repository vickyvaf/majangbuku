import React from 'react'
import { Book } from '@/payload-types'
import { ScrollReveal } from './ScrollReveal'

export const BookCard = ({
  book,
  index,
  whatsappNumber,
}: {
  book: Book
  index: number
  whatsappNumber?: string
}) => {
  const waNumber = (whatsappNumber || '6281234567890').replace(/[^0-9]/g, '')

  return (
    <ScrollReveal key={book.id} delay={(index % 3) * 100}>
      <div className="book-card">
        <div className="book-cover-wrapper">
          {book.coverImage && typeof book.coverImage !== 'number' ? (
            <img src={book.coverImage.url || ''} alt={book.title} className="book-cover" />
          ) : (
            <div className="book-cover loading-skeleton" />
          )}
        </div>
        <div className="book-card-header">
          <div className="book-author">{book.author}</div>
          <div
            className={`badge badge-${book.status === 'reference_only' ? 'reference' : (book.status as string)?.replace('_', '-')}`}
          >
            {book.status === 'available'
              ? '1 Tersedia'
              : book.status === 'borrowed'
                ? '0 Tersedia'
                : book.status === 'reference_only'
                  ? 'Dilokasi'
                  : (book.status as string)?.replace('_', ' ') || ''}
          </div>
        </div>
        <h3 className="book-title">{book.title}</h3>
        <div className="book-card-meta">
          <span className="meta-label">ISBN-13</span>
          <br />
          <span className="meta-value">{book.isbn_sku || 'N/A'}</span>
        </div>

        {book.status === 'available' && (
          <a
            href={`https://wa.me/${waNumber}?text=Halo Majang Buku, saya ingin meminjam buku "${book.title} - ${book.author}"`}
            target="_blank"
            rel="noopener noreferrer"
            className="borrow-button"
          >
            Pinjam Buku
          </a>
        )}
      </div>
    </ScrollReveal>
  )
}
