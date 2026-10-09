package com.hotelbooking.backend.dto.response;

import java.time.LocalDate;

public class KiemTraPhongTrongResponse {

    private Integer maPhong;
    private String soPhong;
    private LocalDate ngayNhan;
    private LocalDate ngayTra;
    private boolean conTrong;
    private String thongBao;

    public KiemTraPhongTrongResponse() {
    }

    public KiemTraPhongTrongResponse(Integer maPhong, String soPhong, LocalDate ngayNhan, LocalDate ngayTra, boolean conTrong, String thongBao) {
        this.maPhong = maPhong;
        this.soPhong = soPhong;
        this.ngayNhan = ngayNhan;
        this.ngayTra = ngayTra;
        this.conTrong = conTrong;
        this.thongBao = thongBao;
    }

    public Integer getMaPhong() {
        return maPhong;
    }

    public void setMaPhong(Integer maPhong) {
        this.maPhong = maPhong;
    }

    public String getSoPhong() {
        return soPhong;
    }

    public void setSoPhong(String soPhong) {
        this.soPhong = soPhong;
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

    public boolean isConTrong() {
        return conTrong;
    }

    public void setConTrong(boolean conTrong) {
        this.conTrong = conTrong;
    }

    public String getThongBao() {
        return thongBao;
    }

    public void setThongBao(String thongBao) {
        this.thongBao = thongBao;
    }
}
