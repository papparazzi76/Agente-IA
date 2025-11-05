// FIX: Replaced the problematic Deno type reference and Deno.serve global with a direct import of `serve` from the Deno standard library.
// This is a more robust pattern that resolves 'Cannot find name Deno' errors in local development environments.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// To make this function work, you must set the API token as a Supabase secret.
// Run this command in your terminal with the Supabase CLI:
// supabase secrets set IPINFO_API_TOKEN=your_ipinfo_token_here
//
// Then, deploy the function:
// supabase functions deploy ip-lookup --no-verify-jwt

// FIX: Add a minimal declaration for the Deno namespace to resolve the
// "Cannot find name 'Deno'" TypeScript error in environments that lack
// global Deno types. This makes the code compatible with standard TS tooling.
declare namespace Deno {
  export const env: {
    get(key: string): string | undefined;
  };
}

// Define CORS headers to allow requests from the browser.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // For production, restrict this to your domain.
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST for invocation and OPTIONS for pre-flight
};

serve(async (req) => {
  // Handle CORS pre-flight requests.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Supabase automatically forwards the client IP in this header.
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
    if (!clientIp) {
      throw new Error("Could not determine the client's IP address.");
    }
    
    // Retrieve the secret API token from Supabase environment variables.
    const apiToken = Deno.env.get('IPINFO_API_TOKEN');
    if (!apiToken) {
        throw new Error("The IPINFO_API_TOKEN secret is not configured in the Supabase project.");
    }
    
    // Build the URL and call the external ipinfo.io API.
    const apiUrl = `https://ipinfo.io/${clientIp}?token=${apiToken}`;
    const ipinfoResponse = await fetch(apiUrl);

    if (!ipinfoResponse.ok) {
      throw new Error(`Request to ipinfo.io API failed with status: ${ipinfoResponse.status}`);
    }

    const data = await ipinfoResponse.json();

    // Return the data from ipinfo.io to the frontend client.
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    console.error(`Error in ip-lookup function: ${errorMessage}`);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
