import React from 'react'
import './../styles.css'
import { Header } from '@/components/Header/Header'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RichText } from '@/components/RichText'
import { StripsHero } from '@/components/StripsHero'

export default async function BiographyPage() {
  const payload = await getPayload({ config: configPromise })
  const biography = await payload.findGlobal({
    slug: 'biography-page',
  })

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-title">{biography.title}</h1>

        {biography.subtitle && (
          <p className="section-text" style={{ fontSize: '1.25rem', textAlign: 'center' }}>
            {biography.subtitle}
          </p>
        )}

        {/* Dynamic Image Merge Effect */}
        <StripsHero
          imageSrc={
            biography.imageUrl ||
            (biography.image && typeof biography.image === 'object' ? biography.image.url || '' : '')
          }
        />

        {biography.content ? (
          <div
            className="lexical-content-wrapper"
            style={{ marginTop: '2rem', marginBottom: '1.5rem' }}
          >
            <div className="lexical-content">
              <RichText data={biography.content} />
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada konten biografi yang diunggah. Cek kembali nanti!</p>
          </div>
        )}
      </div>
    </>
  )
}
