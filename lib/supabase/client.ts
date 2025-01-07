'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Configuração do cliente Supabase
const supabaseUrl = "https://mufbzujgegvmxscmcyvl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZmJ6dWpnZWd2bXhzY21jeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTkxMDksImV4cCI6MjA1MTc3NTEwOX0.Oi6VJVvGCnKMeKPBGFqGxNlOZHp8Ql_c7-oUQpLqG0M";

// Exporta uma função que cria o cliente com as configurações
export function createClient() {
  return createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey
  });
} 