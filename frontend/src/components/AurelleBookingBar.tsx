import React, { useState } from 'react';
import type { BookingSearchQuery } from '../types/aurelle';

interface AurelleBookingBarProps {
  onSearch: (query: BookingSearchQuery) => void;
  isLoading?: boolean;
}

export const AurelleBookingBar: React.FC<AurelleBookingBarProps> = ({ onSearch, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      setValidationError('Check-out date must be after check-in date.');
      return;
    }

    onSearch({
      destination,
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <div
      id="booking-bar"
      style={{
        maxWidth: '1160px',
        margin: '-45px auto 40px',
        padding: '0 24px',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <form
        onSubmit={handleSearchSubmit}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '24px 32px',
          boxShadow: 'var(--shadow-float)',
          border: '1px solid var(--color-border-hairline)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
          gap: '20px',
          alignItems: 'center',
        }}
        className="booking-form-grid"
      >
        {/* Destination */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: 'var(--color-charcoal-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--color-champagne)' }}>
              location_on
            </span>
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '4px',
              padding: '10px 14px',
              fontSize: '14px',
              backgroundColor: 'var(--color-ivory-surface)',
              color: 'var(--color-charcoal)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="">All Sanctuaries (Global)</option>
            <option value="Amalfi Coast">Amalfi Coast, Italy</option>
            <option value="Kyoto">Arashiyama, Kyoto, Japan</option>
            <option value="St. Barts">St. Barts, French West Indies</option>
            <option value="Zermatt">Zermatt, Switzerland</option>
          </select>
        </div>

        {/* Check In */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: 'var(--color-charcoal-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--color-champagne)' }}>
              calendar_month
            </span>
            Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setValidationError(null);
            }}
            style={{
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '4px',
              padding: '9px 12px',
              fontSize: '14px',
              backgroundColor: 'var(--color-ivory-surface)',
              color: 'var(--color-charcoal)',
              outline: 'none',
            }}
          />
        </div>

        {/* Check Out */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: 'var(--color-charcoal-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--color-champagne)' }}>
              event_available
            </span>
            Check-Out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setValidationError(null);
            }}
            style={{
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '4px',
              padding: '9px 12px',
              fontSize: '14px',
              backgroundColor: 'var(--color-ivory-surface)',
              color: 'var(--color-charcoal)',
              outline: 'none',
            }}
          />
        </div>

        {/* Guests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: 'var(--color-charcoal-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--color-champagne)' }}>
              group
            </span>
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            style={{
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '4px',
              padding: '10px 14px',
              fontSize: '14px',
              backgroundColor: 'var(--color-ivory-surface)',
              color: 'var(--color-charcoal)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value={1}>1 Guest (Solo Sanctuary)</option>
            <option value={2}>2 Guests (Couples Retreat)</option>
            <option value={4}>4 Guests (Family Suite)</option>
            <option value={6}>6 Guests (Private Villa)</option>
            <option value={8}>8+ Guests (Estate Buyout)</option>
          </select>
        </div>

        {/* Submit CTA */}
        <div style={{ paddingTop: '22px' }}>
          <button
            type="submit"
            className="btn-gold"
            disabled={isLoading}
            style={{
              height: '46px',
              padding: '0 28px',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
          >
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  search
                </span>
                <span>Find a Stay</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Date Validation Alert */}
      {validationError && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px 16px',
            backgroundColor: '#FEF2F2',
            color: '#991B1B',
            borderRadius: '6px',
            border: '1px solid #FECACA',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            error
          </span>
          {validationError}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .booking-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
