package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {
    boolean existsByTenDangNhap(String tenDangNhap);
    java.util.Optional<TaiKhoan> findByTenDangNhap(String tenDangNhap);
}
