'use client'
import React, { useState, useEffect } from 'react'
import './styles.css'
import type { Media } from '@/payload-types'

interface Strip {
  title: string
  subtitle: string
  description: string
  image?: string | Media | null
  imageUrl?: string | null
}

interface HomeClientProps {
  strips: Strip[]
  defaultSubtitle?: string | null
  defaultTitle?: string | null
  defaultDescription?: string | null
}

export function HomeClient({
  strips,
  defaultSubtitle,
  defaultTitle,
  defaultDescription,
}: HomeClientProps) {
  const [activeItem, setActiveItem] = useState<Strip | null>(null)
  const [visibleStrips, setVisibleStrips] = useState<Set<number>>(new Set())
  const [stripDirections, setStripDirections] = useState<('top' | 'bottom')[]>([])
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Randomly assign each strip a direction: 'bottom' (from below) or 'top' (from above)
    const directions: ('top' | 'bottom')[] = strips.map(
      () => (Math.random() < 0.5 ? 'bottom' : 'top'),
    )
    setStripDirections(directions)
    setMounted(true)

    // Show wrapper first with a small delay for stability
    setTimeout(() => setIsReady(true), 100)

    // Shuffle indices for random reveal order
    const indices = strips.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }

    // Reveal each strip one by one with staggered delay
    indices.forEach((idx, order) => {
      setTimeout(() => {
        setVisibleStrips((prev) => new Set([...prev, idx]))
      }, 250 + order * 120) // Starts after 250ms for a more organized reveal
    })
  }, [strips])

  const getImageUrl = (strip: Strip) => {
    if (strip.image && typeof strip.image === 'object' && 'url' in strip.image) {
      return strip.image.url
    }
    return strip.imageUrl || ''
  }

  return (
    <>
    <div className="home-wrapper">
        <section className="carousel-container">
          <div
            className={`strips-wrapper${isReady ? ' ready' : ''}`}
            onMouseLeave={() => setActiveItem(null)}
          >
            {strips.map((strip, idx) => {
              const dir = stripDirections[idx] ?? 'bottom'
              const entranceClass = mounted
                ? ` strip-from-${dir}${visibleStrips.has(idx) ? ' strip-entered' : ''}`
                : ''
              const imageUrl = getImageUrl(strip)
              return (
                <div
                  key={idx}
                  className={`carousel-strip${entranceClass} ${activeItem?.title === strip.title ? 'active' : ''}`}
                  onMouseEnter={() => setActiveItem(strip)}
                >
                  <div className="strip-inner">
                    {imageUrl && <img src={imageUrl} alt={strip.title} className="strip-bg" />}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="active-info visible" key={activeItem ? activeItem.title : 'default'}>
            {activeItem ? (
              <>
                <p className="info-subtitle">{activeItem.subtitle}</p>
                <h1 className="info-title">{activeItem.title}</h1>
                <p className="info-desc">{activeItem.description}</p>
              </>
            ) : (
              <>
                <p className="info-subtitle">{defaultSubtitle || 'Selamat Datang di Majang Buku'}</p>
                <h1 className="info-title">{defaultTitle || 'Kegiatan Pilihan'}</h1>
                <p className="info-desc">
                  {defaultDescription || 'Jelajahi berbagai inisiatif literasi bersama kami'}
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
