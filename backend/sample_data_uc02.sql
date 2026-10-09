USE hotelbookingdb;

-- 1. Thêm Loại Phòng
INSERT INTO LOAIPHONG (MaLoaiPhong, TenLoaiPhong, GiaCoBan, SucChua, TienNghi, MoTa, TrangThai) VALUES
(1, 'Standard Single', 450000, 1, 'Wifi tốc độ cao, TV LED 43 inch, Điều hòa 2 chiều, Bàn làm việc, Máy sấy tóc', 'Phòng tiêu chuẩn đơn giản, ấm cúng dành cho khách đi công tác hoặc du lịch 1 mình.', 'HoatDong'),
(2, 'Standard Double', 650000, 2, 'Wifi tốc độ cao, TV LED 43 inch, Điều hòa, Tủ lạnh mini, Ấm siêu tốc', 'Phòng đôi tiêu chuẩn với giường Queen êm ái, thích hợp cho cặp đôi hoặc bạn bè.', 'HoatDong'),
(3, 'Deluxe City View', 950000, 2, 'Ban công ngắm phố, Wifi 6, Smart TV 55 inch, Bồn tắm nằm, Máy pha cà phê, Tủ lạnh mini', 'Phòng cao cấp có ban công hướng phố tuyệt đẹp, thiết kế hiện đại sang trọng.', 'HoatDong'),
(4, 'Executive Suite', 1600000, 3, 'Phòng khách riêng biệt, Bồn tắm sục Jacuzzi, Smart TV 65 inch, Sofa cao cấp, View toàn cảnh, Miễn phí trà chiều', 'Phòng Suite hạng sang với không gian tiếp khách riêng biệt và tiện nghi đẳng cấp 5 sao.', 'HoatDong'),
(5, 'Family Luxury', 2100000, 4, '2 Phòng ngủ riêng biệt, Bếp mini, Bàn ăn, Bồn tắm đôi, Khu vui chơi trẻ em mini, Smart TV mỗi phòng', 'Phòng nghỉ gia đình rộng rãi, tiện nghi như ở nhà, view biển thoáng mát.', 'HoatDong'),
(6, 'Presidential Penthouse', 5000000, 6, 'Hồ bơi vô cực mini trên cao, Phòng xông hơi, Bar rượu riêng, Butler 24/7', 'Căn hộ tổng thống đỉnh cao tại tầng cao nhất của khách sạn.', 'Ngung')
ON DUPLICATE KEY UPDATE TenLoaiPhong=VALUES(TenLoaiPhong);

-- 2. Thêm Phòng
INSERT INTO PHONG (MaPhong, SoPhong, MaLoaiPhong, Tang, TrangThai, GhiChu) VALUES
(101, '101', 1, 1, 'Trong', 'Gần sảnh tiếp tân, thuận tiện di chuyển'),
(102, '102', 1, 1, 'Trong', 'Yên tĩnh, cửa sổ nhìn ra vườn hoa'),
(103, '103', 2, 1, 'CoKhach', 'Khách đang lưu trú ngắn hạn'),
(201, '201', 2, 2, 'Trong', 'Phòng mới nâng cấp nội thất'),
(202, '202', 3, 2, 'Trong', 'Ban công đón nắng sớm, view phố đi bộ'),
(203, '203', 3, 2, 'DangDon', 'Khách vừa checkout, đang dọn dẹp vệ sinh'),
(301, '301', 3, 3, 'Trong', 'View góc phố cực đẹp, thoáng mát'),
(302, '302', 4, 3, 'Trong', 'Căn góc tầng 3, ban công rộng 15m2'),
(401, '401', 4, 4, 'BaoTri', 'Đang bảo dưỡng hệ thống điều hòa và bồn sục'),
(402, '402', 5, 4, 'Trong', 'Phòng gia đình có ban công lớn nhìn ra công viên'),
(501, '501', 5, 5, 'Trong', 'Phòng gia đình tầng cao view panorama')
ON DUPLICATE KEY UPDATE SoPhong=VALUES(SoPhong);

-- 3. Thêm Khách hàng mẫu & Phiếu đặt phòng để test overlap
INSERT INTO KHACHHANG (MaKH, HoTen, SDT, Email) VALUES
(1, 'Nguyễn Văn An', '0912345678', 'nguyenvanan@example.com')
ON DUPLICATE KEY UPDATE HoTen=VALUES(HoTen);

-- Phiếu đặt phòng phòng 201 từ ngày mai đến 3 ngày sau
INSERT INTO PHIEUDATPHONG (MaPhieu, MaKH, NgayNhan, NgayTra, SoNguoi, TongTien, TrangThai, NguonDat) VALUES
(1, 1, CURDATE() + INTERVAL 1 DAY, CURDATE() + INTERVAL 3 DAY, 2, 1300000, 'DaXacNhan', 'Online')
ON DUPLICATE KEY UPDATE TrangThai=VALUES(TrangThai);

INSERT INTO CHITIETDATPHONG (MaChiTiet, MaPhieu, MaPhong, DonGia, SoDem, ThanhTien) VALUES
(1, 1, 201, 650000, 2, 1300000)
ON DUPLICATE KEY UPDATE DonGia=VALUES(DonGia);
