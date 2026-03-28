import { getPayload } from 'payload'
import config from '@payload-config'
import { HomeClient } from './HomeClient'

const STRIPS_FALLBACK = [
  {
    title: 'Piknik Buku',
    subtitle: 'Program Literasi',
    description: 'Membaca bersama di alam terbuka Lumajang.',
    imageUrl:
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
  },
]

export default async function HomePage() {
  const payload = await getPayload({ config })
  const homeData = await payload.findGlobal({
    slug: 'home-page',
  })

  const strips = homeData?.strips?.length ? homeData.strips : STRIPS_FALLBACK

  return (
    <HomeClient
      strips={strips as any}
      defaultSubtitle={homeData?.defaultSubtitle}
      defaultTitle={homeData?.defaultTitle}
      defaultDescription={homeData?.defaultDescription}
    />
  )
}
