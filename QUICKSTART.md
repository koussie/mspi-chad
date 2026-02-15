# Quick Start Guide

## Immediate Next Steps

You now have a **complete Next.js 14+ government website** for the Ministry of Public Security and Immigration of Chad. Here's how to get it running:

### 1. Update Database Credentials

**IMPORTANT**: The `.env` file contains placeholder `[YOUR-PASSWORD]`.

Open `.env` and replace `[YOUR-PASSWORD]` with your Supabase database password in these two lines:

```env
DATABASE_URL="postgresql://postgres.zvoosidxrvkyabagvynf:[YOUR-PASSWORD]@..."
DIRECT_URL="postgresql://postgres.zvoosidxrvkyabagvynf:[YOUR-PASSWORD]@..."
```

Your Supabase password can be found in:
- Supabase Dashboard → Settings → Database → Database Password

### 2. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This creates all required tables in your Supabase database.

### 3. Seed Demo Content

```bash
npm run prisma:seed
```

This populates the database with:
- **Admin user**: admin@mspi.gov.td / ChangeMe2024!
- 6 citizen services
- 5 government departments
- 3 cabinet members
- 3 news articles
- 3 publications
- Content pages

### 4. Start Development Server

```bash
npm run dev
```

Visit:
- **French**: http://localhost:3000/fr
- **Arabic**: http://localhost:3000/ar
- **Admin**: http://localhost:3000/admin (login with seeded credentials)

## What You Have

### ✅ Complete Features

1. **Public Website**:
   - Home page with scrollable sections
   - About page with mission/vision/values
   - News listing and detail pages
   - Services catalog
   - Organization (Cabinet + Departments)
   - Media library (Photos + Videos placeholders)
   - Publications with download links
   - Contact page with form

2. **Complaints System**:
   - Public submission form (anonymous or identified)
   - Reference code + PIN generation
   - SMS queue infrastructure (ready for Airtel/Moov)
   - Tracking page with status lookup
   - Full database schema with attachments support

3. **Multilingual (FR/AR)**:
   - Complete translations in `src/messages/`
   - RTL support for Arabic
   - Language switcher in header
   - Clean URLs (`/fr/...`, `/ar/...`)

4. **Infrastructure**:
   - Prisma ORM with full schema
   - PostgreSQL (Supabase)
   - Next.js 14+ App Router
   - TailwindCSS (minimal institutional design)
   - SMS abstraction layer
   - File upload structure

5. **Documentation**:
   - `README.md`: Complete deployment and usage guide
   - `DATABASE_SETUP.md`: Database configuration details
   - `QUICKSTART.md` (this file): Immediate getting started
   - Inline code comments

### 🔨 To Be Completed (Admin Dashboard)

The admin dashboard structure is prepared but needs implementation:

**Required pages**:
- `/admin/login` - With 2FA TOTP
- `/admin/dashboard` - Overview and statistics
- `/admin/news` - CRUD for news articles
- `/admin/departments` - CRUD for departments
- `/admin/services` - CRUD for citizen services
- `/admin/media` - Photo albums and video management
- `/admin/publications` - Document uploads and management
- `/admin/complaints` - View, filter, assign, update status, send SMS
- `/admin/cabinet` - Cabinet members management
- `/admin/pages` - Edit About/Minister message content

**Implementation approach**:
1. Create admin layout with sidebar navigation
2. Implement NextAuth.js login with bcrypt password check
3. Add TOTP 2FA setup and verification (using `otpauth` + `qrcode`)
4. Create CRUD forms for each entity
5. Add file upload handling for images and PDFs
6. Implement complaints filter and management UI
7. Add audit logging for all admin actions

## Project Structure Overview

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (public)/          # All public pages (COMPLETE)
│   │   │   ├── page.tsx       # Home with sections
│   │   │   ├── about/
│   │   │   ├── complaints/    # Submission + Tracking
│   │   │   ├── contact/
│   │   │   ├── news/          # List + Detail
│   │   │   ├── organization/
│   │   │   ├── services/
│   │   │   ├── publications/
│   │   │   └── media/
│   │   └── admin/             # To be built
│   └── api/
│       └── complaints/        # Submit + Track API (COMPLETE)
├── components/
│   ├── Header.tsx             # With coat of arms placeholder
│   └── Footer.tsx             # Black institutional design
├── lib/
│   ├── prisma.ts              # Database client
│   ├── sms.ts                 # SMS infrastructure (ready)
│   └── utils.ts               # Reference code, PIN generation
└── messages/
    ├── fr.json                # Complete French translations
    └── ar.json                # Complete Arabic translations
```

## Key Files to Customize

### 1. Logo/Coat of Arms

File: `src/components/Header.tsx` (line ~40)

Replace placeholder with actual coat of arms image:

```tsx
<img
  src="/images/coat-of-arms.png"
  alt="République du Tchad"
  className="w-full h-full object-contain"
/>
```

### 2. Stock Images

The seed data uses Pexels stock images. Replace URLs in:
- Database (`news.coverImage`, `media_albums.coverImage`)
- Home page hero: `src/app/[locale]/(public)/page.tsx` (line ~32)

### 3. Contact Information

Update in:
- `src/components/Footer.tsx`
- `src/app/[locale]/(public)/contact/page.tsx`
- Database seed: `prisma/seed.ts`

### 4. SMS Providers

When ready to activate:
1. Set `SMS_ENABLED="true"` in `.env`
2. Add API credentials for Airtel or Moov
3. Implement API calls in `src/lib/sms.ts`
4. Set up cron job to process `sms_outbox` table

## Design Philosophy

The design follows **governmental institutional standards**:

- ✅ Minimal, clean, sober aesthetic
- ✅ Black/white base with institutional blue accents
- ✅ Large typography and generous white space
- ✅ No flashy gradients or AI-looking components
- ✅ Inspired by https://mahamatidrissdeby.td/
- ✅ Optimized for low-bandwidth connections

## Next Steps

1. **Get it running** (follow steps 1-4 above)
2. **Review and test** all public pages
3. **Customize content** via Prisma Studio or admin (when built)
4. **Replace placeholder images** with official photos
5. **Build admin dashboard** following the structure above
6. **Configure SMS** when credentials are available
7. **Deploy to production** (see README.md deployment section)

## Support

Questions? Check:
- `README.md` for full documentation
- `DATABASE_SETUP.md` for database configuration
- Prisma schema: `prisma/schema.prisma`
- Translations: `src/messages/fr.json` and `ar.json`

---

**Remember**: Change the admin password after first login!

Default credentials:
- Email: admin@mspi.gov.td
- Password: ChangeMe2024!
