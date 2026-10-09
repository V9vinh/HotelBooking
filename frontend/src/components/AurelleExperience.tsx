import React from 'react';
import type { Testimonial } from '../types/aurelle';

interface AurelleExperienceProps {
  testimonials: Testimonial[];
}

export const AurelleExperience: React.FC<AurelleExperienceProps> = ({ testimonials }) => {
  return (
    <section id="experience" style={{ padding: '90px 0 100px' }}>
      <div className="container-luxe">
        {/* Brand Story Editorial Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '100px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-champagne)',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              The Aurelle Philosophy
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '40px',
                lineHeight: 1.2,
                color: 'var(--color-forest)',
                fontWeight: 400,
                marginBottom: '24px',
              }}
            >
              Quiet Luxury, Effortless Discovery.
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-charcoal-muted)',
                marginBottom: '20px',
              }}
            >
              Founded on the belief that true luxury is not excess, but acoustic stillness,
              sovereignty of time, and profound connection with the landscape. Each Aurelle stay is
              privately verified by architectural historians and luxury hospitality curators.
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-charcoal-muted)',
                marginBottom: '32px',
              }}
            >
              From the limestone terraces of Amalfi to the whispering cedar forests of Arashiyama, we
              orchestrate memories that linger long after departure.
            </p>

            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', fontWeight: 600 }}>
                  100%
                </div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-charcoal-muted)' }}>
                  Privately Verified
                </div>
              </div>
              <div style={{ borderLeft: '1px solid #E6DFD3' }} />
              <div>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', fontWeight: 600 }}>
                  24 / 7
                </div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-charcoal-muted)' }}>
                  Bespoke Concierge
                </div>
              </div>
              <div style={{ borderLeft: '1px solid #E6DFD3' }} />
              <div>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', fontWeight: 600 }}>
                  4.97 ★
                </div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-charcoal-muted)' }}>
                  Guest Acclaim
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Visual Composition */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-float)',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Aurelle resort craftsmanship"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '-24px',
                backgroundColor: 'var(--color-forest)',
                color: 'var(--color-ivory)',
                padding: '24px 28px',
                borderRadius: '6px',
                maxWidth: '280px',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontStyle: 'italic', marginBottom: '8px' }}>
                “Where nature meets architectural serenity.”
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-champagne)' }}>
                Aurelle Curators
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            marginBottom: '100px',
          }}
        >
          <div
            className="luxe-card"
            style={{
              padding: '36px 30px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-champagne-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne)',
                marginBottom: '20px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                concierge
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                color: 'var(--color-forest)',
                marginBottom: '12px',
              }}
            >
              Bespoke Concierge
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', lineHeight: 1.7 }}>
              Dedicated local masters curate private yacht charters, Michelin-starred in-villa dining,
              and secret cultural access before your arrival.
            </p>
          </div>

          <div
            className="luxe-card"
            style={{
              padding: '36px 30px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-champagne-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne)',
                marginBottom: '20px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                architecture
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                color: 'var(--color-forest)',
                marginBottom: '12px',
              }}
            >
              Architectural Mastery
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', lineHeight: 1.7 }}>
              Every pavilion celebrates regional craftsmanship, expansive floorplans, local natural
              materials, and sightlines framing natural horizons.
            </p>
          </div>

          <div
            className="luxe-card"
            style={{
              padding: '36px 30px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-champagne-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne)',
                marginBottom: '20px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                shield
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                color: 'var(--color-forest)',
                marginBottom: '12px',
              }}
            >
              Secluded Privacy
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', lineHeight: 1.7 }}>
              Intimate sanctuaries protected by geography, private security perimeters, and discreet
              staff who anticipate needs without intrusion.
            </p>
          </div>
        </div>

        {/* Clearly Labeled Sample Testimonials */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-champagne)',
                fontWeight: 600,
                marginBottom: '6px',
              }}
            >
              Guest Chronicles
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '32px',
                color: 'var(--color-forest)',
                fontWeight: 400,
              }}
            >
              Voices of Stillness
            </h2>
            <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', marginTop: '4px' }}>
              *(Illustrative sample guest reviews)*
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="luxe-card"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-ivory-surface)',
                }}
              >
                <div>
                  {/* Rating Stars */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '16px', color: '#EAB308' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                        star
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '15px',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      color: 'var(--color-charcoal)',
                      marginBottom: '20px',
                    }}
                  >
                    “{t.quote}”
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--color-border-hairline)',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-forest)' }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)' }}>
                      {t.title} • {t.location}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-champagne)', fontWeight: 500 }}>
                    {t.stayName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
