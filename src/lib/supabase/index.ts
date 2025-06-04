export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          email: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hire_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          event_date: string | null
          event_type: string | null
          location: string | null
          guest_count: number | null
          budget: string | null
          message: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          event_date?: string | null
          event_type?: string | null
          location?: string | null
          guest_count?: number | null
          budget?: string | null
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          event_date?: string | null
          event_type?: string | null
          location?: string | null
          guest_count?: number | null
          budget?: string | null
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 