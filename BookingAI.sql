-- ============================================================
-- PHẦN 0: KHỞI TẠO DATABASE
-- ============================================================
DROP DATABASE IF EXISTS HotelBookingDB;
CREATE DATABASE HotelBookingDB
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE HotelBookingDB;

-- ============================================================
-- PHẦN 1: TẠO CÁC BẢNG
-- ============================================================

-- 1.1. BẢNG TAIKHOAN — UC01, UC13
-- ------------------------------------------------------------
CREATE TABLE TAIKHOAN (
    MaTK        INT PRIMARY KEY AUTO_INCREMENT,
    TenDangNhap VARCHAR(50) UNIQUE NOT NULL,
    MatKhau     VARCHAR(255) NOT NULL,
    VaiTro      ENUM('KhachHang', 'LeTan', 'QuanLy', 'Admin') NOT NULL,
    TrangThai   ENUM('HoatDong', 'BiKhoa') DEFAULT 'HoatDong',
    NgayTao     DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 1.2. BẢNG KHACHHANG — UC01, UC11, UC15
-- ------------------------------------------------------------
CREATE TABLE KHACHHANG (
    MaKH        INT PRIMARY KEY AUTO_INCREMENT,
    MaTK        INT UNIQUE,
    HoTen       NVARCHAR(100) NOT NULL,
    SDT         VARCHAR(15) NOT NULL,
    Email       VARCHAR(100),
    CMND_CCCD   VARCHAR(20),
    DiaChi      NVARCHAR(200),
    NgaySinh    DATE,
    GioiTinh    ENUM('Nam', 'Nữ', 'Khác'),
    NgayTao     DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MaTK) REFERENCES TAIKHOAN(MaTK) ON DELETE SET NULL,
    INDEX idx_kh_sdt (SDT)
) ENGINE=InnoDB;

