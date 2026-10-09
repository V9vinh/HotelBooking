import React, { useState } from 'react';
import { phongApi } from '../api/phongApi';
import type { KiemTraPhongTrongResponse, Phong } from '../types/hotel';

interface AvailabilityCheckModalProps {
  room: Phong | null;
  isOpen: boolean;
  onClose: () => void;
}

const TODAY_DATE = new Date().toISOString().split('T')[0];

export const AvailabilityCheckModal: React.FC<AvailabilityCheckModalProps> = ({
  room,
  isOpen,
  onClose,
}) => {
  const [ngayNhan, setNgayNhan] = useState('');
  const [ngayTra, setNgayTra] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KiemTraPhongTrongResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !room) return null;

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ngayNhan || !ngayTra) {
      setError('Vui lòng chọn ngày nhận và ngày trả phòng');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await phongApi.checkRoomAvailability(room.maPhong, ngayNhan, ngayTra);
      setResult(res.data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi kiểm tra phòng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" id="availability-modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        id="availability-modal-dialog"
        style={{ maxWidth: '520px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Kiểm tra phòng P.{room.soPhong}</h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {room.loaiPhong?.tenLoaiPhong} &bull; Tầng {room.tang}
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            id="btn-close-avail-modal"
            onClick={onClose}
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleCheck}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label htmlFor="quick-avail-checkin" className="form-label">
                Ngày nhận phòng
              </label>
              <input
                type="date"
                id="quick-avail-checkin"
                className="form-input"
                min={TODAY_DATE}
                value={ngayNhan}
                onChange={(e) => setNgayNhan(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label htmlFor="quick-avail-checkout" className="form-label">
                Ngày trả phòng
              </label>
              <input
                type="date"
                id="quick-avail-checkout"
                className="form-input"
                min={ngayNhan || TODAY_DATE}
                value={ngayTra}
                onChange={(e) => setNgayTra(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              id="btn-submit-quick-avail"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Đang kiểm tra...' : 'Kiểm tra tình trạng trống'}
            </button>
          </form>

          {error && (
            <div className="availability-result availability-danger" style={{ marginTop: '16px' }}>
              <span>&times;</span> {error}
            </div>
          )}

          {result && (
            <div
              className={`availability-result ${
                result.conTrong ? 'availability-success' : 'availability-danger'
              }`}
              style={{ marginTop: '16px' }}
            >
              {result.conTrong ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{result.thongBao}</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>{result.thongBao}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
