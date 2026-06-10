import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const response = await fetch('https://api.prokerala.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.VITE_PROKERALA_CLIENT_ID ?? '',
      client_secret: process.env.VITE_PROKERALA_CLIENT_SECRET ?? '',
    }),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}