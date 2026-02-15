import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          totp_secret_encrypted: string | null;
          totp_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          totp_secret_encrypted?: string | null;
          totp_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          totp_secret_encrypted?: string | null;
          totp_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      page_contents: {
        Row: {
          id: string;
          slug: string;
          title_fr: string;
          title_ar: string;
          content_fr: string;
          content_ar: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_fr: string;
          title_ar: string;
          content_fr: string;
          content_ar: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_fr?: string;
          title_ar?: string;
          content_fr?: string;
          content_ar?: string;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title_fr: string;
          title_ar: string;
          excerpt_fr: string;
          excerpt_ar: string;
          content_fr: string;
          content_ar: string;
          cover_image: string | null;
          published_at: string | null;
          status: 'DRAFT' | 'PUBLISHED';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_fr: string;
          title_ar: string;
          excerpt_fr: string;
          excerpt_ar: string;
          content_fr: string;
          content_ar: string;
          cover_image?: string | null;
          published_at?: string | null;
          status?: 'DRAFT' | 'PUBLISHED';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_fr?: string;
          title_ar?: string;
          excerpt_fr?: string;
          excerpt_ar?: string;
          content_fr?: string;
          content_ar?: string;
          cover_image?: string | null;
          published_at?: string | null;
          status?: 'DRAFT' | 'PUBLISHED';
          created_at?: string;
          updated_at?: string;
        };
      };
      departments: {
        Row: {
          id: string;
          name_fr: string;
          name_ar: string;
          description_fr: string;
          description_ar: string;
          leader_name_fr: string | null;
          leader_name_ar: string | null;
          leader_bio_fr: string | null;
          leader_bio_ar: string | null;
          leader_photo: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_fr: string;
          name_ar: string;
          description_fr: string;
          description_ar: string;
          leader_name_fr?: string | null;
          leader_name_ar?: string | null;
          leader_bio_fr?: string | null;
          leader_bio_ar?: string | null;
          leader_photo?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_fr?: string;
          name_ar?: string;
          description_fr?: string;
          description_ar?: string;
          leader_name_fr?: string | null;
          leader_name_ar?: string | null;
          leader_bio_fr?: string | null;
          leader_bio_ar?: string | null;
          leader_photo?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      cabinet_members: {
        Row: {
          id: string;
          name_fr: string;
          name_ar: string;
          role_fr: string;
          role_ar: string;
          bio_fr: string;
          bio_ar: string;
          photo: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_fr: string;
          name_ar: string;
          role_fr: string;
          role_ar: string;
          bio_fr: string;
          bio_ar: string;
          photo?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_fr?: string;
          name_ar?: string;
          role_fr?: string;
          role_ar?: string;
          bio_fr?: string;
          bio_ar?: string;
          photo?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      citizen_services: {
        Row: {
          id: string;
          title_fr: string;
          title_ar: string;
          description_fr: string;
          description_ar: string;
          icon_key: string;
          order: number;
          link: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_fr: string;
          title_ar: string;
          description_fr: string;
          description_ar: string;
          icon_key: string;
          order?: number;
          link?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_fr?: string;
          title_ar?: string;
          description_fr?: string;
          description_ar?: string;
          icon_key?: string;
          order?: number;
          link?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      media_albums: {
        Row: {
          id: string;
          title_fr: string;
          title_ar: string;
          description_fr: string | null;
          description_ar: string | null;
          cover_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_fr: string;
          title_ar: string;
          description_fr?: string | null;
          description_ar?: string | null;
          cover_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_fr?: string;
          title_ar?: string;
          description_fr?: string | null;
          description_ar?: string | null;
          cover_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      media_photos: {
        Row: {
          id: string;
          album_id: string;
          image_url: string;
          caption_fr: string | null;
          caption_ar: string | null;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          album_id: string;
          image_url: string;
          caption_fr?: string | null;
          caption_ar?: string | null;
          order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          album_id?: string;
          image_url?: string;
          caption_fr?: string | null;
          caption_ar?: string | null;
          order?: number;
          created_at?: string;
        };
      };
      media_videos: {
        Row: {
          id: string;
          title_fr: string;
          title_ar: string;
          youtube_url: string;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_fr: string;
          title_ar: string;
          youtube_url: string;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_fr?: string;
          title_ar?: string;
          youtube_url?: string;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      publications: {
        Row: {
          id: string;
          title_fr: string;
          title_ar: string;
          description_fr: string | null;
          description_ar: string | null;
          file_url: string;
          file_type: 'PDF' | 'IMAGE';
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_fr: string;
          title_ar: string;
          description_fr?: string | null;
          description_ar?: string | null;
          file_url: string;
          file_type: 'PDF' | 'IMAGE';
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_fr?: string;
          title_ar?: string;
          description_fr?: string | null;
          description_ar?: string | null;
          file_url?: string;
          file_type?: 'PDF' | 'IMAGE';
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      request_tickets: {
        Row: {
          id: string;
          reference_code: string;
          pin_hash: string;
          type: 'COMPLAINT' | 'REPORT' | 'INFORMATION_REQUEST';
          status: 'RECEIVED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
          phone: string;
          email: string | null;
          region: string;
          city: string;
          is_anonymous: boolean;
          first_name: string | null;
          last_name: string | null;
          description: string;
          assigned_department_id: string | null;
          last_public_message_fr: string | null;
          last_public_message_ar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_code: string;
          pin_hash: string;
          type: 'COMPLAINT' | 'REPORT' | 'INFORMATION_REQUEST';
          status?: 'RECEIVED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
          phone: string;
          email?: string | null;
          region: string;
          city: string;
          is_anonymous?: boolean;
          first_name?: string | null;
          last_name?: string | null;
          description: string;
          assigned_department_id?: string | null;
          last_public_message_fr?: string | null;
          last_public_message_ar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_code?: string;
          pin_hash?: string;
          type?: 'COMPLAINT' | 'REPORT' | 'INFORMATION_REQUEST';
          status?: 'RECEIVED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
          phone?: string;
          email?: string | null;
          region?: string;
          city?: string;
          is_anonymous?: boolean;
          first_name?: string | null;
          last_name?: string | null;
          description?: string;
          assigned_department_id?: string | null;
          last_public_message_fr?: string | null;
          last_public_message_ar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      request_attachments: {
        Row: {
          id: string;
          ticket_id: string;
          file_url: string;
          file_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          ticket_id: string;
          file_url: string;
          file_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          ticket_id?: string;
          file_url?: string;
          file_type?: string;
          created_at?: string;
        };
      };
      sms_outbox: {
        Row: {
          id: string;
          phone: string;
          message: string;
          provider_hint: 'AIRTEL' | 'MOOV' | null;
          status: 'PENDING' | 'SENT' | 'FAILED';
          last_error: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          message: string;
          provider_hint?: 'AIRTEL' | 'MOOV' | null;
          status?: 'PENDING' | 'SENT' | 'FAILED';
          last_error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          message?: string;
          provider_hint?: 'AIRTEL' | 'MOOV' | null;
          status?: 'PENDING' | 'SENT' | 'FAILED';
          last_error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          actor_admin_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          meta_json: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_admin_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          meta_json?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_admin_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          meta_json?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
