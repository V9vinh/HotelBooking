import { useState } from 'react';
import { useAuth } from '../context/AuthContext';


export function AurelleAuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  
  
  const [formData, setFormData] = useState({
    tenDangNhap: '',
    matKhau: '',
    hoTen: '',
    sdt: '',
    email: '',
    cmndCccd: '',
    diaChi: '',
    ngaySinh: '',
    gioiTinh: 'Nam'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login({ tenDangNhap: formData.tenDangNhap, matKhau: formData.matKhau });
        onClose();
      } else {
        await register(formData);
        setIsLogin(true); // switch back to login
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'var(--color-ivory)', padding: '32px', borderRadius: '12px',
        width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: 0 }}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--color-charcoal-muted)' }}>&times;</button>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            name="tenDangNhap"
            placeholder="Tên đăng nhập"
            value={formData.tenDangNhap}
            onChange={handleChange}
            required
            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            name="matKhau"
            type="password"
            placeholder="Mật khẩu (ít nhất 6 ký tự)"
            value={formData.matKhau}
            onChange={handleChange}
            required
            minLength={6}
            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
          />

          {!isLogin && (
            <>
              <input name="hoTen" placeholder="Họ và tên" value={formData.hoTen} onChange={handleChange} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <input name="sdt" placeholder="Số điện thoại" value={formData.sdt} onChange={handleChange} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <input name="cmndCccd" placeholder="CMND/CCCD" value={formData.cmndCccd} onChange={handleChange} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <input name="diaChi" placeholder="Địa chỉ" value={formData.diaChi} onChange={handleChange} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <input name="ngaySinh" type="date" value={formData.ngaySinh} onChange={handleChange} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <option value="Nam">Nam</option>
                <option value="Nu">Nữ</option>
                <option value="Khac">Khác</option>
              </select>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px', backgroundColor: 'var(--color-forest)', color: 'white',
              border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em'
            }}
          >
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--color-charcoal-muted)' }}>
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'var(--color-champagne)', cursor: 'pointer', fontWeight: 600 }}
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </span>
        </div>
      </div>
    </div>
  );
}
