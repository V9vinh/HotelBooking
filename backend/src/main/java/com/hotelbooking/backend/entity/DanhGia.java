package com.hotelbooking.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "DANHGIA")
public class DanhGia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDanhGia")
    private Integer maDanhGia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaKH", nullable = false)
    private KhachHang khachHang;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaPhieu", unique = true, nullable = false)
    private PhieuDatPhong phieuDatPhong;

    @Column(name = "DiemSo")
    private Integer diemSo;

    @Column(name = "NoiDung", length = 1000)
    private String noiDung;

    @Column(name = "NgayDanhGia", insertable = false, updatable = false)
    private LocalDateTime ngayDanhGia;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiDanhGia trangThai = TrangThaiDanhGia.HienThi;

    public DanhGia() {
    }

    public Integer getMaDanhGia() {
        return maDanhGia;
    }

    public void setMaDanhGia(Integer maDanhGia) {
        this.maDanhGia = maDanhGia;
    }

    public KhachHang getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(KhachHang khachHang) {
        this.khachHang = khachHang;
    }

    public PhieuDatPhong getPhieuDatPhong() {
        return phieuDatPhong;
    }

    public void setPhieuDatPhong(PhieuDatPhong phieuDatPhong) {
        this.phieuDatPhong = phieuDatPhong;
    }

    public Integer getDiemSo() {
        return diemSo;
    }

    public void setDiemSo(Integer diemSo) {
        this.diemSo = diemSo;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public LocalDateTime getNgayDanhGia() {
        return ngayDanhGia;
    }

    public void setNgayDanhGia(LocalDateTime ngayDanhGia) {
        this.ngayDanhGia = ngayDanhGia;
    }

    public TrangThaiDanhGia getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiDanhGia trangThai) {
        this.trangThai = trangThai;
    }
}
