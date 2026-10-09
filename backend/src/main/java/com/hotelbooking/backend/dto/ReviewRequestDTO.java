package com.hotelbooking.backend.dto;

public class ReviewRequestDTO {
    private Integer maPhieu;
    private Integer diemSo;
    private String noiDung;

    public Integer getMaPhieu() {
        return maPhieu;
    }

    public void setMaPhieu(Integer maPhieu) {
        this.maPhieu = maPhieu;
    }

    public Integer getDiemSo() {
        return diemSo;
    }

    public void setDiemSo(Integer diemSo) {
        this.diemSo = diemSo;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }
}
