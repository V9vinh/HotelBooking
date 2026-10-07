package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.PhieuDatPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhieuDatPhongRepository extends JpaRepository<PhieuDatPhong, Integer> {
}
