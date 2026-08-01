# ShareGear - Peer-to-Peer Gear Rental & Sharing Platform

ShareGear is a modern, scalable full-stack web application designed to simplify equipment rental and sharing. Built with Next.js 16 (App Router), TypeScript, and a microservice/REST architecture, the platform connects gear owners with renters while offering robust administrative controls.

---

## 🔗 Quick Links & Media

- **Live Application:** [https://share-gear.vercel.app](https://share-gear.vercel.app/)
- **Backend Repository:** [https://github.com/Rafi-Shariar/PHL2-A4-GearUp](https://github.com/Rafi-Shariar/PHL2-A4-GearUp)
- **Video Walkthrough / Demo:** [LINK](https://drive.google.com/file/d/1_TTDyJVV50sfm9lOJScmx5l3qgpFogt-/view?usp=sharing)

---

## Key Features & Capabilities

### 1. Role-Based Dashboards
- **Customer Dashboard:** Browse catalog, manage rental bookings, track rental statuses, and view invoice history.
- **Provider Dashboard:** List new gear with media uploads, update equipment availability, track active rentals, and monitor earnings.
- **Admin Dashboard:** Manage user accounts, verify platform inventory, resolve dispute tickets, and view platform-wide analytics.

### 2. Enterprise Authentication & Security
- **JWT Cookie Sync:** Uses `accessToken` and `refreshToken` stored in `HTTP-only` cookies for maximum protection against XSS.
- **Deep-Link Dynamic Redirects:** Smart return handling via `redirectTo` query parameters ensures seamless user journeys post-authentication (e.g., returning directly to gear details after login).
- **Auto-Login on Registration:** Automatic token issue upon signup to streamline user onboarding directly into their personal dashboard.

### 3. High-Performance UI & State Management
- **Optimized Server Actions:** Next.js Server Actions used for authentication and form submissions to prevent CORS issues and maintain secure cookie handling.
- **Client State Caching:** Powered by TanStack Query for background refetching and Zustand for global UI state persistence.
- **Modern Animations:** Integrated GSAP and Lottie React for dynamic UI transitions without compromising page speed.

---

## Demo Credentials (Admin Access)

For evaluation purposes, use the administrator credentials below to access full platform privileges:

| Privilege Level | Email Address | Password |
| :--- | :--- | :--- |
| **System Administrator** | `admin@gmail.com` | `12345` |

---

## Tech Stack Architecture

### Frontend Layer
- **Core Framework:** Next.js `16.2.12` (App Router)
- **Language:** TypeScript `5.x`
- **UI & Styling:** Tailwind CSS v4, Shadcn UI, Radix UI Primitives, Lucide React
- **Data Management:** TanStack Query `v5`, SWR, Zustand `v5`
- **Form Controls:** React Hook Form, Zod `v4` Schema Validation
- **Visuals & Motion:** GSAP `3.15`, Lottie React, TW Animate CSS

### Backend & Database Layer
- **Runtime Environment:** Node.js / Express.js
- **Database ORM:** Prisma ORM with PostgreSQL / MongoDB
- **Security Middleware:** JSON Web Tokens (`jsonwebtoken`), Cookie Parser, CORS

---

## Getting Started Locally

Follow these instructions to set up the frontend workspace on your local environment.

### Prerequisites

Ensure you have the following tools installed:
- **Node.js:** `v18.17.0` or higher
- **Package Manager:** `npm` (v9+) or `pnpm` / `yarn`

---

### Step-by-Step Local Setup

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/Rafi-Shariar/A5-RentGear](https://github.com/Rafi-Shariar/A5-RentGear)
   cd sharegear-frontend