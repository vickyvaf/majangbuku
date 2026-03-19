'use client'

import React, { useState } from 'react'
import type { Faq } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const FAQAccordion: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
  return (
    <div className="faq-accordion">
      {faqs.map((faq) => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  )
}

const FAQItem: React.FC<{ faq: Faq }> = ({ faq }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const stringId = String(faq.id)

  return (
    <div className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
      <button 
        className="faq-accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="faq-accordion-question">{faq.question}</h3>
        <div className="faq-accordion-icon-container">
          <div className={`faq-accordion-icon-plus ${isOpen ? 'open' : ''}`}></div>
        </div>
      </button>
      <div className={`faq-accordion-content-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="faq-accordion-content">
          <div className="faq-answer lexical-content">
            <RichText data={faq.answer} />
          </div>
        </div>
      </div>
    </div>
  )
}
