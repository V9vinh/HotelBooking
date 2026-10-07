package com.hotelbooking.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "NHANVIEN")
public class NhanVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNV")
    private Integer maNV;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaTK", unique = true, nullable = false)
    private TaiKhoan taiKhoan;

    @Column(name = "HoTen", nullable = false, length = 100)
    private String hoTen;

    @Column(name = "SDT", length = 15)
    private String sdt;

    @Enumerated(EnumType.STRING)
    @Column(name = "ChucVu", nullable = false)
    private ChucVuNhanVien chucVu;

    @Column(name = "NgayVaoLam")
    private LocalDate ngayVaoLam;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiNhanVien trangThai = TrangThaiNhanVien.DangLam;

    public NhanVien() {
    }

    public Integer getMaNV() {
        return maNV;
    }

    public void setMaNV(Integer maNV) {
        this.maNV = maNV;
    }

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public ChucVuNhanVien getChucVu() {
        return chucVu;
    }

    public void setChucVu(ChucVuNhanVien chucVu) {
        this.chucVu = chucVu;
    }

    public LocalDate getNgayVaoLam() {
        return ngayVaoLam;
    }

    public void setNgayVaoLam(LocalDate ngayVaoLam) {
        this.ngayVaoLam = ngayVaoLam;
    }

    public TrangThaiNhanVien getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiNhanVien trangThai) {
        this.trangThai = trangThai;
    }
}
