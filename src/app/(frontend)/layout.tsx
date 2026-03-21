import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bitter } from 'next/font/google'
import { Background } from '@/components/Background/Background'
import { Navbar } from '@/components/Navbar/Navbar'
import { EventsSidebar } from '@/components/EventsSidebar/EventsSidebar'
import { getPayload } from 'payload'
import config from '@payload-config'
import './styles.css'

const bitter = Bitter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main',
})

export const metadata = {
  description:
    'Komunitas literasi pertama di Lumajang. Majang Buku - Mari hidupkan literasi bersama.',
  title: 'Majang Buku | Komunitas Baca Lumajang',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  
  // Fetch latest 3 upcoming events
  const { docs: eventsDocs } = await payload.find({
    collection: 'events',
    limit: 3,
    sort: '-date',
    where: {
      status: {
        in: ['upcoming', 'registration_open'],
      },
    },
  })

  // Format events for component
  const events = eventsDocs.map(doc => {
    const eventImage = doc.image && typeof doc.image !== 'number' ? doc.image : null;
    
    return {
      id: String(doc.id),
      title: doc.title,
      description: doc.description,
      date: doc.date,
      location: doc.location || undefined,
      image: eventImage ? {
        url: eventImage.url || '',
        alt: eventImage.alt || doc.title,
      } : undefined
    }
  })

  // Fetch social media links
  const { docs: socialDocs } = await payload.find({
    collection: 'social-media',
    sort: 'order',
    where: {
      active: {
        equals: true,
      },
    },
  })

  const socialLinks = socialDocs.map(doc => ({
    id: String(doc.id),
    name: doc.name,
    url: doc.url,
    icon: doc.icon || 'link',
  }))

  return (
    <html lang="id" className={bitter.variable}>
      <body>
        <Background />
        <EventsSidebar events={events} socialLinks={socialLinks} />
        <Navbar />
        <main className="main-wrapper">{children}</main>
      </body>
    </html>
  )
}

