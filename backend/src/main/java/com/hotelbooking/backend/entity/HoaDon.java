package com.hotelbooking.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "HOADON")
public class HoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaHoaDon")
    private Integer maHoaDon;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaPhieu", unique = true, nullable = false)
    private PhieuDatPhong phieuDatPhong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNV")
    private NhanVien nhanVien;

    @Column(name = "NgayLap", insertable = false, updatable = false)
    private LocalDateTime ngayLap;

    @Column(name = "TienPhong", precision = 15, scale = 0)
    private BigDecimal tienPhong = BigDecimal.ZERO;

    @Column(name = "TienDichVu", precision = 15, scale = 0)
    private BigDecimal tienDichVu = BigDecimal.ZERO;

    @Column(name = "TienPhatSinh", precision = 15, scale = 0)
    private BigDecimal tienPhatSinh = BigDecimal.ZERO;

    @Column(name = "GiamGia", precision = 15, scale = 0)
    private BigDecimal giamGia = BigDecimal.ZERO;

    @Column(name = "TongTien", precision = 15, scale = 0)
    private BigDecimal tongTien = BigDecimal.ZERO;

    @Column(name = "DaThanhToan", precision = 15, scale = 0)
    private BigDecimal daThanhToan = BigDecimal.ZERO;

    @Column(name = "ConLai", precision = 15, scale = 0)
    private BigDecimal conLai = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiHoaDon trangThai = TrangThaiHoaDon.ChuaThanhToan;

    public HoaDon() {
    }

    public Integer getMaHoaDon() {
        return maHoaDon;
    }

    public void setMaHoaDon(Integer maHoaDon) {
        this.maHoaDon = maHoaDon;
    }

    public PhieuDatPhong getPhieuDatPhong() {
        return phieuDatPhong;
    }

    public void setPhieuDatPhong(PhieuDatPhong phieuDatPhong) {
        this.phieuDatPhong = phieuDatPhong;
    }

    public NhanVien getNhanVien() {
        return nhanVien;
    }

    public void setNhanVien(NhanVien nhanVien) {
        this.nhanVien = nhanVien;
    }

    public LocalDateTime getNgayLap() {
        return ngayLap;
    }

    public void setNgayLap(LocalDateTime ngayLap) {
        this.ngayLap = ngayLap;
    }

    public BigDecimal getTienPhong() {
        return tienPhong;
    }

    public void setTienPhong(BigDecimal tienPhong) {
        this.tienPhong = tienPhong;
    }

    public BigDecimal getTienDichVu() {
        return tienDichVu;
    }

    public void setTienDichVu(BigDecimal tienDichVu) {
        this.tienDichVu = tienDichVu;
    }

    public BigDecimal getTienPhatSinh() {
        return tienPhatSinh;
    }

    public void setTienPhatSinh(BigDecimal tienPhatSinh) {
        this.tienPhatSinh = tienPhatSinh;
    }

    public BigDecimal getGiamGia() {
        return giamGia;
    }

    public void setGiamGia(BigDecimal giamGia) {
        this.giamGia = giamGia;
    }

    public BigDecimal getTongTien() {
        return tongTien;
    }

    public void setTongTien(BigDecimal tongTien) {
        this.tongTien = tongTien;
    }

    public BigDecimal getDaThanhToan() {
        return daThanhToan;
    }

    public void setDaThanhToan(BigDecimal daThanhToan) {
        this.daThanhToan = daThanhToan;
    }

    public BigDecimal getConLai() {
        return conLai;
    }

    public void setConLai(BigDecimal conLai) {
        this.conLai = conLai;
    }

    public TrangThaiHoaDon getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiHoaDon trangThai) {
        this.trangThai = trangThai;
    }
}
