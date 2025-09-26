export const SUPABASE_URL = "https://jwchmdivuwgfjrwvgtia.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3Y2htZGl2dXdnZmpyd3ZndGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MTA4NjMsImV4cCI6MjA3MjA4Njg2M30.e_pN2KPqn9ZtNC32vwYNhjK7xzmIgpqOweqEmUIoPbA";
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // This check remains as a safeguard, but the values are now hardcoded above.
  throw new Error("Supabase URL and Anon Key must be defined.");
}