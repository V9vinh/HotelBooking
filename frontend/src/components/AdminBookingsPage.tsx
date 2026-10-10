import { useState, useEffect, useMemo } from 'react';

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

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  ChoXacNhan:  { label: 'Chờ xác nhận',      bg: '#FEF3C7', color: '#92400E' },
  DaXacNhan:   { label: 'Đã xác nhận',        bg: '#D1FAE5', color: '#065F46' },
  DaCheckIn:   { label: 'Đang ở',             bg: '#DBEAFE', color: '#1E40AF' },
  DaCheckOut:  { label: 'Đã trả phòng',       bg: '#F1F5F9', color: '#475569' },
  DaHuy:       { label: 'Đã hủy',             bg: '#FEE2E2', color: '#991B1B' },
};

// Valid transitions per current state
const VALID_TRANSITIONS: Record<string, string[]> = {
  ChoXacNhan:  ['DaXacNhan', 'DaHuy'],
  DaXacNhan:   ['DaCheckIn', 'DaHuy'],
  DaCheckIn:   ['DaCheckOut'],
  DaCheckOut:  [],
  DaHuy:       [],
};

const PAGE_SIZE = 15;

function formatDate(s: string) {
  if (!s) return '—';
  const [dp] = s.split('T');
  const [y, m, d] = dp.split('-');
  return `${d}/${m}/${y}`;
}
function formatDateTime(s: string) {
  if (!s) return '—';
  const [dp, tp] = s.split('T');
  const [y, m, d] = dp.split('-');
  return `${d}/${m}/${y}${tp ? ' ' + tp.substring(0, 5) : ''}`;
}
function formatVND(n: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
}

