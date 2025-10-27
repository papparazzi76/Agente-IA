import { createClient } from '@supabase/supabase-js'

// --- ¡ATENCIÓN! CLAVES DE SUPABASE ---
// Se han añadido las claves directamente en este archivo para facilitar el desarrollo.
// SIN EMBARGO, ESTO NO ES SEGURO PARA PRODUCCIÓN.
// En un entorno de producción, estas claves deben ser reemplazadas por variables de entorno
// (process.env.SUPABASE_URL y process.env.SUPABASE_ANON_KEY) para evitar que queden expuestas
// en el código fuente.

const supabaseUrl = 'https://essjcgcsssyfwkqlshkc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzc2pjZ2Nzc3N5ZndrcWxzaGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDg0MTksImV4cCI6MjA3NzEyNDQxOX0.V1vzWsXRzG3wwZgp3oGW7zTBxNSPiTT4g5D0VnCKkqI';


// Crea y exporta el cliente de Supabase.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);