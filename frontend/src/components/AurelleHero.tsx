import React from 'react';

interface AurelleHeroProps {
  onExploreClick: () => void;
}

export const AurelleHero: React.FC<AurelleHeroProps> = ({ onExploreClick }) => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
    >
      {/* Background Image with Ambient Zoom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: 'scale(1.02)',
          transition: 'transform 10s ease-out',
        }}
      />

      {/* Luxury Cinematic Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(24, 53, 47, 0.45) 0%, rgba(15, 35, 31, 0.7) 100%)',
        }}
      />

      {/* Subtle Texture Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 120px rgba(15, 35, 31, 0.6)',
        }}
      />

      {/* Hero Content */}
      <div
        className="container-luxe"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '920px',
          paddingTop: '60px',
          paddingBottom: '80px',
        }}
      >
        {/* Curated Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            backgroundColor: 'rgba(247, 243, 235, 0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: '4px',
            border: '1px solid rgba(184, 154, 104, 0.4)',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: 'var(--color-champagne)',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-ivory)',
              fontWeight: 500,
            }}
          >
            Curated Resort Sanctuaries
          </span>
        </div>

        {/* 60px Headline on desktop, 40px on mobile */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#FFFFFF',
            marginBottom: '24px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          Find Your Own Paradise.
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'rgba(247, 243, 235, 0.92)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            fontWeight: 300,
          }}
        >
          Curated private villas, coastal retreats, and alpine pavilions designed for
          effortless stillness, architectural wonder, and bespoke hospitality.
        </p>

        {/* CTA Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <button onClick={onExploreClick} className="btn-gold" style={{ padding: '15px 36px' }}>
            <span>Explore Destinations</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </button>

          <a
            href="#collections"
            className="btn-outline-luxe"
            style={{
              borderColor: 'rgba(247, 243, 235, 0.6)',
              color: '#FFFFFF',
              padding: '14px 32px',
            }}
          >
            View Collections
          </a>
        </div>
      </div>

      <style>{`
        .hero-headline {
          font-size: 60px;
        }
        @media (max-width: 768px) {
          .hero-headline {
            font-size: 40px !important;
          }
          .hero-subtitle {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  );
};
