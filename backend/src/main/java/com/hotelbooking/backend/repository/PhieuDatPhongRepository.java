package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.PhieuDatPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuDatPhongRepository extends JpaRepository<PhieuDatPhong, Integer> {
    List<PhieuDatPhong> findByKhachHang_MaKHOrderByNgayDatDesc(Integer maKH);
}
