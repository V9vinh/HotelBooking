package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.LoaiPhong;
import com.hotelbooking.backend.entity.TrangThaiLoaiPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoaiPhongRepository extends JpaRepository<LoaiPhong, Integer> {
    List<LoaiPhong> findByTrangThai(TrangThaiLoaiPhong trangThai);
}
