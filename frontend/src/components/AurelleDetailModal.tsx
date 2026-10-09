import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { HotelStay } from '../types/aurelle';
import { useAuth } from '../context/AuthContext';

interface AurelleDetailModalProps {
  stay: HotelStay | null;
  onClose: () => void;
}

export const AurelleDetailModal: React.FC<AurelleDetailModalProps> = ({ stay, onClose }) => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [nights, setNights] = useState(3);
  const [checkIn, setCheckIn] = useState<string>(() => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    return tmr.toISOString().split('T')[0];
  });
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [extraServices, setExtraServices] = useState<number[]>([]);
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setBookingSuccess(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Fetch services
    fetch('http://localhost:8088/api/services')
      .then(res => res.json())
      .then(data => setDbServices(data))
      .catch(console.error);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stay, onClose]);

  if (!stay) return null;

  const serviceMultiplier = i18n.language.startsWith('vi') ? 25000 : 1;
  const extraCost = extraServices.reduce((total, id) => {
    const s = dbServices.find(serv => serv.maDichVu === id);
    return total + (s ? s.gia : 0);
  }, 0) * serviceMultiplier;
  const discount = promoDiscount * serviceMultiplier;
  const totalEstimate = stay.pricePerNight * nights + extraCost - discount;

  const handleApplyPromo = () => {
    if (!promoCode) return;
    fetch(`http://localhost:8088/api/promotions/check?code=${promoCode}`)
      .then(res => {
        if (!res.ok) {
          setIsPromoApplied(false);
          setPromoDiscount(0);
          alert(t('modal.invalidPromo', 'Invalid or expired promo code.'));
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setIsPromoApplied(true);
          setPromoDiscount(data.soTienGiam);
        }
      })
      .catch(console.error);
  };

  const handleBooking = async () => {
    if (!isAuthenticated || !user) {
      alert('Vui lòng đăng nhập để đặt phòng!');
      return;
    }
    
    setLoadingBooking(true);
    try {
      const maLoaiPhong = parseInt(stay.id.replace('room-', ''));
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkIn);
      checkOutDate.setDate(checkOutDate.getDate() + nights);
      
      const payload = {
        maKhachHang: user.maKH,
        maLoaiPhong: maLoaiPhong,
        soLuongPhong: 1,
        ngayNhan: checkInDate.toISOString().split('T')[0],
        ngayTra: checkOutDate.toISOString().split('T')[0],
        soNguoi: stay.specs.guests,
        maCodeKhuyenMai: isPromoApplied ? promoCode : null,
        ghiChu: extraServices.length > 0 ? `Dịch vụ thêm: ${extraServices.join(',')}` : ''
      };

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8088/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        setBookingSuccess(true);
      } else {
        alert(data.message || 'Có lỗi xảy ra khi đặt phòng.');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối đến máy chủ.');
    } finally {
      setLoadingBooking(false);
    }
  };

  const formatPrice = (amount: number) => {
    if (i18n.language.startsWith('vi')) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    return `$${amount.toLocaleString()}`;
  };

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
                {formatPrice(stay.pricePerNight)}{' '}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>Check In</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px',
                  }}
                />
                
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
                  <option value={1}>1 {t('modal.nights')}</option>
                  <option value={2}>2 {t('modal.nights')}</option>
                  <option value={3}>3 {t('modal.nights')}</option>
                  <option value={5}>5 {t('modal.nights')}</option>
                  <option value={7}>7 {t('modal.nights')}</option>
                </select>
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-champagne)' }}>
                  {t('modal.total')} {formatPrice(totalEstimate)}
                </div>
              </div>
            </div>

            {/* Extra Services & Promo Code */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '16px', marginBottom: '20px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-charcoal-muted)', marginBottom: '8px', display: 'block' }}>
                  {t('modal.extraServices')}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dbServices.map(service => (
                    <label key={service.maDichVu} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={extraServices.includes(service.maDichVu)} 
                        onChange={(e) => {
                          if (e.target.checked) setExtraServices([...extraServices, service.maDichVu]);
                          else setExtraServices(extraServices.filter(id => id !== service.maDichVu));
                        }} 
                      />
                      {service.tenDichVu} (+{formatPrice(service.gia * serviceMultiplier)})
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-charcoal-muted)', marginBottom: '8px', display: 'block' }}>
                  {t('modal.promoCode')}
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. VIP"
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid var(--color-border-hairline)',
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  />
                  <button 
                    onClick={handleApplyPromo}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--color-charcoal)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    Apply
                  </button>
                </div>
                {isPromoApplied && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#065F46' }}>
                    ✓ Promo applied! -{formatPrice(discount)}
                  </div>
                )}
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
                onClick={handleBooking}
                disabled={loadingBooking}
                className="btn-gold"
                style={{ width: '100%', padding: '14px', opacity: loadingBooking ? 0.7 : 1 }}
              >
                {loadingBooking ? 'Processing...' : t('modal.requestBtn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
