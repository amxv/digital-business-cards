# Digital Business Cards

A general-purpose web app for creating and managing digital business cards. Admins can create contact profiles, generate branded QR codes, and share public contact pages that let recipients save a vCard to their phone.

## Features

- Admin dashboard for managing contacts
- Contact profiles with name, title, location, phone, email, and website
- Branded QR codes with a configurable center logo
- Mobile-friendly public contact pages at `/c/[slug]`
- One-click vCard download
- Better Auth-based admin authentication

## Branding

Branding is centralized in [lib/app-config.ts](/Users/ashray/code/amxv/lulu-business-cards/lib/app-config.ts). You can customize the app name, organization name, description, default website, and logo through `NEXT_PUBLIC_*` environment variables.

By default, the app uses [public/brand-logo.svg](/Users/ashray/code/amxv/lulu-business-cards/public/brand-logo.svg). To swap branding:

1. Replace the logo asset in `public/`, or point `NEXT_PUBLIC_LOGO_PATH` at another public asset.
2. Set the branding variables in your environment.
3. Redeploy or restart the app.

## Tech Stack

- Next.js 16 App Router
- TypeScript
- PostgreSQL on Neon
- Drizzle ORM
- Better Auth
- Tailwind CSS v4
- shadcn/ui + Radix UI
- `qrcode` for QR generation

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Configure environment variables:
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`
   - `NEXT_PUBLIC_BETTER_AUTH_URL`
   - Optional branding vars:
     - `NEXT_PUBLIC_APP_NAME`
     - `NEXT_PUBLIC_ORGANIZATION_NAME`
     - `NEXT_PUBLIC_APP_DESCRIPTION`
     - `NEXT_PUBLIC_DEFAULT_WEBSITE`
     - `NEXT_PUBLIC_LOGO_PATH`
     - `NEXT_PUBLIC_LOGO_ALT`
     - `NEXT_PUBLIC_LOGO_WIDTH`
     - `NEXT_PUBLIC_LOGO_HEIGHT`

3. Push the database schema:
   ```bash
   bunx drizzle-kit push
   ```

4. Seed the database:
   ```bash
   bun run scripts/seed.ts
   ```

5. Start development:
   ```bash
   bun dev
   ```

## Data Model

The contact model includes:

- `nameEn`
- `positionEn`
- `location`
- `phone`
- `email`
- `website`
- `slug`

## Deployment

The app is ready to deploy on Vercel or any Next.js-compatible platform. Make sure your production environment includes the database, auth, and any branding variables you want to override.
