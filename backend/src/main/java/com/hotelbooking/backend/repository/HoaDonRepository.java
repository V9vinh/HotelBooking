package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.HoaDon;
import com.hotelbooking.backend.entity.TrangThaiHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    Optional<HoaDon> findByPhieuDatPhong_MaPhieu(Integer maPhieu);

    @Query("SELECT COALESCE(SUM(h.tongTien), 0) FROM HoaDon h WHERE h.trangThai = :trangThai")
    BigDecimal sumTongTienByTrangThai(@Param("trangThai") TrangThaiHoaDon trangThai);
}

