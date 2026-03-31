import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const faqData = [
  {
    question: 'Apa itu Majang Buku Lumajang?',
    answer: 'Majang Buku Lumajang adalah komunitas literasi yang berfokus pada pengembangan budaya membaca di Kabupaten Lumajang melalui kegiatan berbagi buku, diskusi, dan program literasi untuk semua kalangan.',
  },
  {
    question: 'Bagaimana cara bergabung dengan komunitas Majang Buku?',
    answer: 'Kamu bisa bergabung dengan mengikuti kegiatan kami secara langsung, menghubungi kami melalui media sosial, atau mendaftar sebagai anggota melalui website resmi kami.',
  },
  {
    question: 'Apakah ada biaya untuk bergabung?',
    answer: 'Tidak ada biaya pendaftaran. Majang Buku Lumajang terbuka untuk siapa saja yang memiliki semangat literasi dan kecintaan terhadap buku.',
  },
  {
    question: 'Kegiatan apa saja yang diadakan oleh Majang Buku?',
    answer: 'Kami rutin mengadakan kegiatan seperti pertukaran buku, diskusi buku, baca bareng, bedah buku, dan donasi buku ke sekolah-sekolah di Lumajang.',
  },
  {
    question: 'Bagaimana cara mendonasikan buku?',
    answer: 'Kamu dapat mendonasikan buku dengan menghubungi kami melalui media sosial atau langsung membawa buku ke titik pengumpulan yang telah kami sediakan.',
  },
  {
    question: 'Apakah Majang Buku menerima kerja sama atau kolaborasi?',
    answer: 'Ya! Kami terbuka untuk kolaborasi dengan sekolah, perpustakaan, komunitas, UMKM, maupun instansi pemerintah dalam rangka memajukan literasi di Lumajang.',
  },
  {
    question: 'Di mana lokasi kegiatan Majang Buku Lumajang?',
    answer: 'Kegiatan kami berlokasi di berbagai titik di Kabupaten Lumajang. Jadwal dan lokasi terbaru selalu diumumkan melalui media sosial kami.',
  },
  {
    question: 'Apakah anak-anak bisa ikut bergabung?',
    answer: 'Tentu! Majang Buku Lumajang menyambut anggota dari segala usia, termasuk anak-anak yang didampingi orang tua.',
  },
]

function textToLexical(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const run = async () => {
  const config = await configPromise
  const payload = await getPayload({ config })

  console.log(`Seeding ${faqData.length} FAQ items...`)

  for (const item of faqData) {
    try {
      await payload.create({
        collection: 'faq',
        data: {
          question: item.question,
          answer: textToLexical(item.answer),
        },
      })
      console.log(`Created FAQ: ${item.question}`)
    } catch (e: any) {
      console.error(`Error creating FAQ ${item.question}: ${e.message}`)
    }
  }

  console.log('FAQ seeding completed.')
  process.exit(0)
}

run()
