package com.hotelbooking.backend.dto;

import com.hotelbooking.backend.entity.GioiTinh;
import com.hotelbooking.backend.entity.KhachHang;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProfileDTO {
    private Integer maKH;
    private String tenDangNhap;
    private String hoTen;
    private String sdt;
    private String email;
    private String cmndCccd;
    private String diaChi;
    private LocalDate ngaySinh;
    private GioiTinh gioiTinh;
    private LocalDateTime ngayTao;

    public ProfileDTO() {}

    public ProfileDTO(KhachHang khachHang, String tenDangNhap) {
        this.maKH = khachHang.getMaKH();
        this.tenDangNhap = tenDangNhap;
        this.hoTen = khachHang.getHoTen();
        this.sdt = khachHang.getSdt();
        this.email = khachHang.getEmail();
        this.cmndCccd = khachHang.getCmndCccd();
        this.diaChi = khachHang.getDiaChi();
        this.ngaySinh = khachHang.getNgaySinh();
        this.gioiTinh = khachHang.getGioiTinh();
        this.ngayTao = khachHang.getNgayTao();
    }

    public Integer getMaKH() { return maKH; }
    public void setMaKH(Integer maKH) { this.maKH = maKH; }

    public String getTenDangNhap() { return tenDangNhap; }
    public void setTenDangNhap(String tenDangNhap) { this.tenDangNhap = tenDangNhap; }

    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }

    public String getSdt() { return sdt; }
    public void setSdt(String sdt) { this.sdt = sdt; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCmndCccd() { return cmndCccd; }
    public void setCmndCccd(String cmndCccd) { this.cmndCccd = cmndCccd; }

    public String getDiaChi() { return diaChi; }
    public void setDiaChi(String diaChi) { this.diaChi = diaChi; }

    public LocalDate getNgaySinh() { return ngaySinh; }
    public void setNgaySinh(LocalDate ngaySinh) { this.ngaySinh = ngaySinh; }

    public GioiTinh getGioiTinh() { return gioiTinh; }
    public void setGioiTinh(GioiTinh gioiTinh) { this.gioiTinh = gioiTinh; }

    public LocalDateTime getNgayTao() { return ngayTao; }
    public void setNgayTao(LocalDateTime ngayTao) { this.ngayTao = ngayTao; }
}
