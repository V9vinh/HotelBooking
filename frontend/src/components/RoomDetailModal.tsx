import React, { useState } from 'react';
import { phongApi } from '../api/phongApi';
import type { KiemTraPhongTrongResponse, Phong } from '../types/hotel';

interface RoomDetailModalProps {
  room: Phong | null;
  isOpen: boolean;
  onClose: () => void;
}

const TODAY_DATE = new Date().toISOString().split('T')[0];

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  isOpen,
  onClose,
}) => {
  const [ngayNhan, setNgayNhan] = useState('');
  const [ngayTra, setNgayTra] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<KiemTraPhongTrongResponse | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  if (!isOpen || !room) return null;

  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return 'N/A';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Trong':
        return 'Trống (Sẵn sàng phục vụ)';
      case 'CoKhach':
        return 'Đang có khách lưu trú';
      case 'DangDon':
        return 'Đang dọn dẹp vệ sinh';
      case 'BaoTri':
        return 'Đang bảo trì kỹ thuật';
      default:
        return status;
    }
  };

  const handleCheckAvail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ngayNhan || !ngayTra) {
      setCheckError('Vui lòng chọn đầy đủ ngày nhận và ngày trả phòng');
      return;
    }
    setChecking(true);
    setCheckError(null);
    setCheckResult(null);

    try {
      const res = await phongApi.checkRoomAvailability(room.maPhong, ngayNhan, ngayTra);
      setCheckResult(res.data);
    } catch (err: any) {
      setCheckError(err.message || 'Lỗi khi kiểm tra phòng');
    } finally {
      setChecking(false);
    }
  };

  const amenities = room.loaiPhong?.tienNghi
    ? room.loaiPhong.tienNghi.split(',').map((t) => t.trim())
    : [];

  return (
    <div className="modal-overlay" id="room-detail-modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        id="room-detail-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="room-number-badge">P.{room.soPhong}</span>
            <div>
              <h2 className="modal-title">{room.loaiPhong?.tenLoaiPhong}</h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Tầng {room.tang} &bull; Mã phòng: #{room.maPhong}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            id="btn-close-detail-modal"
            onClick={onClose}
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Thông số phòng */}
          <div className="detail-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Giá cơ bản / đêm</span>
              <span className="spec-value" style={{ color: 'var(--accent-gold)' }}>
                {formatCurrency(room.loaiPhong?.giaCoBan)}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Sức chứa tối đa</span>
              <span className="spec-value">{room.loaiPhong?.sucChua || 1} người lớn</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Trạng thái hiện tại</span>
              <span className="spec-value" style={{ fontSize: '13px' }}>
                <span className={`status-badge status-${room.trangThai}`}>
                  {getStatusText(room.trangThai)}
                </span>
              </span>
            </div>
          </div>

          {/* Mô tả phòng */}
          {room.loaiPhong?.moTa && (
            <div className="detail-section">
              <h4 className="detail-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Mô tả chi tiết
              </h4>
              <p style={{ color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.7' }}>
                {room.loaiPhong.moTa}
              </p>
            </div>
          )}

          {/* Tiện nghi phòng */}
          {amenities.length > 0 && (
            <div className="detail-section">
              <h4 className="detail-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Trang thiết bị &amp; Tiện nghi
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {amenities.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '6px 12px',
                      background: '#f1f5f9',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      color: 'var(--primary)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    &bull; {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ghi chú nội bộ */}
          {room.ghiChu && (
            <div className="detail-section">
              <h4 className="detail-section-title">Ghi chú phòng</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{room.ghiChu}</p>
            </div>
          )}

          {/* Khung kiểm tra phòng trống theo khoảng ngày */}
          <div className="availability-box" id="availability-checker-box">
            <h4 className="detail-section-title" style={{ marginBottom: '14px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
              </svg>
              Kiểm tra tính khả dụng phòng {room.soPhong}
            </h4>
            <form onSubmit={handleCheckAvail}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
                <div className="form-group">
                  <label htmlFor="detail-checkin" className="form-label">Ngày nhận</label>
                  <input
                    type="date"
                    id="detail-checkin"
                    className="form-input"
                    min={TODAY_DATE}
                    value={ngayNhan}
                    onChange={(e) => setNgayNhan(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="detail-checkout" className="form-label">Ngày trả</label>
                  <input
                    type="date"
                    id="detail-checkout"
                    className="form-input"
                    min={ngayNhan || TODAY_DATE}
                    value={ngayTra}
                    onChange={(e) => setNgayTra(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="btn-check-single-room"
                  disabled={checking}
                >
                  {checking ? 'Đang kiểm tra...' : 'Kiểm tra ngay'}
                </button>
              </div>
            </form>

            {checkError && (
              <div className="availability-result availability-danger">
                <span>&times;</span> {checkError}
              </div>
            )}

            {checkResult && (
              <div
                className={`availability-result ${
                  checkResult.conTrong ? 'availability-success' : 'availability-danger'
                }`}
              >
                {checkResult.conTrong ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{checkResult.thongBao}</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>{checkResult.thongBao}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
