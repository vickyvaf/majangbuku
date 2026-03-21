'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const SortLink = ({ active, children }: { active: boolean, children: React.ReactNode }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const handleClick = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (active) {
            params.delete('sort')
        } else {
            params.set('sort', '-borrowCount')
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
