// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zfkcwgzzaockpebpreqp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpma2N3Z3p6YW9ja3BlYnByZXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MjA5NjksImV4cCI6MjA2NzM5Njk2OX0.mh9Lp-iWMWIPi6PRV5J48_TO0BNCSdZ21Owf_jIPk3E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});