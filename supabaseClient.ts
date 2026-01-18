import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Logs de diagnóstico (visíveis no F12)
console.log('--- SUPABASE CONFIG CHECK ---');
console.log('URL definida:', supabaseUrl ? 'SIM' : 'NÃO');
console.log('Anon Key definida:', supabaseAnonKey ? 'SIM' : 'NÃO');
if (supabaseUrl) console.log('URL inicia com:', supabaseUrl.substring(0, 10) + '...');

// Safely initialize supabase client
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any;

if (!supabase) {
    console.error('CRITICAL: Supabase client could not be initialized. Missing URL or Anon Key.');
}
