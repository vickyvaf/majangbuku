import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
    await payload.updateGlobal({
        slug: 'home-page',
        data: {
            defaultSubtitle: 'Selamat Datang di Majang Buku',
            defaultTitle: 'Kegiatan Pilihan',
            defaultDescription: 'Jelajahi berbagai inisiatif literasi bersama kami',
            strips: [
                {
                    title: 'Piknik Buku',
                    subtitle: 'Program Literasi',
                    description: 'Membaca bersama di alam terbuka Lumajang.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Klub Lima Pagi',
                    subtitle: 'Kebiasaan Baik',
                    description: 'Membangun kebiasaan baik sejak matahari terbit.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Diam-Diam Baca',
                    subtitle: 'Ketenangan Jiwa',
                    description: 'Hening dalam kata, ramai dalam pikiran.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'LCW 2024',
                    subtitle: 'Event Akbar',
                    description: 'Literasi Camp & Workshop untuk Lumajang.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Bedah Buku',
                    subtitle: 'Diskusi Sastra',
                    description: 'Mengupas tuntas makna di balik lembaran.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Pojok Baca',
                    subtitle: 'Ruang Nyaman',
                    description: 'Ruang nyaman untuk imajinasi tanpa batas.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Donasi Buku',
                    subtitle: 'Berbagi Ilmu',
                    description: 'Berbagi ilmu, menebar manfaat.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Workshop Menulis',
                    subtitle: 'Edukasi Menulis',
                    description: 'Ubah ide menjadi kata-kata bermakna.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Katalog Koleksi',
                    subtitle: 'Layanan Perpustakaan',
                    description: 'Telusuri ribuan buku favoritmu.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
                },
                {
                    title: 'Relawan Literasi',
                    subtitle: 'Komunitas',
                    description: 'Bergabunglah memajukan literasi Lumajang.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
                },
            ],
        },
    })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
    await payload.updateGlobal({
        slug: 'home-page',
        data: {
            strips: [],
        },
    })
}