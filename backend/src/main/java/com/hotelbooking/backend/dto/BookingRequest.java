package com.hotelbooking.backend.dto;

import java.time.LocalDate;
import java.util.List;

public class BookingRequest {
    private Integer maKhachHang;
    private LocalDate ngayNhan;
    private LocalDate ngayTra;
    private Integer soNguoi;
    private String maCodeKhuyenMai; // Optional
    private String ghiChu;
    private Integer maLoaiPhong;
    private Integer soLuongPhong = 1;
    private List<Integer> danhSachMaPhong; // Legacy or explicit room selection

    public Integer getMaKhachHang() {
        return maKhachHang;
    }

    public void setMaKhachHang(Integer maKhachHang) {
        this.maKhachHang = maKhachHang;
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

    public Integer getSoNguoi() {
        return soNguoi;
    }

    public void setSoNguoi(Integer soNguoi) {
        this.soNguoi = soNguoi;
    }

    public String getMaCodeKhuyenMai() {
        return maCodeKhuyenMai;
    }

    public void setMaCodeKhuyenMai(String maCodeKhuyenMai) {
        this.maCodeKhuyenMai = maCodeKhuyenMai;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public List<Integer> getDanhSachMaPhong() {
        return danhSachMaPhong;
    }

    public void setDanhSachMaPhong(List<Integer> danhSachMaPhong) {
        this.danhSachMaPhong = danhSachMaPhong;
    }

    public Integer getMaLoaiPhong() {
        return maLoaiPhong;
    }

    public void setMaLoaiPhong(Integer maLoaiPhong) {
        this.maLoaiPhong = maLoaiPhong;
    }

    public Integer getSoLuongPhong() {
        return soLuongPhong;
    }

    public void setSoLuongPhong(Integer soLuongPhong) {
        this.soLuongPhong = soLuongPhong;
    }
}
