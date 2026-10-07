package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.entity.PhatSinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhatSinhRepository extends JpaRepository<PhatSinh, Integer> {
}
