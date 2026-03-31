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
import { BookList, BookGridSkeleton } from './_components/BookList'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0


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
  // Fetch used category IDs from books
  const { docs: booksForCategories } = await payload.find({
    collection: 'books',
    select: {
      categories: true,
    },
    pagination: false,
    depth: 0,
  })

  // Extract unique category IDs that are present in any book
  const usedCategoryIds = Array.from(
    new Set(
      booksForCategories.flatMap((book) => {
        if (!book.categories) return []
        if (Array.isArray(book.categories)) {
          return book.categories.map((cat: any) => (typeof cat === 'object' ? cat.id : cat))
        }
        return [typeof book.categories === 'object' ? (book.categories as any).id : book.categories]
      }),
    ),
  )

  // Fetch only those categories for the sidebar
  const { docs: categories } = await payload.find({
    collection: 'book-categories',
    sort: 'title',
    pagination: false,
    where: {
      id: {
        in: usedCategoryIds.length > 0 ? usedCategoryIds : ['_none_'],
      },
    },
  })

  return (
    <>
      <Header />
      <div className="library-container">
        <div className="library-layout">
          <header className="library-header">
            <h1 className="library-title">Perpustakaan</h1>
            <p className="library-subtitle">
              Jelajahi koleksi komunitas kami yang terkurasi. Dialog antara warisan klasik dan
              pencarian modern.
            </p>
          </header>

          <aside className="library-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Koleksi</h3>
              <nav className="sidebar-nav">
                <CategoryLink key="all" slug="all" active={category === 'all'}>
                  Semua Koleksi
                </CategoryLink>
                {categories.map((cat) => (
                  <CategoryLink key={cat.id} slug={cat.slug} active={category === cat.slug}>
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

            <Suspense
              key={`${category}-${search}-${sort}-${availableOnly}`}
              fallback={<BookGridSkeleton />}
            >
              <BookList
                category={category}
                search={search}
                sort={sort}
                availableOnly={availableOnly}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  )
}
