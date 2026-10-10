package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.BookingRequest;
import com.hotelbooking.backend.dto.BookingResponse;
import com.hotelbooking.backend.entity.*;
import com.hotelbooking.backend.repository.*;
import com.hotelbooking.backend.service.BookingService;
import com.hotelbooking.backend.dto.PaymentRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.LocalDateTime;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.hotelbooking.backend.security.CustomUserDetails;
import java.util.List;

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

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private ThanhToanRepository thanhToanRepository;

    @Autowired
    private DanhGiaRepository danhGiaRepository;

    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    @Override
    @Transactional
    public BookingResponse bookRoom(BookingRequest request) {
        // P0: validate dates strictly
        if (request.getNgayNhan() == null || request.getNgayTra() == null) {
            return new BookingResponse(false, "Vui lòng chọn ngày nhận và ngày trả phòng.");
        }
        if (!request.getNgayTra().isAfter(request.getNgayNhan())) {
            return new BookingResponse(false, "Ngày trả phòng phải sau ngày nhận phòng.");
        }

        // P1: validate minimum stay
        long soDem = ChronoUnit.DAYS.between(request.getNgayNhan(), request.getNgayTra());
        if (soDem <= 0) {
            return new BookingResponse(false, "Số đêm phải lớn hơn 0.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            return new BookingResponse(false, "Chưa xác thực.");
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        KhachHang khachHang = khachHangRepository.findByTaiKhoan(userDetails.getTaiKhoan());

        if (khachHang == null) {
            return new BookingResponse(false, "Không tìm thấy khách hàng.");
        }

        PhieuDatPhong phieu = new PhieuDatPhong();
        phieu.setKhachHang(khachHang);
        phieu.setNgayNhan(request.getNgayNhan());
        phieu.setNgayTra(request.getNgayTra());
        phieu.setSoNguoi(request.getSoNguoi());
        phieu.setNguonDat(NguonDatPhong.Online);
        phieu.setTrangThai(TrangThaiPhieuDat.ChoXacNhan);
        phieu.setGhiChu(request.getGhiChu());

        // P2: apply promo code if provided
        KhuyenMai khuyenMai = null;
        if (request.getMaCodeKhuyenMai() != null && !request.getMaCodeKhuyenMai().isBlank()) {
            khuyenMai = khuyenMaiRepository.findAll().stream()
                .filter(k -> k.getMaCode().equalsIgnoreCase(request.getMaCodeKhuyenMai()))
                .filter(k -> k.getTrangThai() == TrangThaiKhuyenMai.HoatDong)
                .filter(k -> !LocalDate.now().isAfter(k.getNgayKetThuc()))
                .filter(k -> !LocalDate.now().isBefore(k.getNgayBatDau()))
                .filter(k -> k.getDaSuDung() < k.getSoLuong())
                .findFirst()
                .orElse(null);
            if (khuyenMai == null) {
                return new BookingResponse(false, "Mã khuyến mãi không hợp lệ hoặc đã hết hạn.");
            }
            phieu.setKhuyenMai(khuyenMai);
        }

        phieuDatPhongRepository.save(phieu);

        BigDecimal tongTienGoc = BigDecimal.ZERO;

        if (request.getDanhSachMaPhong() != null && !request.getDanhSachMaPhong().isEmpty()) {
            for (Integer maPhong : request.getDanhSachMaPhong()) {
                Phong phong = phongRepository.findById(maPhong).orElse(null);
                if (phong != null) {
                    List<Phong> availableForThisType = phongRepository.findAvailableRooms(
                            phong.getLoaiPhong().getMaLoaiPhong(), request.getNgayNhan(), request.getNgayTra(),
                            java.util.Arrays.asList(TrangThaiPhieuDat.DaHuy, TrangThaiPhieuDat.DaCheckOut));

                    boolean isAvailable = availableForThisType.stream().anyMatch(p -> p.getMaPhong().equals(maPhong));
                    if (!isAvailable) {
                        return new BookingResponse(false, "Phòng " + phong.getSoPhong() + " đã được đặt trong thời gian này.");
                    }

                    ChiTietDatPhong chiTiet = new ChiTietDatPhong();
                    chiTiet.setPhieuDatPhong(phieu);
                    chiTiet.setPhong(phong);
                    chiTiet.setDonGia(phong.getLoaiPhong().getGiaCoBan());
                    chiTiet.setSoDem((int) soDem);

                    BigDecimal thanhTien = phong.getLoaiPhong().getGiaCoBan().multiply(new BigDecimal(soDem));
                    chiTiet.setThanhTien(thanhTien);

                    tongTienGoc = tongTienGoc.add(thanhTien);
                    chiTietDatPhongRepository.save(chiTiet);
                }
            }
        } else if (request.getMaLoaiPhong() != null) {
            List<Phong> availableRooms = phongRepository.findAvailableRooms(
                    request.getMaLoaiPhong(), request.getNgayNhan(), request.getNgayTra(),
                    java.util.Arrays.asList(TrangThaiPhieuDat.DaHuy, TrangThaiPhieuDat.DaCheckOut));
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

                tongTienGoc = tongTienGoc.add(thanhTien);
                chiTietDatPhongRepository.save(chiTiet);
            }
        } else {
            return new BookingResponse(false, "Vui lòng chọn phòng hoặc loại phòng.");
        }

        // P2: compute final total after discount
        BigDecimal tongTienSauGiam = tongTienGoc;
        if (khuyenMai != null) {
            BigDecimal giamGia = BigDecimal.ZERO;
            if (khuyenMai.getPhanTramGiam() != null && khuyenMai.getPhanTramGiam() > 0) {
                giamGia = tongTienGoc.multiply(new BigDecimal(khuyenMai.getPhanTramGiam())).divide(new BigDecimal(100));
            } else if (khuyenMai.getSoTienGiam() != null && khuyenMai.getSoTienGiam().compareTo(BigDecimal.ZERO) > 0) {
                giamGia = khuyenMai.getSoTienGiam();
            }
            tongTienSauGiam = tongTienGoc.subtract(giamGia).max(BigDecimal.ZERO);
            // Increment usage count
            khuyenMai.setDaSuDung(khuyenMai.getDaSuDung() + 1);
            khuyenMaiRepository.save(khuyenMai);
        }

        phieu.setTongTien(tongTienSauGiam);
        phieuDatPhongRepository.save(phieu);

        return new BookingResponse(true, "Đặt phòng thành công", phieu.getMaPhieu(), LocalDateTime.now(), tongTienSauGiam.doubleValue());
    }

    @Override
    public List<com.hotelbooking.backend.dto.BookingHistoryDTO> getBookingHistory(Integer maKhachHang) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            return new java.util.ArrayList<>();
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        KhachHang authUser = khachHangRepository.findByTaiKhoan(userDetails.getTaiKhoan());

        if (authUser == null || (!authUser.getMaKH().equals(maKhachHang) && !userDetails.getTaiKhoan().getVaiTro().name().equals("Admin"))) {
            return new java.util.ArrayList<>(); // IDOR protection
        }

        List<PhieuDatPhong> phieus = phieuDatPhongRepository.findByKhachHang_MaKHOrderByNgayDatDesc(maKhachHang);
        List<com.hotelbooking.backend.dto.BookingHistoryDTO> result = new java.util.ArrayList<>();

        for (PhieuDatPhong p : phieus) {
            List<ChiTietDatPhong> chiTiets = chiTietDatPhongRepository.findByPhieuDatPhong_MaPhieu(p.getMaPhieu());
            List<com.hotelbooking.backend.dto.BookingHistoryDTO.RoomInfoDTO> roomInfos = new java.util.ArrayList<>();
            for (ChiTietDatPhong c : chiTiets) {
                if (c.getPhong() != null) {
                    roomInfos.add(new com.hotelbooking.backend.dto.BookingHistoryDTO.RoomInfoDTO(
                            c.getPhong().getSoPhong(),
                            c.getPhong().getLoaiPhong() != null ? c.getPhong().getLoaiPhong().getTenLoaiPhong() : "N/A"
                    ));
                }
            }

            boolean isReviewed = danhGiaRepository.existsByPhieuDatPhong_MaPhieu(p.getMaPhieu());

            result.add(new com.hotelbooking.backend.dto.BookingHistoryDTO(
                    p.getMaPhieu(),
                    p.getNgayDat(),
                    p.getNgayNhan(),
                    p.getNgayTra(),
                    p.getSoNguoi(),
                    p.getTongTien(),
                    p.getTrangThai().name(),
                    roomInfos,
                    isReviewed
            ));
        }

        return result;
    }

    @Override
    @Transactional
    public BookingResponse payBooking(Integer maPhieu, PaymentRequestDTO paymentRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            return new BookingResponse(false, "Chưa xác thực.");
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        KhachHang authUser = khachHangRepository.findByTaiKhoan(userDetails.getTaiKhoan());

        PhieuDatPhong phieu = phieuDatPhongRepository.findById(maPhieu).orElse(null);
        if (phieu == null) {
            return new BookingResponse(false, "Không tìm thấy phiếu đặt phòng.");
        }

        if (authUser == null || (!phieu.getKhachHang().getMaKH().equals(authUser.getMaKH()) && !userDetails.getTaiKhoan().getVaiTro().name().equals("Admin"))) {
            return new BookingResponse(false, "Không có quyền thanh toán phiếu này.");
        }

        HoaDon hoaDon = hoaDonRepository.findByPhieuDatPhong_MaPhieu(maPhieu).orElse(null);
        if (hoaDon == null) {
            hoaDon = new HoaDon();
            hoaDon.setPhieuDatPhong(phieu);
            hoaDon.setTongTien(phieu.getTongTien());
            hoaDon.setConLai(phieu.getTongTien());
            hoaDon = hoaDonRepository.save(hoaDon);
        }

        ThanhToan thanhToan = new ThanhToan();
        thanhToan.setHoaDon(hoaDon);
        thanhToan.setPhuongThuc(PhuongThucThanhToan.valueOf(paymentRequest.getPhuongThuc()));
        thanhToan.setSoTien(paymentRequest.getSoTien());
        thanhToan.setTrangThai(TrangThaiThanhToan.ThanhCong);
        thanhToanRepository.save(thanhToan);

        hoaDon.setDaThanhToan(hoaDon.getDaThanhToan().add(paymentRequest.getSoTien()));
        hoaDon.setConLai(hoaDon.getTongTien().subtract(hoaDon.getDaThanhToan()));
        if (hoaDon.getConLai().compareTo(BigDecimal.ZERO) <= 0) {
            hoaDon.setTrangThai(TrangThaiHoaDon.DaThanhToan);
        }
        hoaDonRepository.save(hoaDon);

        phieu.setTrangThai(TrangThaiPhieuDat.DaXacNhan);
        phieuDatPhongRepository.save(phieu);

        return new BookingResponse(true, "Thanh toán thành công", maPhieu, LocalDateTime.now(), paymentRequest.getSoTien().doubleValue());
    }

    @Override
    @Transactional
    public BookingResponse createReview(com.hotelbooking.backend.dto.ReviewRequestDTO request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            return new BookingResponse(false, "Chưa xác thực.");
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        KhachHang authUser = khachHangRepository.findByTaiKhoan(userDetails.getTaiKhoan());

        PhieuDatPhong phieu = phieuDatPhongRepository.findById(request.getMaPhieu()).orElse(null);
        if (phieu == null) {
            return new BookingResponse(false, "Không tìm thấy phiếu đặt phòng.");
        }

        if (authUser == null || (!phieu.getKhachHang().getMaKH().equals(authUser.getMaKH()))) {
            return new BookingResponse(false, "Không có quyền đánh giá phiếu này.");
        }

        if (phieu.getTrangThai() != TrangThaiPhieuDat.DaCheckOut) {
            return new BookingResponse(false, "Chỉ có thể đánh giá sau khi đã trả phòng.");
        }

        if (danhGiaRepository.existsByPhieuDatPhong_MaPhieu(request.getMaPhieu())) {
            return new BookingResponse(false, "Phiếu đặt phòng này đã được đánh giá.");
        }

        DanhGia danhGia = new DanhGia();
        danhGia.setKhachHang(phieu.getKhachHang());
        danhGia.setPhieuDatPhong(phieu);
        danhGia.setDiemSo(request.getDiemSo());
        danhGia.setNoiDung(request.getNoiDung());
        danhGia.setTrangThai(TrangThaiDanhGia.HienThi);

        danhGiaRepository.save(danhGia);

        return new BookingResponse(true, "Đánh giá thành công.");
    }

    @Override
    public List<com.hotelbooking.backend.dto.AdminBookingDTO> getAllBookings() {
        List<PhieuDatPhong> phieus = phieuDatPhongRepository.findAll(
                org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "ngayDat"));
        List<com.hotelbooking.backend.dto.AdminBookingDTO> result = new java.util.ArrayList<>();
        for (PhieuDatPhong p : phieus) {
            result.add(new com.hotelbooking.backend.dto.AdminBookingDTO(
                p.getMaPhieu(),
                p.getKhachHang() != null ? p.getKhachHang().getHoTen() : "Khách Lẻ",
                p.getKhachHang() != null ? p.getKhachHang().getSdt() : "",
                p.getNgayDat(),
                p.getNgayNhan(),
                p.getNgayTra(),
                p.getSoNguoi(),
                p.getTongTien(),
                p.getTrangThai().name()
            ));
        }
        return result;
    }

    @Override
    @Transactional
    public BookingResponse updateBookingStatus(Integer maPhieu, String newStatus) {
        PhieuDatPhong phieu = phieuDatPhongRepository.findById(maPhieu).orElse(null);
        if (phieu == null) {
            return new BookingResponse(false, "Không tìm thấy phiếu đặt phòng.");
        }
        try {
            TrangThaiPhieuDat oldStatus = phieu.getTrangThai();
            TrangThaiPhieuDat status = TrangThaiPhieuDat.valueOf(newStatus);
            phieu.setTrangThai(status);
            phieuDatPhongRepository.save(phieu);

            // P0: sync PHONG table status based on booking transitions
            List<ChiTietDatPhong> chiTiets = chiTietDatPhongRepository.findByPhieuDatPhong_MaPhieu(maPhieu);
            for (ChiTietDatPhong ct : chiTiets) {
                Phong phong = ct.getPhong();
                if (phong == null) continue;

                if (status == TrangThaiPhieuDat.DaCheckIn) {
                    // Room is now occupied
                    phong.setTrangThai(TrangThaiPhong.CoKhach);
                    phongRepository.save(phong);
                } else if (status == TrangThaiPhieuDat.DaCheckOut) {
                    // Room is being cleaned
                    phong.setTrangThai(TrangThaiPhong.DangDon);
                    phongRepository.save(phong);
                } else if (status == TrangThaiPhieuDat.DaHuy) {
                    // If room was previously occupied, free it
                    if (phong.getTrangThai() == TrangThaiPhong.CoKhach) {
                        phong.setTrangThai(TrangThaiPhong.Trong);
                        phongRepository.save(phong);
                    }
                }
                // ChoXacNhan / DaXacNhan: don't change physical room status yet
            }

            return new BookingResponse(true, "Cập nhật trạng thái thành công.");
        } catch (IllegalArgumentException e) {
            return new BookingResponse(false, "Trạng thái không hợp lệ.");
        }
    }
}
