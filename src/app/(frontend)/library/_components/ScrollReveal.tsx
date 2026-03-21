'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Optional: unobserve if you only want to reveal once
          // observer.unobserve(entry.target)
        } else {
          setIsVisible(false) // Toggle fade out when leaving view
        }
      })
    }, { threshold })

    const current = domRef.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [threshold])

  return (
    <div
      ref={domRef}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
