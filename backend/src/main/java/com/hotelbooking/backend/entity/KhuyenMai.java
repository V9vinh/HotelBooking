package com.hotelbooking.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "KHUYENMAI")
public class KhuyenMai {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaKhuyenMai")
    private Integer maKhuyenMai;

    @Column(name = "MaCode", unique = true, nullable = false, length = 20)
    private String maCode;

    @Column(name = "TenKhuyenMai", nullable = false, length = 100)
    private String tenKhuyenMai;

    @Column(name = "PhanTramGiam")
    private Integer phanTramGiam = 0;

    @Column(name = "SoTienGiam", precision = 15, scale = 0)
    private BigDecimal soTienGiam = BigDecimal.ZERO;

    @Column(name = "NgayBatDau", nullable = false)
    private LocalDate ngayBatDau;

    @Column(name = "NgayKetThuc", nullable = false)
    private LocalDate ngayKetThuc;

    @Column(name = "SoLuong")
    private Integer soLuong = 100;

    @Column(name = "DaSuDung")
    private Integer daSuDung = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiKhuyenMai trangThai = TrangThaiKhuyenMai.HoatDong;

    public KhuyenMai() {
    }

    public Integer getMaKhuyenMai() {
        return maKhuyenMai;
    }

    public void setMaKhuyenMai(Integer maKhuyenMai) {
        this.maKhuyenMai = maKhuyenMai;
    }

    public String getMaCode() {
        return maCode;
    }

    public void setMaCode(String maCode) {
        this.maCode = maCode;
    }

    public String getTenKhuyenMai() {
        return tenKhuyenMai;
    }

    public void setTenKhuyenMai(String tenKhuyenMai) {
        this.tenKhuyenMai = tenKhuyenMai;
    }

    public Integer getPhanTramGiam() {
        return phanTramGiam;
    }

    public void setPhanTramGiam(Integer phanTramGiam) {
        this.phanTramGiam = phanTramGiam;
    }

    public BigDecimal getSoTienGiam() {
        return soTienGiam;
    }

    public void setSoTienGiam(BigDecimal soTienGiam) {
        this.soTienGiam = soTienGiam;
    }

    public LocalDate getNgayBatDau() {
        return ngayBatDau;
    }

    public void setNgayBatDau(LocalDate ngayBatDau) {
        this.ngayBatDau = ngayBatDau;
    }

    public LocalDate getNgayKetThuc() {
        return ngayKetThuc;
    }

    public void setNgayKetThuc(LocalDate ngayKetThuc) {
        this.ngayKetThuc = ngayKetThuc;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Integer getDaSuDung() {
        return daSuDung;
    }

    public void setDaSuDung(Integer daSuDung) {
        this.daSuDung = daSuDung;
    }

    public TrangThaiKhuyenMai getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiKhuyenMai trangThai) {
        this.trangThai = trangThai;
    }
}
