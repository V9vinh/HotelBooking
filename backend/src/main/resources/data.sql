-- Initial data for The Imperial Haven Ho Chi Minh

-- Insert Loai Phong
INSERT INTO LOAIPHONG (TenLoaiPhong, GiaCoBan, SucChua, TienNghi, MoTa, TrangThai) VALUES
('Deluxe City View', 3500000, 2, 'Wi-Fi, Smart TV 55", Bồn tắm nằm, Máy pha cà phê Nespresso', 'Phòng Deluxe rộng 45m2 với tầm nhìn toàn cảnh trung tâm thành phố. Thiết kế sang trọng với tông màu Warm Ivory và điểm nhấn Forest Green.', 'HoatDong'),
('Premium Signature Suite', 5500000, 2, 'Executive Lounge, Wi-Fi, Smart TV 65", Bồn tắm jacuzzi, Trà sen thủ công', 'Suite cao cấp 68m2 với tầm nhìn bao quát Sông Sài Gòn và Landmark 81. Đặc quyền sử dụng Executive Lounge.', 'HoatDong'),
('Family Connecting Room', 6800000, 4, 'Wi-Fi, 2 Smart TV, 2 Phòng tắm, Khu vực ăn uống riêng', 'Phòng thông nhau lý tưởng cho gia đình, rộng 90m2. Thiết kế linh hoạt mang lại sự riêng tư nhưng vẫn gắn kết.', 'HoatDong'),
('Executive River View', 4800000, 2, 'Executive Lounge, Minibar miễn phí, Dịch vụ chỉnh trang phòng', 'Nằm trên các tầng cao, phòng Executive 50m2 mang đến khung cảnh hoàng hôn tuyệt đẹp trên sông Sài Gòn.', 'HoatDong'),
('The Imperial Haven Presidential Suite', 18000000, 4, 'Quản gia riêng 24/7, Bếp riêng, Phòng họp riêng, Đưa đón sân bay', 'Biểu tượng của sự xa hoa, Suite Tổng thống rộng 200m2 với nội thất độc bản, mang đến trải nghiệm hoàng gia giữa lòng Sài Gòn.', 'HoatDong');

-- Insert Phong (Room Number, Type ID, Floor, Status, Notes)
INSERT INTO PHONG (SoPhong, MaLoaiPhong, Tang, TrangThai, GhiChu) VALUES
('1001', 1, 10, 'Trong', 'Hướng Bitexco'),
('1002', 1, 10, 'Trong', ''),
('1003', 1, 10, 'CoKhach', 'Khách VIP'),
('1101', 2, 11, 'Trong', 'View Sông Sài Gòn'),
('1102', 2, 11, 'DangDon', 'Dọn phòng khẩn'),
('1201', 3, 12, 'Trong', 'Phòng gia đình góc'),
('1401', 4, 14, 'CoKhach', 'Chuẩn bị setup trăng mật'),
('1402', 4, 14, 'Trong', ''),
('1501', 5, 15, 'Trong', 'Suite Tổng thống');

-- Insert Dich Vu
INSERT INTO DICHVU (TenDichVu, Gia, TrangThai) VALUES
('Đưa đón sân bay (Mercedes S-Class)', 1200000, 'KinhDoanh'),
('Gói Spa & Trị liệu Thảo mộc', 1850000, 'KinhDoanh'),
('Trang trí phòng trăng mật', 950000, 'KinhDoanh');

-- Insert Khuyen Mai
INSERT INTO KHUYENMAI (MaCode, TenKhuyenMai, PhanTramGiam, SoTienGiam, NgayBatDau, NgayKetThuc, SoLuong, DaSuDung, TrangThai) VALUES
('OPENHCM', 'Khai trương The Imperial Haven HCM', 10, 0, '2026-01-01', '2026-12-31', 500, 0, 'HoatDong');
