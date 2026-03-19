'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealRowProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const RevealRow: React.FC<RevealRowProps> = ({ children, className, delay = 0 }) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (rowRef.current) {
      observer.observe(rowRef.current)
    }

    return () => {
      if (rowRef.current) {
        observer.unobserve(rowRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={rowRef}
      className={`${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