-- 1.3. BẢNG NHANVIEN — UC14
-- ------------------------------------------------------------
CREATE TABLE NHANVIEN (
    MaNV        INT PRIMARY KEY AUTO_INCREMENT,
    MaTK        INT UNIQUE NOT NULL,
    HoTen       NVARCHAR(100) NOT NULL,
    SDT         VARCHAR(15),
    ChucVu      ENUM('LeTan', 'QuanLy', 'Admin') NOT NULL,
    NgayVaoLam  DATE,
    TrangThai   ENUM('DangLam', 'NghiViec') DEFAULT 'DangLam',
    FOREIGN KEY (MaTK) REFERENCES TAIKHOAN(MaTK) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 1.4. BẢNG LOAIPHONG — UC17
-- ------------------------------------------------------------
CREATE TABLE LOAIPHONG (
    MaLoaiPhong INT PRIMARY KEY AUTO_INCREMENT,
    TenLoaiPhong NVARCHAR(50) NOT NULL,
    GiaCoBan    DECIMAL(15,0) NOT NULL,
    SucChua     INT NOT NULL,
    TienNghi    NVARCHAR(500),
    MoTa        NVARCHAR(1000),
    TrangThai   ENUM('HoatDong', 'Ngung') DEFAULT 'HoatDong'
) ENGINE=InnoDB;

-- 1.5. BẢNG PHONG — UC02, UC12, UC16
-- ------------------------------------------------------------
CREATE TABLE PHONG (
    MaPhong     INT PRIMARY KEY AUTO_INCREMENT,
    SoPhong     VARCHAR(10) NOT NULL UNIQUE,
    MaLoaiPhong INT NOT NULL,
    Tang        INT,
    TrangThai   ENUM('Trong', 'CoKhach', 'DangDon', 'BaoTri') DEFAULT 'Trong',
    GhiChu      NVARCHAR(255),
    FOREIGN KEY (MaLoaiPhong) REFERENCES LOAIPHONG(MaLoaiPhong),
    INDEX idx_phong_trangthai (TrangThai)
) ENGINE=InnoDB;

-- 1.6. BẢNG KHUYENMAI — UC18
-- ------------------------------------------------------------
CREATE TABLE KHUYENMAI (
    MaKhuyenMai INT PRIMARY KEY AUTO_INCREMENT,
    MaCode      VARCHAR(20) UNIQUE NOT NULL,
    TenKhuyenMai NVARCHAR(100) NOT NULL,
    PhanTramGiam INT DEFAULT 0,
    SoTienGiam  DECIMAL(15,0) DEFAULT 0,
    NgayBatDau  DATE NOT NULL,
    NgayKetThuc DATE NOT NULL,
    SoLuong     INT DEFAULT 100,
    DaSuDung    INT DEFAULT 0,
    TrangThai   ENUM('HoatDong', 'Ngung', 'HetHan') DEFAULT 'HoatDong',
    CHECK (NgayKetThuc >= NgayBatDau)
) ENGINE=InnoDB;

-- 1.7. BẢNG DICHVU — UC19
-- ------------------------------------------------------------
CREATE TABLE DICHVU (
    MaDichVu    INT PRIMARY KEY AUTO_INCREMENT,
    TenDichVu   NVARCHAR(100) NOT NULL,
    Gia         DECIMAL(15,0) NOT NULL,
    TrangThai   ENUM('KinhDoanh', 'Ngung') DEFAULT 'KinhDoanh'
) ENGINE=InnoDB;

-- 1.8. BẢNG PHIEUDATPHONG ⭐ TRUNG TÂM
-- Ánh xạ: UC03, UC04, UC07, UC08, UC09
-- ------------------------------------------------------------
CREATE TABLE PHIEUDATPHONG (
    MaPhieu     INT PRIMARY KEY AUTO_INCREMENT,
    MaKH        INT NOT NULL,
    MaNV        INT NULL,
    NgayDat     DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayNhan    DATE NOT NULL,
    NgayTra     DATE NOT NULL,
    SoNguoi     INT DEFAULT 1,
    MaKhuyenMai INT NULL,
    TongTien    DECIMAL(15,0) DEFAULT 0,
    TrangThai   ENUM('ChoXacNhan', 'DaXacNhan', 'DaCheckIn', 'DaCheckOut', 'DaHuy') 
                DEFAULT 'ChoXacNhan',
    NguonDat    ENUM('Online', 'LeTan') DEFAULT 'Online',
    GhiChu      NVARCHAR(500),
    NgayTao     DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH),
    FOREIGN KEY (MaNV) REFERENCES NHANVIEN(MaNV) ON DELETE SET NULL,
    FOREIGN KEY (MaKhuyenMai) REFERENCES KHUYENMAI(MaKhuyenMai) ON DELETE SET NULL,
    INDEX idx_pdp_trangthai (TrangThai),
    INDEX idx_pdp_ngay (NgayNhan, NgayTra),
    CHECK (NgayTra > NgayNhan)
) ENGINE=InnoDB;

-- 1.9. BẢNG CHITIETDATPHONG — UC03, UC07
-- ------------------------------------------------------------
CREATE TABLE CHITIETDATPHONG (
    MaChiTiet   INT PRIMARY KEY AUTO_INCREMENT,
    MaPhieu     INT NOT NULL,
    MaPhong     INT NOT NULL,
    DonGia      DECIMAL(15,0) NOT NULL,
    SoDem       INT NOT NULL,
    ThanhTien   DECIMAL(15,0) NOT NULL,
    
    FOREIGN KEY (MaPhieu) REFERENCES PHIEUDATPHONG(MaPhieu) ON DELETE CASCADE,
    FOREIGN KEY (MaPhong) REFERENCES PHONG(MaPhong),
    UNIQUE KEY uk_phong_phieu (MaPhieu, MaPhong),
    CHECK (SoDem > 0)
) ENGINE=InnoDB;

