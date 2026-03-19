import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <div className="page-header">
      <Link href="/" className="logo-link">
        <Image
          src="/logo.png"
          alt="Majang Buku Logo"
          width="100"
          height="50"
          className="page-logo-img"
          priority
        />
      </Link>
    </div>
  )
}
