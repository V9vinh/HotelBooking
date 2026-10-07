package com.hotelbooking.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "DICHVU")
public class DichVu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDichVu")
    private Integer maDichVu;

    @Column(name = "TenDichVu", nullable = false, length = 100)
    private String tenDichVu;

    @Column(name = "Gia", nullable = false, precision = 15, scale = 0)
    private BigDecimal gia;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiDichVu trangThai = TrangThaiDichVu.KinhDoanh;

    public DichVu() {
    }

    public Integer getMaDichVu() {
        return maDichVu;
    }

    public void setMaDichVu(Integer maDichVu) {
        this.maDichVu = maDichVu;
    }

    public String getTenDichVu() {
        return tenDichVu;
    }

    public void setTenDichVu(String tenDichVu) {
        this.tenDichVu = tenDichVu;
    }

    public BigDecimal getGia() {
        return gia;
    }

    public void setGia(BigDecimal gia) {
        this.gia = gia;
    }

    public TrangThaiDichVu getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiDichVu trangThai) {
        this.trangThai = trangThai;
    }
}
