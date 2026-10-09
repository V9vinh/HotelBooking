package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.dto.request.LocPhongRequest;
import com.hotelbooking.backend.dto.response.ApiResponse;
import com.hotelbooking.backend.dto.response.KiemTraPhongTrongResponse;
import com.hotelbooking.backend.dto.response.LoaiPhongResponse;
import com.hotelbooking.backend.dto.response.PhongResponse;
import com.hotelbooking.backend.service.PhongService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/phong")
public class PhongController {

    private final PhongService phongService;

    public PhongController(PhongService phongService) {
        this.phongService = phongService;
    }

    /**
     * Chức năng 1 & 4: Tìm kiếm và lọc danh sách phòng
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<PhongResponse>>> searchAndFilterPhong(
            @ModelAttribute LocPhongRequest request
    ) {
        List<PhongResponse> result = phongService.locPhong(request);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách phòng thành công", result));
    }

    /**
     * Chức năng 2: Xem chi tiết phòng theo mã phòng
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PhongResponse>> getChiTietPhong(@PathVariable("id") Integer id) {
        PhongResponse result = phongService.getChiTietPhong(id);
        return ResponseEntity.ok(ApiResponse.success("Lấy chi tiết phòng thành công", result));
    }

    /**
     * Chức năng 3: Kiểm tra và lấy danh sách phòng trống theo ngày nhận và ngày trả
     */
    @GetMapping("/trong")
    public ResponseEntity<ApiResponse<List<PhongResponse>>> kiemTraPhongTrong(
            @RequestParam("ngayNhan") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayNhan,
            @RequestParam("ngayTra") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayTra
    ) {
        List<PhongResponse> result = phongService.kiemTraPhongTrong(ngayNhan, ngayTra);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách phòng trống thành công", result));
    }

    /**
     * Chức năng 3 (bổ trợ): Kiểm tra một phòng cụ thể có trống theo ngày nhận và ngày trả hay không
     */
    @GetMapping("/{id}/kiem-tra-trong")
    public ResponseEntity<ApiResponse<KiemTraPhongTrongResponse>> kiemTraPhongTrongTheoId(
            @PathVariable("id") Integer id,
            @RequestParam("ngayNhan") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayNhan,
            @RequestParam("ngayTra") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayTra
    ) {
        KiemTraPhongTrongResponse result = phongService.kiemTraPhongTrongTheoId(id, ngayNhan, ngayTra);
        return ResponseEntity.ok(ApiResponse.success(result.getThongBao(), result));
    }

    /**
     * Hỗ trợ bộ lọc: Lấy danh sách loại phòng đang hoạt động
     */
    @GetMapping("/loai-phong")
    public ResponseEntity<ApiResponse<List<LoaiPhongResponse>>> getAllLoaiPhong() {
        List<LoaiPhongResponse> result = phongService.getAllLoaiPhong();
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách loại phòng thành công", result));
    }
}
