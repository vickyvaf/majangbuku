'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const CategoryLink = ({ 
  children, 
  slug, 
  active 
}: { 
  children: React.ReactNode, 
  slug: string, 
  active: boolean 
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`/library?${params.toString()}`)
  }

  return (
    <div 
      className={`sidebar-link ${active ? 'active' : ''}`} 
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
