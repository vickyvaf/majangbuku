import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Faq } from '@/payload-types'
import { FAQAccordion } from '@/components/FAQAccordion'
import './../styles.css'
import { Header } from '@/components/Header/Header'

export default async function FAQPage() {
  const payload = await getPayload({ config })
  
  const faqPageData = await payload.findGlobal({
    slug: 'faq-page',
  })
  
  const { docs: faqs } = await payload.find({
    collection: 'faq',
  })

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-title">{faqPageData.title}</h1>
        {faqPageData.subtitle && (
          <p className="faq-subtitle">{faqPageData.subtitle}</p>
        )}
        
        {faqs.length === 0 ? (
          <div className="empty-state">
            <p>Daftar FAQ sedang disusun. Jika ada pertanyaan, hubungi kami di Instagram!</p>
          </div>
        ) : (
          <FAQAccordion faqs={faqs as Faq[]} />
        )}
      </div>
    </>
  )
}
