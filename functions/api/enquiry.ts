/**
 * Cloudflare Pages Function — receives the enquiry form and emails it via
 * MailChannels (available to Pages Functions without an API key).
 *
 * Before launch:
 *   1. Replace DESTINATION_EMAIL below with the real enquiry inbox.
 *   2. Set FROM_EMAIL to an address on a domain you control, and add the
 *      MailChannels Domain Lockdown DNS record for it
 *      (https://support.mailchannels.com/hc/en-us/articles/16918954360845).
 */

const DESTINATION_EMAIL = '[TODO: enquiry email]';
const FROM_EMAIL = '[TODO: sending address, e.g. enquiries@yourdomain.com]';

interface PagesContext {
  request: Request;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const form = await context.request.formData();

  // Honeypot: real visitors never see this field.
  if (form.get('company')) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const capacity = String(form.get('capacity') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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

  const send = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: DESTINATION_EMAIL }] }],
      from: { email: FROM_EMAIL, name: 'The Argyle Collection' },
      reply_to: { email, name },
      subject: `Enquiry — Argyle pink diamonds (${capacity || 'unspecified'})`,
      content: [{ type: 'text/plain', value: body }],
    }),
  });

  if (!send.ok) {
    return new Response(JSON.stringify({ ok: false, error: 'Email delivery failed.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
