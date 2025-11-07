import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../shared/cors.ts'

declare namespace Deno {
  export const env: {
    get(key: string): string | undefined;
  };
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO_EMAIL = Deno.env.get('QUOTE_TO_EMAIL') || 'soporte@agenteia.com'; // Fallback email

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in Supabase secrets.");
    return new Response(JSON.stringify({ error: 'Server configuration error.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message, products } = await req.json();

    if (!name || !email || !products || !Array.isArray(products) || products.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const productsHtml = products.map(p => `<li>${p}</li>`).join('');

    const emailHtml = `
      <h1>Nueva Solicitud de Presupuesto</h1>
      <p>Has recibido una nueva solicitud desde la web de AgenteIA.</p>
      <hr>
      <h2>Detalles del Solicitante:</h2>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
      </ul>
      <h2>Mensaje:</h2>
      <p>${message || '<em>El usuario no ha dejado ningún mensaje adicional.</em>'}</p>
      <h2>Servicios Solicitados:</h2>
      <ul>
        ${productsHtml}
      </ul>
      <hr>
      <p>Por favor, ponte en contacto con esta persona a la brevedad posible.</p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'AgenteIA Marketplace <noreply@agenteia.com>',
        to: [TO_EMAIL],
        subject: `Nueva Solicitud de Presupuesto de ${name}`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.json();
      console.error('Resend API Error:', errorBody);
      throw new Error('Failed to send email via Resend.');
    }

    return new Response(JSON.stringify({ message: 'Request sent successfully.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error(`Error in send-quote-request function: ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
