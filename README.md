# Majang Buku - Payload CMS

This project is a content management system (CMS) based on Payload CMS, using **Supabase** (PostgreSQL) as its database.

## Preview
<img width="1418" height="796" alt="Screenshot 2026-03-24 at 00 18 27" src="https://github.com/user-attachments/assets/dac8313b-9aa3-46b9-9415-3afa16d5c3b4" />

## Requirements

- [pnpm v9](https://pnpm.io/) (via Corepack)
- [Supabase Account](https://supabase.com/) (Managed Database)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (Optional for local development)

---

## 🛠️ Setup (Corepack)

This project uses Corepack to define a consistent version of pnpm (v9.15.9). Make sure Corepack is active:

```bash
corepack enable
```

After that, the `pnpm` command will automatically use the version specified in `package.json`.

---

## 🚀 Quick Start (Supabase) - **Recommended**

The project is configured to use Supabase for its database.

1.  **Configure `.env`:**
    Copy the connection string from your Supabase project dashboard (Settings > Database > Connection string > URI). Use the **Transaction Mode** (Port 6543) if you use connection pooling, or **Session Mode** (Port 5432) for direct connections.

    ```env
    DATABASE_URI=
    PAYLOAD_SECRET=
    NEXT_PUBLIC_SERVER_URL=
    S3_ENDPOINT=
    S3_REGION=
    S3_ACCESS_KEY_ID=
    S3_SECRET_ACCESS_KEY=
    S3_BUCKET=
    ```

2.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

3.  **Sync Database Schema:**

    ```bash
    pnpm payload:db-push
    ```

4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```

---

## 🛠️ Local Development (With Docker)

If you prefer to run a local PostgreSQL instance:

1.  **Configure `.env` for Docker:**
    ```env
    DATABASE_URI=
    PAYLOAD_SECRET=
    NEXT_PUBLIC_SERVER_URL=
    S3_ENDPOINT=
    S3_REGION=
    S3_ACCESS_KEY_ID=
    S3_SECRET_ACCESS_KEY=
    S3_BUCKET=
    ```
2.  **Run Docker Compose:**
    ```bash
    docker compose up -d
    ```

---

## 📝 Useful Commands

- **Stop Docker:**
  ```bash
  docker compose down
  ```
- **View Logs (Docker):**
  ```bash
  docker compose logs -f payload
  ```
- **Generate Types (TypeScript):**
  ```bash
  pnpm generate:types
  ```
- **Generate Import Map:**
  ```bash
  pnpm generate:importmap
  ```
- **Push Database Schema:**
  ```bash
  pnpm payload:db-push
  ```
- **Run Development Server (Clean):**
  ```bash
  pnpm devsafe
  ```
- **Build Project:**
  ```bash
  pnpm build
  ```
- **Run Tests:**
  ```bash
  pnpm test
  ```

---

## 🏗️ Project Structure

- `src/collections/`: Configuration for data collections (Users, Media, Events, etc).
- `src/globals/`: Configuration for global data (Biography, Settings, etc).
- `src/app/`: Next.js application folder (contains frontend and admin routes).
- `public/`: Static files such as images, logos, and favicons.

## ⚖️ License

This project is private. Any use must have the permission of the owner.
