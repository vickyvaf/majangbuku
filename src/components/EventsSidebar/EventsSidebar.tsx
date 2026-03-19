'use client'

import React, { useState, useEffect } from 'react'
import { Megaphone, X, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import './EventsSidebar.css'

interface Event {
  id: string
  title: string
  description?: any
  date: string
  location?: string
  image?: {
    url: string
    alt: string
  }
}

interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
}

interface EventsSidebarProps {
  events: Event[]
  socialLinks?: SocialLink[]
}

export const EventsSidebar: React.FC<EventsSidebarProps> = ({ events, socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <button
        className={`events-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-label="Open Events Sidebar"
      >
        <Megaphone size={28} />
      </button>

      <div
        className={`events-sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      ></div>

      <div className={`events-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-close-btn" onClick={toggleSidebar} aria-label="Tutup">
            <X size={24} />
          </button>
          <h2 className="sidebar-title">Kegiatan Terbaru</h2>
        </div>

        <div className="sidebar-content">
          {events && events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="sidebar-event-card">
                {event.image?.url && (
                  <div className="event-card-image">
                    <Image
                      src={event.image.url}
                      alt={event.image.alt || event.title}
                      fill
                      sizes="100vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="event-card-info">
                  <h3 className="event-card-title">{event.title}</h3>
                  {event.location && (
                    <p className="event-card-location">
                      <MapPin
                        size={12}
                        style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
                      />
                      {event.location}
                    </p>
                  )}
                  <p className="event-card-date" suppressHydrationWarning>
                    {new Date(event.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <div className="event-card-desc-snippet">
                    {((event.description as any)?.root?.children?.[0]?.children?.[0]
                      ?.text as string) || ''}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="sidebar-empty">Belum ada kegiatan terbaru saat ini.</div>
          )}

          <Link href="/events" className="view-all-events" onClick={() => setIsOpen(false)}>
            Lihat semua kegiatan →
          </Link>
        </div>

        <div className="sidebar-footer">
          {socialLinks && socialLinks.length > 0 && (
            <div className="sidebar-socials">
              <span className="follow-label">IKUTI MAJANG BUKU</span>
              <div className="social-icons">
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
