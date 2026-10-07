package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.RegisterRequest;
import com.hotelbooking.backend.dto.RegisterResponse;
import com.hotelbooking.backend.entity.KhachHang;
import com.hotelbooking.backend.entity.TaiKhoan;
import com.hotelbooking.backend.entity.TrangThaiTaiKhoan;
import com.hotelbooking.backend.entity.VaiTroTaiKhoan;
import com.hotelbooking.backend.repository.KhachHangRepository;
import com.hotelbooking.backend.repository.TaiKhoanRepository;
import com.hotelbooking.backend.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final TaiKhoanRepository taiKhoanRepository;
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(TaiKhoanRepository taiKhoanRepository,
                           KhachHangRepository khachHangRepository,
                           PasswordEncoder passwordEncoder) {
        this.taiKhoanRepository = taiKhoanRepository;
        this.khachHangRepository = khachHangRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (taiKhoanRepository.existsByTenDangNhap(request.getTenDangNhap())) {
            throw new IllegalArgumentException("Tên đăng nhập đã tồn tại!");
        }

        // 1. Tạo TAIKHOAN
        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setTenDangNhap(request.getTenDangNhap());
        taiKhoan.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
        taiKhoan.setVaiTro(VaiTroTaiKhoan.KhachHang);
        taiKhoan.setTrangThai(TrangThaiTaiKhoan.HoatDong);

        TaiKhoan savedTaiKhoan = taiKhoanRepository.save(taiKhoan);

        // 2. Tạo KHACHHANG gắn với TAIKHOAN vừa tạo
        KhachHang khachHang = new KhachHang();
        khachHang.setTaiKhoan(savedTaiKhoan);
        khachHang.setHoTen(request.getHoTen());
        khachHang.setSdt(request.getSdt());
        khachHang.setEmail(request.getEmail());
        khachHang.setCmndCccd(request.getCmndCccd());
        khachHang.setDiaChi(request.getDiaChi());
        khachHang.setNgaySinh(request.getNgaySinh());
        khachHang.setGioiTinh(request.getGioiTinh());

        KhachHang savedKhachHang = khachHangRepository.save(khachHang);

        // 3. Chuẩn bị kết quả phản hồi
        RegisterResponse response = new RegisterResponse();
        response.setMaTK(savedTaiKhoan.getMaTK());
        response.setMaKH(savedKhachHang.getMaKH());
        response.setTenDangNhap(savedTaiKhoan.getTenDangNhap());
        response.setVaiTro(savedTaiKhoan.getVaiTro());
        response.setTrangThai(savedTaiKhoan.getTrangThai());
        response.setHoTen(savedKhachHang.getHoTen());
        response.setSdt(savedKhachHang.getSdt());
        response.setEmail(savedKhachHang.getEmail());
        response.setCmndCccd(savedKhachHang.getCmndCccd());
        response.setDiaChi(savedKhachHang.getDiaChi());
        response.setNgaySinh(savedKhachHang.getNgaySinh());
        response.setGioiTinh(savedKhachHang.getGioiTinh());
        response.setMessage("Đăng ký tài khoản thành công!");

        return response;
    }
}
