'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Book } from '@/payload-types'
import './BorrowModal.css'

interface BorrowModalProps {
  isOpen: boolean
  onClose: () => void
  book: Book
  whatsappNumber?: string
}

export const BorrowModal: React.FC<BorrowModalProps> = ({
  isOpen,
  onClose,
  book,
  whatsappNumber,
}) => {
  const [name, setName] = useState('')
  const [borrowDate, setBorrowDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  // Load name from localStorage on mount
  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem('majangbuku_user_name')
      if (savedName) {
        setName(savedName)
      }
    }
  }, [isOpen])

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

  const handlePinjam = () => {
    if (!name || !borrowDate || !returnDate) return

    // Save name to localStorage
    localStorage.setItem('majangbuku_user_name', name)

    const waNumber = (whatsappNumber || '6281234567890').replace(/[^0-9]/g, '')
    const message = [
      'Halo Majang Buku,',
      `- Nama Peminjam: ${name}`,
      `- Judul: ${book.title}`,
      `- Penulis: ${book.author}`,
      `- tanggal peminjaman: ${borrowDate}`,
      `- tanggal pengembalian: ${returnDate}`,
      'Terima kasih!',
    ].join('\n')

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank')

    setBorrowDate('')
    setReturnDate('')

    onClose()
  }

  const isFormValid = name.trim() !== '' && borrowDate !== '' && returnDate !== ''

  return (
    <>
      <div
        className={`borrow-modal-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div
        className={`borrow-modal-container ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        <div className="borrow-modal-header">
          <h2>Konfirmasi Peminjaman</h2>
          <button className="borrow-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="borrow-modal-content">
          <div className="book-info-card">
            <div className="book-info-image">
              {book.coverImageUrl ? (
                <img src={book.coverImageUrl} alt={book.title} />
              ) : book.coverImage && typeof book.coverImage !== 'number' ? (
                <img src={book.coverImage.url || ''} alt={book.title} />
              ) : (
                <div className="placeholder-image" />
              )}
            </div>
            <div className="book-info-details">
              <h3>{book.title}</h3>
              <p className="book-info-author">{book.author}</p>
              <p className="book-id-code">{book.itemCode || 'NO ITEM CODE'}</p>
            </div>
          </div>

          <div className="borrow-form">
            <div className="input-group">
              <label htmlFor="name">NAMA</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="borrowDate">TANGGAL PEMINJAMAN</label>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="borrowDate"
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="returnDate">TANGGAL PENGEMBALIAN</label>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="returnDate"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="borrow-modal-footer">
          <button
            className="pinjam-submit-btn"
            disabled={!isFormValid}
            onClick={handlePinjam}
          >
            Pinjam Sekarang
          </button>
          <a href="#how-to-borrow" className="pertama-kali-btn" onClick={onClose}>
            Pertama Kali Pinjam
          </a>
        </div>
      </div>
    </>
  )
}
