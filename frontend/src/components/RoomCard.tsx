import React from 'react';
import type { Phong } from '../types/hotel';

interface RoomCardProps {
  room: Phong;
  onViewDetail: (id: number) => void;
  onCheckAvailability: (room: Phong) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onViewDetail,
  onCheckAvailability,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Trong':
        return 'Trống (Sẵn sàng)';
      case 'CoKhach':
        return 'Đang có khách';
      case 'DangDon':
        return 'Đang dọn dẹp';
      case 'BaoTri':
        return 'Đang bảo trì';
      default:
        return status;
    }
  };

  const amenitiesList = room.loaiPhong?.tienNghi
    ? room.loaiPhong.tienNghi.split(',').map((t) => t.trim())
    : [];

  return (
    <article className="room-card" id={`room-card-${room.maPhong}`}>
      <div className="room-card-header">
        <div className="room-number-box">
          <div className="room-number-badge">P.{room.soPhong}</div>
          <div className="room-floor">Tầng {room.tang}</div>
        </div>
        <span className={`status-badge status-${room.trangThai}`}>
          {getStatusText(room.trangThai)}
        </span>
      </div>

      <div className="room-card-body">
        <h3 className="room-type-title">{room.loaiPhong?.tenLoaiPhong || 'Chưa phân loại'}</h3>

        <div className="room-meta">
          <div className="room-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Tối đa {room.loaiPhong?.sucChua || 1} khách</span>
          </div>
          <div className="room-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Tầng {room.tang}</span>
          </div>
        </div>

        {room.loaiPhong?.moTa && (
          <p className="room-desc-short">{room.loaiPhong.moTa}</p>
        )}

        {amenitiesList.length > 0 && (
          <div className="room-amenities-tags">
            {amenitiesList.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="amenity-tag">
                {amenity}
              </span>
            ))}
            {amenitiesList.length > 3 && (
              <span className="amenity-tag">+{amenitiesList.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <div className="room-card-footer">
        <div className="room-price-box">
          <span className="price-label">Giá từ</span>
          <span className="price-amount">
            {room.loaiPhong ? formatCurrency(room.loaiPhong.giaCoBan) : 'N/A'}
            <span className="price-unit"> /đêm</span>
          </span>
        </div>

        <div className="room-card-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            id={`btn-check-avail-${room.maPhong}`}
            onClick={() => onCheckAvailability(room)}
            title="Kiểm tra phòng trống theo ngày"
          >
            Check phòng
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            id={`btn-view-detail-${room.maPhong}`}
            onClick={() => onViewDetail(room.maPhong)}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </article>
  );
};
