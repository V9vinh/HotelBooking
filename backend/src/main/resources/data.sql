-- Initial data for Hotel Booking
USE HotelBookingDB;

-- Insert Loai Phong
INSERT INTO LOAIPHONG (TenLoaiPhong, GiaCoBan, SucChua, TienNghi, MoTa, TrangThai) VALUES
('Biệt thự Sole di Amalfi', 890, 6, 'Hồ bơi vô cực bên vách đá, Quản gia riêng 24/7, Hầm rượu riêng', 'Nằm chênh vênh trên vách đá vôi của Positano...', 'HoatDong'),
('Nơi trú ẩn Kyoto Zen', 760, 4, 'Onsen khoáng thiên nhiên, Đình trà đạo & Sân vườn', 'Một tác phẩm kiến trúc tôn vinh thiết kế Sukiya-zukuri...', 'HoatDong'),
('Chốn ẩn mình Azure Cove', 1250, 8, 'Bãi biển riêng tư, Du thuyền Catamaran, Rạp chiếu phim', 'Tọa lạc trên bãi cát trắng mịn, Azure Cove sở hữu...', 'HoatDong'),
('Biệt thự kính The Alpine', 980, 6, 'Chauffeur trượt tuyết riêng, Phòng xông hơi gỗ tuyết tùng', 'Một tuyệt tác kỹ thuật treo lơ lửng trên thung lũng...', 'HoatDong');

-- Insert Dich Vu
INSERT INTO DICHVU (TenDichVu, Gia, TrangThai) VALUES
('Đưa đón sân bay', 150, 'KinhDoanh'),
('Gói Spa cao cấp', 150, 'KinhDoanh');

-- Insert Khuyen Mai
INSERT INTO KHUYENMAI (MaCode, TenKhuyenMai, PhanTramGiam, SoTienGiam, NgayBatDau, NgayKetThuc, SoLuong, DaSuDung, TrangThai) VALUES
('VIP', 'Giảm giá VIP 50$', 0, 50, '2026-01-01', '2026-12-31', 100, 0, 'HoatDong');
