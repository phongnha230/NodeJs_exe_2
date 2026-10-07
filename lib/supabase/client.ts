import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://efoyjqctoezlmpvqqunf.supabase.co'
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb3lqcWN0b2V6bG1wdnFxdW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDgxODgsImV4cCI6MjEwNTQ4NDE4OH0.LANM19C2QdMhK_HyMtFBvl1tIud2mYkcE-_E0BoL9ms'

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
