'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ScrollText, Calendar, Library, CircleHelp, HelpCircle } from 'lucide-react'
import './BottomBar.css'

// Use CircleHelp if available, else HelpCircle
const FaqIcon = CircleHelp || HelpCircle

export const BottomBar = () => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Biografi', href: '/biography', icon: ScrollText },
    { name: 'Event', href: '/events', icon: Calendar },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'FAQ', href: '/faq', icon: FaqIcon },
  ]

  return (
    <nav className="bottom-bar">
      <div className="bottom-bar-container">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-bar-item ${isActive ? 'active' : ''}`}
            >
              <div className="icon-wrapper">
                <Icon strokeWidth={isActive ? 2.5 : 2} size={24} />
              </div>
              <span className="bottom-bar-label">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
