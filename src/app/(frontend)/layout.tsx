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

import keywordsData from '@/keywords.json'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const bitter = Bitter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main',
})

export const metadata = {
  metadataBase: new URL('https://majangbuku.netlify.app'),
  title: {
    default: 'Majang Buku | Komunitas Baca & Perpustakaan Lumajang',
    template: '%s | Majang Buku Lumajang',
  },
  description:
    'Majang Buku adalah komunitas literasi, penyedia katalog buku, perpustakaan, dan wadah kegiatan membaca pertama di Lumajang, Jawa Timur. Mari tingkatkan budaya membaca bersama kami.',
  keywords: [
    'majang buku',
    'majangbuku',
    'buku lumajang',
    'komunitas buku lumajang',
    'komunitas literasi lumajang',
    'perpustakaan lumajang',
    'baca buku lumajang',
    'pinjam buku lumajang',
    'katalog buku lumajang',
    'klub buku lumajang',
    'taman bacaan lumajang',
    'tbm lumajang',
    'lapak baca lumajang',
    'ruang baca lumajang',
    'kegiatan membaca lumajang',
    'event literasi lumajang',
    'buku gratis lumajang',
    'donasi buku lumajang',
    'relawan literasi lumajang',
    'komunitas pemuda lumajang',
  ],
  authors: [{ name: 'Majang Buku Lumajang' }],
  creator: 'Majang Buku',
  publisher: 'Majang Buku',
  category: 'Education & Community',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Majang Buku | Komunitas Baca & Perpustakaan Lumajang',
    description:
      'Komunitas literasi & kegiatan baca buku pertama di Lumajang. Cari katalog buku, event literasi, dan ruang baca bersama Majang Buku.',
    url: 'https://majangbuku.netlify.app',
    siteName: 'Majang Buku Lumajang',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Majang Buku Lumajang Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majang Buku | Komunitas Baca & Perpustakaan Lumajang',
    description:
      'Komunitas literasi & kegiatan baca buku pertama di Lumajang. Cari katalog buku, event literasi, dan ruang baca bersama Majang Buku.',
    images: ['/logo.png'],
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
      buttonLink: doc.buttonLink || undefined,
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

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': ['EducationalOrganization', 'Library'],
      '@id': 'https://majangbuku.netlify.app/#organization',
      'name': 'Majang Buku',
      'alternateName': ['MajangBuku', 'Komunitas Baca Lumajang', 'Perpustakaan Majang Buku'],
      'url': 'https://majangbuku.netlify.app',
      'logo': logo.startsWith('http') ? logo : `https://majangbuku.netlify.app${logo}`,
      'description':
        'Komunitas literasi, perpustakaan publik, dan ruang baca bersama pertama di Kabupaten Lumajang, Jawa Timur.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Lumajang',
        'addressRegion': 'Jawa Timur',
        'addressCountry': 'ID',
      },
      'areaServed': {
        '@type': 'AdministrativeArea',
        'name': 'Kabupaten Lumajang',
      },
      'knowsAbout': keywordsData,
      'sameAs': socialLinks.map((link) => link.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Majang Buku',
      'url': 'https://majangbuku.netlify.app',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://majangbuku.netlify.app/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'itemListElement': [
        {
          '@type': 'SiteNavigationElement',
          'position': 1,
          'name': 'Biography',
          'url': 'https://majangbuku.netlify.app/biography',
        },
        {
          '@type': 'SiteNavigationElement',
          'position': 2,
          'name': 'Events',
          'url': 'https://majangbuku.netlify.app/events',
        },
        {
          '@type': 'SiteNavigationElement',
          'position': 3,
          'name': 'Library',
          'url': 'https://majangbuku.netlify.app/library',
        },
        {
          '@type': 'SiteNavigationElement',
          'position': 4,
          'name': 'FAQ',
          'url': 'https://majangbuku.netlify.app/faq',
        },
      ],
    },
  ]

  return (
    <html lang="id" className={bitter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
