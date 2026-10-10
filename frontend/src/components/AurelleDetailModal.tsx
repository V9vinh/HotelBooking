import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { HotelStay } from '../types/aurelle';
import { useAuth } from '../context/AuthContext';

interface AurelleDetailModalProps {
  stay: HotelStay | null;
  onClose: () => void;
  initialDates?: { checkIn: string; checkOut: string } | null;
}

export const AurelleDetailModal: React.FC<AurelleDetailModalProps> = ({ stay, onClose, initialDates }) => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<string>(() => {
    if (initialDates && initialDates.checkIn) return initialDates.checkIn;
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    return tmr.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState<string>(() => {
    if (initialDates && initialDates.checkOut) return initialDates.checkOut;
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 2);
    return nextDay.toISOString().split('T')[0];
  });
  
  const [isCheckInFocused, setIsCheckInFocused] = useState(false);
  const [isCheckOutFocused, setIsCheckOutFocused] = useState(false);
  
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

    fetch('http://localhost:8088/api/services')
      .then(res => res.json())
      .then(data => setDbServices(data))
      .catch(console.error);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stay, onClose]);

  if (!stay) return null;

  const checkInDateObj = new Date(checkIn);
  const checkOutDateObj = new Date(checkOut);
  const calculatedNights = Math.max(0, Math.ceil((checkOutDateObj.getTime() - checkInDateObj.getTime()) / (1000 * 60 * 60 * 24)));
  const isValidDates = calculatedNights > 0 && checkInDateObj >= new Date(new Date().setHours(0,0,0,0));

  const isVi = i18n.language.startsWith('vi');
  const serviceMultiplier = isVi ? 1 : 1 / 25000;
  
  const extraCost = extraServices.reduce((total, id) => {
    const s = dbServices.find(serv => serv.maDichVu === id);
    return total + (s ? s.gia : 0);
  }, 0) * (isVi ? 1 : 1 / 25000);
  
  const basePricePerNight = isVi ? stay.pricePerNight : stay.pricePerNight / 25000;
  const roomTotal = basePricePerNight * calculatedNights;
  const serviceFee = roomTotal * 0.05;
  const vat = roomTotal * 0.08;
  const taxesAndFees = serviceFee + vat;
  const discount = promoDiscount * (isVi ? 1 : 1 / 25000);
  
  const finalTotal = roomTotal + extraCost + taxesAndFees - discount;

  const handleApplyPromo = () => {
    if (!promoCode) return;
    fetch(`http://localhost:8088/api/promotions/check?code=${promoCode}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setIsPromoApplied(true);
          setPromoDiscount(data.soTienGiam);
        } else {
          setIsPromoApplied(false);
          setPromoDiscount(0);
          alert(isVi ? 'Mã khuyến mãi không hợp lệ.' : 'Invalid promo code.');
        }
      })
      .catch(console.error);
  };

  const handleBooking = async () => {
    if (!isAuthenticated || !user) {
      alert(isVi ? 'Vui lòng đăng nhập để đặt phòng!' : 'Please sign in to book!');
      return;
    }
    if (!isValidDates) {
      alert(isVi ? 'Ngày đặt phòng không hợp lệ.' : 'Invalid dates selected.');
      return;
    }
    
    setLoadingBooking(true);
    try {
      const maLoaiPhong = parseInt(stay.id.replace('room-', ''));
      const payload = {
        maKhachHang: user.maKH,
        maLoaiPhong: maLoaiPhong,
        soLuongPhong: 1,
        ngayNhan: checkIn,
        ngayTra: checkOut,
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
        alert(data.message || (isVi ? 'Có lỗi xảy ra.' : 'An error occurred.'));
      }
    } catch (error) {
      console.error(error);
      alert(isVi ? 'Lỗi kết nối đến máy chủ.' : 'Connection error.');
    } finally {
      setLoadingBooking(false);
    }
  };

  const formatPrice = (amount: number) => {
    if (isVi) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    return `$${Math.round(amount).toLocaleString()}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isVi) {
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const areaText = isVi 
    ? `${Math.round(stay.specs.areaSqFt / 10.764)} m²` 
    : `${stay.specs.areaSqFt} sq ft`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 35, 31, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 20px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        style={{
          backgroundColor: 'var(--color-ivory)',
          borderRadius: '0px', // sharp corners for editorial look
          maxWidth: '1280px',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
          margin: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            zIndex: 10,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border-hairline)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
        </button>

        {/* Gallery Section */}
        <div style={{ width: '100%', height: '500px', position: 'relative', backgroundColor: '#ECE6DB' }}>
          <img
            src={stay.gallery[activeImageIndex] || stay.imageUrl}
            alt={stay.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          
          {stay.gallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : stay.gallery.length - 1));
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '24px',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid var(--color-border-hairline)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--color-charcoal)',
                  zIndex: 2,
                }}
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev < stay.gallery.length - 1 ? prev + 1 : 0));
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '24px',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid var(--color-border-hairline)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--color-charcoal)',
                  zIndex: 2,
                }}
                aria-label="Next image"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
              </button>
            </>
          )}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            backgroundColor: 'var(--color-forest)',
            color: 'var(--color-ivory)',
            padding: '8px 16px',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}>
            {stay.collection}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--color-charcoal)'
          }}>
            {activeImageIndex + 1} / {stay.gallery.length} {isVi ? 'Ảnh' : 'Photos'}
          </div>
        </div>
        
        {/* Thumbnails */}
        <div style={{ display: 'flex', gap: '8px', padding: '16px 40px', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border-hairline)' }}>
          {stay.gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              style={{
                width: '80px',
                height: '56px',
                padding: 0,
                border: activeImageIndex === idx ? '2px solid var(--color-champagne)' : '2px solid transparent',
                opacity: activeImageIndex === idx ? 1 : 0.6,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {/* Main Content (Left) */}
          <div style={{ flex: '1 1 60%', padding: '48px 40px' }}>
            
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '13px', color: 'var(--color-champagne)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                District 1, Ho Chi Minh City • Saigon Riverside
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: 'var(--color-forest)', fontWeight: 400, marginBottom: '16px', lineHeight: 1.2 }}>
                {stay.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--color-charcoal-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-champagne)' }}>
                  {'★'.repeat(Math.floor(stay.rating))}
                  <span style={{ color: 'var(--color-charcoal-muted)', marginLeft: '8px' }}>
                    {stay.rating} ({stay.reviewsCount} {isVi ? 'Đánh giá' : 'Reviews'})
                  </span>
                </div>
              </div>
            </div>

            {/* Spec Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
              gap: '24px',
              padding: '24px 0',
              borderTop: '1px solid var(--color-border-hairline)',
              borderBottom: '1px solid var(--color-border-hairline)',
              marginBottom: '32px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {isVi ? 'Sức chứa' : 'Capacity'}
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-charcoal)', fontSize: '14px' }}>
                  {stay.specs.guests} {isVi ? 'Người lớn' : 'Adults'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {isVi ? 'Diện tích' : 'Size'}
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-charcoal)', fontSize: '14px' }}>
                  {areaText}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {isVi ? 'Giường' : 'Bed'}
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-charcoal)', fontSize: '14px' }}>
                  Imperial King
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {isVi ? 'Tầm nhìn' : 'View'}
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-charcoal)', fontSize: '14px' }}>
                  {stay.subtitle}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '15px', color: 'var(--color-charcoal)', lineHeight: 1.8, fontWeight: 300 }}>
                {stay.description}
              </p>
            </div>

            {/* Services Sections */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '16px' }}>
                  {isVi ? 'Tiện nghi phòng' : 'Room Amenities'}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {stay.amenities.map((item, idx) => (
                    <li key={idx} style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-champagne)' }}>check</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '16px' }}>
                  {isVi ? 'Dịch vụ đi kèm' : 'Included Services'}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    isVi ? 'Bữa sáng Champagne hàng ngày' : 'Daily Champagne Breakfast',
                    isVi ? 'Đặc quyền Executive Lounge' : 'Executive Lounge Access',
                    isVi ? 'Dịch vụ Quản gia 24/7' : '24/7 Butler Service',
                    isVi ? 'Dọn phòng & chỉnh trang buổi tối' : 'Daily Housekeeping & Turndown'
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-champagne)' }}>room_service</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-hairline)', padding: '24px', marginBottom: '40px' }}>
              <h4 style={{ fontSize: '15px', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '16px' }}>
                {isVi ? 'Chính sách & Thông tin' : 'Policies & Trust Information'}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-forest)' }}>{isVi ? 'Hủy phòng miễn phí' : 'Free Cancellation'}</strong>
                  {isVi ? 'Trước 72 giờ tính đến thời điểm nhận phòng (14:00 giờ địa phương).' : 'Up to 72 hours before check-in (14:00 local time).'}
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-forest)' }}>{isVi ? 'Nhận/Trả phòng' : 'Check-in / Check-out'}</strong>
                  {isVi ? 'Nhận phòng từ 14:00 | Trả phòng đến 12:00.' : 'Check-in from 14:00 | Check-out until 12:00.'}
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-forest)' }}>{isVi ? 'Thanh toán' : 'Payment Methods'}</strong>
                  {isVi ? 'Thẻ tín dụng (Visa, Master), Chuyển khoản. Mã hóa SSL 256-bit an toàn.' : 'All major credit cards, Bank Transfer. Secure 256-bit SSL encrypted.'}
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-forest)' }}>{isVi ? 'Vị trí' : 'Location & Distance'}</strong>
                  {isVi ? 'Cách sân bay Tân Sơn Nhất 7.2 km (khoảng 25 phút).' : '7.2 km (approx. 25 mins) from Tan Son Nhat Airport (SGN).'}
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Booking Panel (Right) */}
          <div style={{ flex: '1 1 40%', backgroundColor: '#FFFFFF', borderLeft: '1px solid var(--color-border-hairline)', padding: '48px 40px', position: 'relative' }}>
            <div style={{ position: 'sticky', top: '48px' }}>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'var(--color-forest)' }}>
                  {formatPrice(basePricePerNight)} <span style={{ fontSize: '14px', fontFamily: 'var(--font-sans)', color: 'var(--color-charcoal-muted)' }}>/ {isVi ? 'đêm' : 'night'}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-champagne)', marginTop: '4px', fontWeight: 500 }}>
                  {isVi ? 'Đặc quyền Đặt phòng Trực tiếp: Tặng tín dụng Spa $50' : 'Direct Booking Benefit: Complimentary $50 Spa Credit'}
                </div>
              </div>

              {/* Dates & Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal-muted)', marginBottom: '6px', display: 'block' }}>
                    {isVi ? 'Nhận phòng' : 'Check In'}
                  </label>
                  <input
                    type={isCheckInFocused || !checkIn ? 'date' : 'text'}
                    value={isCheckInFocused || !checkIn ? checkIn : formatDate(checkIn)}
                    onFocus={() => setIsCheckInFocused(true)}
                    onBlur={() => setIsCheckInFocused(false)}
                    onChange={(e) => setCheckIn(e.target.value)}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border-hairline)', backgroundColor: 'var(--color-ivory-surface)', fontSize: '14px', outline: 'none', cursor: 'text' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal-muted)', marginBottom: '6px', display: 'block' }}>
                    {isVi ? 'Trả phòng' : 'Check Out'}
                  </label>
                  <input
                    type={isCheckOutFocused || !checkOut ? 'date' : 'text'}
                    value={isCheckOutFocused || !checkOut ? checkOut : formatDate(checkOut)}
                    onFocus={() => setIsCheckOutFocused(true)}
                    onBlur={() => setIsCheckOutFocused(false)}
                    onChange={(e) => setCheckOut(e.target.value)}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border-hairline)', backgroundColor: 'var(--color-ivory-surface)', fontSize: '14px', outline: 'none', cursor: 'text' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '13px', color: 'var(--color-forest)', textAlign: 'center', padding: '8px', backgroundColor: '#F8F9FA' }}>
                    {isValidDates ? (isVi ? `${calculatedNights} Đêm lưu trú` : `${calculatedNights} Nights Sanctuary Residency`) : (isVi ? 'Vui lòng chọn ngày hợp lệ' : 'Please select valid dates')}
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-forest)', marginBottom: '12px', display: 'block', fontWeight: 600 }}>
                  {isVi ? 'Dịch vụ thêm (Tùy chọn)' : 'Bespoke Add-on Services'}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {dbServices.map(service => {
                    const priceFormatted = formatPrice(service.gia * (isVi ? 1 : 1 / 25000));
                    return (
                      <label key={service.maDichVu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', cursor: 'pointer', padding: '12px', border: '1px solid var(--color-border-hairline)', backgroundColor: extraServices.includes(service.maDichVu) ? 'var(--color-ivory-surface)' : '#FFFFFF' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input 
                            type="checkbox" 
                            checked={extraServices.includes(service.maDichVu)}
                            onChange={(e) => {
                              if (e.target.checked) setExtraServices([...extraServices, service.maDichVu]);
                              else setExtraServices(extraServices.filter(id => id !== service.maDichVu));
                            }} 
                            style={{ accentColor: 'var(--color-forest)' }}
                          />
                          <span style={{ color: 'var(--color-charcoal)' }}>{service.tenDichVu}</span>
                        </div>
                        <span style={{ color: 'var(--color-charcoal-muted)' }}>+{priceFormatted}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Promo */}
              <div style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={isVi ? "Mã Khuyến Mãi" : "Promo Code"}
                  style={{ flex: 1, padding: '12px', border: '1px solid var(--color-border-hairline)', fontSize: '13px', outline: 'none' }}
                />
                <button onClick={handleApplyPromo} style={{ padding: '0 20px', backgroundColor: 'var(--color-forest)', color: '#FFF', border: 'none', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  {isVi ? 'Áp dụng' : 'Apply'}
                </button>
              </div>

              {/* Breakdown */}
              <div style={{ borderTop: '1px solid var(--color-border-hairline)', paddingTop: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-charcoal-muted)', marginBottom: '12px' }}>
                  <span>{calculatedNights} {isVi ? 'Đêm' : 'Nights'} × {formatPrice(basePricePerNight)}</span>
                  <span>{formatPrice(roomTotal)}</span>
                </div>
                {extraCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-charcoal-muted)', marginBottom: '12px' }}>
                    <span>{isVi ? 'Dịch vụ thêm' : 'Add-on Services'}</span>
                    <span>+{formatPrice(extraCost)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-charcoal-muted)', marginBottom: '12px' }}>
                  <span>{isVi ? 'Thuế & Phí dịch vụ' : 'Taxes & Fees (13%)'}</span>
                  <span>{formatPrice(taxesAndFees)}</span>
                </div>
                {isPromoApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-champagne)', marginBottom: '12px' }}>
                    <span>{isVi ? 'Khuyến mãi' : 'Promo Discount'}</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: 'var(--color-forest)', fontWeight: 600, marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border-hairline)' }}>
                  <span>{isVi ? 'Tổng thanh toán' : 'Total Investment'}</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', textAlign: 'right', marginTop: '4px' }}>
                  {isVi ? 'Đã bao gồm thuế và phí' : 'Includes taxes and fees'}
                </div>
              </div>

              {bookingSuccess ? (
                <div style={{ padding: '16px', backgroundColor: '#F0F9F4', border: '1px solid #BFE4D3', color: '#1A633F', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>
                  ✓ {isVi ? 'Yêu cầu đặt phòng đã được gửi! Quản gia của chúng tôi sẽ liên hệ sớm.' : 'Reservation request submitted! Our concierge will contact you shortly.'}
                </div>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={loadingBooking || !isValidDates}
                  className="btn-gold"
                  style={{ width: '100%', padding: '18px', fontSize: '13px', letterSpacing: '0.1em', opacity: (loadingBooking || !isValidDates) ? 0.6 : 1 }}
                >
                  {loadingBooking ? (isVi ? 'Đang xử lý...' : 'Processing...') : (isVi ? 'XÁC NHẬN ĐẶT PHÒNG' : 'RESERVE THIS SANCTUARY')}
                </button>
              )}
              <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-charcoal-muted)', marginTop: '16px' }}>
                {isVi ? 'Đảm bảo giá trực tiếp tốt nhất • Không tính phí ngay' : '100% Best Direct Rate Guaranteed • No immediate charge'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
