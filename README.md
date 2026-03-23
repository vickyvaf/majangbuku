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
    Make sure the variables in the `.env` file match the Docker internal database service. You can copy the content from `.env.example`:
    ```env
    DATABASE_USER=postgres
    DATABASE_PASSWORD=password
    DATABASE_NAME=majangbuku
    DATABASE_PORT=5435
    DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}
    PAYLOAD_SECRET=YOUR_SECRET_HERE
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
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
    Set the database credentials in your `.env` file:
    ```env
    DATABASE_USER=your-user
    DATABASE_PASSWORD=your-password
    DATABASE_NAME=majangbuku
    DATABASE_PORT=5432 # Default PostgreSQL port
    DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}
    PAYLOAD_SECRET=your-secret
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
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
