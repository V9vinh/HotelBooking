package com.hotelbooking.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AdminBookingDTO {
    private Integer maPhieu;
    private String tenKhachHang;
    private String sdtKhachHang;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime ngayDat;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayNhan;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayTra;

    private Integer soNguoi;
    private BigDecimal tongTien;
    private String trangThai;

    public AdminBookingDTO() {
    }

    public AdminBookingDTO(Integer maPhieu, String tenKhachHang, String sdtKhachHang,
                           LocalDateTime ngayDat, LocalDate ngayNhan, LocalDate ngayTra,
                           Integer soNguoi, BigDecimal tongTien, String trangThai) {
        this.maPhieu = maPhieu;
        this.tenKhachHang = tenKhachHang;
        this.sdtKhachHang = sdtKhachHang;
        this.ngayDat = ngayDat;
        this.ngayNhan = ngayNhan;
        this.ngayTra = ngayTra;
        this.soNguoi = soNguoi;
        this.tongTien = tongTien;
        this.trangThai = trangThai;
    }

    public Integer getMaPhieu() { return maPhieu; }
    public void setMaPhieu(Integer maPhieu) { this.maPhieu = maPhieu; }
    public String getTenKhachHang() { return tenKhachHang; }
    public void setTenKhachHang(String tenKhachHang) { this.tenKhachHang = tenKhachHang; }
    public String getSdtKhachHang() { return sdtKhachHang; }
    public void setSdtKhachHang(String sdtKhachHang) { this.sdtKhachHang = sdtKhachHang; }
    public LocalDateTime getNgayDat() { return ngayDat; }
    public void setNgayDat(LocalDateTime ngayDat) { this.ngayDat = ngayDat; }
    public LocalDate getNgayNhan() { return ngayNhan; }
    public void setNgayNhan(LocalDate ngayNhan) { this.ngayNhan = ngayNhan; }
    public LocalDate getNgayTra() { return ngayTra; }
    public void setNgayTra(LocalDate ngayTra) { this.ngayTra = ngayTra; }
    public Integer getSoNguoi() { return soNguoi; }
    public void setSoNguoi(Integer soNguoi) { this.soNguoi = soNguoi; }
    public BigDecimal getTongTien() { return tongTien; }
    public void setTongTien(BigDecimal tongTien) { this.tongTien = tongTien; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
}
