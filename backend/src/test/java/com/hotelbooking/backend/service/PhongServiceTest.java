package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.request.LocPhongRequest;
import com.hotelbooking.backend.dto.response.KiemTraPhongTrongResponse;
import com.hotelbooking.backend.dto.response.PhongResponse;
import com.hotelbooking.backend.entity.LoaiPhong;
import com.hotelbooking.backend.entity.Phong;
import com.hotelbooking.backend.entity.TrangThaiLoaiPhong;
import com.hotelbooking.backend.entity.TrangThaiPhieuDat;
import com.hotelbooking.backend.entity.TrangThaiPhong;
import com.hotelbooking.backend.exception.BadRequestException;
import com.hotelbooking.backend.exception.ResourceNotFoundException;
import com.hotelbooking.backend.repository.LoaiPhongRepository;
import com.hotelbooking.backend.repository.PhongRepository;
import com.hotelbooking.backend.service.impl.PhongServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PhongServiceTest {

    @Mock
    private PhongRepository phongRepository;

    @Mock
    private LoaiPhongRepository loaiPhongRepository;

    @InjectMocks
    private PhongServiceImpl phongService;

    private LoaiPhong loaiPhongDeluxe;
    private Phong phong101;
    private Phong phong102;

    @BeforeEach
    void setUp() {
        loaiPhongDeluxe = new LoaiPhong();
        loaiPhongDeluxe.setMaLoaiPhong(1);
        loaiPhongDeluxe.setTenLoaiPhong("Deluxe City View");
        loaiPhongDeluxe.setGiaCoBan(new BigDecimal("1200000"));
        loaiPhongDeluxe.setSucChua(2);
        loaiPhongDeluxe.setTienNghi("Wifi, Tivi, Dieu hoa");
        loaiPhongDeluxe.setMoTa("Phong sang trong huong pho");
        loaiPhongDeluxe.setTrangThai(TrangThaiLoaiPhong.HoatDong);

        phong101 = new Phong();
        phong101.setMaPhong(101);
        phong101.setSoPhong("101");
        phong101.setTang(1);
        phong101.setLoaiPhong(loaiPhongDeluxe);
        phong101.setTrangThai(TrangThaiPhong.Trong);

        phong102 = new Phong();
        phong102.setMaPhong(102);
        phong102.setSoPhong("102");
        phong102.setTang(1);
        phong102.setLoaiPhong(loaiPhongDeluxe);
        phong102.setTrangThai(TrangThaiPhong.Trong);
    }

    @Test
    @DisplayName("Xem chi tiết phòng: Thành công khi mã phòng tồn tại")
    void testGetChiTietPhong_Success() {
        when(phongRepository.findByIdWithLoaiPhong(101)).thenReturn(Optional.of(phong101));

        PhongResponse response = phongService.getChiTietPhong(101);

        assertNotNull(response);
        assertEquals(101, response.getMaPhong());
        assertEquals("101", response.getSoPhong());
        assertEquals("Deluxe City View", response.getLoaiPhong().getTenLoaiPhong());
        verify(phongRepository, times(1)).findByIdWithLoaiPhong(101);
    }

    @Test
    @DisplayName("Xem chi tiết phòng: Ném ResourceNotFoundException khi mã phòng không tồn tại")
    void testGetChiTietPhong_NotFound() {
        when(phongRepository.findByIdWithLoaiPhong(999)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> phongService.getChiTietPhong(999));
        verify(phongRepository, times(1)).findByIdWithLoaiPhong(999);
    }

    @Test
    @DisplayName("Xem chi tiết phòng: Ném BadRequestException khi mã phòng null")
    void testGetChiTietPhong_NullId() {
        assertThrows(BadRequestException.class, () -> phongService.getChiTietPhong(null));
        verify(phongRepository, never()).findByIdWithLoaiPhong(any());
    }

    @Test
    @DisplayName("Kiểm tra phòng trống: Ngày hợp lệ và không có phòng bận")
    void testKiemTraPhongTrong_ValidDate_NoBusyRooms() {
        LocalDate checkIn = LocalDate.now().plusDays(2);
        LocalDate checkOut = LocalDate.now().plusDays(4);

        when(phongRepository.findBusyRoomIds(checkIn, checkOut, TrangThaiPhieuDat.DaHuy))
                .thenReturn(Collections.emptyList());
        when(phongRepository.findAllAvailableRooms(TrangThaiLoaiPhong.HoatDong, TrangThaiPhong.BaoTri))
                .thenReturn(List.of(phong101, phong102));

        List<PhongResponse> result = phongService.kiemTraPhongTrong(checkIn, checkOut);

        assertEquals(2, result.size());
        assertEquals("101", result.get(0).getSoPhong());
        assertEquals("102", result.get(1).getSoPhong());
    }

    @Test
    @DisplayName("Kiểm tra phòng trống: Có phòng bị trùng lịch đặt chưa hủy")
    void testKiemTraPhongTrong_ValidDate_WithBusyRooms() {
        LocalDate checkIn = LocalDate.now().plusDays(2);
        LocalDate checkOut = LocalDate.now().plusDays(4);

        when(phongRepository.findBusyRoomIds(checkIn, checkOut, TrangThaiPhieuDat.DaHuy))
                .thenReturn(List.of(101));
        when(phongRepository.findAvailableRoomsNotIn(List.of(101), TrangThaiLoaiPhong.HoatDong, TrangThaiPhong.BaoTri))
                .thenReturn(List.of(phong102));

        List<PhongResponse> result = phongService.kiemTraPhongTrong(checkIn, checkOut);

        assertEquals(1, result.size());
        assertEquals("102", result.get(0).getSoPhong());
    }

    @Test
    @DisplayName("Kiểm tra phòng trống: Ném BadRequestException khi ngày null")
    void testKiemTraPhongTrong_NullDates() {
        assertThrows(BadRequestException.class, () -> phongService.kiemTraPhongTrong(null, LocalDate.now().plusDays(1)));
        assertThrows(BadRequestException.class, () -> phongService.kiemTraPhongTrong(LocalDate.now(), null));
    }

    @Test
    @DisplayName("Kiểm tra phòng trống: Ném BadRequestException khi ngày nhận ở quá khứ")
    void testKiemTraPhongTrong_PastCheckInDate() {
        LocalDate pastCheckIn = LocalDate.now().minusDays(1);
        LocalDate checkOut = LocalDate.now().plusDays(1);

        assertThrows(BadRequestException.class, () -> phongService.kiemTraPhongTrong(pastCheckIn, checkOut));
    }

    @Test
    @DisplayName("Kiểm tra phòng trống: Ném BadRequestException khi ngày trả <= ngày nhận")
    void testKiemTraPhongTrong_CheckOutBeforeCheckIn() {
        LocalDate checkIn = LocalDate.now().plusDays(3);
        LocalDate checkOut = LocalDate.now().plusDays(2);

        assertThrows(BadRequestException.class, () -> phongService.kiemTraPhongTrong(checkIn, checkOut));
        assertThrows(BadRequestException.class, () -> phongService.kiemTraPhongTrong(checkIn, checkIn));
    }

    @Test
    @DisplayName("Kiểm tra một phòng cụ thể: Còn trống")
    void testKiemTraPhongTrongTheoId_Available() {
        LocalDate checkIn = LocalDate.now().plusDays(1);
        LocalDate checkOut = LocalDate.now().plusDays(3);

        when(phongRepository.findByIdWithLoaiPhong(101)).thenReturn(Optional.of(phong101));
        when(phongRepository.findBusyRoomIds(checkIn, checkOut, TrangThaiPhieuDat.DaHuy))
                .thenReturn(Collections.emptyList());

        KiemTraPhongTrongResponse response = phongService.kiemTraPhongTrongTheoId(101, checkIn, checkOut);

        assertTrue(response.isConTrong());
        assertEquals(101, response.getMaPhong());
    }

    @Test
    @DisplayName("Kiểm tra một phòng cụ thể: Đang bảo trì")
    void testKiemTraPhongTrongTheoId_BaoTri() {
        LocalDate checkIn = LocalDate.now().plusDays(1);
        LocalDate checkOut = LocalDate.now().plusDays(3);

        phong101.setTrangThai(TrangThaiPhong.BaoTri);
        when(phongRepository.findByIdWithLoaiPhong(101)).thenReturn(Optional.of(phong101));

        KiemTraPhongTrongResponse response = phongService.kiemTraPhongTrongTheoId(101, checkIn, checkOut);

        assertFalse(response.isConTrong());
        assertTrue(response.getThongBao().contains("bảo trì"));
    }

    @Test
    @DisplayName("Kiểm tra một phòng cụ thể: Bị trùng lịch đặt phòng")
    void testKiemTraPhongTrongTheoId_Busy() {
        LocalDate checkIn = LocalDate.now().plusDays(1);
        LocalDate checkOut = LocalDate.now().plusDays(3);

        when(phongRepository.findByIdWithLoaiPhong(101)).thenReturn(Optional.of(phong101));
        when(phongRepository.findBusyRoomIds(checkIn, checkOut, TrangThaiPhieuDat.DaHuy))
                .thenReturn(List.of(101));

        KiemTraPhongTrongResponse response = phongService.kiemTraPhongTrongTheoId(101, checkIn, checkOut);

        assertFalse(response.isConTrong());
        assertTrue(response.getThongBao().contains("đã có khách đặt"));
    }

    @Test
    @DisplayName("Lọc phòng: Có kết quả phù hợp")
    void testLocPhong_WithResults() {
        LocPhongRequest request = new LocPhongRequest();
        request.setKeyword("Deluxe");
        request.setSucChua(2);

        when(phongRepository.filterRooms("Deluxe", null, 2, null, null, null, null, TrangThaiLoaiPhong.HoatDong))
                .thenReturn(List.of(phong101, phong102));

        List<PhongResponse> results = phongService.locPhong(request);

        assertEquals(2, results.size());
    }

    @Test
    @DisplayName("Lọc phòng: Không có kết quả nào phù hợp")
    void testLocPhong_NoResults() {
        LocPhongRequest request = new LocPhongRequest();
        request.setKeyword("Penthouse");

        when(phongRepository.filterRooms("Penthouse", null, null, null, null, null, null, TrangThaiLoaiPhong.HoatDong))
                .thenReturn(Collections.emptyList());

        List<PhongResponse> results = phongService.locPhong(request);

        assertTrue(results.isEmpty());
    }

    @Test
    @DisplayName("Lọc phòng: Kết hợp kiểm tra ngày nhận/trả phòng")
    void testLocPhong_WithDateFilter() {
        LocalDate checkIn = LocalDate.now().plusDays(1);
        LocalDate checkOut = LocalDate.now().plusDays(3);

        LocPhongRequest request = new LocPhongRequest();
        request.setNgayNhan(checkIn);
        request.setNgayTra(checkOut);

        when(phongRepository.filterRooms(null, null, null, null, null, null, null, TrangThaiLoaiPhong.HoatDong))
                .thenReturn(List.of(phong101, phong102));
        when(phongRepository.findBusyRoomIds(checkIn, checkOut, TrangThaiPhieuDat.DaHuy))
                .thenReturn(List.of(101));

        List<PhongResponse> results = phongService.locPhong(request);

        assertEquals(1, results.size());
        assertEquals("102", results.get(0).getSoPhong());
    }
}
