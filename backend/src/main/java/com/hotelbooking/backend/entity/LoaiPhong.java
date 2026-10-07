package com.hotelbooking.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "LOAIPHONG")
public class LoaiPhong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLoaiPhong")
    private Integer maLoaiPhong;

    @Column(name = "TenLoaiPhong", nullable = false, length = 50)
    private String tenLoaiPhong;

    @Column(name = "GiaCoBan", nullable = false, precision = 15, scale = 0)
    private BigDecimal giaCoBan;

    @Column(name = "SucChua", nullable = false)
    private Integer sucChua;

    @Column(name = "TienNghi", length = 500)
    private String tienNghi;

    @Column(name = "MoTa", length = 1000)
    private String moTa;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiLoaiPhong trangThai = TrangThaiLoaiPhong.HoatDong;

    public LoaiPhong() {
    }

    public Integer getMaLoaiPhong() {
        return maLoaiPhong;
    }

    public void setMaLoaiPhong(Integer maLoaiPhong) {
        this.maLoaiPhong = maLoaiPhong;
    }

    public String getTenLoaiPhong() {
        return tenLoaiPhong;
    }

    public void setTenLoaiPhong(String tenLoaiPhong) {
        this.tenLoaiPhong = tenLoaiPhong;
    }

    public BigDecimal getGiaCoBan() {
        return giaCoBan;
    }

    public void setGiaCoBan(BigDecimal giaCoBan) {
        this.giaCoBan = giaCoBan;
    }

    public Integer getSucChua() {
        return sucChua;
    }

    public void setSucChua(Integer sucChua) {
        this.sucChua = sucChua;
    }

    public String getTienNghi() {
        return tienNghi;
    }

    public void setTienNghi(String tienNghi) {
        this.tienNghi = tienNghi;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public TrangThaiLoaiPhong getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiLoaiPhong trangThai) {
        this.trangThai = trangThai;
    }
}
