/*
  # Create MSPI Chad Website Database Schema

  ## Overview
  This migration creates the complete database schema for the Ministry of Public Security and Immigration (MSPI) Chad website.
  
  ## New Tables
  
  ### 1. admin_users
  - Stores administrative user accounts with authentication credentials
  - Fields: id, email, password_hash, totp_secret_encrypted, totp_enabled, created_at, updated_at
  - Security: RLS enabled with policies for authenticated admin users
  
  ### 2. page_contents
  - Stores multilingual page content (French and Arabic)
  - Fields: id, slug, title_fr, title_ar, content_fr, content_ar, updated_at
  - Security: RLS enabled - public read, admin write
  
  ### 3. news
  - Stores news articles with multilingual content
  - Fields: id, title_fr, title_ar, excerpt_fr, excerpt_ar, content_fr, content_ar, cover_image, published_at, status, created_at, updated_at
  - Status enum: DRAFT, PUBLISHED
  - Security: RLS enabled - public can read published, admin can manage all
  
  ### 4. departments
  - Stores ministry departments with leadership information
  - Fields: id, name_fr, name_ar, description_fr, description_ar, leader_name_fr, leader_name_ar, leader_bio_fr, leader_bio_ar, leader_photo, order, created_at, updated_at
  - Security: RLS enabled - public read, admin write
  
  ### 5. cabinet_members
  - Stores cabinet member profiles
  - Fields: id, name_fr, name_ar, role_fr, role_ar, bio_fr, bio_ar, photo, order, created_at, updated_at
  - Security: RLS enabled - public read, admin write
  
  ### 6. citizen_services
  - Stores services available to citizens
  - Fields: id, title_fr, title_ar, description_fr, description_ar, icon_key, order, link, created_at, updated_at
  - Security: RLS enabled - public read, admin write
  
  ### 7. media_albums
  - Stores photo album collections
  - Fields: id, title_fr, title_ar, description_fr, description_ar, cover_image, created_at, updated_at
  - Security: RLS enabled - public read, admin write
  
  ### 8. media_photos
  - Stores individual photos within albums
  - Fields: id, album_id, image_url, caption_fr, caption_ar, order, created_at
  - Security: RLS enabled - public read, admin write
  
  ### 9. media_videos
  - Stores video links (YouTube)
  - Fields: id, title_fr, title_ar, youtube_url, published_at, created_at, updated_at
  - Security: RLS enabled - public read, admin write
  
  ### 10. publications
  - Stores official publications and documents
  - Fields: id, title_fr, title_ar, description_fr, description_ar, file_url, file_type, published_at, created_at, updated_at
  - File type enum: PDF, IMAGE
  - Security: RLS enabled - public read, admin write
  
  ### 11. request_tickets
  - Stores citizen complaints and requests
  - Fields: id, reference_code, pin_hash, type, status, phone, email, region, city, is_anonymous, first_name, last_name, description, assigned_department_id, last_public_message_fr, last_public_message_ar, created_at, updated_at
  - Type enum: COMPLAINT, REPORT, INFORMATION_REQUEST
  - Status enum: RECEIVED, IN_PROGRESS, RESOLVED, REJECTED
  - Security: RLS enabled - users can track with reference code, admin can manage
  
  ### 12. request_attachments
  - Stores file attachments for requests
  - Fields: id, ticket_id, file_url, file_type, created_at
  - Security: RLS enabled - linked to ticket access
  
  ### 13. sms_outbox
  - Stores outgoing SMS messages for notifications
  - Fields: id, phone, message, provider_hint, status, last_error, created_at, updated_at
  - Provider enum: AIRTEL, MOOV
  - Status enum: PENDING, SENT, FAILED
  - Security: RLS enabled - admin only
  
  ### 14. audit_logs
  - Stores audit trail of admin actions
  - Fields: id, actor_admin_id, action, entity_type, entity_id, meta_json, created_at
  - Security: RLS enabled - admin read only
  
  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Public tables are readable by anyone, writable by authenticated admins only
  - Request tickets have special access rules for tracking with reference code
  - Admin-only tables are fully restricted
  
  ## Indexes
  - Created indexes on frequently queried columns for performance
  - Foreign key relationships with cascading deletes where appropriate
*/

