import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.query.path as string[]).join('/')
  const search = new URL(req.url!, 'http://localhost').search

  const url = `https://api.prokerala.com/v2/${path}${search}`

  const response = await fetch(url, {
    headers: {
      Authorization: req.headers.authorization ?? '',
    },
  })

  const data = await response.json()
  res.status(response.status).json(data)
}