export function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{ totalBookings: number; totalCustomers: number; totalRevenue: number } | null>(null);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);

  // Detail drawer
  const [drawerBooking, setDrawerBooking] = useState<AdminBooking | null>(null);
  // Confirm dialog
  const [confirm, setConfirm] = useState<{ maPhieu: number; newStatus: string } | null>(null);

  const fetchAll = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    Promise.all([
      fetch('http://localhost:8088/api/bookings/admin/all', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('http://localhost:8088/api/admin/statistics', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(() => null),
    ])
      .then(([bData, sData]) => {
        setBookings(Array.isArray(bData) ? bData : []);
        if (sData) setStats(sData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const filtered = useMemo(() => {
    let list = bookings;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.tenKhachHang.toLowerCase().includes(q) ||
        b.sdtKhachHang.includes(q) ||
        String(b.maPhieu).includes(q)
      );
    }
    if (filterStatus) list = list.filter(b => b.trangThai === filterStatus);
    return list;
  }, [bookings, search, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const doUpdateStatus = (maPhieu: number, newStatus: string) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8088/api/bookings/admin/${maPhieu}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ trangThai: newStatus }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          fetchAll();
          if (drawerBooking?.maPhieu === maPhieu) setDrawerBooking(null);
        } else {
          alert(d.message || 'Cập nhật thất bại');
        }
      })
      .catch(console.error)
      .finally(() => setConfirm(null));
  };

  const todayBookings = bookings.filter(b => {
    const today = new Date().toISOString().split('T')[0];
    return b.ngayNhan === today || (b.ngayDat && b.ngayDat.startsWith(today));
  }).length;
  const pendingCount = bookings.filter(b => b.trangThai === 'ChoXacNhan').length;

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
        Quản lý Đặt phòng
      </h1>

      {/* ── Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Tổng đặt phòng', value: stats?.totalBookings ?? '—', icon: 'calendar_month', color: 'var(--color-forest)' },
          { label: 'Hôm nay', value: todayBookings, icon: 'today', color: '#1E40AF' },
          { label: 'Chờ xác nhận', value: pendingCount, icon: 'pending', color: '#92400E', highlight: pendingCount > 0 },
          { label: 'Doanh thu', value: stats ? formatVND(stats.totalRevenue) : '—', icon: 'payments', color: '#065F46' },
        ].map(s => (
          <div key={s.label} style={{
            backgroundColor: '#fff', border: `1px solid ${s.highlight ? '#FDE68A' : '#E5E7EB'}`,
            borderRadius: '10px', padding: '18px 20px',
            display: 'flex', flexDirection: 'column', gap: '8px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: s.color, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {/* Toolbar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', color: '#9CA3AF' }}>search</span>
            <input
              placeholder="Tìm theo tên, SĐT hoặc mã phiếu…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{
                width: '100%', padding: '8px 12px 8px 36px',
                border: '1px solid #E5E7EB', borderRadius: '6px',
                fontSize: '15px', outline: 'none', color: '#374151',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-champagne)'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            style={{
              padding: '8px 32px 8px 12px', border: '1px solid #E5E7EB',
              borderRadius: '6px', fontSize: '15px', color: '#374151',
              outline: 'none', cursor: 'pointer', backgroundColor: '#fff',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
              appearance: 'none',
            }}
          >
            <option value="">Tất cả trạng thái</option>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <button
            onClick={fetchAll}
            style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '15px', color: '#6B7280' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
            Làm mới
          </button>
          <div style={{ fontSize: '15px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
            {filtered.length} kết quả
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#9CA3AF' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '8px' }}>hourglass_empty</span>
            Đang tải dữ liệu...
          </div>
        ) : paginated.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#9CA3AF' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>inbox</span>
            <div style={{ fontWeight: 500, marginBottom: '4px' }}>Không có dữ liệu</div>
            <div style={{ fontSize: '15px' }}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  {['Mã phiếu', 'Khách hàng', 'Ngày đặt', 'Check-in / Check-out', 'Tổng tiền', 'Trạng thái', 'Thao tác'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E5E7EB', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((b, idx) => {
                  const status = STATUS_CONFIG[b.trangThai] || { label: b.trangThai, bg: '#F3F4F6', color: '#4B5563' };
                  const transitions = VALID_TRANSITIONS[b.trangThai] || [];
                  return (
                    <tr key={b.maPhieu} style={{ borderBottom: idx < paginated.length - 1 ? '1px solid #F3F4F6' : 'none', transition: 'background 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-forest)', whiteSpace: 'nowrap' }}>
                        #{b.maPhieu}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 500, color: '#111827' }}>{b.tenKhachHang}</div>
                        <div style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '2px' }}>{b.sdtKhachHang}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6B7280', fontSize: '15px', whiteSpace: 'nowrap' }}>
                        {formatDateTime(b.ngayDat)}
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '15px', color: '#374151' }}>
                          <span style={{ color: '#10B981', fontWeight: 500 }}>IN</span> {formatDate(b.ngayNhan)}
                        </div>
                        <div style={{ fontSize: '15px', color: '#374151', marginTop: '2px' }}>
                          <span style={{ color: '#F59E0B', fontWeight: 500 }}>OUT</span> {formatDate(b.ngayTra)}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>
                        {formatVND(b.tongTien)}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '4px 10px', borderRadius: '20px',
                          fontSize: '14px', fontWeight: 600,
                          backgroundColor: status.bg, color: status.color,
                          whiteSpace: 'nowrap',
                        }}>
                          {status.label}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button
                            onClick={() => setDrawerBooking(b)}
                            style={{
                              padding: '5px 10px', borderRadius: '5px', border: '1px solid #E5E7EB',
                              backgroundColor: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                              color: '#374151', display: 'flex', alignItems: 'center', gap: '4px',
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>visibility</span>
                            Chi tiết
                          </button>
                          {transitions.length > 0 && (
                            <select
                              value=""
                              onChange={e => { if (e.target.value) setConfirm({ maPhieu: b.maPhieu, newStatus: e.target.value }); }}
                              style={{
                                padding: '5px 8px', borderRadius: '5px', border: '1px solid #E5E7EB',
                                fontSize: '14px', color: '#374151', cursor: 'pointer',
                                backgroundColor: '#fff', outline: 'none',
                              }}
                            >
                              <option value="">Chuyển...</option>
                              {transitions.map(t => (
                                <option key={t} value={t}>{STATUS_CONFIG[t]?.label || t}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding: '12px 20px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', color: '#6B7280' }}>
              Trang {page} / {totalPages} — {filtered.length} kết quả
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                  if (idx > 0 && typeof arr[idx - 1] === 'number' && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === '...' ? (
                    <span key={`dots-${idx}`} style={{ padding: '5px 8px', color: '#9CA3AF', fontSize: '15px' }}>…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      style={{
                        padding: '5px 10px', borderRadius: '5px', fontSize: '15px', cursor: 'pointer',
                        border: '1px solid #E5E7EB',
                        backgroundColor: page === p ? 'var(--color-forest)' : '#fff',
                        color: page === p ? '#fff' : '#374151',
                        fontWeight: page === p ? 600 : 400,
                      }}
                    >
                      {p}
                    </button>
                  )
                )}
            </div>
          </div>
        )}
      </div>

      {/* ── Detail Drawer ── */}
      {drawerBooking && (
        <>
          <div
            onClick={() => setDrawerBooking(null)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 40, backdropFilter: 'blur(2px)' }}
          />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', maxWidth: '90vw',
            backgroundColor: '#fff', zIndex: 50,
            boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
            display: 'flex', flexDirection: 'column',
            animation: 'slideInRight 0.25s ease',
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', margin: 0 }}>
                Chi tiết Phiếu #{drawerBooking.maPhieu}
              </h2>
              <button onClick={() => setDrawerBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {/* Status badge */}
              <div style={{ marginBottom: '24px' }}>
                {(() => {
                  const s = STATUS_CONFIG[drawerBooking.trangThai] || { label: drawerBooking.trangThai, bg: '#F3F4F6', color: '#4B5563' };
                  return (
                    <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '15px', fontWeight: 600, backgroundColor: s.bg, color: s.color }}>
                      {s.label}
                    </span>
                  );
                })()}
              </div>
              {[
                { label: 'Khách hàng', value: drawerBooking.tenKhachHang },
                { label: 'Số điện thoại', value: drawerBooking.sdtKhachHang || '—' },
                { label: 'Ngày đặt', value: formatDateTime(drawerBooking.ngayDat) },
                { label: 'Check-in', value: formatDate(drawerBooking.ngayNhan) },
                { label: 'Check-out', value: formatDate(drawerBooking.ngayTra) },
                { label: 'Số khách', value: `${drawerBooking.soNguoi} người` },
                { label: 'Tổng tiền', value: formatVND(drawerBooking.tongTien) },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: '15px', color: '#6B7280' }}>{row.label}</span>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>{row.value}</span>
                </div>
              ))}
            </div>
            {/* Drawer actions */}
            {VALID_TRANSITIONS[drawerBooking.trangThai]?.length > 0 && (
              <div style={{ padding: '16px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cập nhật trạng thái</div>
                {VALID_TRANSITIONS[drawerBooking.trangThai].map(t => {
                  const sc = STATUS_CONFIG[t];
                  const isDanger = t === 'DaHuy';
                  return (
                    <button
                      key={t}
                      onClick={() => setConfirm({ maPhieu: drawerBooking.maPhieu, newStatus: t })}
                      style={{
                        padding: '10px 16px', borderRadius: '6px', fontSize: '15px', fontWeight: 500, cursor: 'pointer',
                        border: isDanger ? '1px solid #FCA5A5' : '1px solid #E5E7EB',
                        backgroundColor: isDanger ? '#FEF2F2' : '#F9FAFB',
                        color: isDanger ? '#DC2626' : '#374151',
                        transition: 'all 0.15s',
                      }}
                    >
                      → {sc?.label || t}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Confirm Dialog ── */}
      {confirm && (
        <>
          <div onClick={() => setConfirm(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 60, backdropFilter: 'blur(2px)' }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff', borderRadius: '12px', padding: '28px 32px',
            zIndex: 70, width: '360px', boxShadow: '0 20px 48px rgba(0,0,0,0.15)',
          }}>
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>
              {confirm.newStatus === 'DaHuy' ? '⚠️' : '✅'}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
              Xác nhận thay đổi trạng thái
            </h3>
            <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.6, marginBottom: '24px' }}>
              Phiếu <strong>#{confirm.maPhieu}</strong> sẽ được chuyển sang{' '}
              <strong style={{ color: STATUS_CONFIG[confirm.newStatus]?.color }}>
                {STATUS_CONFIG[confirm.newStatus]?.label || confirm.newStatus}
              </strong>. Thao tác này không thể hoàn tác.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setConfirm(null)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB', backgroundColor: '#fff', color: '#374151', fontSize: '16px', cursor: 'pointer', fontWeight: 500 }}
              >
                Huỷ
              </button>
              <button
                onClick={() => doUpdateStatus(confirm.maPhieu, confirm.newStatus)}
                style={{
                  flex: 1, padding: '10px', borderRadius: '6px', border: 'none', fontSize: '16px', cursor: 'pointer', fontWeight: 600,
                  backgroundColor: confirm.newStatus === 'DaHuy' ? '#DC2626' : 'var(--color-forest)',
                  color: '#fff',
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
