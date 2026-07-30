import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://majangbuku.netlify.app'
  const staticRoutes = ['', '/biography', '/events', '/library', '/faq']

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: categories } = await payload.find({
      collection: 'book-categories',
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    categories.forEach((cat) => {
      if (cat.slug) {
        sitemapEntries.push({
          url: `${baseUrl}/library?category=${encodeURIComponent(cat.slug)}`,
          lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      }
    })
  } catch (error) {
    console.error('Error generating dynamic sitemap entries:', error)
  }

  return sitemapEntries
}

