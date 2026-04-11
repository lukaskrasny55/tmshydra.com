import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper to validate if the URL is a real URL and not a placeholder
const isValidSupabaseUrl = (url: string | undefined): boolean => {
  if (!url || url === 'your_supabase_url' || url.includes('placeholder')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Only create the client if variables are present and valid to avoid "Invalid supabaseUrl" error
export const isSupabaseConfigured = isValidSupabaseUrl(supabaseUrl) && !!supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key';

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (null as any);
