'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import './Navbar.css'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open and toggle class
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('nav-open')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('nav-open')
    }
  }, [isOpen])

  return (
    <>
      <button
        className={`hamburger-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <div className="hamburger-icon">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>

      <div className={`nav-overlay ${isOpen ? 'open' : ''}`}>
        <div className="nav-active-logo">
          <Link href="/">
            <Image
              src="/logo-2.png"
              alt="Majang Buku Logo"
              width="180"
              height="90"
              className="nav-logo-img"
              priority
            />
          </Link>
        </div>
        <nav className="nav-menu">
          <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link
            href="/biography"
            className={`nav-item ${pathname === '/biography' ? 'active' : ''}`}
          >
            Biography
          </Link>
          <Link href="/events" className={`nav-item ${pathname === '/events' ? 'active' : ''}`}>
            Events
          </Link>
          <Link href="/library" className={`nav-item ${pathname === '/library' ? 'active' : ''}`}>
            Library
          </Link>
          <Link href="/faq" className={`nav-item ${pathname === '/faq' ? 'active' : ''}`}>
            FAQ
          </Link>
        </nav>
      </div>
      <div className={`nav-backdrop ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </>
  )
}
