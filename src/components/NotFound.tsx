// src/components/NotFound.tsx
import SEO from './SEO'

export default function NotFound() {
  return (
    <div style={{ padding: '120px 20px', textAlign: 'center' }}>
      <SEO
        title="Page Not Found | Divine Arra"
        description="The page you're looking for doesn't exist."
        url="/404"
        noindex={true}
      />
      <h1>404 — Page Not Found</h1>
      <p>Sorry, this page doesn't exist.</p>
      <a href="/">Go back home</a>
    </div>
  )
}