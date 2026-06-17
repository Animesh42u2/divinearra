export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')
  if (!isValidEmail) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  try {
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (response.status === 201) {
      return res.status(200).json({ success: true })
    }

    const data = await response.json().catch(() => ({}))
    const alreadySubscribed = JSON.stringify(data).toLowerCase().includes('already')

    if (alreadySubscribed) {
      return res.status(409).json({ error: "You're already subscribed!" })
    }

    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
