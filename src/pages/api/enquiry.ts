/**
 * Enquiry endpoint — runs in the Cloudflare Worker produced by the
 * @astrojs/cloudflare adapter, and emails the enquiry through Resend.
 *
 * Before launch:
 *   1. Replace DESTINATION_EMAIL below with the real enquiry inbox.
 *   2. Set FROM_EMAIL to an address on a domain verified in Resend.
 *   3. Add the API key as a secret:  npx wrangler secret put RESEND_API_KEY
 *      (or Workers dashboard → Settings → Variables and Secrets).
 */

import type { APIRoute } from 'astro';

export const prerender = false;

const DESTINATION_EMAIL = '[TODO: enquiry email]';
const FROM_EMAIL = '[TODO: sending address on a Resend-verified domain]';

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
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

  const apiKey = locals.runtime?.env?.RESEND_API_KEY;
  if (!apiKey) {
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
      Authorization: `Bearer ${apiKey}`,
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
};
