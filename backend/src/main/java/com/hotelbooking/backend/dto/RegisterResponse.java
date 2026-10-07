package com.hotelbooking.backend.dto;

import com.hotelbooking.backend.entity.GioiTinh;
import com.hotelbooking.backend.entity.TrangThaiTaiKhoan;
import com.hotelbooking.backend.entity.VaiTroTaiKhoan;
import java.time.LocalDate;

public class RegisterResponse {

    private Integer maTK;
    private Integer maKH;
    private String tenDangNhap;
    private VaiTroTaiKhoan vaiTro;
    private TrangThaiTaiKhoan trangThai;
    private String hoTen;
    private String sdt;
    private String email;
    private String cmndCccd;
    private String diaChi;
    private LocalDate ngaySinh;
    private GioiTinh gioiTinh;
    private String message;

    public RegisterResponse() {
    }

    public Integer getMaTK() {
        return maTK;
    }

    public void setMaTK(Integer maTK) {
        this.maTK = maTK;
    }

    public Integer getMaKH() {
        return maKH;
    }

    public void setMaKH(Integer maKH) {
        this.maKH = maKH;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public VaiTroTaiKhoan getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(VaiTroTaiKhoan vaiTro) {
        this.vaiTro = vaiTro;
    }

    public TrangThaiTaiKhoan getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiTaiKhoan trangThai) {
        this.trangThai = trangThai;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCmndCccd() {
        return cmndCccd;
    }

    public void setCmndCccd(String cmndCccd) {
        this.cmndCccd = cmndCccd;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public LocalDate getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public GioiTinh getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(GioiTinh gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
