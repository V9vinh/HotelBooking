package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.LoginRequest;
import com.hotelbooking.backend.dto.LoginResponse;
import com.hotelbooking.backend.dto.RegisterRequest;
import com.hotelbooking.backend.dto.RegisterResponse;
import com.hotelbooking.backend.entity.KhachHang;
import com.hotelbooking.backend.entity.TaiKhoan;
import com.hotelbooking.backend.entity.TrangThaiTaiKhoan;
import com.hotelbooking.backend.entity.VaiTroTaiKhoan;
import com.hotelbooking.backend.repository.KhachHangRepository;
import com.hotelbooking.backend.repository.TaiKhoanRepository;
import com.hotelbooking.backend.security.CustomUserDetails;
import com.hotelbooking.backend.security.JwtTokenProvider;
import com.hotelbooking.backend.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private TaiKhoanRepository taiKhoanRepository;

    @Mock
    private KhachHangRepository khachHangRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(taiKhoanRepository, khachHangRepository, passwordEncoder, authenticationManager, tokenProvider);
    }

    @Test
    void testRegister_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setTenDangNhap("khachhang1");
        request.setMatKhau("123456");
        request.setHoTen("Nguyen Van A");
        request.setSdt("0901234567");

        when(taiKhoanRepository.existsByTenDangNhap("khachhang1")).thenReturn(false);
        when(passwordEncoder.encode("123456")).thenReturn("$2a$10$hashedPassword");

        TaiKhoan mockTaiKhoan = new TaiKhoan();
        mockTaiKhoan.setMaTK(1);
        mockTaiKhoan.setTenDangNhap("khachhang1");
        mockTaiKhoan.setMatKhau("$2a$10$hashedPassword");
        mockTaiKhoan.setVaiTro(VaiTroTaiKhoan.KhachHang);
        mockTaiKhoan.setTrangThai(TrangThaiTaiKhoan.HoatDong);

        when(taiKhoanRepository.save(any(TaiKhoan.class))).thenReturn(mockTaiKhoan);

        KhachHang mockKhachHang = new KhachHang();
        mockKhachHang.setMaKH(1);
        mockKhachHang.setTaiKhoan(mockTaiKhoan);
        mockKhachHang.setHoTen("Nguyen Van A");
        mockKhachHang.setSdt("0901234567");

        when(khachHangRepository.save(any(KhachHang.class))).thenReturn(mockKhachHang);

        RegisterResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals(1, response.getMaTK());
        assertEquals(1, response.getMaKH());
        assertEquals("khachhang1", response.getTenDangNhap());
        assertEquals(VaiTroTaiKhoan.KhachHang, response.getVaiTro());
        assertEquals(TrangThaiTaiKhoan.HoatDong, response.getTrangThai());
        assertEquals("Nguyen Van A", response.getHoTen());
        assertEquals("0901234567", response.getSdt());
        assertEquals("Đăng ký tài khoản thành công!", response.getMessage());

        verify(taiKhoanRepository, times(1)).existsByTenDangNhap("khachhang1");
        verify(passwordEncoder, times(1)).encode("123456");
        verify(taiKhoanRepository, times(1)).save(any(TaiKhoan.class));
        verify(khachHangRepository, times(1)).save(any(KhachHang.class));
    }

    @Test
    void testRegister_DuplicateUsername_ThrowsException() {
        RegisterRequest request = new RegisterRequest();
        request.setTenDangNhap("khachhang1");
        request.setMatKhau("123456");
        request.setHoTen("Nguyen Van A");
        request.setSdt("0901234567");

        when(taiKhoanRepository.existsByTenDangNhap("khachhang1")).thenReturn(true);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.register(request);
        });

        assertEquals("Tên đăng nhập đã tồn tại!", exception.getMessage());
        verify(taiKhoanRepository, times(1)).existsByTenDangNhap("khachhang1");
        verify(passwordEncoder, never()).encode(any());
        verify(taiKhoanRepository, never()).save(any());
        verify(khachHangRepository, never()).save(any());
    }

    @Test
    void testLogin_Success() {
        LoginRequest request = new LoginRequest();
        request.setTenDangNhap("khachhang1");
        request.setMatKhau("123456");

        TaiKhoan mockTaiKhoan = new TaiKhoan();
        mockTaiKhoan.setMaTK(1);
        mockTaiKhoan.setTenDangNhap("khachhang1");
        mockTaiKhoan.setVaiTro(VaiTroTaiKhoan.KhachHang);

        CustomUserDetails userDetails = new CustomUserDetails(mockTaiKhoan);
        Authentication authentication = mock(Authentication.class);
        
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(tokenProvider.generateToken(authentication)).thenReturn("mock.jwt.token");

        KhachHang mockKhachHang = new KhachHang();
        mockKhachHang.setMaKH(10);
        when(khachHangRepository.findByTaiKhoan(mockTaiKhoan)).thenReturn(mockKhachHang);

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("mock.jwt.token", response.getToken());
        assertEquals("khachhang1", response.getTenDangNhap());
        assertEquals(VaiTroTaiKhoan.KhachHang, response.getVaiTro());
        assertEquals(10, response.getMaKH());

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(tokenProvider, times(1)).generateToken(authentication);
        verify(khachHangRepository, times(1)).findByTaiKhoan(mockTaiKhoan);
    }

    @Test
    void testLogin_Failure_BadCredentials() {
        LoginRequest request = new LoginRequest();
        request.setTenDangNhap("khachhang1");
        request.setMatKhau("wrongpassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThrows(BadCredentialsException.class, () -> {
            authService.login(request);
        });

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(tokenProvider, never()).generateToken(any());
    }
}
