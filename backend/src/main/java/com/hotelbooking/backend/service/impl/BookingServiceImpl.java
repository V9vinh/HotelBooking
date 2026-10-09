package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.BookingRequest;
import com.hotelbooking.backend.dto.BookingResponse;
import com.hotelbooking.backend.entity.*;
import com.hotelbooking.backend.repository.*;
import com.hotelbooking.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.time.LocalDateTime;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private PhieuDatPhongRepository phieuDatPhongRepository;

    @Autowired
    private ChiTietDatPhongRepository chiTietDatPhongRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private PhongRepository phongRepository;

    @Override
    @Transactional
    public BookingResponse bookRoom(BookingRequest request) {
        if (request.getNgayNhan() == null || request.getNgayTra() == null || !request.getNgayTra().isAfter(request.getNgayNhan())) {
            return new BookingResponse(false, "Ngày trả phòng phải sau ngày nhận phòng.");
        }

        KhachHang khachHang = khachHangRepository.findById(request.getMaKhachHang())
                .orElse(null);
        if (khachHang == null) {
            return new BookingResponse(false, "Không tìm thấy khách hàng.");
        }

        long soDem = ChronoUnit.DAYS.between(request.getNgayNhan(), request.getNgayTra());

        PhieuDatPhong phieu = new PhieuDatPhong();
        phieu.setKhachHang(khachHang);
        phieu.setNgayNhan(request.getNgayNhan());
        phieu.setNgayTra(request.getNgayTra());
        phieu.setSoNguoi(request.getSoNguoi());
        phieu.setNguonDat(NguonDatPhong.Online);
        phieu.setTrangThai(TrangThaiPhieuDat.ChoXacNhan);
        phieu.setGhiChu(request.getGhiChu());

        phieuDatPhongRepository.save(phieu);

        BigDecimal tongTien = BigDecimal.ZERO;

        if (request.getDanhSachMaPhong() != null && !request.getDanhSachMaPhong().isEmpty()) {
            for (Integer maPhong : request.getDanhSachMaPhong()) {
                Phong phong = phongRepository.findById(maPhong).orElse(null);
                if (phong != null) {
                    ChiTietDatPhong chiTiet = new ChiTietDatPhong();
                    chiTiet.setPhieuDatPhong(phieu);
                    chiTiet.setPhong(phong);
                    chiTiet.setDonGia(phong.getLoaiPhong().getGiaCoBan());
                    chiTiet.setSoDem((int) soDem);
                    
                    BigDecimal thanhTien = phong.getLoaiPhong().getGiaCoBan().multiply(new BigDecimal(soDem));
                    chiTiet.setThanhTien(thanhTien);
                    
                    tongTien = tongTien.add(thanhTien);
                    chiTietDatPhongRepository.save(chiTiet);
                }
            }
        } else if (request.getMaLoaiPhong() != null) {
            java.util.List<Phong> availableRooms = phongRepository.findAvailableRooms(request.getMaLoaiPhong(), request.getNgayNhan(), request.getNgayTra());
            int numRequested = request.getSoLuongPhong() != null ? request.getSoLuongPhong() : 1;
            
            if (availableRooms.size() < numRequested) {
                return new BookingResponse(false, "Không đủ phòng trống cho loại phòng này trong thời gian đã chọn.");
            }
            
            for (int i = 0; i < numRequested; i++) {
                Phong phong = availableRooms.get(i);
                ChiTietDatPhong chiTiet = new ChiTietDatPhong();
                chiTiet.setPhieuDatPhong(phieu);
                chiTiet.setPhong(phong);
                chiTiet.setDonGia(phong.getLoaiPhong().getGiaCoBan());
                chiTiet.setSoDem((int) soDem);
                
                BigDecimal thanhTien = phong.getLoaiPhong().getGiaCoBan().multiply(new BigDecimal(soDem));
                chiTiet.setThanhTien(thanhTien);
                
                tongTien = tongTien.add(thanhTien);
                chiTietDatPhongRepository.save(chiTiet);
            }
        } else {
            return new BookingResponse(false, "Vui lòng chọn phòng hoặc loại phòng.");
        }

        phieu.setTongTien(tongTien);
        phieuDatPhongRepository.save(phieu);

        return new BookingResponse(true, "Đặt phòng thành công", phieu.getMaPhieu(), LocalDateTime.now(), tongTien.doubleValue());
    }

    @Override
    public java.util.List<com.hotelbooking.backend.dto.BookingHistoryDTO> getBookingHistory(Integer maKhachHang) {
        java.util.List<PhieuDatPhong> phieus = phieuDatPhongRepository.findByKhachHang_MaKHOrderByNgayDatDesc(maKhachHang);
        java.util.List<com.hotelbooking.backend.dto.BookingHistoryDTO> result = new java.util.ArrayList<>();

        for (PhieuDatPhong p : phieus) {
            java.util.List<ChiTietDatPhong> chiTiets = chiTietDatPhongRepository.findByPhieuDatPhong_MaPhieu(p.getMaPhieu());
            java.util.List<com.hotelbooking.backend.dto.BookingHistoryDTO.RoomInfoDTO> roomInfos = new java.util.ArrayList<>();
            for (ChiTietDatPhong c : chiTiets) {
                if (c.getPhong() != null) {
                    roomInfos.add(new com.hotelbooking.backend.dto.BookingHistoryDTO.RoomInfoDTO(
                            c.getPhong().getSoPhong(),
                            c.getPhong().getLoaiPhong() != null ? c.getPhong().getLoaiPhong().getTenLoaiPhong() : "N/A"
                    ));
                }
            }

            result.add(new com.hotelbooking.backend.dto.BookingHistoryDTO(
                    p.getMaPhieu(),
                    p.getNgayDat(),
                    p.getNgayNhan(),
                    p.getNgayTra(),
                    p.getSoNguoi(),
                    p.getTongTien(),
                    p.getTrangThai().name(),
                    roomInfos
            ));
        }

        return result;
    }
}
