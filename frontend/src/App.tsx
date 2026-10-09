import React, { useEffect, useState } from 'react';
import { phongApi } from './api/phongApi';
import { AvailabilityCheckModal } from './components/AvailabilityCheckModal';
import { FilterSection } from './components/FilterSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RoomCard } from './components/RoomCard';
import { RoomDetailModal } from './components/RoomDetailModal';
import type { LoaiPhong, LocPhongParams, Phong } from './types/hotel';

export const App: React.FC = () => {
  const [rooms, setRooms] = useState<Phong[]>([]);
  const [roomTypes, setRoomTypes] = useState<LoaiPhong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<LocPhongParams>({
    keyword: '',
    maLoaiPhong: '',
    sucChua: '',
    giaTu: '',
    giaDen: '',
    tang: '',
    trangThai: '',
    ngayNhan: '',
    ngayTra: '',
  });

  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Phong | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [selectedRoomForAvail, setSelectedRoomForAvail] = useState<Phong | null>(null);
  const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);

  // Set page title for SEO & best practices
  useEffect(() => {
    document.title = 'Aurora Grand Hotel — Tìm Kiếm & Xem Phòng Khách Sạn';
  }, []);

  // Initial data loading
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [roomsRes, typesRes] = await Promise.all([
          phongApi.getRooms(),
          phongApi.getRoomTypes(),
        ]);
        setRooms(roomsRes.data);
        setRoomTypes(typesRes.data);
      } catch (err: any) {
        setError(err.message || 'Không thể kết nối đến máy chủ backend');
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // Fetch rooms with current filters
  const applyFilters = async (customParams?: LocPhongParams) => {
    setLoading(true);
    setError(null);
    const paramsToUse = customParams || filters;

    try {
      const res = await phongApi.getRooms(paramsToUse);
      setRooms(res.data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải kết quả tìm kiếm');
    } finally {
      setLoading(false);
    }
  };

  const handleHeroSearch = (params: Partial<LocPhongParams>) => {
    const updated = {
      ...filters,
      ...params,
    };
    setFilters(updated);
    applyFilters(updated);
  };

  const handleResetFilters = () => {
    const resetValues: LocPhongParams = {
      keyword: '',
      maLoaiPhong: '',
      sucChua: '',
      giaTu: '',
      giaDen: '',
      tang: '',
      trangThai: '',
      ngayNhan: '',
      ngayTra: '',
    };
    setFilters(resetValues);
    applyFilters(resetValues);
  };

  const handleViewDetail = async (roomId: number) => {
    try {
      const res = await phongApi.getRoomDetail(roomId);
      setSelectedRoomForDetail(res.data);
      setIsDetailModalOpen(true);
    } catch (err: any) {
      alert(err.message || 'Không thể xem chi tiết phòng');
    }
  };

  const handleCheckAvail = (room: Phong) => {
    setSelectedRoomForAvail(room);
    setIsAvailModalOpen(true);
  };

  return (
    <>
      <Header />

      <HeroSection onSearch={handleHeroSearch} />

      <main className="main-content" id="main-content">
        <div className="container">
          <div className="content-grid">
            {/* Bộ lọc bên trái */}
            <FilterSection
              filters={filters}
              roomTypes={roomTypes}
              onChange={setFilters}
              onReset={handleResetFilters}
              onApply={() => applyFilters()}
            />

            {/* Danh sách phòng & kết quả */}
            <section id="room-results-section">
              <div className="results-header">
                <div className="results-count" id="results-count">
                  Tìm thấy <strong>{rooms.length}</strong> phòng phù hợp
                </div>

                {filters.ngayNhan && filters.ngayTra && (
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--accent-gold)',
                      fontWeight: 600,
                      background: 'var(--accent-gold-light)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Kiểm tra trống: {filters.ngayNhan} &rarr; {filters.ngayTra}
                  </span>
                )}
              </div>

              {/* Thông báo lỗi */}
              {error && (
                <div
                  className="availability-result availability-danger"
                  style={{ marginBottom: '20px' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Trạng thái tải */}
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                    Đang tìm kiếm phòng...
                  </div>
                  <p style={{ fontSize: '14px' }}>Vui lòng đợi giây lát trong khi chúng tôi tra cứu thông tin phòng.</p>
                </div>
              ) : rooms.length === 0 ? (
                /* Không có kết quả */
                <div className="empty-state" id="empty-state">
                  <div className="empty-state-icon">🏨</div>
                  <h3 className="empty-state-title">Không tìm thấy phòng phù hợp</h3>
                  <p className="empty-state-desc">
                    Không có phòng nào khớp với các tiêu chí tìm kiếm hoặc khoảng ngày bạn đã chọn. Vui lòng thử thay đổi khoảng giá, số người hoặc chọn ngày khác.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="btn-empty-reset"
                    onClick={handleResetFilters}
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              ) : (
                /* Lưới danh sách phòng */
                <div className="room-cards-grid" id="room-cards-grid">
                  {rooms.map((room) => (
                    <RoomCard
                      key={room.maPhong}
                      room={room}
                      onViewDetail={handleViewDetail}
                      onCheckAvailability={handleCheckAvail}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal chi tiết phòng */}
      <RoomDetailModal
        room={selectedRoomForDetail}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Modal kiểm tra phòng trống nhanh */}
      <AvailabilityCheckModal
        room={selectedRoomForAvail}
        isOpen={isAvailModalOpen}
        onClose={() => setIsAvailModalOpen(false)}
      />
    </>
  );
};

export default App;
