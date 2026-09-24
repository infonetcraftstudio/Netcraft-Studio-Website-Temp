# Netcraft Studio — React & Vite Multi-Page Application

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
  - Changes made in the Admin Portal are persisted directly to Supabase from the browser through the publishable client key. React Context updates the user-facing pages immediately while the database request completes.

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

Vercel hosts this as a static Vite application. Configure the browser-safe Supabase variables before building; no Node server or API deployment is required.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Supabase Persistence

The frontend stores projects, clients, inquiries, and things to do as individual rows in Supabase tables. Each record payload is stored as flexible `jsonb`. Contact information and services are stored as `jsonb` in `studio_settings`.

1. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor.

## Enquiry Email Delivery

Enquiries are saved to `studio_inquiries` first, then the Vercel function at `/api/send-inquiry` uses Nodemailer to send:

- A detailed requirement notification to `INQUIRY_TO_EMAIL` or `GMAIL_USER`.
- A formatted thank-you email to the client.

Add these server-only values to the local `.env` file:

```env
GMAIL_USER=info.netcraftstudio@gmail.com
GMAIL_APP_PASSWORD=your-16-character-google-app-password
INQUIRY_TO_EMAIL=info.netcraftstudio@gmail.com
```

`GMAIL_APP_PASSWORD` must be a Google App Password created after enabling 2-Step Verification. Never expose it through `VITE_` variables or commit it.

Run the Vite development server locally:

```bash
npm run dev
```

On Vercel, deploy the `api/send-inquiry.js` function automatically with the normal Vite settings. No Express server, `vercel.json`, or `api/index.js` is required.

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor to create the tables and browser access policies. Never put a service-role key in frontend environment variables.

---

## Admin Portal Access

- **URL**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Default Passcode**: `admin123` *(or click "Log in with default" on the login screen)*
