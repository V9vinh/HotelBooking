package com.hotelbooking.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "PHONG")
public class Phong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaPhong")
    private Integer maPhong;

    @Column(name = "SoPhong", nullable = false, unique = true, length = 10)
    private String soPhong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaLoaiPhong", nullable = false)
    private LoaiPhong loaiPhong;

    @Column(name = "Tang")
    private Integer tang;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiPhong trangThai = TrangThaiPhong.Trong;

    @Column(name = "GhiChu", length = 255)
    private String ghiChu;

    public Phong() {
    }

    public Integer getMaPhong() {
        return maPhong;
    }

    public void setMaPhong(Integer maPhong) {
        this.maPhong = maPhong;
    }

    public String getSoPhong() {
        return soPhong;
    }

    public void setSoPhong(String soPhong) {
        this.soPhong = soPhong;
    }

    public LoaiPhong getLoaiPhong() {
        return loaiPhong;
    }

    public void setLoaiPhong(LoaiPhong loaiPhong) {
        this.loaiPhong = loaiPhong;
    }

    public Integer getTang() {
        return tang;
    }

    public void setTang(Integer tang) {
        this.tang = tang;
    }

    public TrangThaiPhong getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiPhong trangThai) {
        this.trangThai = trangThai;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }
}
