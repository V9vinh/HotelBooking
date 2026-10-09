package com.hotelbooking.backend.dto.response;

import com.hotelbooking.backend.entity.LoaiPhong;
import com.hotelbooking.backend.entity.TrangThaiLoaiPhong;

import java.math.BigDecimal;

public class LoaiPhongResponse {

    private Integer maLoaiPhong;
    private String tenLoaiPhong;
    private BigDecimal giaCoBan;
    private Integer sucChua;
    private String tienNghi;
    private String moTa;
    private TrangThaiLoaiPhong trangThai;

    public LoaiPhongResponse() {
    }

    public LoaiPhongResponse(LoaiPhong loaiPhong) {
        if (loaiPhong != null) {
            this.maLoaiPhong = loaiPhong.getMaLoaiPhong();
            this.tenLoaiPhong = loaiPhong.getTenLoaiPhong();
            this.giaCoBan = loaiPhong.getGiaCoBan();
            this.sucChua = loaiPhong.getSucChua();
            this.tienNghi = loaiPhong.getTienNghi();
            this.moTa = loaiPhong.getMoTa();
            this.trangThai = loaiPhong.getTrangThai();
        }
    }

    public Integer getMaLoaiPhong() {
        return maLoaiPhong;
    }

    public void setMaLoaiPhong(Integer maLoaiPhong) {
        this.maLoaiPhong = maLoaiPhong;
    }

    public String getTenLoaiPhong() {
        return tenLoaiPhong;
    }

    public void setTenLoaiPhong(String tenLoaiPhong) {
        this.tenLoaiPhong = tenLoaiPhong;
    }

    public BigDecimal getGiaCoBan() {
        return giaCoBan;
    }

    public void setGiaCoBan(BigDecimal giaCoBan) {
        this.giaCoBan = giaCoBan;
    }

    public Integer getSucChua() {
        return sucChua;
    }

    public void setSucChua(Integer sucChua) {
        this.sucChua = sucChua;
    }

    public String getTienNghi() {
        return tienNghi;
    }

    public void setTienNghi(String tienNghi) {
        this.tienNghi = tienNghi;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public TrangThaiLoaiPhong getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiLoaiPhong trangThai) {
        this.trangThai = trangThai;
    }
}
