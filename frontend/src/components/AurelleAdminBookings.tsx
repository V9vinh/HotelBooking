import { useState, useEffect } from 'react';

interface AdminBooking {
  maPhieu: number;
  tenKhachHang: string;
  sdtKhachHang: string;
  ngayDat: string;
  ngayNhan: string;
  ngayTra: string;
  soNguoi: number;
  tongTien: number;
  trangThai: string;
}

export function AurelleAdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = () => {
    setLoading(true);
    fetch('http://localhost:8088/api/bookings/admin/all')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = (maPhieu: number, newStatus: string) => {
    fetch(`http://localhost:8088/api/bookings/admin/${maPhieu}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trangThai: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchBookings();
        } else {
          alert(data.message || 'Cập nhật thất bại');
        }
      })
      .catch(console.error);
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

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1A1A1A', marginBottom: '24px' }}>Quản lý Đặt phòng</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Mã phiếu</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Khách hàng</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Ngày đặt</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Check-in/out</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Tổng tiền</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Trạng thái</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.maPhieu} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>#{b.maPhieu}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>
                    <div>{b.tenKhachHang}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{b.sdtKhachHang}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>{new Date(b.ngayDat).toLocaleDateString('vi-VN')}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>
                    <div>IN: {new Date(b.ngayNhan).toLocaleDateString('vi-VN')}</div>
                    <div>OUT: {new Date(b.ngayTra).toLocaleDateString('vi-VN')}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827', fontWeight: 600 }}>{formatPrice(b.tongTien)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                      backgroundColor: `${getStatusColor(b.trangThai)}20`, color: getStatusColor(b.trangThai)
                    }}>
                      {getStatusText(b.trangThai)}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <select
                      value={b.trangThai}
                      onChange={(e) => updateStatus(b.maPhieu, e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', cursor: 'pointer' }}
                    >
                      <option value="ChoXacNhan">Chờ xác nhận</option>
                      <option value="DaXacNhan">Đã xác nhận</option>
                      <option value="DaCheckIn">Đã Check-in</option>
                      <option value="DaCheckOut">Đã Check-out</option>
                      <option value="DaHuy">Đã Hủy</option>
                    </select>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
