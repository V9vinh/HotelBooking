import { useState, useEffect, useMemo } from 'react';

interface PhysicalRoom {
  maPhong: number;
  soPhong: string;
  tang: number;
  maLoaiPhong: number;
  tenLoaiPhong: string;
  trangThaiHienTai: string; // "HoatDong", "NgungHoatDong"
  trangThaiKhaDung: string; // "Trong", "DaDat", "CoKhach", "DangDon", "BaoTri"
  ghiChu?: string;
  lichSuBaoTri?: string;
}

export function AdminRoomMapPage() {
  const [rooms, setRooms] = useState<PhysicalRoom[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('');
  const [roomTypes, setRoomTypes] = useState<any[]>([]);

  // Form State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<PhysicalRoom>>({});

  useEffect(() => {
    fetch('http://localhost:8088/api/rooms/types')
      .then(res => res.json())
      .then(data => setRoomTypes(data))
      .catch(console.error);
  }, []);
  
  const fetchRooms = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Using the map endpoint but in a real app this would be a direct physical rooms endpoint
    fetch(`http://localhost:8088/api/admin/rooms/map`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then((data: any[]) => {
        // Enforce mock data for new fields
        const mapped = data.map((r, idx) => ({
          ...r,
          ghiChu: r.ghiChu || (idx % 5 === 0 ? 'Phòng góc, view đẹp' : ''),
          lichSuBaoTri: r.lichSuBaoTri || (idx % 7 === 0 ? 'Bảo trì máy lạnh 12/05/2026' : ''),
          trangThaiHienTai: 'HoatDong'
        }));
        setRooms(Array.isArray(mapped) ? mapped : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleEdit = (r: PhysicalRoom) => {
    setEditingId(r.maPhong);
    setFormData(r);
    setIsDrawerOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(0);
    setFormData({ 
      soPhong: '', tang: 1, maLoaiPhong: roomTypes[0]?.maLoaiPhong || 0,
      trangThaiKhaDung: 'Trong', trangThaiHienTai: 'HoatDong', ghiChu: ''
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setEditingId(null);
      setFormData({});
    }, 300);
  };

  const handleSave = () => {
    alert('Tính năng lưu phòng vật lý đang được phát triển.');
    closeDrawer();
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter(r => {
      if (selectedType && r.maLoaiPhong.toString() !== selectedType) return false;
      if (selectedFloor && r.tang.toString() !== selectedFloor) return false;
      return true;
    });
  }, [rooms, selectedType, selectedFloor]);

  const stats = useMemo(() => {
    return {
      total: rooms.length,
      available: rooms.filter(r => r.trangThaiKhaDung === 'Trong').length,
      maintenance: rooms.filter(r => r.trangThaiKhaDung === 'BaoTri').length,
    };
  }, [rooms]);

  const floors = useMemo(() => {
    const f = new Set(rooms.map(r => r.tang));
    return Array.from(f).sort((a, b) => b - a);
  }, [rooms]);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'Trong': return { label: 'Available', bg: '#F0FDF4', color: '#166534', dot: '#22C55E' };
      case 'DaDat': return { label: 'Reserved', bg: '#FFF7ED', color: '#9A3412', dot: '#F97316' };
      case 'CoKhach': return { label: 'Occupied', bg: '#FEF2F2', color: '#991B1B', dot: '#EF4444' };
      case 'DangDon': return { label: 'Cleaning', bg: '#F3F4F6', color: '#374151', dot: '#6B7280' };
      case 'BaoTri': return { label: 'Maintenance', bg: '#18352F', color: '#FFFFFF', dot: '#B89A68' };
      default: return { label: status, bg: '#F9FAFB', color: '#4B5563', dot: '#9CA3AF' };
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-forest)', fontFamily: 'Playfair Display', margin: '0 0 8px 0' }}>Quản lý Phòng vật lý</h1>
          <p style={{ margin: 0, color: '#727976', fontSize: '16px' }}>Cấu hình số phòng, trạng thái phòng và lịch sử bảo trì.</p>
        </div>
        <button
          onClick={handleAddNew}
          style={{
            padding: '12px 24px', backgroundColor: 'var(--color-champagne)', color: '#fff',
            borderRadius: '4px', border: 'none', cursor: 'pointer',
            fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
            textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(184, 154, 104, 0.2)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>add</span>
          Thêm Phòng
        </button>
      </div>

      {/* Filters & Quick Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', backgroundColor: '#FFFFFF', padding: '16px 24px', borderRadius: '8px', border: '1px solid #E6DFD3' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <select 
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={{ 
              border: '1px solid #E6DFD3', borderRadius: '4px', padding: '10px 16px', 
              fontSize: '16px', color: 'var(--color-forest)', backgroundColor: '#FFFFFF', outline: 'none', cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            <option value="">Tất cả hạng phòng</option>
            {roomTypes.map(rt => (
              <option key={rt.maLoaiPhong} value={rt.maLoaiPhong}>{rt.tenLoaiPhong}</option>
            ))}
          </select>
          <select 
            value={selectedFloor}
            onChange={e => setSelectedFloor(e.target.value)}
            style={{ 
              border: '1px solid #E6DFD3', borderRadius: '4px', padding: '10px 16px', 
              fontSize: '16px', color: 'var(--color-forest)', backgroundColor: '#FFFFFF', outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="">Tất cả các tầng</option>
            {floors.map(f => (
              <option key={f} value={f}>Tầng {f}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '24px', fontSize: '15px', color: '#727976' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }}></span>
             Trong kho: <strong style={{ color: 'var(--color-forest)' }}>{stats.total}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B89A68' }}></span>
             Sẵn sàng: <strong style={{ color: 'var(--color-forest)' }}>{stats.available}</strong>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '8px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#727976' }}>Đang tải danh sách phòng...</div>
        ) : filteredRooms.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#727976' }}>Không có dữ liệu phù hợp.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
            <thead>
              <tr style={{ backgroundColor: '#FDFaf4', borderBottom: '1px solid #E6DFD3' }}>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px' }}>Số Phòng</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px' }}>Hạng Phòng</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px' }}>Trạng Thái</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px' }}>Ghi chú / Bảo trì</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 600, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((r, i) => {
                const status = getStatusDisplay(r.trangThaiKhaDung);
                return (
                  <tr key={r.maPhong} style={{ borderBottom: i === filteredRooms.length - 1 ? 'none' : '1px solid #E6DFD3', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FDFAF4'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-forest)' }}>{r.soPhong}</div>
                        {r.trangThaiHienTai === 'NgungHoatDong' && (
                          <span style={{ fontSize: '13px', padding: '2px 6px', backgroundColor: '#FEF2F2', color: '#991B1B', borderRadius: '4px', fontWeight: 500 }}>Vô hiệu hóa</span>
                        )}
                      </div>
                      <div style={{ fontSize: '14px', color: '#727976', marginTop: '4px' }}>Tầng {r.tang}</div>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--color-forest)', fontWeight: 500 }}>
                      {r.tenLoaiPhong}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        backgroundColor: status.bg, color: status.color, 
                        padding: '4px 10px', borderRadius: '16px', fontSize: '14px', fontWeight: 600 
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: status.dot }}></span>
                        {status.label}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', maxWidth: '300px' }}>
                      {r.lichSuBaoTri && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#9A3412', marginBottom: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>build</span>
                          {r.lichSuBaoTri}
                        </div>
                      )}
                      {r.ghiChu && (
                        <div style={{ fontSize: '15px', color: '#727976', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {r.ghiChu}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleEdit(r)}
                        style={{ background: 'none', border: '1px solid #E6DFD3', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', color: 'var(--color-forest)', fontSize: '15px', fontWeight: 600, transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-champagne)'; e.currentTarget.style.color = 'var(--color-champagne)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E6DFD3'; e.currentTarget.style.color = 'var(--color-forest)'; }}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Slide-out Drawer for Add/Edit Physical Room ── */}
      <div 
        onClick={closeDrawer}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(24, 53, 47, 0.4)', backdropFilter: 'blur(4px)',
          zIndex: 100,
          opacity: isDrawerOpen ? 1 : 0, pointerEvents: isDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease'
        }}
      />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '500px',
        backgroundColor: '#F7F3EB', zIndex: 101,
        transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(24, 53, 47, 0.1)'
      }}>
        {/* Drawer Header */}
        <div style={{ padding: '24px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E6DFD3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--color-forest)', fontFamily: 'Playfair Display' }}>
            {editingId === 0 ? 'Thêm Phòng Vật Lý' : `Sửa Phòng: ${formData.soPhong}`}
          </h2>
          <button onClick={closeDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#727976', display: 'flex', padding: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Số Phòng *</label>
              <input type="text" value={formData.soPhong || ''} onChange={e => setFormData({ ...formData, soPhong: e.target.value })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', color: 'var(--color-forest)', outline: 'none' }} placeholder="VD: 101" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tầng</label>
              <input type="number" value={formData.tang || ''} onChange={e => setFormData({ ...formData, tang: Number(e.target.value) })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', color: 'var(--color-forest)', outline: 'none' }} placeholder="VD: 1" />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hạng Phòng *</label>
            <select value={formData.maLoaiPhong || ''} onChange={e => setFormData({ ...formData, maLoaiPhong: Number(e.target.value) })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', outline: 'none' }}>
              {roomTypes.map(rt => (
                <option key={rt.maLoaiPhong} value={rt.maLoaiPhong}>{rt.tenLoaiPhong}</option>
              ))}
            </select>
            <p style={{ fontSize: '14px', color: '#727976', marginTop: '8px', fontStyle: 'italic' }}>* Khách hàng sẽ đặt hạng phòng này, và hệ thống/lễ tân sẽ tự động xếp họ vào phòng vật lý này khi check-in.</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trạng thái dọn dẹp / vận hành</label>
            <select value={formData.trangThaiKhaDung || ''} onChange={e => setFormData({ ...formData, trangThaiKhaDung: e.target.value })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', outline: 'none' }}>
              <option value="Trong">Available (Trống)</option>
              <option value="DaDat">Reserved (Đã đặt trước)</option>
              <option value="CoKhach">Occupied (Đang có khách)</option>
              <option value="DangDon">Cleaning (Đang dọn dẹp)</option>
              <option value="BaoTri">Maintenance (Bảo trì)</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ghi chú nội bộ</label>
            <textarea value={formData.ghiChu || ''} onChange={e => setFormData({ ...formData, ghiChu: e.target.value })} style={{ width: '100%', height: '80px', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', color: 'var(--color-forest)', outline: 'none', resize: 'vertical' }} placeholder="VD: Gần thang máy, ồn..." />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lịch sử bảo trì</label>
            <textarea value={formData.lichSuBaoTri || ''} onChange={e => setFormData({ ...formData, lichSuBaoTri: e.target.value })} style={{ width: '100%', height: '80px', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', color: 'var(--color-forest)', outline: 'none', resize: 'vertical' }} placeholder="VD: Thay nệm ngày 10/10/2026..." />
          </div>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #E6DFD3' }}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <div style={{ 
                  width: '40px', height: '24px', borderRadius: '12px', 
                  backgroundColor: formData.trangThaiHienTai === 'HoatDong' ? 'var(--color-forest)' : '#E6DFD3',
                  position: 'relative', transition: 'background-color 0.2s'
                }}>
                  <div style={{ 
                    position: 'absolute', top: '2px', left: formData.trangThaiHienTai === 'HoatDong' ? '18px' : '2px', 
                    width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF',
                    transition: 'left 0.2s'
                  }} />
                </div>
                <span style={{ fontSize: '16px', fontWeight: 500, color: formData.trangThaiHienTai === 'HoatDong' ? 'var(--color-forest)' : '#ba1a1a' }}>
                  {formData.trangThaiHienTai === 'HoatDong' ? 'Phòng Đang Hoạt Động' : 'Vô Hiệu Hóa Phòng Này'}
                </span>
             </label>
          </div>

        </div>

        {/* Drawer Footer */}
        <div style={{ padding: '24px 32px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E6DFD3', display: 'flex', justifyContent: 'flex-end', gap: '16px', flexShrink: 0 }}>
          <button onClick={closeDrawer} style={{ padding: '12px 24px', backgroundColor: '#F7F3EB', color: 'var(--color-forest)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hủy</button>
          <button onClick={handleSave} style={{ padding: '12px 32px', backgroundColor: 'var(--color-forest)', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Lưu Phòng</button>
        </div>
      </div>

    </div>
  );
}
