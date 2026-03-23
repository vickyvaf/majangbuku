'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function fetchBooksAction({
  category,
  search,
  sort,
  availableOnly,
  page,
  limit = 12,
}: {
  category: string
  search: string
  sort: string
  availableOnly: boolean
  page: number
  limit?: number
}) {
  const payload = await getPayload({ config })

  let where: any = {
    and: [],
  }

  if (category !== 'all') {
    where.and.push({
      'categories.slug': {
        equals: category,
      },
    })
  }

  if (search) {
    where.and.push({
      or: [
        { title: { contains: search } },
        { author: { contains: search } },
        { isbn_sku: { contains: search } },
      ],
    })
  }

  if (availableOnly) {
    where.and.push({
      status: {
        equals: 'available',
      },
    })
  }

  if (where.and.length === 0) {
    where = {}
  }

  const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
    collection: 'books',
    where,
    sort,
    page,
    limit,
    depth: 1,
  })

  return { docs, hasNextPage, nextPage, totalDocs }
}
