import { Background } from '@/components/Background/Background'
import { EventsSidebar } from '@/components/EventsSidebar/EventsSidebar'
import { Navbar } from '@/components/Navbar/Navbar'
import { BottomBar } from '@/components/BottomBar/BottomBar'
import config from '@payload-config'
import { Bitter } from 'next/font/google'
import { getPayload } from 'payload'
import React from 'react'
import NextTopLoader from 'nextjs-toploader'
import './styles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0


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
  const events = eventsDocs.map((doc) => {
    // Robust check for Media object
    const eventMedia =
      doc.image && typeof doc.image === 'object' && 'url' in doc.image ? doc.image : null

    // Fallback to imageUrl field if direct media is missing
    let imageUrl = (eventMedia?.url as string) || (doc.imageUrl as string) || ''
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    // Only strip serverUrl if it's actually there
    if (imageUrl && imageUrl.startsWith(serverUrl)) {
      imageUrl = imageUrl.substring(serverUrl.length)
    }

    return {
      id: String(doc.id),
      title: doc.title,
      description: doc.description,
      date: doc.date,
      location: doc.location || undefined,
      image: imageUrl
        ? {
            url: imageUrl,
            alt: (eventMedia?.alt as string) || doc.title,
          }
        : undefined,
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

  const socialLinks = socialDocs.map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    url: doc.url,
    icon: doc.icon || 'link',
  }))

  // Fetch site settings with explicit depth
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })

  // Helper to extract URL from Media object
  const getMediaUrl = (media: any) => {
    if (media && typeof media === 'object' && media.url) {
      return media.url
    }
    return null
  }

  const logo = getMediaUrl(siteSettings.logo) || '/logo.png'
  const logoSecondary = getMediaUrl(siteSettings.logoSecondary) || undefined

  return (
    <html lang="id" className={bitter.variable}>
      <body>
        <NextTopLoader
          color="#f78750"
          showSpinner={false}
          shadow="0 0 10px #f78750,0 0 5px #f78750"
        />
        <Background />
        <EventsSidebar events={events} socialLinks={socialLinks} />
        <Navbar logo={logo || '/logo.png'} logoSecondary={logoSecondary} />
        <main className="main-wrapper">{children}</main>
        <BottomBar />
      </body>
    </html>
  )
}
