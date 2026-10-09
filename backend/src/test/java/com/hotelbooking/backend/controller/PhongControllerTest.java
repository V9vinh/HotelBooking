package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.config.SecurityConfig;
import com.hotelbooking.backend.dto.request.LocPhongRequest;
import com.hotelbooking.backend.dto.response.KiemTraPhongTrongResponse;
import com.hotelbooking.backend.dto.response.LoaiPhongResponse;
import com.hotelbooking.backend.dto.response.PhongResponse;
import com.hotelbooking.backend.entity.LoaiPhong;
import com.hotelbooking.backend.entity.Phong;
import com.hotelbooking.backend.entity.TrangThaiLoaiPhong;
import com.hotelbooking.backend.entity.TrangThaiPhong;
import com.hotelbooking.backend.exception.GlobalExceptionHandler;
import com.hotelbooking.backend.exception.ResourceNotFoundException;
import com.hotelbooking.backend.service.PhongService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PhongController.class)
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class PhongControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PhongService phongService;

    private PhongResponse phongResponse;

    @BeforeEach
    void setUp() {
        LoaiPhong lp = new LoaiPhong();
        lp.setMaLoaiPhong(1);
        lp.setTenLoaiPhong("Standard");
        lp.setGiaCoBan(new BigDecimal("500000"));
        lp.setSucChua(2);
        lp.setTrangThai(TrangThaiLoaiPhong.HoatDong);

        Phong p = new Phong();
        p.setMaPhong(101);
        p.setSoPhong("101");
        p.setTang(1);
        p.setTrangThai(TrangThaiPhong.Trong);
        p.setLoaiPhong(lp);

        phongResponse = new PhongResponse(p);
    }

    @Test
    @DisplayName("GET /api/phong: Lấy danh sách và lọc phòng thành công")
    void testSearchAndFilterPhong() throws Exception {
        when(phongService.locPhong(any(LocPhongRequest.class))).thenReturn(List.of(phongResponse));

        mockMvc.perform(get("/api/phong")
                        .param("keyword", "101")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].soPhong").value("101"));
    }

    @Test
    @DisplayName("GET /api/phong/{id}: Lấy chi tiết phòng thành công")
    void testGetChiTietPhong_Success() throws Exception {
        when(phongService.getChiTietPhong(101)).thenReturn(phongResponse);

        mockMvc.perform(get("/api/phong/101")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.maPhong").value(101))
                .andExpect(jsonPath("$.data.soPhong").value("101"));
    }

    @Test
    @DisplayName("GET /api/phong/{id}: Trả về 404 khi phòng không tồn tại")
    void testGetChiTietPhong_NotFound() throws Exception {
        when(phongService.getChiTietPhong(999)).thenThrow(new ResourceNotFoundException("Không tìm thấy phòng"));

        mockMvc.perform(get("/api/phong/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không tìm thấy phòng"));
    }

    @Test
    @DisplayName("GET /api/phong/trong: Lấy danh sách phòng trống theo ngày thành công")
    void testKiemTraPhongTrong() throws Exception {
        LocalDate checkIn = LocalDate.now().plusDays(1);
        LocalDate checkOut = LocalDate.now().plusDays(3);

        when(phongService.kiemTraPhongTrong(eq(checkIn), eq(checkOut))).thenReturn(List.of(phongResponse));

        mockMvc.perform(get("/api/phong/trong")
                        .param("ngayNhan", checkIn.toString())
                        .param("ngayTra", checkOut.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].soPhong").value("101"));
    }

    @Test
    @DisplayName("GET /api/phong/{id}/kiem-tra-trong: Kiểm tra phòng cụ thể")
    void testKiemTraPhongTrongTheoId() throws Exception {
        LocalDate checkIn = LocalDate.now().plusDays(1);
        LocalDate checkOut = LocalDate.now().plusDays(3);

        KiemTraPhongTrongResponse res = new KiemTraPhongTrongResponse(
                101, "101", checkIn, checkOut, true, "Phòng còn trống"
        );
        when(phongService.kiemTraPhongTrongTheoId(eq(101), eq(checkIn), eq(checkOut))).thenReturn(res);

        mockMvc.perform(get("/api/phong/101/kiem-tra-trong")
                        .param("ngayNhan", checkIn.toString())
                        .param("ngayTra", checkOut.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.conTrong").value(true));
    }

    @Test
    @DisplayName("GET /api/phong/loai-phong: Lấy danh sách loại phòng thành công")
    void testGetAllLoaiPhong() throws Exception {
        LoaiPhongResponse lpRes = new LoaiPhongResponse();
        lpRes.setMaLoaiPhong(1);
        lpRes.setTenLoaiPhong("Standard");
        when(phongService.getAllLoaiPhong()).thenReturn(List.of(lpRes));

        mockMvc.perform(get("/api/phong/loai-phong")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].tenLoaiPhong").value("Standard"));
    }
}
