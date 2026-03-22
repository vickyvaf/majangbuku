import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header } from '@/components/Header/Header'
import './../styles.css'
import './library.css'
import { CategoryLink } from './_components/CategoryLink'
import { Toolbar } from './_components/Toolbar'
import { SortLink } from './_components/SortLink'
import { ScrollReveal } from './_components/ScrollReveal'

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const payload = await getPayload({ config })
  const params = await searchParams

  const category = (params.category as string) || 'all'
  const search = (params.search as string) || ''
  const sort = (params.sort as string) || '-createdAt'
  const availableOnly = params.available === 'true'

  // Fetch all categories for the sidebar
  const { docs: categories } = await payload.find({
    collection: 'book-categories',
    sort: 'title',
  })

  // Build where query
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

  // If no filters, remove the 'and' array to avoid empty query issues
  if (where.and.length === 0) {
    where = {}
  }

  // Fetch books
  const { docs: books } = await payload.find({
    collection: 'books',
    where,
    sort,
    depth: 1,
  })
  return (
    <>
      <Header />
      <div className="library-container">
        <div className="library-layout">
          <header className="library-header">
            <h1 className="library-title">Perpustakaan</h1>
            <p className="library-subtitle">
              Jelajahi koleksi komunitas kami yang terkurasi. Dialog antara warisan klasik dan pencarian modern.
            </p>
          </header>

          <aside className="library-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Koleksi</h3>
              <nav className="sidebar-nav">
                <CategoryLink slug="all" active={category === 'all'}>
                  Semua Koleksi
                </CategoryLink>
                {categories.map((cat) => (
                  <CategoryLink
                    key={cat.id}
                    slug={cat.slug}
                    active={category === cat.slug}
                  >
                    {cat.title}
                  </CategoryLink>
                ))}
              </nav>
            </div>
          </aside>

          <main className="library-main">
            <Toolbar
              initialSearch={search}
              availableOnly={availableOnly}
              sort={sort}
              categories={categories as any[]}
              currentCategory={category}
            />

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
          </main>
        </div>
      </div>
    </>
  )
}
