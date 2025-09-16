import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Create Supabase client (will work with placeholder values for build)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
    return supabaseUrl !== 'https://placeholder.supabase.co' &&
        supabaseAnonKey !== 'placeholder-key' &&
        supabaseUrl !== 'YOUR_SUPABASE_URL' &&
        supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
}

// Database table names
export const TABLES = {
    PAYMENTS: 'payments',
    ONBOARDING: 'onboarding',
    IMAGES: 'images'
} as const

// Storage bucket names
export const STORAGE_BUCKETS = {
    PROFILE_PHOTOS: 'profile-photos',
    SCREENSHOTS: 'screenshots'
} as const

// Types for our data
export interface PaymentData {
    payment_id?: string
    order_id: string
    amount: number
    currency: string
    package_id: string
    package_name: string
    customer_email: string
    customer_name: string
    status: string
    created_at?: string
}

export interface OnboardingData {
    id?: string
    payment_id: string
    name: string
    age: string
    dating_goal: string
    current_matches: string
    body_type: string
    style_preference: string
    ethnicity: string
    interests: string
    current_bio: string
    email: string
    phone: string
    vibe: string
    want_more: string
    one_liner: string
    photo_count: number
    screenshot_count: number
    created_at?: string
}

export interface ImageData {
    id?: string
    payment_id: string
    file_name: string
    file_path: string
    file_size: number
    file_type: string
    image_type: 'profile_photo' | 'screenshot'
    created_at?: string
}
