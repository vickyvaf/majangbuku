# Majang Buku - Payload CMS

Proyek ini adalah sistem manajemen konten (CMS) berbasis Payload CMS yang menggunakan PostgreSQL sebagai database-nya.

## Persyaratan
- [pnpm v9](https://pnpm.io/) (via Corepack)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Persiapan (Corepack)
Proyek ini menggunakan Corepack untuk mementukan versi pnpm yang konsisten (v9.15.9). Pastikan Corepack sudah aktif:
```bash
corepack enable
```
Setelah itu, perintah `pnpm` akan secara otomatis menggunakan versi yang ditentukan di `package.json`.

---

## 🚀 Memulai Cepat (Docker Compose) - **Direkomendasikan**

Cara termudah untuk menjalankan proyek ini beserta databasenya adalah menggunakan Docker:

1.  **Salin file environment:**
    ```bash
    cp .env.example .env
    ```
2.  **Konfigurasi `.env` untuk Docker:**
    Pastikan `DATABASE_URL` di file `.env` mengarah ke layanan database internal Docker:
    ```env
    DATABASE_URL=postgresql://postgres:password@postgres:5432/majangbuku
    PAYLOAD_SECRET=ganti-dengan-secret-anda
    ```
3.  **Jalankan Docker Compose:**
    ```bash
    docker compose up -d --build
    ```
4.  **Akses Aplikasi:**
    - **Website:** [http://localhost:3000](http://localhost:3000)
    - **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🛠️ Pengembangan Lokal (Tanpa Docker)

Jika Anda ingin menjalankan aplikasi secara langsung di mesin lokal Anda (memerlukan PostgreSQL lokal):

1.  **Instal Dependensi:**
    ```bash
    pnpm install
    ```
2.  **Konfigurasi `.env`:**
    Ubah `DATABASE_URL` ke database PostgreSQL lokal Anda:
    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/majangbuku
    ```
3.  **Jalankan Server Pengembangan:**
    ```bash
    pnpm dev
    ```

---

## 📝 Perintah Berguna

- **Mematikan Docker:**
  ```bash
  docker compose down
  ```
- **Melihat Log (Docker):**
  ```bash
  docker compose logs -f payload
  ```
- **Generate Tipe (TypeScript):**
  ```bash
  pnpm generate:types
  ```
- **Build Proyek:**
  ```bash
  pnpm build
  ```

---

## 🏗️ Struktur Proyek

- `src/collections/`: Konfigurasi untuk koleksi data (Users, Media, Events, dll).
- `src/globals/`: Konfigurasi untuk data global (Biography, Settings, dll).
- `src/app/`: Folder aplikasi Next.js (berisi route frontend dan admin).
- `public/`: File statis seperti gambar, logo, dan favicon.

## ⚖️ Lisensi
Proyek ini bersifat pribadi. Segala penggunaan harus seizin pemilik.
