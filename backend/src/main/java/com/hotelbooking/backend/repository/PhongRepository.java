package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.Phong;
import com.hotelbooking.backend.entity.TrangThaiPhieuDat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PhongRepository extends JpaRepository<Phong, Integer> {

    @Query("SELECT p FROM Phong p WHERE p.loaiPhong.maLoaiPhong = :maLoaiPhong AND p.maPhong NOT IN (" +
           "SELECT c.phong.maPhong FROM ChiTietDatPhong c JOIN c.phieuDatPhong ph " +
           "WHERE ph.trangThai NOT IN :excludedStatuses " +
           "AND ph.ngayNhan < :ngayTra AND ph.ngayTra > :ngayNhan)")
    List<Phong> findAvailableRooms(@Param("maLoaiPhong") Integer maLoaiPhong,
                                   @Param("ngayNhan") LocalDate ngayNhan,
                                   @Param("ngayTra") LocalDate ngayTra,
                                   @Param("excludedStatuses") List<TrangThaiPhieuDat> excludedStatuses);
}
