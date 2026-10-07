package com.hotelbooking.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "PHATSINH")
public class PhatSinh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaPhatSinh")
    private Integer maPhatSinh;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaPhieu", nullable = false)
    private PhieuDatPhong phieuDatPhong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNV", nullable = false)
    private NhanVien nhanVien;

    @Enumerated(EnumType.STRING)
    @Column(name = "LoaiPhatSinh", nullable = false)
    private LoaiPhatSinh loaiPhatSinh;

    @Column(name = "MoTa", nullable = false, length = 500)
    private String moTa;

    @Column(name = "SoTien", nullable = false, precision = 15, scale = 0)
    private BigDecimal soTien;

    @Column(name = "NgayGhiNhan", insertable = false, updatable = false)
    private LocalDateTime ngayGhiNhan;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiPhatSinh trangThai = TrangThaiPhatSinh.ChuaThanhToan;

    @Column(name = "GhiChu", length = 500)
    private String ghiChu;

    public PhatSinh() {
    }

    public Integer getMaPhatSinh() {
        return maPhatSinh;
    }

    public void setMaPhatSinh(Integer maPhatSinh) {
        this.maPhatSinh = maPhatSinh;
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

    public LoaiPhatSinh getLoaiPhatSinh() {
        return loaiPhatSinh;
    }

    public void setLoaiPhatSinh(LoaiPhatSinh loaiPhatSinh) {
        this.loaiPhatSinh = loaiPhatSinh;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public BigDecimal getSoTien() {
        return soTien;
    }

    public void setSoTien(BigDecimal soTien) {
        this.soTien = soTien;
    }

    public LocalDateTime getNgayGhiNhan() {
        return ngayGhiNhan;
    }

    public void setNgayGhiNhan(LocalDateTime ngayGhiNhan) {
        this.ngayGhiNhan = ngayGhiNhan;
    }

    public TrangThaiPhatSinh getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiPhatSinh trangThai) {
        this.trangThai = trangThai;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }
}
