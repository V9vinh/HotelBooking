package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.entity.KhuyenMai;
import com.hotelbooking.backend.entity.TrangThaiKhuyenMai;
import com.hotelbooking.backend.repository.KhuyenMaiRepository;
import com.hotelbooking.backend.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    @Override
    public KhuyenMai checkPromoCode(String code) {
        return khuyenMaiRepository.findAll().stream()
                .filter(k -> k.getMaCode().equalsIgnoreCase(code))
                .filter(k -> k.getTrangThai() == TrangThaiKhuyenMai.HoatDong)
                .filter(k -> !LocalDate.now().isBefore(k.getNgayBatDau()) && !LocalDate.now().isAfter(k.getNgayKetThuc()))
                .filter(k -> k.getSoLuong() > k.getDaSuDung())
                .findFirst()
                .orElse(null);
    }
}
