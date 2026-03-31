import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.updateGlobal({
    slug: 'biography-page',
    data: {
      title: 'Biography',
      subtitle: 'Tentang Komunitas Literasi Majang Buku',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Komunitas Literasi Majang Buku lahir dari keresahan empat pemudi asal Lumajang — Rizka Ayu Kartini, Shabila Fandyta, Fitri Maghfirotul Rohmah, dan Rosalia Wulan — yang ingin menemukan teman-teman sehobi membaca buku. Berawal dari kebiasaan berkunjung ke perpustakaan daerah yang sepi pengunjung, mereka menginisiasi lapak baca di Alun-alun Lumajang setiap Minggu pagi berbekal tikar dan koleksi buku pribadi. Kegiatan sederhana itu kemudian diberi nama "Piknik Buku" dan mendapat sambutan hangat dari warga sekitar.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Komunitas ini resmi berdiri pada Februari 2024 dengan tujuan meningkatkan kesadaran dan kebiasaan membaca buku di kalangan masyarakat Lumajang. Kini Majang Buku telah berkembang menjadi komunitas literasi dengan ratusan anggota dan berbagai program rutin, menjadi wadah bagi siapa saja yang ingin berbagi pengetahuan, pengalaman, dan kecintaan terhadap buku. Dengan semangat "Menyenangkan, Menumbuhkan, dan Berkelanjutan", Majang Buku terus menghadirkan ruang-ruang literasi yang inklusif dan bermakna di Kabupaten Lumajang.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Visi', version: 1 }],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Menjadi komunitas literasi yang menyenangkan, menumbuhkan, dan berkelanjutan sehingga dapat meningkatkan budaya membaca masyarakat Lumajang.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Misi', version: 1 }],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  value: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Menyelenggarakan kegiatan literasi yang menyenangkan dan mudah diakses oleh seluruh lapisan masyarakat Lumajang.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'listitem',
                  value: 2,
                  children: [
                    {
                      type: 'text',
                      text: 'Menyediakan koleksi buku yang dapat dipinjam dan dibaca oleh siapa saja secara gratis.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'listitem',
                  value: 3,
                  children: [
                    {
                      type: 'text',
                      text: 'Membangun jaringan komunitas baca yang solid dan inklusif, baik secara offline maupun online.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'listitem',
                  value: 4,
                  children: [
                    {
                      type: 'text',
                      text: 'Mendorong lahirnya penulis, pembicara, dan pegiat literasi baru dari Lumajang melalui program-program pengembangan diri.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'listitem',
                  value: 5,
                  children: [
                    {
                      type: 'text',
                      text: 'Berkolaborasi dengan berbagai pihak — individu, komunitas, maupun institusi — untuk memperluas dampak literasi di Kabupaten Lumajang.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'listitem',
                  value: 6,
                  children: [
                    {
                      type: 'text',
                      text: 'Menjaga keberlanjutan komunitas dengan sistem organisasi yang transparan dan bertanggung jawab.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    req,
  })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.updateGlobal({
    slug: 'biography-page',
    data: {
      content: null,
    },
    req,
  })
}