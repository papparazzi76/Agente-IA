// FIX: Corrected the Supabase Edge Function type reference to use the recommended esm.sh CDN. The previous unpkg.com URL was failing to resolve, causing type errors like "Cannot find name 'Deno'".
// FIX: The versioned URL for the Supabase Edge Function type reference was failing to resolve. Using the non-versioned URL as recommended by Supabase documentation to load Deno types correctly.
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

// supabase/functions/ip-lookup/index.ts
//
// Para que esta función funcione, debes establecer el token de API como un secreto de Supabase.
// Ejecuta este comando en tu terminal con la CLI de Supabase:
// supabase secrets set IPINFO_API_TOKEN=5f4b0731208453
//
// Luego, despliega la función:
// supabase functions deploy ip-lookup --no-verify-jwt

// FIX: Replaced deprecated `std/http/server.ts`'s `serve` with the recommended native `Deno.serve`.
// This removes the dependency on an old version of the standard library.

// Define los encabezados CORS para permitir solicitudes desde el navegador.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // En producción, es mejor restringir esto a tu dominio.
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS', // Permite POST para la invocación y OPTIONS para el pre-vuelo
};

Deno.serve(async (req) => {
  // Maneja las solicitudes pre-vuelo (preflight) de CORS.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Supabase reenvía automáticamente la IP del cliente en este encabezado.
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
    if (!clientIp) {
      throw new Error("No se pudo determinar la dirección IP del cliente.");
    }
    
    // Recupera el token secreto de la API desde las variables de entorno de Supabase.
    const apiToken = Deno.env.get('IPINFO_API_TOKEN');
    if (!apiToken) {
        throw new Error("El secreto IPINFO_API_TOKEN no está configurado en el proyecto de Supabase.");
    }
    
    // Construye la URL y llama a la API externa de ipinfo.io.
    const apiUrl = `https://ipinfo.io/${clientIp}?token=${apiToken}`;
    const ipinfoResponse = await fetch(apiUrl);

    if (!ipinfoResponse.ok) {
      throw new Error(`La solicitud a la API de ipinfo.io falló con el estado: ${ipinfoResponse.status}`);
    }

    const data = await ipinfoResponse.json();

    // Devuelve los datos de ipinfo.io al cliente frontend.
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error en la función ip-lookup: ${error.message}`);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
