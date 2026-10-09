import { useState, useEffect } from 'react';

interface RoomType {
  maLoaiPhong: number;
  tenLoaiPhong: string;
  moTa: string;
  sucChua: number;
  giaCoBan: number;
  tienNghi: string;
}

export function AurelleAdminRooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<RoomType>>({});

  const fetchRooms = () => {
    setLoading(true);
    fetch('http://localhost:8088/api/rooms/types')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSave = (id: number) => {
    if (id === 0) {
      // Create new
      fetch('http://localhost:8088/api/rooms/types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(() => {
        setEditingId(null);
        fetchRooms();
      });
    } else {
      // Update
      fetch(`http://localhost:8088/api/rooms/types/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(() => {
        setEditingId(null);
        fetchRooms();
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xoá phòng này?')) {
      fetch(`http://localhost:8088/api/rooms/types/${id}`, {
        method: 'DELETE'
      })
      .then(() => fetchRooms());
    }
  };

  const startEdit = (room?: RoomType) => {
    if (room) {
      setEditingId(room.maLoaiPhong);
      setFormData(room);
    } else {
      setEditingId(0); // 0 means new
      setFormData({ tenLoaiPhong: '', sucChua: 2, giaCoBan: 1000000, moTa: '', tienNghi: '' });
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1A1A1A' }}>Quản lý Loại phòng</h1>
        <button
          onClick={() => startEdit()}
          style={{ padding: '8px 16px', backgroundColor: 'var(--color-champagne)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          + Thêm phòng
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {editingId === 0 && (
            <div style={{ border: '1px solid var(--color-champagne)', padding: '16px', borderRadius: '8px', backgroundColor: '#fdfbf7' }}>
              <h3>Thêm phòng mới</h3>
              <div style={{ display: 'grid', gap: '8px', marginBottom: '12px' }}>
                <input placeholder="Tên loại phòng" value={formData.tenLoaiPhong || ''} onChange={e => setFormData({...formData, tenLoaiPhong: e.target.value})} style={{ padding: '8px' }} />
                <input placeholder="Sức chứa" type="number" value={formData.sucChua || ''} onChange={e => setFormData({...formData, sucChua: parseInt(e.target.value)})} style={{ padding: '8px' }} />
                <input placeholder="Giá cơ bản" type="number" value={formData.giaCoBan || ''} onChange={e => setFormData({...formData, giaCoBan: parseFloat(e.target.value)})} style={{ padding: '8px' }} />
                <input placeholder="Tiện nghi" value={formData.tienNghi || ''} onChange={e => setFormData({...formData, tienNghi: e.target.value})} style={{ padding: '8px' }} />
                <textarea placeholder="Mô tả" value={formData.moTa || ''} onChange={e => setFormData({...formData, moTa: e.target.value})} style={{ padding: '8px' }} />
              </div>
              <button onClick={() => handleSave(0)} style={{ padding: '8px 16px', background: 'var(--color-forest)', color: '#fff', marginRight: '8px' }}>Lưu</button>
              <button onClick={() => setEditingId(null)} style={{ padding: '8px 16px' }}>Huỷ</button>
            </div>
          )}

          {rooms.map(room => (
            <div key={room.maLoaiPhong} style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px', backgroundColor: '#fff' }}>
              {editingId === room.maLoaiPhong ? (
                <div>
                  <div style={{ display: 'grid', gap: '8px', marginBottom: '12px' }}>
                    <input value={formData.tenLoaiPhong || ''} onChange={e => setFormData({...formData, tenLoaiPhong: e.target.value})} style={{ padding: '8px' }} />
                    <input type="number" value={formData.sucChua || ''} onChange={e => setFormData({...formData, sucChua: parseInt(e.target.value)})} style={{ padding: '8px' }} />
                    <input type="number" value={formData.giaCoBan || ''} onChange={e => setFormData({...formData, giaCoBan: parseFloat(e.target.value)})} style={{ padding: '8px' }} />
                    <input value={formData.tienNghi || ''} onChange={e => setFormData({...formData, tienNghi: e.target.value})} style={{ padding: '8px' }} />
                    <textarea value={formData.moTa || ''} onChange={e => setFormData({...formData, moTa: e.target.value})} style={{ padding: '8px' }} />
                  </div>
                  <button onClick={() => handleSave(room.maLoaiPhong)} style={{ padding: '8px 16px', background: 'var(--color-forest)', color: '#fff', marginRight: '8px' }}>Lưu</button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '8px 16px' }}>Huỷ</button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: 'var(--color-forest)' }}>{room.tenLoaiPhong}</h3>
                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>Sức chứa: {room.sucChua} người | Giá: <strong>{formatPrice(room.giaCoBan)}</strong>/đêm</p>
                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>Tiện nghi: {room.tienNghi}</p>
                    <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{room.moTa}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => startEdit(room)} style={{ background: 'none', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Sửa</button>
                    <button onClick={() => handleDelete(room.maLoaiPhong)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Xoá</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
