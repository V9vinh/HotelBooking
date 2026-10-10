package com.hotelbooking.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class BookingHistoryDTO {
    private Integer maPhieu;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime ngayDat;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayNhan;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayTra;

    private Integer soNguoi;
    private BigDecimal tongTien;
    private String trangThai;
    private List<RoomInfoDTO> rooms;
    private boolean isReviewed;

    public static class RoomInfoDTO {
        private String soPhong;
        private String tenLoaiPhong;

        public RoomInfoDTO(String soPhong, String tenLoaiPhong) {
            this.soPhong = soPhong;
            this.tenLoaiPhong = tenLoaiPhong;
        }

        public String getSoPhong() { return soPhong; }
        public void setSoPhong(String soPhong) { this.soPhong = soPhong; }
        public String getTenLoaiPhong() { return tenLoaiPhong; }
        public void setTenLoaiPhong(String tenLoaiPhong) { this.tenLoaiPhong = tenLoaiPhong; }
    }

    public BookingHistoryDTO() {}

    public BookingHistoryDTO(Integer maPhieu, LocalDateTime ngayDat, LocalDate ngayNhan,
                             LocalDate ngayTra, Integer soNguoi, BigDecimal tongTien,
                             String trangThai, List<RoomInfoDTO> rooms, boolean isReviewed) {
        this.maPhieu = maPhieu;
        this.ngayDat = ngayDat;
        this.ngayNhan = ngayNhan;
        this.ngayTra = ngayTra;
        this.soNguoi = soNguoi;
        this.tongTien = tongTien;
        this.trangThai = trangThai;
        this.rooms = rooms;
        this.isReviewed = isReviewed;
    }

    public Integer getMaPhieu() { return maPhieu; }
    public void setMaPhieu(Integer maPhieu) { this.maPhieu = maPhieu; }
    public LocalDateTime getNgayDat() { return ngayDat; }
    public void setNgayDat(LocalDateTime ngayDat) { this.ngayDat = ngayDat; }
    public LocalDate getNgayNhan() { return ngayNhan; }
    public void setNgayNhan(LocalDate ngayNhan) { this.ngayNhan = ngayNhan; }
    public LocalDate getNgayTra() { return ngayTra; }
    public void setNgayTra(LocalDate ngayTra) { this.ngayTra = ngayTra; }
    public Integer getSoNguoi() { return soNguoi; }
    public void setSoNguoi(Integer soNguoi) { this.soNguoi = soNguoi; }
    public BigDecimal getTongTien() { return tongTien; }
    public void setTongTien(BigDecimal tongTien) { this.tongTien = tongTien; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public List<RoomInfoDTO> getRooms() { return rooms; }
    public void setRooms(List<RoomInfoDTO> rooms) { this.rooms = rooms; }
    public boolean isReviewed() { return isReviewed; }
    public void setReviewed(boolean reviewed) { isReviewed = reviewed; }
}
