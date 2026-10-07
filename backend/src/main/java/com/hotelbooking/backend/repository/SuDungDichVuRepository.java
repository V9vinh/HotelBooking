package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.SuDungDichVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuDungDichVuRepository extends JpaRepository<SuDungDichVu, Integer> {
}
