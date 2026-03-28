import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const Header: React.FC = async () => {
  const payload = await getPayload({ config })
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

  return (
    <div className="page-header">
      <Link href="/" className="logo-link">
        <img
          src={logo}
          alt="Majang Buku Logo"
          className="page-logo-img"
          style={{ width: '120px', height: 'auto', objectFit: 'contain' }}
        />
      </Link>
    </div>
  )
}
