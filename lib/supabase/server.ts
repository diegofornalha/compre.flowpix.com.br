import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createServerClient() {
  const supabaseUrl = process.env.STORAGE_NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const cookieStore = cookies();
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false
    },
    global: {
      headers: {
        'x-my-custom-header': 'flowpix'
      }
    }
  });
} 