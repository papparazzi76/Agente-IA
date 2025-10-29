// papparazzi76/agente-ia/Agente-IA-3c26e2acdee0b525faef484dcd167b55083e7bef/supabase.ts
import { createClient } from '@supabase/supabase-js'

// --- ¡CORRECCIÓN DE SEGURIDAD! USAR VARIABLES DE ENTORNO ---

const supabaseUrl = process.env.SUPABASE_URL || ''; 
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''; 

// Crea y exporta el cliente de Supabase.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
