import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Client-side Supabase client (use in components)
// Create lazily to avoid build-time errors
let _supabase: ReturnType<typeof createClient> | null = null;
export const supabase = () => {
  if (!_supabase && isSupabaseConfigured()) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
};

// Server-side Supabase client (use in API routes, server components)
export const getServerSupabase = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceRoleKey);
};
