import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pathSegments = Array.isArray(req.query.path) 
    ? req.query.path 
    : [req.query.path as string]
  
  const path = pathSegments.join('/')
  
  // Strip query params that Vercel adds, rebuild clean search string
  const urlObj = new URL(req.url!, 'http://localhost')
  urlObj.searchParams.delete('path')
  const search = urlObj.search

  const url = `https://api.prokerala.com/${path}${search}`

  console.log('Proxying to:', url)

  const response = await fetch(url, {
    headers: {
      Authorization: req.headers.authorization ?? '',
    },
  })

  const data = await response.json()
  res.status(response.status).json(data)
}