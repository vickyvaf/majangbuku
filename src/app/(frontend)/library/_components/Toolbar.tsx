'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, ChevronDown, Check, SlidersHorizontal } from 'lucide-react'
import { FilterBottomSheet, Category } from './FilterBottomSheet'

export const Toolbar = ({
  initialSearch,
  availableOnly,
  sort,
  categories,
  currentCategory
}: {
  initialSearch: string,
  availableOnly: boolean,
  sort: string,
  categories: Category[],
  currentCategory: string
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(initialSearch)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  // Handle Search Input
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchValue) {
        params.set('search', searchValue)
      } else {
        params.delete('search')
      }
      if (params.toString() !== searchParams.toString()) {
        router.push(`/library?${params.toString()}`)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue, router, searchParams])

  const toggleAvailable = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (availableOnly) {
      params.delete('available')
    } else {
      params.set('available', 'true')
    }
    router.push(`/library?${params.toString()}`)
  }

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', newSort)
    router.push(`/library?${params.toString()}`)
  }

  return (
    <>
      <div className="library-toolbar">
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari Berdasarkan Judul, Penulis, atau ISBN"
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button 
            className="mobile-filter-btn" 
            onClick={() => setIsBottomSheetOpen(true)}
            aria-label="Filter"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="toolbar-actions">
          <label className="toolbar-action sort-select-wrapper">
            <span className="sort-label">URUTKAN:</span>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="-borrowCount">PALING SERING DIBACA</option>
              <option value="-createdAt">BARU DITAMBAHKAN</option>
              <option value="title">JUDUL (A-Z)</option>
              <option value="-title">JUDUL (Z-A)</option>
            </select>
            <ChevronDown size={14} className="select-chevron" />
          </label>

          <div
            className={`toolbar-action ${availableOnly ? 'active' : ''}`}
            onClick={toggleAvailable}
          >
            <div style={{
              width: 14,
              height: 14,
              border: '1px solid #ccc',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: availableOnly ? '#000' : 'transparent',
              borderColor: availableOnly ? '#000' : '#ccc'
            }}>
              {availableOnly && <Check size={10} color="white" />}
            </div>
            <span>FILTER: HANYA YANG TERSEDIA</span>
          </div>
        </div>
      </div>

      <FilterBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        categories={categories}
        currentCategory={currentCategory}
        currentSort={sort}
        availableOnly={availableOnly}
      />
    </>
  )
}
