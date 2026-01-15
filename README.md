# Lulu Business Cards

A web application for creating and managing digital NFC business cards for Lulu Hypermarket employees. Admins can create contact profiles that generate QR codes and public contact pages. When employees scan the QR code or tap the NFC link, they are directed to a contact page where they can view details and download a vCard.

## Features

- **Admin Dashboard**: Manage all business card contacts
- **Contact Management**: Create, edit, and delete contact profiles with English and Arabic support
- **QR Code Generation**: Branded QR codes with Lulu logo for each contact
- **Public Contact Pages**: Mobile-friendly pages at `/c/[slug]` for each contact
- **vCard Download**: One-click contact saving to phone
- **Authentication**: Secure admin access with Better Auth

## Tech Stack

- **Framework**: Next.js 16.1.2 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **QR Code**: qrcode library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lulu-business-cards
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Push the database schema:
   ```bash
   bunx drizzle-kit push
   ```

5. Seed the database (creates admin user and sample contact):
   ```bash
   bun run scripts/seed.ts
   ```

6. Start the development server:
   ```bash
   bun dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── (auth)/sign-in/      # Sign-in page
│   ├── admin/               # Admin dashboard
│   │   ├── contacts/new/    # Create contact
│   │   └── contacts/[id]/   # Edit & QR code pages
│   ├── api/                 # API routes
│   │   ├── auth/            # Better Auth endpoints
│   │   ├── contacts/        # Contact CRUD
│   │   └── vcard/           # vCard generation
│   └── c/[slug]/            # Public contact page
├── components/              # React components
├── db/                      # Database schema
├── lib/                     # Utilities & auth config
└── public/                  # Static assets
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to admin dashboard |
| `/sign-in` | Admin sign-in page |
| `/admin` | Admin dashboard - list all contacts |
| `/admin/contacts/new` | Create new contact |
| `/admin/contacts/[id]/edit` | Edit existing contact |
| `/admin/contacts/[id]/qr` | View/download QR code |
| `/c/[slug]` | Public contact page (QR/NFC destination) |
| `/api/vcard/[slug]` | Download vCard file |

## Database Schema

### Contacts Table
- `id` - Auto-incrementing primary key
- `slug` - URL-friendly unique identifier
- `nameEn` / `nameAr` - Name in English/Arabic
- `positionEn` / `positionAr` - Position in English/Arabic
- `location` - Office location
- `phone` - Phone number
- `email` - Email address
- `website` - Website (default: luluhypermarket.com)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | List all contacts |
| POST | `/api/contacts` | Create contact |
| GET | `/api/contacts/[id]` | Get contact by ID |
| PUT | `/api/contacts/[id]` | Update contact |
| DELETE | `/api/contacts/[id]` | Delete contact |
| GET | `/api/vcard/[slug]` | Download vCard |

## Deployment

The application is designed to be deployed on Vercel. Set the following environment variables in your production environment:

- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key (min 32 characters)
- `BETTER_AUTH_URL` - Production URL
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Production URL (for client)

## License

Private - Lulu Group International
