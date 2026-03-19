# Majang Buku - Payload CMS

This project is a content management system (CMS) based on Payload CMS, using PostgreSQL as its database.

## Requirements
- [pnpm v9](https://pnpm.io/) (via Corepack)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Setup (Corepack)
This project uses Corepack to define a consistent version of pnpm (v9.15.9). Make sure Corepack is active:
```bash
corepack enable
```
After that, the `pnpm` command will automatically use the version specified in `package.json`.

---

## 🚀 Quick Start (Docker Compose) - **Recommended**

The easiest way to run this project along with its database is via Docker:

1.  **Configure `.env` for Docker:**
    Make sure `DATABASE_URL` in the `.env` file points to the Docker internal database service:
    ```env
    DATABASE_URL=replace-with-your-database-url
    PAYLOAD_SECRET=replace-with-your-secret
    ```
2.  **Run Docker Compose:**
    ```bash
    docker compose up -d --build
    ```
3.  **Access Application:**
    - **Website:** [http://localhost:3000](http://localhost:3000)
    - **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🛠️ Local Development (Without Docker)

If you wish to run the application directly on your local machine (requires local PostgreSQL):

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
2.  **Configure `.env`:**
    Change `DATABASE_URL` to your local PostgreSQL database:
    ```env
    DATABASE_URL=replace-with-your-database-url
    ```
3.  **Run Development Server:**
    ```bash
    pnpm dev
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
- **Build Project:**
  ```bash
  pnpm build
  ```

---

## 🏗️ Project Structure

- `src/collections/`: Configuration for data collections (Users, Media, Events, etc).
- `src/globals/`: Configuration for global data (Biography, Settings, etc).
- `src/app/`: Next.js application folder (contains frontend and admin routes).
- `public/`: Static files such as images, logos, and favicons.

## ⚖️ License
This project is private. Any use must have the permission of the owner.
