import React from 'react';
import type { LoaiPhong, LocPhongParams, TrangThaiPhong } from '../types/hotel';

interface FilterSectionProps {
  filters: LocPhongParams;
  roomTypes: LoaiPhong[];
  onChange: (filters: LocPhongParams) => void;
  onReset: () => void;
  onApply: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  roomTypes,
  onChange,
  onReset,
  onApply,
}) => {
  const handleInputChange = (field: keyof LocPhongParams, value: any) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <aside className="filter-sidebar" id="filter-sidebar">
      <div className="filter-header">
        <div className="filter-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Bộ Lọc Nâng Cao
        </div>
        <button
          type="button"
          className="filter-reset-btn"
          id="btn-reset-filters"
          onClick={onReset}
        >
          Đặt lại
        </button>
      </div>

      {/* Tìm theo từ khóa */}
      <div className="filter-group">
        <label htmlFor="filter-keyword" className="form-label">
          Từ khóa tìm kiếm
        </label>
        <input
          type="text"
          id="filter-keyword"
          className="form-input"
          placeholder="Số phòng, tiện nghi, mô tả..."
          value={filters.keyword || ''}
          onChange={(e) => handleInputChange('keyword', e.target.value)}
        />
      </div>

      {/* Loại phòng */}
      <div className="filter-group">
        <label htmlFor="filter-room-type" className="form-label">
          Loại phòng
        </label>
        <select
          id="filter-room-type"
          className="form-select"
          value={filters.maLoaiPhong || ''}
          onChange={(e) => handleInputChange('maLoaiPhong', e.target.value ? Number(e.target.value) : '')}
        >
          <option value="">Tất cả loại phòng</option>
          {roomTypes.map((rt) => (
            <option key={rt.maLoaiPhong} value={rt.maLoaiPhong}>
              {rt.tenLoaiPhong} ({rt.sucChua} người)
            </option>
          ))}
        </select>
      </div>

      {/* Sức chứa */}
      <div className="filter-group">
        <label htmlFor="filter-capacity" className="form-label">
          Sức chứa tối thiểu
        </label>
        <select
          id="filter-capacity"
          className="form-select"
          value={filters.sucChua || ''}
          onChange={(e) => handleInputChange('sucChua', e.target.value ? Number(e.target.value) : '')}
        >
          <option value="">Không giới hạn</option>
          <option value="1">1 người trở lên</option>
          <option value="2">2 người trở lên</option>
          <option value="3">3 người trở lên</option>
          <option value="4">4 người trở lên</option>
        </select>
      </div>

      {/* Khoảng giá */}
      <div className="filter-group">
        <label className="form-label">Khoảng giá (VNĐ/đêm)</label>
        <div className="price-range-inputs">
          <input
            type="number"
            id="filter-price-from"
            className="form-input"
            placeholder="Từ"
            min="0"
            step="50000"
            value={filters.giaTu || ''}
            onChange={(e) => handleInputChange('giaTu', e.target.value ? Number(e.target.value) : '')}
          />
          <input
            type="number"
            id="filter-price-to"
            className="form-input"
            placeholder="Đến"
            min="0"
            step="50000"
            value={filters.giaDen || ''}
            onChange={(e) => handleInputChange('giaDen', e.target.value ? Number(e.target.value) : '')}
          />
        </div>
      </div>

      {/* Tầng */}
      <div className="filter-group">
        <label htmlFor="filter-floor" className="form-label">
          Vị trí tầng
        </label>
        <select
          id="filter-floor"
          className="form-select"
          value={filters.tang || ''}
          onChange={(e) => handleInputChange('tang', e.target.value ? Number(e.target.value) : '')}
        >
          <option value="">Tất cả các tầng</option>
          <option value="1">Tầng 1</option>
          <option value="2">Tầng 2</option>
          <option value="3">Tầng 3</option>
          <option value="4">Tầng 4</option>
          <option value="5">Tầng 5</option>
        </select>
      </div>

      {/* Trạng thái phòng */}
      <div className="filter-group">
        <label htmlFor="filter-status" className="form-label">
          Trạng thái phòng
        </label>
        <select
          id="filter-status"
          className="form-select"
          value={filters.trangThai || ''}
          onChange={(e) => handleInputChange('trangThai', e.target.value as TrangThaiPhong || '')}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Trong">Trống (Sẵn sàng)</option>
          <option value="CoKhach">Có khách</option>
          <option value="DangDon">Đang dọn</option>
          <option value="BaoTri">Bảo trì</option>
        </select>
      </div>

      {/* Áp dụng */}
      <button
        type="button"
        className="btn btn-primary"
        id="btn-apply-filters"
        style={{ width: '100%', marginTop: '8px' }}
        onClick={onApply}
      >
        Áp dụng bộ lọc
      </button>
    </aside>
  );
};
