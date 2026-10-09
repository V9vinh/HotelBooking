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
    private List<Integer> danhSachMaPhong;

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
}