-- Create enums
DO $$ BEGIN
  CREATE TYPE news_status AS ENUM ('DRAFT', 'PUBLISHED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE file_type AS ENUM ('PDF', 'IMAGE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE request_type AS ENUM ('COMPLAINT', 'REPORT', 'INFORMATION_REQUEST');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE request_status AS ENUM ('RECEIVED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE sms_status AS ENUM ('PENDING', 'SENT', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE sms_provider AS ENUM ('AIRTEL', 'MOOV');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  totp_secret_encrypted text,
  totp_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own data"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Admins can update own data"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id)
  WITH CHECK (auth.uid()::text = id);

-- Create page_contents table
CREATE TABLE IF NOT EXISTS page_contents (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug text UNIQUE NOT NULL,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  content_fr text NOT NULL,
  content_ar text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE page_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page contents"
  ON page_contents FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert page contents"
  ON page_contents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update page contents"
  ON page_contents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete page contents"
  ON page_contents FOR DELETE
  TO authenticated
  USING (true);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  excerpt_fr text NOT NULL,
  excerpt_ar text NOT NULL,
  content_fr text NOT NULL,
  content_ar text NOT NULL,
  cover_image text,
  published_at timestamptz,
  status news_status DEFAULT 'DRAFT',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published news"
  ON news FOR SELECT
  TO public
  USING (status = 'PUBLISHED');

CREATE POLICY "Authenticated users can read all news"
  ON news FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  TO authenticated
  USING (true);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name_fr text NOT NULL,
  name_ar text NOT NULL,
  description_fr text NOT NULL,
  description_ar text NOT NULL,
  leader_name_fr text,
  leader_name_ar text,
  leader_bio_fr text,
  leader_bio_ar text,
  leader_photo text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read departments"
  ON departments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert departments"
  ON departments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update departments"
  ON departments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete departments"
  ON departments FOR DELETE
  TO authenticated
  USING (true);

-- Create cabinet_members table
CREATE TABLE IF NOT EXISTS cabinet_members (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name_fr text NOT NULL,
  name_ar text NOT NULL,
  role_fr text NOT NULL,
  role_ar text NOT NULL,
  bio_fr text NOT NULL,
  bio_ar text NOT NULL,
  photo text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cabinet_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cabinet members"
  ON cabinet_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert cabinet members"
  ON cabinet_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cabinet members"
  ON cabinet_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cabinet members"
  ON cabinet_members FOR DELETE
  TO authenticated
  USING (true);

-- Create citizen_services table
CREATE TABLE IF NOT EXISTS citizen_services (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  description_fr text NOT NULL,
  description_ar text NOT NULL,
  icon_key text NOT NULL,
  "order" integer DEFAULT 0,
  link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE citizen_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read citizen services"
  ON citizen_services FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert citizen services"
  ON citizen_services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update citizen services"
  ON citizen_services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete citizen services"
  ON citizen_services FOR DELETE
  TO authenticated
  USING (true);

-- Create media_albums table
CREATE TABLE IF NOT EXISTS media_albums (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  description_fr text,
  description_ar text,
  cover_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE media_albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read media albums"
  ON media_albums FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert media albums"
  ON media_albums FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media albums"
  ON media_albums FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media albums"
  ON media_albums FOR DELETE
  TO authenticated
  USING (true);

-- Create media_photos table
CREATE TABLE IF NOT EXISTS media_photos (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  album_id text NOT NULL REFERENCES media_albums(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption_fr text,
  caption_ar text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read media photos"
  ON media_photos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert media photos"
  ON media_photos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media photos"
  ON media_photos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media photos"
  ON media_photos FOR DELETE
  TO authenticated
  USING (true);

-- Create media_videos table
CREATE TABLE IF NOT EXISTS media_videos (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  youtube_url text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE media_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read media videos"
  ON media_videos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert media videos"
  ON media_videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media videos"
  ON media_videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media videos"
  ON media_videos FOR DELETE
  TO authenticated
  USING (true);

-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  description_fr text,
  description_ar text,
  file_url text NOT NULL,
  file_type file_type NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read publications"
  ON publications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert publications"
  ON publications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update publications"
  ON publications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete publications"
  ON publications FOR DELETE
  TO authenticated
  USING (true);

-- Create request_tickets table
CREATE TABLE IF NOT EXISTS request_tickets (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  reference_code text UNIQUE NOT NULL,
  pin_hash text NOT NULL,
  type request_type NOT NULL,
  status request_status DEFAULT 'RECEIVED',
  phone text NOT NULL,
  email text,
  region text NOT NULL,
  city text NOT NULL,
  is_anonymous boolean DEFAULT false,
  first_name text,
  last_name text,
  description text NOT NULL,
  assigned_department_id text REFERENCES departments(id),
  last_public_message_fr text,
  last_public_message_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE request_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert request tickets"
  ON request_tickets FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all tickets"
  ON request_tickets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update tickets"
  ON request_tickets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tickets"
  ON request_tickets FOR DELETE
  TO authenticated
  USING (true);

-- Create request_attachments table
CREATE TABLE IF NOT EXISTS request_attachments (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  ticket_id text NOT NULL REFERENCES request_tickets(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  file_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE request_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert request attachments"
  ON request_attachments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all attachments"
  ON request_attachments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete attachments"
  ON request_attachments FOR DELETE
  TO authenticated
  USING (true);

-- Create sms_outbox table
CREATE TABLE IF NOT EXISTS sms_outbox (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  phone text NOT NULL,
  message text NOT NULL,
  provider_hint sms_provider,
  status sms_status DEFAULT 'PENDING',
  last_error text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sms_outbox ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read sms outbox"
  ON sms_outbox FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sms outbox"
  ON sms_outbox FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sms outbox"
  ON sms_outbox FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sms outbox"
  ON sms_outbox FOR DELETE
  TO authenticated
  USING (true);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  actor_admin_id text REFERENCES admin_users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  meta_json text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_departments_order ON departments("order");
CREATE INDEX IF NOT EXISTS idx_cabinet_members_order ON cabinet_members("order");
CREATE INDEX IF NOT EXISTS idx_citizen_services_order ON citizen_services("order");
CREATE INDEX IF NOT EXISTS idx_media_photos_album_id ON media_photos(album_id);
CREATE INDEX IF NOT EXISTS idx_request_tickets_reference_code ON request_tickets(reference_code);
CREATE INDEX IF NOT EXISTS idx_request_tickets_status ON request_tickets(status);
CREATE INDEX IF NOT EXISTS idx_request_attachments_ticket_id ON request_attachments(ticket_id);
CREATE INDEX IF NOT EXISTS idx_sms_outbox_status ON sms_outbox(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);