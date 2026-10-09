package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
    KhachHang findByTaiKhoan(com.hotelbooking.backend.entity.TaiKhoan taiKhoan);
}
