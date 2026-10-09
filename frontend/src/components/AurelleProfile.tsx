import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AurellePaymentModal } from './AurellePaymentModal';
import { AurelleReviewModal } from './AurelleReviewModal';

interface RoomInfo {
  soPhong: string;
  tenLoaiPhong: string;
}

interface BookingHistory {
  maPhieu: number;
  ngayDat: string;
  ngayNhan: string;
  ngayTra: string;
  soNguoi: number;
  tongTien: number;
  trangThai: string;
  rooms: RoomInfo[];
  isReviewed: boolean;
}

export function AurelleProfile({ onBack }: { onBack: () => void }) {
  const { user, updateProfile, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  
  const [formData, setFormData] = useState({
    hoTen: user?.hoTen || '',
    sdt: user?.sdt || '',
    email: user?.email || '',
    cmndCccd: user?.cmndCccd || '',
    diaChi: user?.diaChi || '',
    ngaySinh: user?.ngaySinh || '',
    gioiTinh: user?.gioiTinh || 'Nam'
  });
  
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [history, setHistory] = useState<BookingHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [paymentBooking, setPaymentBooking] = useState<{ id: number; amount: number } | null>(null);
  const [reviewBookingId, setReviewBookingId] = useState<number | null>(null);

  const fetchHistory = () => {
    if (!user) return;
    setLoadingHistory(true);
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8088/api/bookings/history/${user.maKH}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(console.error)
      .finally(() => setLoadingHistory(false));
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab, user]);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await updateProfile(formData);
      setMsg('Cập nhật thành công!');
    } catch (err: any) {
      setMsg(err.message || 'Lỗi cập nhật');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DaXacNhan': return '#065F46'; // green
      case 'ChoXacNhan': return '#B45309'; // orange
      case 'DaHuy': return '#991B1B'; // red
      case 'DaCheckIn': return '#1D4ED8'; // blue
      case 'DaCheckOut': return '#4B5563'; // gray
      default: return '#4B5563';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'DaXacNhan': return 'Đã xác nhận';
      case 'ChoXacNhan': return 'Chờ xác nhận';
      case 'DaHuy': return 'Đã huỷ';
      case 'DaCheckIn': return 'Đang ở (Check-in)';
      case 'DaCheckOut': return 'Đã trả phòng (Check-out)';
      default: return status;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <button 
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: 'var(--color-champagne)', cursor: 'pointer', marginBottom: '20px', fontWeight: 600 }}
      >
        &larr; Quay lại
      </button>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', borderBottom: '1px solid var(--color-border)' }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            background: 'none', border: 'none', padding: '12px 0', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
            color: activeTab === 'profile' ? 'var(--color-forest)' : 'var(--color-charcoal-muted)',
            borderBottom: activeTab === 'profile' ? '2px solid var(--color-forest)' : '2px solid transparent'
          }}
        >
          Hồ sơ cá nhân
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            background: 'none', border: 'none', padding: '12px 0', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
            color: activeTab === 'history' ? 'var(--color-forest)' : 'var(--color-charcoal-muted)',
            borderBottom: activeTab === 'history' ? '2px solid var(--color-forest)' : '2px solid transparent'
          }}
        >
          Lịch sử đặt phòng
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="animate-fade-in">
          <p style={{ color: 'var(--color-charcoal-muted)', marginBottom: '32px' }}>
            Tài khoản: <strong>{user.tenDangNhap}</strong>
          </p>

          {msg && <div style={{ padding: '12px', backgroundColor: msg.includes('thành công') ? '#d4edda' : '#f8d7da', color: msg.includes('thành công') ? '#155724' : '#721c24', marginBottom: '20px', borderRadius: '4px' }}>{msg}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>Họ và tên</label>
              <input name="hoTen" value={formData.hoTen} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>Số điện thoại</label>
                <input name="sdt" value={formData.sdt} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>Địa chỉ</label>
              <input name="diaChi" value={formData.diaChi} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>CMND/CCCD</label>
                <input name="cmndCccd" value={formData.cmndCccd} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>Ngày sinh</label>
                <input name="ngaySinh" type="date" value={formData.ngaySinh} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>Giới tính</label>
                <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', boxSizing: 'border-box' }}>
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nữ</option>
                  <option value="Khac">Khác</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ padding: '14px 24px', backgroundColor: 'var(--color-forest)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', flex: 1 }}
              >
                {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
              </button>
              
              <button 
                type="button" 
                onClick={() => {
                  logout();
                  onBack();
                }}
                style={{ padding: '14px 24px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                Đăng xuất
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="animate-fade-in">
          {loadingHistory ? (
            <p>Đang tải dữ liệu...</p>
          ) : history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--color-ivory)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--color-charcoal-muted)' }}>Bạn chưa có đặt phòng nào.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {history.map((booking) => (
                <div key={booking.maPhieu} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)' }}>
                      Mã phiếu: #{booking.maPhieu}
                    </div>
                    <div style={{ 
                      fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px',
                      backgroundColor: `${getStatusColor(booking.trangThai)}20`, color: getStatusColor(booking.trangThai)
                    }}>
                      {getStatusText(booking.trangThai)}
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                    <div>
                      <div style={{ color: 'var(--color-charcoal-muted)' }}>Check-in:</div>
                      <div style={{ fontWeight: 600 }}>{booking.ngayNhan}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-charcoal-muted)' }}>Check-out:</div>
                      <div style={{ fontWeight: 600 }}>{booking.ngayTra}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-charcoal-muted)' }}>Ngày đặt:</div>
                      <div style={{ fontWeight: 600 }}>{new Date(booking.ngayDat).toLocaleString('vi-VN')}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-charcoal-muted)' }}>Tổng tiền:</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-champagne)' }}>{formatPrice(booking.tongTien)}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '13px' }}>
                    <div style={{ color: 'var(--color-charcoal-muted)', marginBottom: '8px' }}>Phòng đã đặt:</div>
                    {booking.rooms.length > 0 ? booking.rooms.map((room, idx) => (
                      <span key={idx} style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border)', borderRadius: '4px', marginRight: '8px', marginBottom: '8px' }}>
                        {room.tenLoaiPhong} (Phòng: {room.soPhong})
                      </span>
                    )) : (
                      <span style={{ fontStyle: 'italic', color: 'var(--color-charcoal-muted)' }}>Đang xếp phòng...</span>
                    )}
                  </div>

                  {(booking.trangThai === 'ChoXacNhan' || booking.trangThai === 'DaXacNhan') && (
                    <div style={{ marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setPaymentBooking({ id: booking.maPhieu, amount: booking.tongTien })}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#1A1A1A',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '14px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>qr_code_scanner</span>
                        Thanh toán QR
                      </button>
                    </div>
                  )}

                  {booking.trangThai === 'DaCheckOut' && !booking.isReviewed && (
                    <div style={{ marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setReviewBookingId(booking.maPhieu)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: 'var(--color-champagne)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '14px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>star_rate</span>
                        Viết đánh giá
                      </button>
                    </div>
                  )}

                  {booking.trangThai === 'DaCheckOut' && booking.isReviewed && (
                    <div style={{ marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-forest)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                        Đã đánh giá
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {paymentBooking && (
        <AurellePaymentModal
          bookingId={paymentBooking.id}
          amount={paymentBooking.amount}
          onClose={() => setPaymentBooking(null)}
          onSuccess={() => {
            setPaymentBooking(null);
            fetchHistory(); // Refresh history
          }}
        />
      )}

      {reviewBookingId && (
        <AurelleReviewModal
          bookingId={reviewBookingId}
          onClose={() => setReviewBookingId(null)}
          onSuccess={() => {
            setReviewBookingId(null);
            fetchHistory();
          }}
        />
      )}
    </div>
  );
}
