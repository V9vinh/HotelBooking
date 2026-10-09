package com.hotelbooking.backend.dto;

import java.time.LocalDateTime;

public class BookingResponse {
    private boolean success;
    private String message;
    private Integer maPhieu;
    private LocalDateTime ngayDat;
    private Double tongTien;

    public BookingResponse() {}

    public BookingResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public BookingResponse(boolean success, String message, Integer maPhieu, LocalDateTime ngayDat, Double tongTien) {
        this.success = success;
        this.message = message;
        this.maPhieu = maPhieu;
        this.ngayDat = ngayDat;
        this.tongTien = tongTien;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getMaPhieu() {
        return maPhieu;
    }

    public void setMaPhieu(Integer maPhieu) {
        this.maPhieu = maPhieu;
    }

    public LocalDateTime getNgayDat() {
        return ngayDat;
    }

    public void setNgayDat(LocalDateTime ngayDat) {
        this.ngayDat = ngayDat;
    }

    public Double getTongTien() {
        return tongTien;
    }

    public void setTongTien(Double tongTien) {
        this.tongTien = tongTien;
    }
}
