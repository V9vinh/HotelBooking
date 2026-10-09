package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.repository.PhieuDatPhongRepository;
import com.hotelbooking.backend.repository.KhachHangRepository;
import com.hotelbooking.backend.repository.HoaDonRepository;
import com.hotelbooking.backend.entity.TrangThaiPhieuDat;
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
        
        // Sum of all paid invoices (we assume HoaDon has TrangThai = DaThanhToan)
        // Since we don't have a direct JPQL for sum in HoaDonRepository yet, let's just sum all TongTien of DaCheckOut bookings for now.
        // Actually, let's just query all HoaDon and sum TongTien where trangThai is DaThanhToan
        BigDecimal totalRevenue = hoaDonRepository.findAll().stream()
                .filter(h -> "DaThanhToan".equals(h.getTrangThai().name()))
                .map(com.hotelbooking.backend.entity.HoaDon::getTongTien)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        stats.put("totalBookings", totalBookings);
        stats.put("totalCustomers", totalCustomers);
        stats.put("totalRevenue", totalRevenue);

        return ResponseEntity.ok(stats);
    }
}
