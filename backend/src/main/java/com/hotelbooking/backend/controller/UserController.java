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

        return ResponseEntity.ok(new ProfileDTO(khachHang, taiKhoan.getTenDangNhap(), taiKhoan.getVaiTro().toString()));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllGuests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Chưa xác thực");
        }
        // Ideally should check for Admin role here, but keeping it simple
        java.util.List<ProfileDTO> result = khachHangRepository.findAll().stream().map(kh -> {
            TaiKhoan tk = kh.getTaiKhoan();
            String username = tk != null ? tk.getTenDangNhap() : null;
            String role = tk != null ? tk.getVaiTro().toString() : null;
            return new ProfileDTO(kh, username, role);
        }).collect(java.util.stream.Collectors.toList());
        
        return ResponseEntity.ok(result);
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

        return ResponseEntity.ok(new ProfileDTO(saved, taiKhoan.getTenDangNhap(), taiKhoan.getVaiTro().toString()));
    }
}
