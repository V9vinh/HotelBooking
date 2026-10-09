import React, { useState } from 'react';

export const AurelleFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-forest-dark)',
        color: '#E6DFD3',
        padding: '80px 0 36px',
        borderTop: '1px solid rgba(184, 154, 104, 0.25)',
      }}
    >
      <div className="container-luxe">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Col 1: Brand & Manifesto */}
          <div style={{ maxWidth: '340px' }}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  backgroundColor: 'var(--color-champagne)',
                  borderRadius: '50%',
                }}
              />
              AURELLE STAYS
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#B3B8B2', marginBottom: '24px' }}>
              Bespoke resort sanctuaries for the discerning traveler. Curated architectural stillness
              across the world’s most mesmerizing horizons.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(230, 223, 211, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E6DFD3',
                  transition: 'border-color 0.2s',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  share
                </span>
              </a>
              <a
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(230, 223, 211, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E6DFD3',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  photo_camera
                </span>
              </a>
              <a
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(230, 223, 211, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E6DFD3',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  mail
                </span>
              </a>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                color: '#FFFFFF',
                marginBottom: '20px',
                letterSpacing: '0.05em',
              }}
            >
              Destinations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="#destinations" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Amalfi Coast, Italy
                </a>
              </li>
              <li>
                <a href="#destinations" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Arashiyama, Kyoto, Japan
                </a>
              </li>
              <li>
                <a href="#destinations" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  St. Barts, French West Indies
                </a>
              </li>
              <li>
                <a href="#destinations" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Zermatt, Swiss Alps
                </a>
              </li>
              <li>
                <a href="#destinations" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Santorini, Cyclades
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Collections & Support */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                color: '#FFFFFF',
                marginBottom: '20px',
                letterSpacing: '0.05em',
              }}
            >
              Collections & Policies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="#collections" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Beachfront Havens
                </a>
              </li>
              <li>
                <a href="#collections" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Alpine & Cedar Pavilions
                </a>
              </li>
              <li>
                <a href="#collections" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Private Island Buyouts
                </a>
              </li>
              <li>
                <a href="#" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Cancellation & Discretion
                </a>
              </li>
              <li>
                <a href="#" style={{ fontSize: '14px', color: '#B3B8B2' }}>
                  Private Aviation Services
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                color: '#FFFFFF',
                marginBottom: '12px',
                letterSpacing: '0.05em',
              }}
            >
              The Aurelle Journal
            </h4>
            <p style={{ fontSize: '13px', color: '#B3B8B2', lineHeight: 1.6, marginBottom: '18px' }}>
              Receive our quarterly monograph on architectural travel, private previews, and unlisted stays.
            </p>

            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setNewsletterStatus('idle');
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '4px',
                  border: '1px solid rgba(230, 223, 211, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{
                  padding: '12px',
                  fontSize: '12px',
                  width: '100%',
                }}
              >
                Join Private Monograph
              </button>
            </form>

            {newsletterStatus === 'success' && (
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#34D399' }}>
                ✓ Welcome. You are now inscribed into the Aurelle Journal private edition.
              </div>
            )}
            {newsletterStatus === 'error' && (
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#F87171' }}>
                Please enter a valid email address.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(230, 223, 211, 0.15)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: '#8A9188',
          }}
        >
          <div>
            © {new Date().getFullYear()} AURELLE STAYS LTD. All rights reserved.
          </div>
          <div>
            *Illustrative luxury hospitality showcase. No real booking or payment processing occurs.*
          </div>
        </div>
      </div>
    </footer>
  );
};
