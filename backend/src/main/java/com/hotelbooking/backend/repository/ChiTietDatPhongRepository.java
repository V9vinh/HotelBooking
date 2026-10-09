package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.ChiTietDatPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietDatPhongRepository extends JpaRepository<ChiTietDatPhong, Integer> {
    List<ChiTietDatPhong> findByPhieuDatPhong_MaPhieu(Integer maPhieu);
}
