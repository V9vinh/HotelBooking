import { useState, useEffect } from 'react';

interface RoomType {
  maLoaiPhong: number;
  tenLoaiPhong: string;
  code?: string;
  moTa: string;
  sucChua: number;
  giaCoBan: number;
  tienNghi: string;
  status?: 'active' | 'inactive';
  images?: string[];
  coverImage?: string;
  roomSize?: number;
  bedType?: string;
  weekendPrice?: number;
  holidayPrice?: number;
  cancellationPolicy?: string;
  totalRooms?: number;
}

type TabType = 'basic' | 'images' | 'amenities' | 'pricing' | 'inventory';

export function AdminRoomTypesPage() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Drawer / Form state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<RoomType>>({});

  const fetchRooms = () => {
    setLoading(true);
    fetch('http://localhost:8088/api/rooms/types')
      .then(res => res.json())
      .then((data: any[]) => {
        // Map backend data to our enriched UI model
        const mapped = data.map((r, i) => ({
          ...r,
          code: `RT-${r.maLoaiPhong.toString().padStart(3, '0')}`,
          status: 'active',
          images: [`/images/rooms/${r.maLoaiPhong}.jpg`],
          coverImage: `/images/rooms/${r.maLoaiPhong}.jpg`,
          totalRooms: 5 + i, // Mock data
          roomSize: 30 + (i * 10), // Mock
          bedType: r.sucChua > 2 ? '2 Queen Beds' : '1 King Bed',
          weekendPrice: r.giaCoBan * 1.2,
          cancellationPolicy: 'Free cancellation up to 48 hours',
        }));
        setRooms(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleEdit = (r: RoomType) => {
    setEditingId(r.maLoaiPhong);
    setFormData(r);
    setActiveTab('basic');
    setIsDrawerOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(0);
    setFormData({ 
      tenLoaiPhong: '', code: '', moTa: '', sucChua: 2, giaCoBan: 1000000, 
      tienNghi: '', status: 'active', images: [], roomSize: 40, bedType: '1 King Bed' 
    });
    setActiveTab('basic');
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
    if (!formData.tenLoaiPhong?.trim()) return alert('Tên loại phòng không được để trống.');
    
    // In a real app, we'd send the full enriched model if the backend supported it.
    // Here we send what the backend expects.
    const payload = {
      tenLoaiPhong: formData.tenLoaiPhong,
      moTa: formData.moTa,
      sucChua: formData.sucChua,
      giaCoBan: formData.giaCoBan,
      tienNghi: formData.tienNghi
    };

    const method = editingId === 0 ? 'POST' : 'PUT';
    const url = editingId === 0 ? 'http://localhost:8088/api/rooms/types' : `http://localhost:8088/api/rooms/types/${editingId}`;
    const token = localStorage.getItem('token');

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.ok) { 
        closeDrawer();
        fetchRooms(); 
      }
      else alert('Lỗi lưu loại phòng');
    }).catch(console.error);
  };

  const formatVND = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-forest)', fontFamily: 'Playfair Display', margin: '0 0 8px 0' }}>Quản lý Loại phòng</h1>
          <p style={{ margin: 0, color: '#727976', fontSize: '16px' }}>Cấu hình các hạng phòng, tiện ích và chính sách giá.</p>
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
          Thêm Hạng Phòng
        </button>
      </div>

      {/* Room Types Grid */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#727976' }}>Đang tải dữ liệu...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {rooms.map(r => (
            <div key={r.maLoaiPhong} style={{ 
              backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '8px', 
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
            }}
            onClick={() => handleEdit(r)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(24, 53, 47, 0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {/* Thumbnail */}
              <div style={{ height: '160px', backgroundColor: '#F7F3EB', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {r.coverImage && (
                  <img src={r.coverImage} alt={r.tenLoaiPhong} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                )}
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#E6DFD3', zIndex: 0 }}>image</span>
                <div style={{ 
                  position: 'absolute', top: '12px', right: '12px', 
                  backgroundColor: r.status === 'active' ? '#18352F' : '#727976', color: '#fff',
                  padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 2
                }}>
                  {r.status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
                </div>
              </div>
              
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: 'var(--color-forest)', fontFamily: 'Playfair Display' }}>{r.tenLoaiPhong}</h3>
                  <span style={{ fontSize: '14px', color: '#727976', fontWeight: 500 }}>{r.code}</span>
                </div>
                
                <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#727976', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {r.moTa}
                </p>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '15px', color: 'var(--color-forest)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-champagne)' }}>group</span>
                    {r.sucChua} Khách
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-champagne)' }}>bed</span>
                    {r.bedType}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E6DFD3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Giá cơ bản</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-forest)' }}>{formatVND(r.giaCoBan)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', color: '#727976', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Số lượng</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-forest)' }}>{r.totalRooms} Phòng</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Slide-out Drawer for Add/Edit ── */}
      {/* Backdrop */}
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

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '800px',
        backgroundColor: '#F7F3EB', zIndex: 101,
        transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(24, 53, 47, 0.1)'
      }}>
        {/* Drawer Header */}
        <div style={{ padding: '24px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E6DFD3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--color-forest)', fontFamily: 'Playfair Display' }}>
            {editingId === 0 ? 'Thêm Hạng Phòng Mới' : `Sửa Hạng Phòng: ${formData.tenLoaiPhong}`}
          </h2>
          <button onClick={closeDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#727976', display: 'flex', padding: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
          </button>
        </div>

        {/* Drawer Tabs */}
        <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E6DFD3', display: 'flex', padding: '0 32px', gap: '32px', flexShrink: 0 }}>
          {[
            { id: 'basic', label: 'Thông tin cơ bản' },
            { id: 'images', label: 'Hình ảnh' },
            { id: 'amenities', label: 'Tiện ích' },
            { id: 'pricing', label: 'Giá & Chính sách' },
            { id: 'inventory', label: 'Kiểm kho (Inventory)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '16px 0', fontSize: '16px', fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? 'var(--color-forest)' : '#727976',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-champagne)' : '2px solid transparent',
                transition: 'all 0.2s', fontFamily: 'Inter'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          
          {/* TAB: BASIC */}
          <div style={{ display: activeTab === 'basic' ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tên Hạng Phòng *</label>
                <input type="text" value={formData.tenLoaiPhong || ''} onChange={e => setFormData({ ...formData, tenLoaiPhong: e.target.value })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', color: 'var(--color-forest)', outline: 'none' }} placeholder="VD: Deluxe King Suite" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mã Hạng Phòng</label>
                <input type="text" value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', color: 'var(--color-forest)', outline: 'none' }} placeholder="VD: DLX-K" />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mô tả chi tiết</label>
              <textarea value={formData.moTa || ''} onChange={e => setFormData({ ...formData, moTa: e.target.value })} style={{ width: '100%', height: '120px', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', color: 'var(--color-forest)', outline: 'none', resize: 'vertical' }} placeholder="Mô tả không gian, phong cách thiết kế..." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sức chứa (Khách)</label>
                <input type="number" value={formData.sucChua || ''} onChange={e => setFormData({ ...formData, sucChua: Number(e.target.value) })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Loại giường</label>
                <select value={formData.bedType || ''} onChange={e => setFormData({ ...formData, bedType: e.target.value })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', outline: 'none' }}>
                  <option>1 King Bed</option>
                  <option>2 Queen Beds</option>
                  <option>1 Twin Bed</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Diện tích (m²)</label>
                <input type="number" value={formData.roomSize || ''} onChange={e => setFormData({ ...formData, roomSize: Number(e.target.value) })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', outline: 'none' }} />
              </div>
            </div>
            
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #E6DFD3' }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ 
                    width: '40px', height: '24px', borderRadius: '12px', 
                    backgroundColor: formData.status === 'active' ? 'var(--color-forest)' : '#E6DFD3',
                    position: 'relative', transition: 'background-color 0.2s'
                  }}>
                    <div style={{ 
                      position: 'absolute', top: '2px', left: formData.status === 'active' ? '18px' : '2px', 
                      width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF',
                      transition: 'left 0.2s'
                    }} />
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-forest)' }}>
                    {formData.status === 'active' ? 'Trạng thái: Đang hoạt động (Khách có thể đặt)' : 'Trạng thái: Tạm ngưng (Ẩn khỏi trang đặt phòng)'}
                  </span>
               </label>
            </div>
          </div>

          {/* TAB: IMAGES */}
          <div style={{ display: activeTab === 'images' ? 'block' : 'none' }}>
            <div style={{ 
              border: '2px dashed #B89A68', borderRadius: '8px', padding: '48px', 
              textAlign: 'center', backgroundColor: '#FFFFFF', marginBottom: '24px', cursor: 'pointer'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-champagne)', marginBottom: '16px' }}>cloud_upload</span>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: 'var(--color-forest)' }}>Kéo thả hình ảnh vào đây</h3>
              <p style={{ margin: 0, fontSize: '15px', color: '#727976' }}>Hoặc click để chọn file (JPG, PNG. Tối đa 5MB/file)</p>
            </div>
            <div style={{ fontSize: '15px', color: '#727976' }}>
              * Kéo thả để sắp xếp thứ tự ảnh. Ảnh đầu tiên sẽ được dùng làm Cover (Ảnh đại diện).
            </div>
          </div>

          {/* TAB: AMENITIES */}
          <div style={{ display: activeTab === 'images' ? 'none' : activeTab === 'amenities' ? 'block' : 'none' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tiện ích phòng (Cách nhau bằng dấu phẩy)</label>
            <textarea value={formData.tienNghi || ''} onChange={e => setFormData({ ...formData, tienNghi: e.target.value })} style={{ width: '100%', height: '120px', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', outline: 'none', resize: 'vertical' }} placeholder="VD: Wi-Fi tốc độ cao, Smart TV 55 inch, Ban công hướng biển..." />
          </div>

          {/* TAB: PRICING */}
          <div style={{ display: activeTab === 'pricing' ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Giá cơ bản (Ngày thường) *</label>
                <div style={{ position: 'relative' }}>
                  <input type="number" value={formData.giaCoBan || ''} onChange={e => setFormData({ ...formData, giaCoBan: Number(e.target.value) })} style={{ width: '100%', padding: '12px 12px 12px 48px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '18px', fontWeight: 600, color: 'var(--color-forest)', outline: 'none' }} />
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#727976', fontSize: '18px' }}>₫</span>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Giá cuối tuần (T6, T7, CN)</label>
                <div style={{ position: 'relative' }}>
                  <input type="number" value={formData.weekendPrice || ''} onChange={e => setFormData({ ...formData, weekendPrice: Number(e.target.value) })} style={{ width: '100%', padding: '12px 12px 12px 48px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '18px', fontWeight: 600, color: 'var(--color-forest)', outline: 'none' }} />
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#727976', fontSize: '18px' }}>₫</span>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chính sách hủy phòng</label>
              <select value={formData.cancellationPolicy || ''} onChange={e => setFormData({ ...formData, cancellationPolicy: e.target.value })} style={{ width: '100%', padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '4px', fontSize: '16px', outline: 'none' }}>
                <option>Miễn phí hủy trước 24 giờ</option>
                <option>Miễn phí hủy trước 48 giờ</option>
                <option>Không hoàn tiền (Non-refundable)</option>
              </select>
            </div>
          </div>

          {/* TAB: INVENTORY */}
          <div style={{ display: activeTab === 'inventory' ? 'block' : 'none' }}>
             <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFD3', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: 'var(--color-forest)' }}>Quản lý kho phòng vật lý</h3>
                <p style={{ fontSize: '16px', color: '#727976', marginBottom: '24px' }}>Hạng phòng này hiện đang được gắn với {formData.totalRooms || 0} phòng vật lý trong hệ thống.</p>
                <button style={{
                  padding: '10px 16px', backgroundColor: 'transparent', color: 'var(--color-forest)',
                  border: '1px solid var(--color-champagne)', borderRadius: '4px', cursor: 'pointer',
                  fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  Chuyển đến Sơ đồ phòng vật lý
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
             </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div style={{ padding: '24px 32px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E6DFD3', display: 'flex', justifyContent: 'flex-end', gap: '16px', flexShrink: 0 }}>
          <button onClick={closeDrawer} style={{ padding: '12px 24px', backgroundColor: '#F7F3EB', color: 'var(--color-forest)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hủy</button>
          <button onClick={handleSave} style={{ padding: '12px 32px', backgroundColor: 'var(--color-forest)', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Lưu Thay Đổi</button>
        </div>
      </div>

    </div>
  );
}
