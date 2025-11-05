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
    const { data: { user: adminUser } } = await userSupabaseClient.auth.getUser()
    if (!adminUser) throw new Error('Admin user not found')
    const { data: profile, error: profileError } = await userSupabaseClient.from('profiles').select('role').eq('id', adminUser.id).single()
    if (profileError || profile?.role !== 'admin') {
      throw new Error('Unauthorized: User is not an admin.')
    }

    const { userId } = await req.json()
    if (!userId) {
      throw new Error('Missing userId in request body.')
    }
    
    if (userId === adminUser.id) {
      throw new Error("Admin cannot delete themselves.")
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: deletedUser, error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)
      
    if (deleteError) throw deleteError

    return new Response(JSON.stringify({ message: "User deleted successfully", user: deletedUser }), {
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
