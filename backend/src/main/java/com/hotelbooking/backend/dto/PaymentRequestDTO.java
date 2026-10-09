package com.hotelbooking.backend.dto;

import java.math.BigDecimal;

public class PaymentRequestDTO {
    private String phuongThuc;
    private BigDecimal soTien;

    public String getPhuongThuc() {
        return phuongThuc;
    }

    public void setPhuongThuc(String phuongThuc) {
        this.phuongThuc = phuongThuc;
    }

    public BigDecimal getSoTien() {
        return soTien;
    }

    public void setSoTien(BigDecimal soTien) {
        this.soTien = soTien;
    }
}
