package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.entity.TrangThaiHoaDon;
import com.hotelbooking.backend.repository.PhieuDatPhongRepository;
import com.hotelbooking.backend.repository.KhachHangRepository;
import com.hotelbooking.backend.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/statistics")
@CrossOrigin(origins = "*")
public class StatisticsController {

    @Autowired
    private PhieuDatPhongRepository phieuDatPhongRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = new HashMap<>();

        long totalBookings = phieuDatPhongRepository.count();
        long totalCustomers = khachHangRepository.count();

        // Efficient JPQL SUM instead of loading all entities
        BigDecimal totalRevenue = hoaDonRepository.sumTongTienByTrangThai(TrangThaiHoaDon.DaThanhToan);
        if (totalRevenue == null) totalRevenue = BigDecimal.ZERO;

        stats.put("totalBookings", totalBookings);
        stats.put("totalCustomers", totalCustomers);
        stats.put("totalRevenue", totalRevenue);

        return ResponseEntity.ok(stats);
    }
}
