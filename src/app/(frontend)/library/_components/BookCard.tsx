import { useState } from 'react'
import { Book } from '@/payload-types'
import { ScrollReveal } from './ScrollReveal'
import { BorrowModal } from './BorrowModal'

export const BookCard = ({
  book,
  index,
  whatsappNumber,
  googleFormLink,
}: {
  book: Book
  index: number
  whatsappNumber?: string
  googleFormLink?: string
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <ScrollReveal key={book.id} delay={(index % 3) * 100}>
        <div className="book-card">
          <div className="book-cover-wrapper">
            {book.coverImageUrl ? (
              <img src={book.coverImageUrl} alt={book.title} className="book-cover" />
            ) : book.coverImage && typeof book.coverImage !== 'number' ? (
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
                ? `${book.quantity || 0} Tersedia`
                : book.status === 'borrowed'
                  ? '0 Tersedia'
                  : book.status === 'reference_only'
                    ? 'Dilokasi'
                    : (book.status as string)?.replace('_', ' ') || ''}
            </div>
          </div>
          <h3 className="book-title">{book.title}</h3>
          <div className="book-card-meta">
            <span className="meta-value">{book?.itemCode || 'N/A'} {book?.isbn_issn ? `| ${book.isbn_issn}` : ''}</span>
          </div>
          {book.description && (
            <div className="book-description-container">
              <div className={`book-description ${isExpanded ? 'is-expanded' : ''}`}>
                {book.description}
              </div>
              {!isExpanded && book.description.length > 120 && (
                <button
                  className="read-more-btn"
                  onClick={() => setIsExpanded(true)}
                >
                  Baca Selengkapnya
                </button>
              )}
              {isExpanded && (
                <button
                  className="read-more-btn"
                  onClick={() => setIsExpanded(false)}
                >
                  Tutup
                </button>
              )}
            </div>
          )}


          {book.status === 'available' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="borrow-button"
            >
              Pinjam Buku
            </button>
          )}
        </div>
      </ScrollReveal>

      <BorrowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={book}
        whatsappNumber={whatsappNumber}
        googleFormLink={googleFormLink}
      />
    </>
  )
}
