package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.ChiTietDatPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietDatPhongRepository extends JpaRepository<ChiTietDatPhong, Integer> {
}