-- 1.10. BẢNG HOADON — UC09, UC10, UC20
-- ------------------------------------------------------------
CREATE TABLE HOADON (
    MaHoaDon    INT PRIMARY KEY AUTO_INCREMENT,
    MaPhieu     INT NOT NULL UNIQUE,
    MaNV        INT NULL,
    NgayLap     DATETIME DEFAULT CURRENT_TIMESTAMP,
    TienPhong   DECIMAL(15,0) DEFAULT 0,
    TienDichVu  DECIMAL(15,0) DEFAULT 0,
    TienPhatSinh DECIMAL(15,0) DEFAULT 0,
    GiamGia     DECIMAL(15,0) DEFAULT 0,
    TongTien    DECIMAL(15,0) DEFAULT 0,
    DaThanhToan DECIMAL(15,0) DEFAULT 0,
    ConLai      DECIMAL(15,0) DEFAULT 0,
    TrangThai   ENUM('ChuaThanhToan', 'DaThanhToan', 'DaHuy') DEFAULT 'ChuaThanhToan',
    
    FOREIGN KEY (MaPhieu) REFERENCES PHIEUDATPHONG(MaPhieu) ON DELETE CASCADE,
    FOREIGN KEY (MaNV) REFERENCES NHANVIEN(MaNV) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 1.11. BẢNG THANHTOAN — UC05, UC10
-- ------------------------------------------------------------
CREATE TABLE THANHTOAN (
    MaThanhToan INT PRIMARY KEY AUTO_INCREMENT,
    MaHoaDon    INT NOT NULL,
    PhuongThuc  ENUM('TienMat', 'The', 'ViDienTu', 'ChuyenKhoan') NOT NULL,
    SoTien      DECIMAL(15,0) NOT NULL,
    NgayThanhToan DATETIME DEFAULT CURRENT_TIMESTAMP,
    MaGiaoDich  VARCHAR(100),
    TrangThai   ENUM('ThanhCong', 'ThatBai', 'ChoXuLy') DEFAULT 'ThanhCong',
    
    FOREIGN KEY (MaHoaDon) REFERENCES HOADON(MaHoaDon) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 1.12. BẢNG SUDUNGDICHVU — UC09
-- ------------------------------------------------------------
CREATE TABLE SUDUNGDICHVU (
    MaSuDung    INT PRIMARY KEY AUTO_INCREMENT,
    MaPhieu     INT NOT NULL,
    MaDichVu    INT NOT NULL,
    SoLuong     INT DEFAULT 1,
    NgaySuDung  DATETIME DEFAULT CURRENT_TIMESTAMP,
    ThanhTien   DECIMAL(15,0) NOT NULL,
    
    FOREIGN KEY (MaPhieu) REFERENCES PHIEUDATPHONG(MaPhieu) ON DELETE CASCADE,
    FOREIGN KEY (MaDichVu) REFERENCES DICHVU(MaDichVu)
) ENGINE=InnoDB;

-- 1.13. BẢNG DANHGIA — UC06
-- ------------------------------------------------------------
CREATE TABLE DANHGIA (
    MaDanhGia   INT PRIMARY KEY AUTO_INCREMENT,
    MaKH        INT NOT NULL,
    MaPhieu     INT NOT NULL UNIQUE,
    DiemSo      INT CHECK (DiemSo BETWEEN 1 AND 5),
    NoiDung     NVARCHAR(1000),
    NgayDanhGia DATETIME DEFAULT CURRENT_TIMESTAMP,
    TrangThai   ENUM('HienThi', 'An') DEFAULT 'HienThi',
    
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH),
    FOREIGN KEY (MaPhieu) REFERENCES PHIEUDATPHONG(MaPhieu) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 1.14. BẢNG PHATSINH — UC09, UC10, UC21
-- ------------------------------------------------------------
CREATE TABLE PHATSINH (
    MaPhatSinh   INT PRIMARY KEY AUTO_INCREMENT,
    MaPhieu      INT NOT NULL,
    MaNV         INT NOT NULL,
    LoaiPhatSinh ENUM('HuHong', 'MatMat', 'PhuThu', 'Khac') NOT NULL,
    MoTa         NVARCHAR(500) NOT NULL,
    SoTien       DECIMAL(15,0) NOT NULL,
    NgayGhiNhan  DATETIME DEFAULT CURRENT_TIMESTAMP,
    TrangThai    ENUM('ChuaThanhToan', 'DaThanhToan', 'MienGiam') 
                 DEFAULT 'ChuaThanhToan',
    GhiChu       NVARCHAR(500),
    
    FOREIGN KEY (MaPhieu) REFERENCES PHIEUDATPHONG(MaPhieu) ON DELETE CASCADE,
    FOREIGN KEY (MaNV) REFERENCES NHANVIEN(MaNV),
    INDEX idx_ps_phieu (MaPhieu),
    INDEX idx_ps_loai (LoaiPhatSinh),
    CHECK (SoTien >= 0)
) ENGINE=InnoDB;