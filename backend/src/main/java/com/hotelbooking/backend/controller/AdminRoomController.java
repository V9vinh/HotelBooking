package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.dto.RoomMapDTO;
import com.hotelbooking.backend.entity.*;
import com.hotelbooking.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/rooms")
@CrossOrigin("*")
public class AdminRoomController {

    @Autowired
    private PhongRepository phongRepository;

    @Autowired
    private ChiTietDatPhongRepository chiTietDatPhongRepository;

    @GetMapping("/map")
    @PreAuthorize("hasAnyAuthority('ROLE_Admin', 'ROLE_QuanLy', 'ROLE_LeTan')")
    public ResponseEntity<List<RoomMapDTO>> getRoomMap(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Integer maLoaiPhong) {

        if (startDate == null) startDate = LocalDate.now();
        if (endDate == null) endDate = startDate.plusDays(1);

        final LocalDate finalStartDate = startDate;
        final LocalDate finalEndDate = endDate;

        List<Phong> allRooms = phongRepository.findAll();
        if (maLoaiPhong != null) {
            allRooms = allRooms.stream()
                    .filter(p -> p.getLoaiPhong().getMaLoaiPhong().equals(maLoaiPhong))
                    .collect(Collectors.toList());
        }

        List<RoomMapDTO> response = new ArrayList<>();
        
        // Find overlaps
        // PhieuDatPhong overlaps if: Phieu.NgayNhan < endDate AND Phieu.NgayTra > startDate
        // And TrangThai not in (DaHuy, DaCheckOut)
        // Note: For DaCheckOut, we might want to exclude it if they already left.
        
        List<ChiTietDatPhong> activeBookings = chiTietDatPhongRepository.findAll().stream()
                .filter(ct -> {
                    PhieuDatPhong p = ct.getPhieuDatPhong();
                    if (p.getTrangThai() == TrangThaiPhieuDat.DaHuy) return false;
                    // If checked out and it's in the past, it's not occupying.
                    // But if we are viewing historical map, it did occupy.
                    if (p.getTrangThai() == TrangThaiPhieuDat.DaCheckOut && p.getNgayTra().isBefore(LocalDate.now())) return false;
                    
                    return p.getNgayNhan().isBefore(finalEndDate) && p.getNgayTra().isAfter(finalStartDate);
                })
                .collect(Collectors.toList());

        for (Phong p : allRooms) {
            RoomMapDTO dto = new RoomMapDTO();
            dto.setMaPhong(p.getMaPhong());
            dto.setSoPhong(p.getSoPhong());
            dto.setTang(p.getTang());
            dto.setMaLoaiPhong(p.getLoaiPhong().getMaLoaiPhong());
            dto.setTenLoaiPhong(p.getLoaiPhong().getTenLoaiPhong());
            dto.setTrangThaiHienTai(p.getTrangThai().name()); // BaoTri, Trong, etc

            if ("BaoTri".equalsIgnoreCase(dto.getTrangThaiHienTai())) {
                dto.setTrangThaiKhaDung("BaoTri");
            } else {
                // Check if there is an overlapping booking
                ChiTietDatPhong overlap = activeBookings.stream()
                        .filter(ct -> ct.getPhong().getMaPhong().equals(p.getMaPhong()))
                        .findFirst()
                        .orElse(null);

                if (overlap != null) {
                    PhieuDatPhong phieu = overlap.getPhieuDatPhong();
                    dto.setMaPhieu(phieu.getMaPhieu());
                    dto.setTenKhachHang(phieu.getKhachHang().getHoTen());
                    dto.setNgayNhan(phieu.getNgayNhan());
                    dto.setNgayTra(phieu.getNgayTra());
                    dto.setTrangThaiPhieu(phieu.getTrangThai().name());

                    if (phieu.getTrangThai() == TrangThaiPhieuDat.DaCheckIn) {
                        dto.setTrangThaiKhaDung("CoKhach");
                    } else if (phieu.getTrangThai() == TrangThaiPhieuDat.DaCheckOut) {
                        dto.setTrangThaiKhaDung("DangDon");
                    } else {
                        dto.setTrangThaiKhaDung("DaDat");
                    }
                } else {
                    dto.setTrangThaiKhaDung("Trong");
                }
            }
            response.add(dto);
        }

        return ResponseEntity.ok(response);
    }
}
