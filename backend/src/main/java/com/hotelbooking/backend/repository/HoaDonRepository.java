package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    Optional<HoaDon> findByPhieuDatPhong_MaPhieu(Integer maPhieu);
}
