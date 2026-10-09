import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { HotelStay } from '../types/aurelle';

interface AurelleDetailModalProps {
  stay: HotelStay | null;
  onClose: () => void;
}

export const AurelleDetailModal: React.FC<AurelleDetailModalProps> = ({ stay, onClose }) => {
  const { t } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [nights, setNights] = useState(3);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setBookingSuccess(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stay, onClose]);

  if (!stay) return null;

  const totalEstimate = stay.pricePerNight * nights;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 35, 31, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          maxWidth: '880px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-float)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            close
          </span>
        </button>

        {/* Gallery Image Display */}
        <div style={{ position: 'relative', width: '100%', height: '380px', backgroundColor: '#ECE6DB' }}>
          <img
            src={stay.gallery[activeImageIndex] || stay.imageUrl}
            alt={stay.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Gallery Thumbnail Selector */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              display: 'flex',
              gap: '8px',
            }}
          >
            {stay.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: '54px',
                  height: '36px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: activeImageIndex === idx ? '2px solid var(--color-champagne)' : '2px solid rgba(255,255,255,0.7)',
                  opacity: activeImageIndex === idx ? 1 : 0.7,
                  cursor: 'pointer',
                }}
              >
                <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'var(--color-forest)',
              color: 'var(--color-ivory)',
              padding: '6px 14px',
              borderRadius: '4px',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}
          >
            {stay.collection}
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '36px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-champagne)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                {stay.location}, {stay.country}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--color-forest)' }}>
                {stay.title}
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-forest)' }}>
                ${stay.pricePerNight}{' '}
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-charcoal-muted)' }}>
                  {t('featured.night')}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)' }}>
                ★ {stay.rating} ({stay.reviewsCount} {t('modal.reviews')})
              </div>
            </div>
          </div>

          {/* Specs Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              backgroundColor: 'var(--color-ivory-surface)',
              padding: '16px 20px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-hairline)',
              marginBottom: '24px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>
                {t('modal.capacity')}
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-forest)', fontSize: '14px' }}>
                {t('modal.upTo')} {stay.specs.guests} {t('modal.guests')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>
                {t('modal.bedrooms')}
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-forest)', fontSize: '14px' }}>
                {stay.specs.bedrooms} {t('modal.suites')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>
                {t('modal.bathrooms')}
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-forest)', fontSize: '14px' }}>
                {stay.specs.bathrooms} {t('modal.baths')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>
                {t('modal.livingSpace')}
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-forest)', fontSize: '14px' }}>
                {stay.specs.areaSqFt} {t('modal.sqft')}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '28px' }}>
            <h4
              style={{
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-forest)',
                marginBottom: '10px',
              }}
            >
              {t('modal.overview')}
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', lineHeight: 1.8 }}>
              {stay.description}
            </p>
          </div>

          {/* Curated Amenities */}
          <div style={{ marginBottom: '32px' }}>
            <h4
              style={{
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-forest)',
                marginBottom: '12px',
              }}
            >
              {t('modal.inclusions')}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {stay.amenities.map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-ivory)',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '4px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    color: 'var(--color-forest)',
                    fontWeight: 500,
                  }}
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Demo Reservation Box */}
          <div
            style={{
              borderTop: '1px solid var(--color-border-hairline)',
              paddingTop: '24px',
              backgroundColor: 'var(--color-ivory-surface)',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-hairline)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '18px',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-forest)' }}>
                  {t('modal.reserve')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)' }}>
                  {t('modal.demoNote')}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>{t('modal.duration')}</span>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  style={{
                    padding: '6px 10px',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px',
                  }}
                >
                  <option value={2}>2 {t('modal.nights')}</option>
                  <option value={3}>3 {t('modal.nights')}</option>
                  <option value={5}>5 {t('modal.nights')}</option>
                  <option value={7}>7 {t('modal.nights')}</option>
                </select>
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-champagne)' }}>
                  {t('modal.total')} ${totalEstimate.toLocaleString()}
                </div>
              </div>
            </div>

            {bookingSuccess ? (
              <div
                style={{
                  padding: '14px 18px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  borderRadius: '6px',
                  border: '1px solid #A7F3D0',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  check_circle
                </span>
                <span>
                  {t('modal.success', { stay: stay.title })}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setBookingSuccess(true)}
                className="btn-gold"
                style={{ width: '100%', padding: '14px' }}
              >
                {t('modal.requestBtn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
