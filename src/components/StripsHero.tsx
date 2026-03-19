'use client'

import React, { useEffect, useState, useRef } from 'react'

interface StripsHeroProps {
  imageSrc: string
}

export const StripsHero: React.FC<StripsHeroProps> = ({ imageSrc }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const stripCount = 6
  const heights = [85, 75, 90, 80, 90, 75]
  const containerMaxWidth = 1000 // px

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const limit = 200
      const progress = Math.min(Math.max(scrollY / limit, 0), 1)
      setScrollProgress(progress)
    }

    // Handle Image Loading
    if (imageSrc) {
      setIsLoaded(false) // Reset when source changes
      const img = new Image()
      img.src = imageSrc
      img.onload = () => setIsLoaded(true)
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === wrapperRef.current) {
          setWrapperWidth(entry.contentRect.width)
        }
      }
    })

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [imageSrc])

  return (
    <div className="hero-strips-container" ref={containerRef}>
      <div
        className="hero-strips-wrapper"
        ref={wrapperRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${stripCount}, 1fr)`,
          gap: `${(1 - scrollProgress) * 1.5}vw`,
          maxWidth: `${containerMaxWidth}px`,
          width: '100%',
        } as React.CSSProperties}
      >
        {heights.map((baseHeight, i) => {
          const currentHeight = baseHeight + (100 - baseHeight) * scrollProgress
          const opacity = 0.7 + scrollProgress * 0.3
          const grayscale = (1 - scrollProgress) * 20

          const stripWidth = wrapperWidth / stripCount
          const bgPos = -i * stripWidth

          return (
            <div
              key={i}
              className={`hero-strip ${!isLoaded ? 'loading-skeleton' : ''}`}
              style={{
                height: `${currentHeight}%`,
                opacity: opacity,
                filter: `grayscale(${grayscale}%)`,
                boxShadow: scrollProgress > 0.9 ? 'none' : undefined,
                backgroundColor: isLoaded ? 'transparent' : '#d8d5d0',
                transition: 'background-color 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="hero-strip-bg"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: `${wrapperWidth}px auto`,
                  backgroundPosition: `${bgPos}px center`,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.6s ease-in-out',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
