# Ministry of Public Security and Immigration - Official Website

Official website of the Ministry of Public Security and Immigration (MSPI) of the Republic of Chad.

## Features

- **Multilingual Support**: French and Arabic with proper RTL layout
- **Institutional Design**: Clean, minimal, governmental aesthetic
- **Content Management**: Full admin dashboard for managing all content
- **Complaints System**: Public complaint submission and tracking with SMS notifications
- **Secure Authentication**: Admin login with 2FA TOTP support
- **Optimized Performance**: Built for low-bandwidth connections
- **Accessible**: WCAG compliant with proper keyboard navigation
- **Responsive**: Mobile-first design with breakpoints for all devices

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with 2FA TOTP
- **Styling**: TailwindCSS
- **Internationalization**: next-intl
- **Icons**: Lucide React

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data with demo content
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (public)/     # Public pages
│   │   │   │   ├── about/
│   │   │   │   ├── complaints/
│   │   │   │   ├── contact/
│   │   │   │   ├── news/
│   │   │   │   └── ...
│   │   │   └── admin/        # Admin dashboard (to be built)
│   │   └── api/              # API routes
│   ├── components/           # Shared components
│   ├── lib/                  # Utilities and libraries
│   ├── messages/             # i18n translations (fr.json, ar.json)
│   └── middleware.ts         # i18n middleware
├── public/
│   └── uploads/              # File uploads directory
├── docker-compose.yml        # Docker configuration
├── Dockerfile                # Production container
└── package.json
```

## Local Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ (or Supabase account)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:

```bash
cd /path/to/project
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure environment variables**:

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database (Use Supabase PostgreSQL connection string)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# SMS Providers (Optional, for later)
SMS_ENABLED="false"
AIRTEL_API_URL=""
AIRTEL_CLIENT_ID=""
AIRTEL_CLIENT_SECRET=""
AIRTEL_SENDER_ID="MSPI"

MOOV_API_URL=""
MOOV_API_KEY=""
MOOV_SENDER_ID="MSPI"

# Admin Credentials (for seed)
ADMIN_EMAIL="admin@mspi.gov.td"
ADMIN_PASSWORD="ChangeMe2024!"
```

4. **Generate Prisma Client**:

```bash
npx prisma generate
```

5. **Run database migrations**:

```bash
npx prisma migrate dev
```

6. **Seed the database with demo content**:

```bash
npm run prisma:seed
```

This will create:
- Admin user with credentials from `.env`
- 6 citizen services
- 5 government departments
- 3 cabinet members
- 3 news articles
- 3 publications
- About and Minister message pages

7. **Start the development server**:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Default locales:
- French: `http://localhost:3000/fr`
- Arabic: `http://localhost:3000/ar`

### Admin Access

After seeding, access the admin dashboard at:

```
http://localhost:3000/admin
```

Default credentials (from `.env`):
- **Email**: admin@mspi.gov.td
- **Password**: ChangeMe2024!

**IMPORTANT**: Change the admin password immediately after first login!

## Using Docker

### Development with Docker Compose

The `docker-compose.yml` file provides both PostgreSQL and the app:

```bash
# Start services
npm run docker:up

# Stop services
npm run docker:down
```

This will:
- Start PostgreSQL on port 5432
- Start the Next.js app on port 3000

### Production Build

Build the Docker image:

```bash
docker build -t mspi-website .
```

Run the container:

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="https://yourdomain.com" \
  mspi-website
```

## Content Management

### Replacing Placeholder Content

All content is stored in the PostgreSQL database and can be managed through:

1. **Admin Dashboard**: Log in to `/admin` to manage content via the UI
2. **Direct Database Access**: Use Prisma Studio to edit data directly

```bash
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` to edit database records.

### Replacing Images

#### Stock Images

The seed data uses Pexels stock images. To replace them:

1. Upload your images to `/public/uploads/` or a CDN
2. Update the image URLs in the database through the admin dashboard or Prisma Studio

#### Coat of Arms

Replace the placeholder "COAT OF ARMS" text in the header:

1. Add the coat of arms image to `/public/images/coat-of-arms.png`
2. Edit `src/components/Header.tsx`:

```tsx
// Replace this:
<div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
  <span className="text-[10px] text-gray-500 font-semibold text-center px-1">
    COAT OF ARMS
  </span>
</div>

// With this:
<img
  src="/images/coat-of-arms.png"
  alt="République du Tchad"
  className="w-full h-full object-contain"
/>
```

## SMS Configuration

The system includes an SMS infrastructure ready for Airtel Chad and Moov Africa Chad integration.

### Current State

- SMS sending is **disabled by default**
- All SMS are queued in the `sms_outbox` table with status `PENDING`
- When a complaint is submitted, an SMS record is created with the PIN code

### Activating SMS

1. **Obtain API credentials** from Airtel Chad or Moov Africa Chad
2. **Update `.env`**:

```env
SMS_ENABLED="true"

# For Airtel
AIRTEL_API_URL="https://api.airtel.td/v1/sms"
AIRTEL_CLIENT_ID="your-client-id"
AIRTEL_CLIENT_SECRET="your-client-secret"
AIRTEL_SENDER_ID="MSPI"

