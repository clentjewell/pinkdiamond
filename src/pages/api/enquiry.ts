/**
 * Enquiry endpoint — runs in the Cloudflare Worker produced by the
 * @astrojs/cloudflare adapter, and emails the enquiry through Resend.
 *
 * Requires the RESEND_API_KEY secret on the Worker, and FROM_EMAIL's domain
 * verified in Resend.
 */

import type { APIRoute } from 'astro';

export const prerender = false;

const DESTINATION_EMAIL = 'clent@jewellprojects.com';
const FROM_EMAIL = 'enquiries@jewellprojects.com';

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
