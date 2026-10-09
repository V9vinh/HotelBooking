import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function AurelleProfile({ onBack }: { onBack: () => void }) {
  const { user, updateProfile, logout } = useAuth();
  
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

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <button 
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: 'var(--color-champagne)', cursor: 'pointer', marginBottom: '20px', fontWeight: 600 }}
      >
        &larr; Quay lại
      </button>

      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', fontSize: '32px', marginBottom: '8px' }}>
        Hồ sơ của tôi
      </h2>
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
  );
}
