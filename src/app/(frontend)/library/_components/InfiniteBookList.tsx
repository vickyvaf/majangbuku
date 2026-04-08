'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Book } from '@/payload-types'
import { fetchBooksAction } from '../actions'
import { BookCard } from './BookCard'

interface InfiniteBookListProps {
  initialBooks: Book[]
  category: string
  search: string
  sort: string
  availableOnly: boolean
  initialHasNextPage: boolean
  initialNextPage: number | null | undefined
  whatsappNumber?: string
  googleFormLink?: string
}

export const InfiniteBookList: React.FC<InfiniteBookListProps> = ({
  initialBooks,
  category,
  search,
  sort,
  availableOnly,
  initialHasNextPage,
  initialNextPage,
  whatsappNumber,
  googleFormLink,
}) => {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [nextPage, setNextPage] = useState(initialNextPage)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef(null)

  // Reset state when filters change (except initialBooks, but we'll handle it via key in BookList)
  useEffect(() => {
    setBooks(initialBooks)
    setHasNextPage(initialHasNextPage)
    setNextPage(initialNextPage)
  }, [initialBooks, initialHasNextPage, initialNextPage])

  const loadMore = async () => {
    if (isLoading || !hasNextPage || !nextPage) return

    setIsLoading(true)
    try {
      const result = await fetchBooksAction({
        category,
        search,
        sort,
        availableOnly,
        page: nextPage,
      })

      setBooks((prev) => {
        const existingIds = new Set(prev.map((b) => b.id))
        const newDocs = (result.docs as Book[]).filter((b) => !existingIds.has(b.id))
        return [...prev, ...newDocs]
      })
      setHasNextPage(result.hasNextPage)
      setNextPage(result.nextPage)
    } catch (error) {
      console.error('Failed to load more books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 }, // Reduced threshold to trigger earlier
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasNextPage, isLoading, nextPage, category, search, sort, availableOnly])

  return (
    <>
      <div className="books-grid">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            whatsappNumber={whatsappNumber}
            googleFormLink={googleFormLink}
          />
        ))}
      </div>

      {hasNextPage && (
        <div ref={observerTarget} className="loading-trigger">
          {isLoading && <div className="loading-spinner">Memuat lebih banyak...</div>}
        </div>
      )}

      {!hasNextPage && books.length > 0 && (
        <div className="end-of-list">Anda telah mencapai akhir koleksi.</div>
      )}
    </>
  )
}
