import React, { useState } from 'react';
import type { LocPhongParams } from '../types/hotel';

interface HeroSectionProps {
  onSearch: (params: Partial<LocPhongParams>) => void;
}

const TODAY_DATE = new Date().toISOString().split('T')[0];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [ngayNhan, setNgayNhan] = useState('');
  const [ngayTra, setNgayTra] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      ngayNhan: ngayNhan || undefined,
      ngayTra: ngayTra || undefined,
      keyword: keyword.trim() || undefined,
    });
  };

  return (
    <section className="hero-section" id="hero-section">
      <div className="container">
        <div className="hero-subtitle">Trải nghiệm nghỉ dưỡng đẳng cấp 5 sao</div>
        <h2 className="hero-title">Tìm Kiếm &amp; Đặt Phòng Hoàn Hảo Của Bạn</h2>
        <p className="hero-desc">
          Khám phá không gian lưu trú sang trọng, tiện nghi hiện đại và ngắm trọn vẻ đẹp thành phố cùng Aurora Grand Hotel.
        </p>

        <div className="hero-search-card" id="hero-search-card">
          <form onSubmit={handleSubmit} className="search-form-grid" id="quick-search-form">
            <div className="form-group">
              <label htmlFor="hero-checkin" className="form-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Ngày nhận phòng
              </label>
              <input
                type="date"
                id="hero-checkin"
                className="form-input"
                min={TODAY_DATE}
                value={ngayNhan}
                onChange={(e) => setNgayNhan(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hero-checkout" className="form-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Ngày trả phòng
              </label>
              <input
                type="date"
                id="hero-checkout"
                className="form-input"
                min={ngayNhan || TODAY_DATE}
                value={ngayTra}
                onChange={(e) => setNgayTra(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hero-keyword" className="form-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Từ khóa / Số phòng
              </label>
              <input
                type="text"
                id="hero-keyword"
                className="form-input"
                placeholder="VD: 101, Deluxe, Ban công..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" id="btn-hero-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Tìm phòng
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
