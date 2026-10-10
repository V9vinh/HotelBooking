package com.hotelbooking.backend.dto;

import java.time.LocalDate;

public class RoomMapDTO {
    private Integer maPhong;
    private String soPhong;
    private Integer tang;
    private Integer maLoaiPhong;
    private String tenLoaiPhong;
    private String trangThaiHienTai; // From PHONG table (BaoTri, etc)
    private String trangThaiKhaDung; // Trong, DaDat, CoKhach
    
    // If there is an overlapping booking in the selected date range:
    private Integer maPhieu;
    private String tenKhachHang;
    private LocalDate ngayNhan;
    private LocalDate ngayTra;
    private String trangThaiPhieu;

    public RoomMapDTO() {}

    public Integer getMaPhong() { return maPhong; }
    public void setMaPhong(Integer maPhong) { this.maPhong = maPhong; }
    public String getSoPhong() { return soPhong; }
    public void setSoPhong(String soPhong) { this.soPhong = soPhong; }
    public Integer getTang() { return tang; }
    public void setTang(Integer tang) { this.tang = tang; }
    public Integer getMaLoaiPhong() { return maLoaiPhong; }
    public void setMaLoaiPhong(Integer maLoaiPhong) { this.maLoaiPhong = maLoaiPhong; }
    public String getTenLoaiPhong() { return tenLoaiPhong; }
    public void setTenLoaiPhong(String tenLoaiPhong) { this.tenLoaiPhong = tenLoaiPhong; }
    public String getTrangThaiHienTai() { return trangThaiHienTai; }
    public void setTrangThaiHienTai(String trangThaiHienTai) { this.trangThaiHienTai = trangThaiHienTai; }
    public String getTrangThaiKhaDung() { return trangThaiKhaDung; }
    public void setTrangThaiKhaDung(String trangThaiKhaDung) { this.trangThaiKhaDung = trangThaiKhaDung; }
    public Integer getMaPhieu() { return maPhieu; }
    public void setMaPhieu(Integer maPhieu) { this.maPhieu = maPhieu; }
    public String getTenKhachHang() { return tenKhachHang; }
    public void setTenKhachHang(String tenKhachHang) { this.tenKhachHang = tenKhachHang; }
    public LocalDate getNgayNhan() { return ngayNhan; }
    public void setNgayNhan(LocalDate ngayNhan) { this.ngayNhan = ngayNhan; }
    public LocalDate getNgayTra() { return ngayTra; }
    public void setNgayTra(LocalDate ngayTra) { this.ngayTra = ngayTra; }
    public String getTrangThaiPhieu() { return trangThaiPhieu; }
    public void setTrangThaiPhieu(String trangThaiPhieu) { this.trangThaiPhieu = trangThaiPhieu; }
}
