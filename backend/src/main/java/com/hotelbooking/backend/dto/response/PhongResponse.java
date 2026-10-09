package com.hotelbooking.backend.dto.response;

import com.hotelbooking.backend.entity.Phong;
import com.hotelbooking.backend.entity.TrangThaiPhong;

public class PhongResponse {

    private Integer maPhong;
    private String soPhong;
    private Integer tang;
    private TrangThaiPhong trangThai;
    private String ghiChu;
    private LoaiPhongResponse loaiPhong;

    public PhongResponse() {
    }

    public PhongResponse(Phong phong) {
        if (phong != null) {
            this.maPhong = phong.getMaPhong();
            this.soPhong = phong.getSoPhong();
            this.tang = phong.getTang();
            this.trangThai = phong.getTrangThai();
            this.ghiChu = phong.getGhiChu();
            if (phong.getLoaiPhong() != null) {
                this.loaiPhong = new LoaiPhongResponse(phong.getLoaiPhong());
            }
        }
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

    public Integer getTang() {
        return tang;
    }

    public void setTang(Integer tang) {
        this.tang = tang;
    }

    public TrangThaiPhong getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiPhong trangThai) {
        this.trangThai = trangThai;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public LoaiPhongResponse getLoaiPhong() {
        return loaiPhong;
    }

    public void setLoaiPhong(LoaiPhongResponse loaiPhong) {
        this.loaiPhong = loaiPhong;
    }
}
