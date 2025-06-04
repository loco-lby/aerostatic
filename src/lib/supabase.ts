import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          full_name: string;
          avatar_url: string;
          role: 'authenticated' | 'moderator' | 'admin';
          completed_adventures_count: number;
          total_encouragements_given: number;
          total_encouragements_received: number;
          joined_at: string;
          updated_at?: string;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
          full_name?: string;
          avatar_url?: string;
          role?: 'authenticated' | 'moderator' | 'admin';
          completed_adventures_count?: number;
          total_encouragements_given?: number;
          total_encouragements_received?: number;
          joined_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          username?: string;
          full_name?: string;
          avatar_url?: string;
          role?: 'authenticated' | 'moderator' | 'admin';
          completed_adventures_count?: number;
          total_encouragements_given?: number;
          total_encouragements_received?: number;
          updated_at?: string;
        };
      };
      adventures: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          type: 'idea' | 'completed';
          status: 'draft' | 'published' | 'archived';
          creator_id: string;
          is_journey: boolean;
          start_location_name: string;
          start_latitude: number;
          start_longitude: number;
          end_location_name: string;
          end_latitude: number;
          end_longitude: number;
          estimated_duration_days: number;
          start_date?: string;
          end_date?: string;
          difficulty_score: number;
          adventure_score: number;
          success_metrics: string[];
          tags: string[];
          featured_image_url?: string;
          completion_evidence_url?: string;
          completion_date?: string;
          gps_track_url?: string;
          encouragements_count: number;
          comments_count: number;
          contributions_total: number;
          saved_count: number;
          created_at: string;
          updated_at?: string;
        };
        Insert: {
          title: string;
          slug: string;
          description: string;
          type: 'idea' | 'completed';
          status?: 'draft' | 'published' | 'archived';
          creator_id: string;
          is_journey?: boolean;
          start_location_name: string;
          start_latitude: number;
          start_longitude: number;
          end_location_name?: string;
          end_latitude?: number;
          end_longitude?: number;
          estimated_duration_days: number;
          start_date?: string;
          end_date?: string;
          difficulty_score: number;
          adventure_score?: number;
          success_metrics?: string[];
          tags?: string[];
          featured_image_url?: string;
          completion_evidence_url?: string;
          completion_date?: string;
          gps_track_url?: string;
          encouragements_count?: number;
          comments_count?: number;
          contributions_total?: number;
          saved_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          slug?: string;
          description?: string;
          type?: 'idea' | 'completed';
          status?: 'draft' | 'published' | 'archived';
          is_journey?: boolean;
          start_location_name?: string;
          start_latitude?: number;
          start_longitude?: number;
          end_location_name?: string;
          end_latitude?: number;
          end_longitude?: number;
          estimated_duration_days?: number;
          start_date?: string;
          end_date?: string;
          difficulty_score?: number;
          adventure_score?: number;
          success_metrics?: string[];
          tags?: string[];
          featured_image_url?: string;
          completion_evidence_url?: string;
          completion_date?: string;
          gps_track_url?: string;
          encouragements_count?: number;
          comments_count?: number;
          contributions_total?: number;
          saved_count?: number;
          updated_at?: string;
        };
      };
    };
  };
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// User types and hierarchy
export type UserRole = 'authenticated' | 'adventurer' | 'avid_adventurer' | 'moderator';

export type User = {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  completed_adventures_count: number;
  total_encouragements_given: number;
  total_encouragements_received: number;
  joined_at: string;
  bio?: string;
  website?: string;
  location?: string;
};

// Adventure types
export type AdventureType = 'idea' | 'completed';
export type AdventureStatus = 'draft' | 'published' | 'archived' | 'in_progress';

export type Adventure = {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: AdventureType;
  status: AdventureStatus;
  
  // Location info - can be single location or journey
  is_journey: boolean;
  start_location_name: string;
  start_latitude: number;
  start_longitude: number;
  end_location_name?: string;
  end_latitude?: number;
  end_longitude?: number;
  
  // Journey waypoints (for multi-stop adventures)
  waypoints?: {
    name: string;
    latitude: number;
    longitude: number;
    order: number;
  }[];
  
  // Timing
  start_date?: string;
  end_date?: string;
  estimated_duration_days?: number;
  
  // Adventure metrics
  difficulty_score: number; // 1-10
  adventure_score: number; // 0-10 (moderator assigned)
  success_metrics: string[]; // Array of success requirements
  
  // User engagement
  creator_id: string;
  creator?: User;
  encouragements_count: number;
  comments_count: number;
  contributions_total: number; // Total money contributed
  saved_count: number;
  
  // Content
  featured_image_url?: string;
  tags: string[];
  
  // Completion data (for completed adventures)
  completion_evidence_url?: string;
  completion_date?: string;
  gps_track_url?: string;
  
  created_at: string;
  updated_at: string;
};

export type AdventureLog = {
  id: string;
  adventure_id: string;
  author_id: string;
  author?: User;
  title: string;
  content: string;
  images: string[];
  videos: string[];
  is_update: boolean; // true for progress updates, false for original description
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  adventure_id: string;
  author_id: string;
  author?: User;
  content: string;
  is_pinned: boolean;
  encouragements_count: number;
  created_at: string;
  updated_at: string;
};

export type Encouragement = {
  id: string;
  user_id: string;
  adventure_id?: string;
  comment_id?: string;
  created_at: string;
};

export type Contribution = {
  id: string;
  adventure_id: string;
  contributor_id: string;
  contributor?: User;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded';
  created_at: string;
  completed_at?: string;
};

export type SavedAdventure = {
  id: string;
  user_id: string;
  adventure_id: string;
  created_at: string;
}; 