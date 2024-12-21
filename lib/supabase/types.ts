export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pastes: {
        Row: {
          id: string
          content: string
          title: string | null
          language: string
          expires_at: string | null
          burn_after_read: boolean
          created_at: string
          viewed: boolean
        }
        Insert: {
          id?: string
          content: string
          title?: string | null
          language?: string
          expires_at?: string | null
          burn_after_read?: boolean
          created_at?: string
          viewed?: boolean
        }
        Update: {
          id?: string
          content?: string
          title?: string | null
          language?: string
          expires_at?: string | null
          burn_after_read?: boolean
          created_at?: string
          viewed?: boolean
        }
      }
      urls: {
        Row: {
          code: string
          url: string
          created_at: string
        }
        Insert: {
          code: string
          url: string
          created_at?: string
        }
        Update: {
          code?: string
          url?: string
          created_at?: string
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