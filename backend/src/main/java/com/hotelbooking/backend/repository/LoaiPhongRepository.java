package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.LoaiPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LoaiPhongRepository extends JpaRepository<LoaiPhong, Integer> {

    List<LoaiPhong> findBySucChuaGreaterThanEqual(Integer guests);

    @Query("SELECT DISTINCT l FROM LoaiPhong l WHERE l.sucChua >= :guests AND EXISTS (" +
           "SELECT p FROM Phong p WHERE p.loaiPhong = l AND p.maPhong NOT IN (" +
           "SELECT c.phong.maPhong FROM ChiTietDatPhong c JOIN c.phieuDatPhong ph " +
           "WHERE ph.trangThai NOT IN ('DaHuy', 'DaCheckOut') " +
           "AND ph.ngayNhan < :ngayTra AND ph.ngayTra > :ngayNhan))")
    List<LoaiPhong> searchAvailableRoomTypes(@Param("ngayNhan") LocalDate ngayNhan,
                                             @Param("ngayTra") LocalDate ngayTra,
                                             @Param("guests") Integer guests);
}
