package com.hotelbooking.backend.dto.request;

import com.hotelbooking.backend.entity.TrangThaiPhong;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LocPhongRequest {

    private String keyword;
    private Integer maLoaiPhong;
    private Integer sucChua;
    private BigDecimal giaTu;
    private BigDecimal giaDen;
    private Integer tang;
    private TrangThaiPhong trangThai;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate ngayNhan;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate ngayTra;

    public LocPhongRequest() {
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Integer getMaLoaiPhong() {
        return maLoaiPhong;
    }

    public void setMaLoaiPhong(Integer maLoaiPhong) {
        this.maLoaiPhong = maLoaiPhong;
    }

    public Integer getSucChua() {
        return sucChua;
    }

    public void setSucChua(Integer sucChua) {
        this.sucChua = sucChua;
    }

    public BigDecimal getGiaTu() {
        return giaTu;
    }

    public void setGiaTu(BigDecimal giaTu) {
        this.giaTu = giaTu;
    }

    public BigDecimal getGiaDen() {
        return giaDen;
    }

    public void setGiaDen(BigDecimal giaDen) {
        this.giaDen = giaDen;
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

    public LocalDate getNgayNhan() {
        return ngayNhan;
    }

    public void setNgayNhan(LocalDate ngayNhan) {
        this.ngayNhan = ngayNhan;
    }

    public LocalDate getNgayTra() {
        return ngayTra;
    }

    public void setNgayTra(LocalDate ngayTra) {
        this.ngayTra = ngayTra;
    }
}
