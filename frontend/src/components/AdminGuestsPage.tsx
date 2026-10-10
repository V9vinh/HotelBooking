import React, { useState, useEffect } from 'react';

interface Guest {
  maKH: number;
  tenDangNhap: string | null;
  hoTen: string;
  sdt: string;
  email: string | null;
  cmndCccd: string | null;
  diaChi: string | null;
  ngaySinh: string | null;
  gioiTinh: string | null;
  ngayTao: string | null;
}

export const AdminGuestsPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGuests = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch('http://localhost:8088/api/users/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((data: Guest[]) => {
        setGuests(data);
      })
      .catch(err => console.error("Error fetching guests:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const filteredGuests = guests.filter(g => 
    g.hoTen?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.sdt?.includes(searchTerm) ||
    g.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100%' }}>
      {/* HEADER */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E6DFD3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: 'var(--color-forest)', fontFamily: 'Playfair Display', margin: '0 0 8px 0' }}>Quản lý Khách hàng</h1>
          <p style={{ margin: 0, color: '#727976', fontSize: '15px' }}>Xem và tìm kiếm thông tin khách hàng đã lưu trên hệ thống.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', color: 'var(--color-forest)', 
            padding: '10px 18px', borderRadius: '4px', cursor: 'pointer', 
            fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
            Xuất Excel
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* FILTERS */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E6DFD3', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#727976', fontSize: '20px' }}>search</span>
            <input 
              type="text" 
              placeholder="Tìm theo tên, SĐT hoặc email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', padding: '10px 12px 10px 40px', backgroundColor: '#F4F5F7', 
                border: '1px solid transparent', borderRadius: '4px', fontSize: '15px', color: 'var(--color-forest)', outline: 'none' 
              }} 
            />
          </div>
          <button onClick={fetchGuests} style={{ background: 'transparent', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '15px', fontWeight: 500 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>refresh</span> Làm mới
          </button>
        </div>

        {/* DATA TABLE */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E6DFD3', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E6DFD3' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mã KH</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Khách Hàng</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Liên Hệ</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CMND/CCCD</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Giới Tính</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#727976' }}>Đang tải dữ liệu...</td>
                </tr>
              ) : filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#727976' }}>Không tìm thấy khách hàng nào</td>
                </tr>
              ) : (
                filteredGuests.map(g => (
                  <tr key={g.maKH} style={{ borderBottom: '1px solid #E6DFD3', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '16px 20px', fontSize: '15px', color: 'var(--color-forest)', fontWeight: 500 }}>
                      #{g.maKH}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '4px' }}>{g.hoTen}</div>
                      {g.tenDangNhap && (
                        <div style={{ fontSize: '13px', color: '#727976', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>person</span>
                          {g.tenDangNhap}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '15px', color: 'var(--color-forest)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#727976' }}>call</span> {g.sdt}
                      </div>
                      <div style={{ fontSize: '15px', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#727976' }}>mail</span> {g.email || '—'}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '15px', color: 'var(--color-forest)' }}>
                      {g.cmndCccd || '—'}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '15px', color: 'var(--color-forest)' }}>
                      {g.gioiTinh || '—'}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--color-champagne)', cursor: 'pointer', fontSize: '15px', fontWeight: 600 }}>Chi tiết</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