# For Moov
MOOV_API_URL="https://api.moov.td/v1/sms"
MOOV_API_KEY="your-api-key"
MOOV_SENDER_ID="MSPI"
```

3. **Implement provider methods** in `src/lib/sms.ts`:

Update the `AirtelProvider` and `MoovProvider` classes with actual API calls:

```typescript
class AirtelProvider implements SmsService {
  async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      // Implement Airtel API call here
      const response = await fetch(process.env.AIRTEL_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getToken()}`,
        },
        body: JSON.stringify({
          to: phone,
          message,
          from: process.env.AIRTEL_SENDER_ID,
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('[Airtel] SMS error:', error);
      return false;
    }
  }

  private async getToken(): Promise<string> {
    // Implement OAuth token retrieval for Airtel
    // ...
  }
}
```

4. **Create a cron job** to process pending SMS:

```bash
# Add to crontab
*/5 * * * * curl http://localhost:3000/api/sms/process
```

Or use a job scheduler in your production environment.

5. **Monitor the `sms_outbox` table** for failed messages and retry logic.

## Database Schema

### Key Tables

- **admin_users**: Admin authentication
- **page_contents**: Dynamic pages (About, Minister Message, etc.)
- **news**: News articles and official statements
- **departments**: Ministry departments and leadership
- **cabinet_members**: Cabinet members
- **citizen_services**: Public services with links
- **media_albums**, **media_photos**, **media_videos**: Media library
- **publications**: Official documents (PDFs, images)
- **request_tickets**: Citizen complaints and requests
- **request_attachments**: File attachments for complaints
- **sms_outbox**: SMS queue for notifications
- **audit_logs**: Admin action logging

### Adding Custom Fields

To add new fields to existing tables:

1. Edit `prisma/schema.prisma`
2. Run migration:

```bash
npx prisma migrate dev --name add_custom_field
```

3. Update the admin UI and forms accordingly

## Deployment

### Requirements

- VPS with Ubuntu 20.04+ or similar
- Nginx for reverse proxy
- PostgreSQL 14+
- SSL certificate (Let's Encrypt)
- Node.js 20+

### Deployment Steps

1. **Server Setup**:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Clone and Build**:

```bash
# Clone repository
git clone <your-repo-url> /var/www/mspi

# Navigate to project
cd /var/www/mspi

# Install dependencies
npm ci --production

# Build the application
npm run build
```

3. **Configure Environment**:

```bash
# Create production .env
nano .env

# Set production variables
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://mspi.gov.td"
NEXTAUTH_SECRET="strong-production-secret"
SMS_ENABLED="true"
# ... other variables
```

4. **Database Setup**:

```bash
# Run migrations
npx prisma migrate deploy

# Seed initial data
npm run prisma:seed
```

5. **Start with PM2**:

```bash
# Start the app
pm2 start npm --name "mspi-website" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

6. **Configure Nginx**:

```nginx
server {
    listen 80;
    server_name mspi.gov.td www.mspi.gov.td;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Increase upload size for file uploads
    client_max_body_size 10M;
}
```

Save to `/etc/nginx/sites-available/mspi` and enable:

```bash
sudo ln -s /etc/nginx/sites-available/mspi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **SSL Certificate**:

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d mspi.gov.td -d www.mspi.gov.td
```

8. **Backups**:

Create a backup script `/usr/local/bin/backup-mspi.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mspi"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
pg_dump -U postgres mspi > $BACKUP_DIR/db_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/mspi/public/uploads

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
```

Add to crontab:

```bash
# Daily backup at 2 AM
0 2 * * * /usr/local/bin/backup-mspi.sh
```

9. **Monitoring**:

```bash
# View logs
pm2 logs mspi-website

# Monitor resources
pm2 monit

# Check status
pm2 status
```

### Security Considerations

1. **Firewall**: Configure UFW or iptables
2. **Rate Limiting**: Implement rate limiting on sensitive endpoints
3. **File Uploads**: Validate file types and sizes
4. **Regular Updates**: Keep dependencies updated
5. **Database Backups**: Automated daily backups
6. **SSL**: Always use HTTPS in production
7. **Environment Variables**: Never commit `.env` to version control

## Admin Dashboard (To Be Completed)

The admin dashboard structure is prepared. Key features to implement:

1. **Authentication**:
   - Login with email/password
   - 2FA TOTP setup and verification
   - Session management

2. **Content Management**:
   - CRUD for News, Departments, Services, Cabinet Members
   - Media library management (albums, photos, videos)
   - Publications management (PDF/image uploads)
   - Page content editor (About, Minister Message)

3. **Complaints Management**:
   - View all complaints with filters
   - Assign to departments
   - Update status
   - Write public messages
   - Send SMS notifications

4. **Dashboard**:
   - Statistics overview
   - Recent activities
   - Pending complaints count

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database with demo data
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues

- Verify `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Check firewall rules

### SMS Not Sending

- Verify `SMS_ENABLED="true"` in `.env`
- Check API credentials
- Review `sms_outbox` table for errors
- Check provider-specific logs

## Support

For issues or questions:
- Email: contact@mspi.gov.td
- Phone: +235 22 52 XX XX

## License

© 2024 Ministry of Public Security and Immigration - Republic of Chad. All rights reserved.
