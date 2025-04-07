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
      cms_data: {
        Row: {
          id: number
          created_at: string
          page_content: Json
          page_style: Json
          payment_gateways: Json
          active_gateway_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          page_content: Json
          page_style: Json
          payment_gateways: Json
          active_gateway_id: string
        }
        Update: {
          id?: number
          created_at?: string
          page_content?: Json
          page_style?: Json
          payment_gateways?: Json
          active_gateway_id?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          created_at: string
          username: string
          password_hash: string
        }
        Insert: {
          id?: string
          created_at?: string
          username: string
          password_hash: string
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          password_hash?: string
        }
      }
    }
  }
} 