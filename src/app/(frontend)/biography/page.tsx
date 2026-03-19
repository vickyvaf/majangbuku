import React from 'react'
import './../styles.css'
import { Header } from '@/components/Header/Header'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
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
            biography.image && typeof biography.image === 'object'
              ? biography.image.url || ''
              : ''
          }
        />

        <div className="lexical-content-wrapper" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
          {biography.content ? (
            <div className="lexical-content">
              <RichText data={biography.content} />
            </div>
          ) : (
            <div className="section-text text-center">
              <p>Belum ada konten biografi.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
