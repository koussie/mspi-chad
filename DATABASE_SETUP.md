# Database Setup Instructions

## Important: Database Password Required

The `.env` file contains placeholder `[YOUR-PASSWORD]` in the DATABASE_URL. You need to replace this with your actual Supabase database password.

### Steps:

1. **Get your Supabase password**:
   - Go to your Supabase project dashboard
   - Navigate to Settings > Database
   - Copy your database password (or reset it if needed)

2. **Update the `.env` file**:

   Replace `[YOUR-PASSWORD]` in these lines:

   ```env
   DATABASE_URL="postgresql://postgres.zvoosidxrvkyabagvynf:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.zvoosidxrvkyabagvynf:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
   ```

3. **Run database migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed the database**:

   ```bash
   npm run prisma:seed
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

## Alternative: Use Local PostgreSQL

If you prefer to use a local PostgreSQL database:

1. Install PostgreSQL locally
2. Create a database: `createdb mspi`
3. Update `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mspi"
   ```
4. Run migrations and seed as above

## Supabase Project Details

- **Project URL**: https://zvoosidxrvkyabagvynf.supabase.co
- **Project ID**: zvoosidxrvkyabagvynf
- **Region**: EU Central 1

The anon key is already configured in the `.env` file and doesn't need to be changed.
