import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../shared/cors.ts'

declare namespace Deno {
  export const env: {
    get(key: string): string | undefined;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    const { data: { user } } = await userSupabaseClient.auth.getUser()
    if (!user) throw new Error('User not found')
    const { data: profile, error: profileError } = await userSupabaseClient.from('profiles').select('role').eq('id', user.id).single()
    if (profileError || profile?.role !== 'admin') {
      throw new Error('Unauthorized: User is not an admin.')
    }

    const { userId, updates } = await req.json()
    if (!userId || !updates) {
      throw new Error('Missing userId or updates in request body.')
    }
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: updatedProfile, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
      
    if (updateError) throw updateError

    return new Response(JSON.stringify(updatedProfile), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
