'use client'
import React, { useState, useEffect } from 'react'
import './styles.css'
import { Header } from '@/components/Header/Header'

const STRIPS = [
  {
    title: 'Piknik Buku',
    subtitle: 'Program Literasi',
    desc: 'Membaca bersama di alam terbuka Lumajang.',
    image:
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Klub Lima Pagi',
    subtitle: 'Kebiasaan Baik',
    desc: 'Membangun kebiasaan baik sejak matahari terbit.',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Diam-Diam Baca',
    subtitle: 'Ketenangan Jiwa',
    desc: 'Hening dalam kata, ramai dalam pikiran.',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'LCW 2024',
    subtitle: 'Event Akbar',
    desc: 'Literasi Camp & Workshop untuk Lumajang.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Bedah Buku',
    subtitle: 'Diskusi Sastra',
    desc: 'Mengupas tuntas makna di balik lembaran.',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Pojok Baca',
    subtitle: 'Ruang Nyaman',
    desc: 'Ruang nyaman untuk imajinasi tanpa batas.',
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Donasi Buku',
    subtitle: 'Berbagi Ilmu',
    desc: 'Berbagi ilmu, menebar manfaat.',
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Workshop Menulis',
    subtitle: 'Edukasi Menulis',
    desc: 'Ubah ide menjadi kata-kata bermakna.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Katalog Koleksi',
    subtitle: 'Layanan Perpustakaan',
    desc: 'Telusuri ribuan buku favoritmu.',
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Relawan Literasi',
    subtitle: 'Komunitas',
    desc: 'Bergabunglah memajukan literasi Lumajang.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
]

export default function HomePage() {
  const [activeItem, setActiveItem] = useState<(typeof STRIPS)[0] | null>(null)
  const [visibleStrips, setVisibleStrips] = useState<Set<number>>(new Set())
  const [stripDirections, setStripDirections] = useState<('top' | 'bottom')[]>([])
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Randomly assign each strip a direction: 'bottom' (from below) or 'top' (from above)
    const directions: ('top' | 'bottom')[] = STRIPS.map(
      () => (Math.random() < 0.5 ? 'bottom' : 'top'),
    )
    setStripDirections(directions)
    setMounted(true)

    // Show wrapper first with a small delay for stability
    setTimeout(() => setIsReady(true), 100)

    // Shuffle indices for random reveal order
    const indices = STRIPS.map((_, i) => i)
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
  }, [])


  return (
    <>
      <Header />
      <div className="home-wrapper">
        <section className="carousel-container">
          <div className={`strips-wrapper${isReady ? ' ready' : ''}`} onMouseLeave={() => setActiveItem(null)}>
            {STRIPS.map((strip, idx) => {
              const dir = stripDirections[idx] ?? 'bottom'
              const entranceClass = mounted
                ? ` strip-from-${dir}${visibleStrips.has(idx) ? ' strip-entered' : ''}`
                : ''
              return (
                <div
                  key={idx}
                  className={`carousel-strip${entranceClass} ${activeItem?.title === strip.title ? 'active' : ''}`}
                  onMouseEnter={() => setActiveItem(strip)}
                >
                  <div className="strip-inner">
                    <img src={strip.image} alt={strip.title} className="strip-bg" />
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
                <p className="info-desc">{activeItem.desc}</p>
              </>
            ) : (
              <>
                <p className="info-subtitle">Selamat Datang di Majang Buku</p>
                <h1 className="info-title">Kegiatan Pilihan</h1>
                <p className="info-desc">Jelajahi berbagai inisiatif literasi bersama kami</p>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
