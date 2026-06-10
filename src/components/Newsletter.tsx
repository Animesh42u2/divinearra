import { useState } from 'react'
import { Send } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <section style={{
      background: 'linear-gradient(90deg, #1a0a00 0%, #2d1200 40%, #3a1800 70%, #1a0a00 100%)',
      borderTop: '1px solid #c47a1e',
      borderBottom: '1px solid #c47a1e',
      padding: '56px 8%',
      textAlign: 'center',
    }}>
      <style>{`
        .newsletter-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 10px;
          font-family: 'Georgia', serif;
          color: #e8c97a;
          text-shadow: 0 0 18px rgba(232,201,122,0.3);
          letter-spacing: 0.04em;
        }
        .newsletter-sub {
          color: #b89060;
          margin-bottom: 32px;
          font-family: sans-serif;
          font-size: 14px;
          line-height: 1.7;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .newsletter-form {
          display: flex;
          justify-content: center;
          max-width: 460px;
          margin: 0 auto;
        }
        .newsletter-input {
          flex: 1;
          padding: 13px 20px;
          border-radius: 25px 0 0 25px;
          border: 1px solid #c47a1e;
          border-right: none;
          font-size: 14px;
          font-family: sans-serif;
          outline: none;
          background: rgba(196,122,30,0.1);
          color: #e8c97a;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .newsletter-input::placeholder { color: #8a6030; }
        .newsletter-input:focus {
          background: rgba(196,122,30,0.18);
          box-shadow: inset 0 0 0 1px #e8a135;
        }
        .newsletter-btn {
          background: linear-gradient(135deg, #c47a1e 0%, #e8a135 50%, #c47a1e 100%);
          color: #1a0a00;
          border: 1px solid #e8a135;
          padding: 13px 22px;
          border-radius: 0 25px 25px 0;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: sans-serif;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(196,122,30,0.35);
          transition: background 0.2s, box-shadow 0.2s;
        }
        .newsletter-btn:hover {
          background: linear-gradient(135deg, #e8a135 0%, #ffd700 50%, #e8a135 100%);
          box-shadow: 0 6px 20px rgba(196,122,30,0.55);
        }
        @media (max-width: 520px) {
          .newsletter-title { font-size: 22px; }
          .newsletter-form {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .newsletter-input {
            border-radius: 25px;
            border-right: 1px solid #c47a1e;
            text-align: center;
          }
          .newsletter-btn {
            border-radius: 25px;
            justify-content: center;
            padding: 13px 24px;
          }
        }
      `}</style>

      <h2 className="newsletter-title">Subscribe to Newsletter</h2>
      <p className="newsletter-sub">
        Subscribe to receive personalized astrological insights and predictions directly in your inbox.
      </p>

      <div className="newsletter-form">
        <input
          className="newsletter-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
        />
        <button className="newsletter-btn">
          <Send size={15} />
          Subscribe
        </button>
      </div>
    </section>
  )
}