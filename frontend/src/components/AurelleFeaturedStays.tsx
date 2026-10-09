import React from 'react';
import { useTranslation } from 'react-i18next';
import type { HotelStay } from '../types/aurelle';

interface AurelleFeaturedStaysProps {
  stays: HotelStay[];
  onSelectStay: (stay: HotelStay) => void;
  activeCollectionFilter: string | null;
  onClearFilter: () => void;
}

export const AurelleFeaturedStays: React.FC<AurelleFeaturedStaysProps> = ({
  stays,
  onSelectStay,
  activeCollectionFilter,
  onClearFilter,
}) => {
  const { t, i18n } = useTranslation();

  const formatPrice = (amount: number) => {
    if (i18n.language.startsWith('vi')) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <section id="destinations" style={{ padding: '60px 0 80px' }}>
      <div className="container-luxe">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-champagne)',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              {t('featured.tag')}
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '36px',
                color: 'var(--color-forest)',
                fontWeight: 400,
              }}
            >
              {t('featured.title')}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {activeCollectionFilter && (
              <button
                onClick={onClearFilter}
                style={{
                  fontSize: '12px',
                  color: 'var(--color-champagne)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                {t('featured.resetFilter')} ({activeCollectionFilter})
              </button>
            )}
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-charcoal-muted)',
              }}
            >
              {t('featured.showing')} {stays.length} {t('featured.curatedStays')}
            </span>
          </div>
        </div>

        {/* 4 Aligned Hotel Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px',
          }}
        >
          {stays.map((stay) => (
            <div
              key={stay.id}
              className="luxe-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* 4:3 Image Container with Badges */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  backgroundColor: '#ECE6DB',
                }}
              >
                <img
                  src={stay.imageUrl}
                  alt={stay.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Collection Tag Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(24, 53, 47, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: 'var(--color-ivory)',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {stay.collection}
                </div>

                {/* Rating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(6px)',
                    color: 'var(--color-charcoal)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#EAB308' }}>
                    star
                  </span>
                  <span>{stay.rating}</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-charcoal-muted)' }}>
                    ({stay.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {/* Location */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    color: 'var(--color-champagne)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                    pin_drop
                  </span>
                  <span>
                    {stay.location}, {stay.country}
                  </span>
                </div>

                {/* Title Clamped to Two Lines */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--color-forest)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '52px',
                  }}
                >
                  {stay.title}
                </h3>

                {/* Subtitle / Narrative */}
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-charcoal-muted)',
                    marginBottom: '18px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {stay.subtitle}
                </p>

                {/* Card Specs */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    fontSize: '12px',
                    color: 'var(--color-charcoal-muted)',
                    borderTop: '1px solid var(--color-border-hairline)',
                    paddingTop: '14px',
                    marginBottom: '20px',
                  }}
                >
                  <span>{stay.specs.guests} {t('featured.guests')}</span>
                  <span>•</span>
                  <span>{stay.specs.bedrooms} {t('featured.suites')}</span>
                  <span>•</span>
                  <span>{stay.specs.areaSqFt} {t('featured.sqft')}</span>
                </div>

                {/* Card Footer: Nightly Price & Aligned CTA */}
                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--color-border-hairline)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>
                      {t('featured.from')}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-forest)' }}>
                      {formatPrice(stay.pricePerNight)}{' '}
                      <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-charcoal-muted)' }}>
                        {t('featured.night')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectStay(stay)}
                    className="btn-outline-luxe"
                    style={{ padding: '9px 18px', fontSize: '12px' }}
                  >
                    {t('featured.viewDetails')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
