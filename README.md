# NetCraft Studio — React & Vite Multi-Page Application

Modern digital product studio platform built with **React**, **Vite**, **React Router**, and **Lucide Icons**. Features dedicated multi-page routing, smooth sequential scroll flow navigation, and a comprehensive **Admin Portal** to manage projects, client reviews, contact details, and incoming inquiries.

---

## Features

- **Dedicated Multi-Page Routing**:
  - `/` — **Home**: Hero section with interactive geometric art, company telemetry, stats, and featured showcase.
  - `/about` — **About Studio**: Philosophy, core values, and engineering approach.
  - `/services` — **Capabilities**: In-depth breakdown of Web Development, AI & Emerging Tech, Digital Products, and Mobile Experiences.
  - `/projects` — **Selected Work**: Dynamic company portfolio with category filters, search bar, tech stack tags, and interactive Case Study modal.
  - `/clients` — **Partners & Clients**: Client roster, reviews, 5-star ratings, and project delivery logs.
  - `/contact` — **Contact Studio**: Working interactive project inquiry form, office location, studio hours, and direct telephone/email.
- **Sequential Page Navigation & Scroll Flow**:
  - Floating bottom navigator showing current step (`01 / 06 HOME`) with Previous/Next buttons and quick chapter jumps.
  - Bottom scroll detector prompt inviting users to advance naturally to the next page.
- **Admin Management Portal (`/admin`)**:
  - Passcode protected access (default passcode: `admin123` or `netcraft2026`).
  - **Overview Dashboard**: Live counters for projects, team specialists, clients, and inquiries.
  - **Manage Projects**: Full CRUD (Add / Edit / Delete), toggle featured status, tech stacks, live preview URLs.
  - **Manage Clients**: Full CRUD for partner companies, testimonials, ratings, and delivered projects.
  - **Contact Details & Inquiries Inbox**: Edit live company telephone, email, address, coordinates, and view/reply/archive incoming messages submitted from the contact form.
  - **Backup & Reset**: Export data snapshot to JSON, import backups, or restore factory defaults.
- **Persistent State**:
  - Changes made in the Admin Portal are sent through the Express API and persisted in Supabase. React Context updates the user-facing pages immediately while the database request completes.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

When the frontend and backend are hosted separately, set `VITE_API_URL` to the public URL of the deployed Express server before running `npm run build`. Deploy the `server/server.js` process separately with `npm run server`, and set `FRONTEND_URL` there to the hosted frontend origin. A static frontend host cannot run the Express backend or provide `/api` routes.

For a single-service deployment, use `npm run build` as the build command and `npm start` as the start command. Express serves the generated `dist` folder and `/api` routes from the same origin, so no `VITE_API_URL` is required.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Supabase Backend Persistence

The Express backend stores projects, clients, inquiries, and things to do as individual rows in Supabase tables. Each record payload is stored as flexible `jsonb`. Contact information and services are also stored as `jsonb` in `studio_settings`. It falls back to `server/data/studio-data.json` if Supabase is unavailable.

1. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor.
2. Add these variables to `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

The backend also accepts the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` variables, but a server-only service role key is recommended for backend writes. Never expose the service role key to the browser. The server will migrate data from the previous `studio_state` row when normalized tables are empty.

---

## Admin Portal Access

- **URL**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Default Passcode**: `admin123` *(or click "Log in with default" on the login screen)*
