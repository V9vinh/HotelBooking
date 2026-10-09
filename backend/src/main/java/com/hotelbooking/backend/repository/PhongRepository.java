package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.Phong;
import com.hotelbooking.backend.entity.TrangThaiLoaiPhong;
import com.hotelbooking.backend.entity.TrangThaiPhieuDat;
import com.hotelbooking.backend.entity.TrangThaiPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhongRepository extends JpaRepository<Phong, Integer> {

    @Query("SELECT p FROM Phong p JOIN FETCH p.loaiPhong lp WHERE lp.trangThai = :trangThaiLoaiPhong ORDER BY p.soPhong ASC")
    List<Phong> findAllWithLoaiPhong(@Param("trangThaiLoaiPhong") TrangThaiLoaiPhong trangThaiLoaiPhong);

    @Query("SELECT p FROM Phong p JOIN FETCH p.loaiPhong lp WHERE p.maPhong = :maPhong")
    Optional<Phong> findByIdWithLoaiPhong(@Param("maPhong") Integer maPhong);

    @Query("SELECT DISTINCT c.phong.maPhong FROM ChiTietDatPhong c " +
           "WHERE c.phieuDatPhong.trangThai != :trangThaiDaHuy " +
           "AND c.phieuDatPhong.ngayNhan < :ngayTra " +
           "AND c.phieuDatPhong.ngayTra > :ngayNhan")
    List<Integer> findBusyRoomIds(@Param("ngayNhan") LocalDate ngayNhan,
                                  @Param("ngayTra") LocalDate ngayTra,
                                  @Param("trangThaiDaHuy") TrangThaiPhieuDat trangThaiDaHuy);

    @Query("SELECT p FROM Phong p JOIN FETCH p.loaiPhong lp " +
           "WHERE lp.trangThai = :trangThaiLoaiPhong " +
           "AND p.trangThai != :trangThaiBaoTri " +
           "ORDER BY p.soPhong ASC")
    List<Phong> findAllAvailableRooms(@Param("trangThaiLoaiPhong") TrangThaiLoaiPhong trangThaiLoaiPhong,
                                      @Param("trangThaiBaoTri") TrangThaiPhong trangThaiBaoTri);

    @Query("SELECT p FROM Phong p JOIN FETCH p.loaiPhong lp " +
           "WHERE lp.trangThai = :trangThaiLoaiPhong " +
           "AND p.trangThai != :trangThaiBaoTri " +
           "AND p.maPhong NOT IN :busyRoomIds " +
           "ORDER BY p.soPhong ASC")
    List<Phong> findAvailableRoomsNotIn(@Param("busyRoomIds") Collection<Integer> busyRoomIds,
                                        @Param("trangThaiLoaiPhong") TrangThaiLoaiPhong trangThaiLoaiPhong,
                                        @Param("trangThaiBaoTri") TrangThaiPhong trangThaiBaoTri);

    @Query("SELECT p FROM Phong p JOIN FETCH p.loaiPhong lp " +
           "WHERE lp.trangThai = :trangThaiLoaiPhong " +
           "AND (:keyword IS NULL OR :keyword = '' OR " +
           "     LOWER(p.soPhong) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "     LOWER(lp.tenLoaiPhong) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "     LOWER(lp.tienNghi) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "     LOWER(lp.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:maLoaiPhong IS NULL OR lp.maLoaiPhong = :maLoaiPhong) " +
           "AND (:sucChua IS NULL OR lp.sucChua >= :sucChua) " +
           "AND (:giaTu IS NULL OR lp.giaCoBan >= :giaTu) " +
           "AND (:giaDen IS NULL OR lp.giaCoBan <= :giaDen) " +
           "AND (:tang IS NULL OR p.tang = :tang) " +
           "AND (:trangThai IS NULL OR p.trangThai = :trangThai) " +
           "ORDER BY p.soPhong ASC")
    List<Phong> filterRooms(@Param("keyword") String keyword,
                            @Param("maLoaiPhong") Integer maLoaiPhong,
                            @Param("sucChua") Integer sucChua,
                            @Param("giaTu") BigDecimal giaTu,
                            @Param("giaDen") BigDecimal giaDen,
                            @Param("tang") Integer tang,
                            @Param("trangThai") TrangThaiPhong trangThai,
                            @Param("trangThaiLoaiPhong") TrangThaiLoaiPhong trangThaiLoaiPhong);
}
