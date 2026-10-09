import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las credenciales de Supabase en las variables de entorno.');
}

// Inicialización limpia y compatible con entornos en la nube
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  global: {
    headers: { 'x-client-info': 'consteladores-web' },
  },
});
