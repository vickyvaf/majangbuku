'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import './BottomSheet.css'

export type Category = {
  id: string
  title: string
  slug: string
}

interface FilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  currentCategory: string
  currentSort: string
  availableOnly: boolean
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isOpen,
  onClose,
  categories,
  currentCategory,
  currentSort,
  availableOnly,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState(currentCategory)
  const [selectedSort, setSelectedSort] = useState(currentSort)
  const [isAvailableOnly, setIsAvailableOnly] = useState(availableOnly)

  // Sync state when props change (e.g. from outside navigation)
  useEffect(() => {
    setSelectedCategory(currentCategory)
    setSelectedSort(currentSort)
    setIsAvailableOnly(availableOnly)
  }, [currentCategory, currentSort, availableOnly])

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory)
    } else {
      params.delete('category')
    }

    if (selectedSort !== '-createdAt') {
      params.set('sort', selectedSort)
    } else {
      // Keep sort explicit if we want, or remove if default
      params.set('sort', selectedSort)
    }

    if (isAvailableOnly) {
      params.set('available', 'true')
    } else {
      params.delete('available')
    }

    router.push(`/library?${params.toString()}`)
    onClose()
  }

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`bottom-sheet-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
        <div className="bottom-sheet-header">
          <h2>Filter & Urutkan</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="bottom-sheet-content">
          <div className="filter-group">
            <h3>Kategori</h3>
            <div className="filter-options">
              <label className="filter-option radio">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                />
                <span>Semua Koleksi</span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="filter-option radio">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.slug}
                    onChange={() => setSelectedCategory(cat.slug)}
                  />
                  <span>{cat.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Status Ketersediaan</h3>
            <div className="filter-options">
              <label className="filter-option checkbox">
                <input
                  type="checkbox"
                  checked={isAvailableOnly}
                  onChange={(e) => setIsAvailableOnly(e.target.checked)}
                />
                <span>Hanya Tersedia</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <h3>Urutkan Berdasarkan</h3>
            <div className="filter-options">
              <label className="filter-option radio">
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === '-createdAt'}
                  onChange={() => setSelectedSort('-createdAt')}
                />
                <span>Baru Ditambahkan</span>
              </label>
              <label className="filter-option radio">
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === 'title'}
                  onChange={() => setSelectedSort('title')}
                />
                <span>A-Z Judul</span>
              </label>
              <label className="filter-option radio">
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === '-title'}
                  onChange={() => setSelectedSort('-title')}
                />
                <span>Z-A Judul</span>
              </label>
              <label className="filter-option radio">
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === '-borrowCount'}
                  onChange={() => setSelectedSort('-borrowCount')}
                />
                <span>Paling Sering Dibaca</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bottom-sheet-footer">
          <button className="apply-btn" onClick={handleApply}>
            Terapkan Filter
          </button>
        </div>
      </div>
    </>
  )
}
