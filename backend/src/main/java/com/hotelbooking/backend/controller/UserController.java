package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.dto.ProfileDTO;
import com.hotelbooking.backend.entity.KhachHang;
import com.hotelbooking.backend.entity.TaiKhoan;
import com.hotelbooking.backend.repository.KhachHangRepository;
import com.hotelbooking.backend.repository.TaiKhoanRepository;
import com.hotelbooking.backend.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final KhachHangRepository khachHangRepository;
    private final TaiKhoanRepository taiKhoanRepository;

    public UserController(KhachHangRepository khachHangRepository, TaiKhoanRepository taiKhoanRepository) {
        this.khachHangRepository = khachHangRepository;
        this.taiKhoanRepository = taiKhoanRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Chưa xác thực");
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        TaiKhoan taiKhoan = userDetails.getTaiKhoan();
        
        KhachHang khachHang = khachHangRepository.findByTaiKhoan(taiKhoan);
        if (khachHang == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new ProfileDTO(khachHang, taiKhoan.getTenDangNhap()));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Chưa xác thực");
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        TaiKhoan taiKhoan = userDetails.getTaiKhoan();
        
        KhachHang khachHang = khachHangRepository.findByTaiKhoan(taiKhoan);
        if (khachHang == null) {
            return ResponseEntity.notFound().build();
        }

        khachHang.setHoTen(request.getHoTen());
        khachHang.setSdt(request.getSdt());
        khachHang.setEmail(request.getEmail());
        khachHang.setCmndCccd(request.getCmndCccd());
        khachHang.setDiaChi(request.getDiaChi());
        khachHang.setNgaySinh(request.getNgaySinh());
        khachHang.setGioiTinh(request.getGioiTinh());

        KhachHang saved = khachHangRepository.save(khachHang);

        return ResponseEntity.ok(new ProfileDTO(saved, taiKhoan.getTenDangNhap()));
    }
}
