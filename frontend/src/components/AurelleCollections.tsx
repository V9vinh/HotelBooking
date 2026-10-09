import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CollectionCategory, CollectionType } from '../types/aurelle';

interface AurelleCollectionsProps {
  collections: CollectionCategory[];
  onSelectCollection: (category: CollectionType) => void;
  selectedCollection: string | null;
}

export const AurelleCollections: React.FC<AurelleCollectionsProps> = ({
  collections,
  onSelectCollection,
  selectedCollection,
}) => {
  const { t } = useTranslation();
  return (
    <section
      id="collections"
      style={{
        padding: '80px 0',
        backgroundColor: 'var(--color-ivory-surface)',
        borderTop: '1px solid var(--color-border-hairline)',
        borderBottom: '1px solid var(--color-border-hairline)',
      }}
    >
      <div className="container-luxe">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            {t('collections.tag')}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '36px',
              color: 'var(--color-forest)',
              fontWeight: 400,
              marginBottom: '16px',
            }}
          >
            {t('collections.title')}
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-charcoal-muted)' }}>
            {t('collections.subtitle')}
          </p>
        </div>

        {/* 3 Clickable Collection Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          {collections.map((cat) => {
            const isSelected = selectedCollection === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCollection(cat.id)}
                style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected
                    ? '2px solid var(--color-champagne)'
                    : '1px solid var(--color-border-hairline)',
                  boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)',
                }}
                className="collection-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)';
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(24, 53, 47, 0.1) 0%, rgba(24, 53, 47, 0.85) 100%)',
                  }}
                />

                {/* Card Content Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '32px',
                    color: '#FFFFFF',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-champagne)',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    {cat.count} {t('collections.privateSanctuaries')}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '26px',
                      fontWeight: 500,
                      marginBottom: '10px',
                    }}
                  >
                    {cat.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      color: 'rgba(247, 243, 235, 0.85)',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                    }}
                  >
                    {cat.description}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ivory)',
                    }}
                  >
                    <span>{isSelected ? t('collections.activeFilter') : t('collections.exploreStays')}</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
