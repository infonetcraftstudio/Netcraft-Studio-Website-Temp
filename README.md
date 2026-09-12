# NetCraft Studio — React & Vite Multi-Page Application

Modern digital product studio platform built with **React**, **Vite**, **React Router**, and **Lucide Icons**. Features dedicated multi-page routing, smooth sequential scroll flow navigation, and a comprehensive **Admin Portal** to manage projects, team members, client reviews, contact details, and incoming inquiries.

---

## Features

- **Dedicated Multi-Page Routing**:
  - `/` — **Home**: Hero section with interactive geometric art, company telemetry, stats, and featured showcase.
  - `/about` — **About Studio**: Philosophy, core values, and live senior team members grid.
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
  - **Manage Members**: Full CRUD for team members (names, roles, bios, skill tags, avatar photos).
  - **Manage Clients**: Full CRUD for partner companies, testimonials, ratings, and delivered projects.
  - **Contact Details & Inquiries Inbox**: Edit live company telephone, email, address, coordinates, and view/reply/archive incoming messages submitted from the contact form.
  - **Backup & Reset**: Export data snapshot to JSON, import backups, or restore factory defaults.
- **Persistent State**:
  - Changes made in the Admin Portal immediately update the user-facing pages in real time via React Context + `localStorage`.

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

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## Admin Portal Access

- **URL**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Default Passcode**: `admin123` *(or click "Log in with default" on the login screen)*
