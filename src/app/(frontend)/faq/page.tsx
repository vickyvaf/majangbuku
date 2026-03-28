import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Faq } from '@/payload-types'
import { FAQAccordion } from '@/components/FAQAccordion'
import './../styles.css'
import { Header } from '@/components/Header/Header'

export const dynamic = 'force-dynamic'
export const revalidate = 0


export default async function FAQPage() {
  const payload = await getPayload({ config })
  
  const faqPageData = await payload.findGlobal({
    slug: 'faq-page',
  })
  
  const { docs: fetchedFaqs } = await payload.find({
    collection: 'faq',
    limit: 100,
  })

  const faqs = (faqPageData.faqs && faqPageData.faqs.length > 0 
    ? faqPageData.faqs 
    : fetchedFaqs) as Faq[]

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
