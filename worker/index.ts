/**
 * Cloudflare Worker — serves the static site (via the assets binding) and
 * handles the enquiry form at POST /api/enquiry, emailing it through Resend.
 *
 * Before launch:
 *   1. Replace DESTINATION_EMAIL below with the real enquiry inbox.
 *   2. Set FROM_EMAIL to an address on a domain verified in Resend.
 *   3. Add the API key as a secret:  npx wrangler secret put RESEND_API_KEY
 *      (or Workers dashboard → Settings → Variables and Secrets).
 */

const DESTINATION_EMAIL = '[TODO: enquiry email]';
const FROM_EMAIL = '[TODO: sending address on a Resend-verified domain]';

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleEnquiry(request: Request, env: Env): Promise<Response> {
  const form = await request.formData();

  // Honeypot: real visitors never see this field.
  if (form.get('company')) {
    return json({ ok: true });
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const capacity = String(form.get('capacity') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: 'Missing required fields.' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: 'Email delivery is not configured.' }, 503);
  }

  const body = [
    'New enquiry — Argyle pink diamond private sale',
    '',
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Telephone: ${phone || '—'}`,
    `Acting as: ${capacity || '—'}`,
    '',
    'Enquiry:',
    message,
  ].join('\n');

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `The Argyle Collection <${FROM_EMAIL}>`,
      to: [DESTINATION_EMAIL],
      reply_to: email,
      subject: `Enquiry — Argyle pink diamonds (${capacity || 'unspecified'})`,
      text: body,
    }),
  });

  if (!send.ok) {
    return json({ ok: false, error: 'Email delivery failed.' }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/enquiry') {
      if (request.method === 'POST') return handleEnquiry(request, env);
      return json({ ok: false, error: 'Method not allowed.' }, 405);
    }

    return env.ASSETS.fetch(request);
  },
};
