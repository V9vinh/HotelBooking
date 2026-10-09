package com.hotelbooking.backend.dto;

import com.hotelbooking.backend.entity.VaiTroTaiKhoan;

public class LoginResponse {
    private String token;
    private String tenDangNhap;
    private VaiTroTaiKhoan vaiTro;
    private Integer maKH;

    public LoginResponse(String token, String tenDangNhap, VaiTroTaiKhoan vaiTro, Integer maKH) {
        this.token = token;
        this.tenDangNhap = tenDangNhap;
        this.vaiTro = vaiTro;
        this.maKH = maKH;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public Integer getMaKH() {
        return maKH;
    }

    public void setMaKH(Integer maKH) {
        this.maKH = maKH;
    }
}
