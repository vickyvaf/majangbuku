---
name: seo-and-geo-optimization
description: Apply this skill when editing frontend pages, landing pages, or metadata to ensure maximum visibility on traditional search engines (SEO) and AI-driven search engines (GEO/LLM Search).
---

# SEO & GEO Optimization Guidelines

Use this skill whenever you are modifying, creating, or auditing public-facing pages (especially in `src/app/(frontend)`) to optimize them for Google search (SEO) and AI search engines like Gemini, ChatGPT, Perplexity (GEO - Generative Engine Optimization).

## Core Principles

1. **AI-Search Friendly (GEO - Generative Engine Optimization)**:
   * **Explicit Entity Definitions**: State clearly what the product/community is, who it is for, and its unique value proposition (USP) in plain, unambiguous text. AI crawlers rely on explicit statements rather than implicit marketing jargon.
   * **Structured Data (JSON-LD)**: Always include Schema.org JSON-LD microdata (e.g., `WebSite`, `Organization`, `FAQPage`) to help LLMs parse structured relationships and features.
   * **Citation-Friendly Formats**: Structure text using bullet points, tables, and bold key phrases. AI search engines prefer extracting structured lists and highlighted conclusions.

2. **Traditional SEO (Search Engine Optimization)**:
   * **Semantic HTML**: Use proper HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`). Ensure only one `<h1>` per page.
   * **Metadata & Open Graph**: Provide complete meta titles (under 60 characters), descriptions (under 160 characters), and Open Graph (OG) tags for social preview.
   * **Fast Loading & Assets**: Optimize images (use modern formats like WebP/AVIF), avoid heavy client-side scripts where static HTML suffices, and implement responsive designs.

## Implementation Checklist

### 1. Metadata Configuration (Next.js App Router)
Ensure the root layout (`src/app/(frontend)/layout.tsx`) or individual pages define correct metadata:
```typescript
export const metadata = {
  title: 'Majang Buku | Komunitas Baca Lumajang',
  description: 'Komunitas literasi pertama di Lumajang. Majang Buku - Mari hidupkan literasi bersama.',
  openGraph: {
    title: 'Majang Buku | Komunitas Baca Lumajang',
    description: 'Komunitas literasi pertama di Lumajang. Majang Buku - Mari hidupkan literasi bersama.',
    url: 'https://majangbuku.id',
    siteName: 'Majang Buku',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Majang Buku Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majang Buku | Komunitas Baca Lumajang',
    description: 'Komunitas literasi pertama di Lumajang. Majang Buku - Mari hidupkan literasi bersama.',
    images: ['/logo.png'],
  },
}
```

### 2. JSON-LD Schema
For the main landing page, include a `WebSite` and `Organization` schema:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Majang Buku",
  "url": "https://majangbuku.id",
  "logo": "https://majangbuku.id/logo.png",
  "sameAs": [
    "https://www.instagram.com/majangbuku"
  ]
}
</script>
```

### 3. Google Sitelinks Optimization Checklist
Sitelinks (seperti tampilan menu navigasi tambahan di hasil pencarian Google) dihasilkan secara otomatis oleh algoritma Google. Untuk memaksimalkan peluang mendapatkannya:
* **Struktur Navigasi Jelas**: Pastikan header menu menggunakan tag HTML semantik `<nav>` dengan link (`<a>`) yang memiliki teks deskriptif (misal: "Home", "Biography", "Events", "Library", "FAQ"). Hindari teks link yang terlalu pendek atau ambigu.
* **Terapkan Sitemap XML**: Selalu daftarkan `sitemap.xml` di Google Search Console yang mendata seluruh rute penting (misal: `/`, `/biography`, `/events`, `/library`, `/faq`).
* **Sitelinks Search Box Schema**: Gunakan skema `WebSite` dengan properti `potentialAction` untuk mengizinkan search box langsung di hasil Google.
* **SiteNavigationElement Schema**: Definisikan item menu utama menggunakan skema `SiteNavigationElement` agar Google mudah mengurai link-link penting.

```html
<!-- Sitelinks & Search Box Schema (JSON-LD) -->
<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Majang Buku",
    "url": "https://majangbuku.id",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://majangbuku.id/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": "#header-navigation",
    "name": [
      "Home",
      "Biography",
      "Events",
      "Library",
      "FAQ"
    ],
    "url": [
      "https://majangbuku.id/",
      "https://majangbuku.id/biography",
      "https://majangbuku.id/events",
      "https://majangbuku.id/library",
      "https://majangbuku.id/faq"
    ]
  }
]
</script>
```

### 4. AI-Scraper Optimization (`robots.txt`)
Ensure AI crawlers are explicitly allowed to index the public landing pages:
```txt
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /
```
