package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.entity.LoaiPhong;
import com.hotelbooking.backend.repository.LoaiPhongRepository;
import com.hotelbooking.backend.service.LoaiPhongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiPhongServiceImpl implements LoaiPhongService {

    @Autowired
    private LoaiPhongRepository loaiPhongRepository;

    @Override
    public List<LoaiPhong> getAllLoaiPhong() {
        return loaiPhongRepository.findAll();
    }

    @Override
    public LoaiPhong getLoaiPhongById(Integer id) {
        return loaiPhongRepository.findById(id).orElse(null);
    }

    @Override
    public List<LoaiPhong> searchLoaiPhong(String destination, String checkIn, String checkOut, Integer guests) {
        Integer requiredGuests = (guests != null) ? guests : 1;
        if (checkIn != null && !checkIn.isEmpty() && checkOut != null && !checkOut.isEmpty()) {
            java.time.LocalDate ngayNhan = java.time.LocalDate.parse(checkIn);
            java.time.LocalDate ngayTra = java.time.LocalDate.parse(checkOut);
            return loaiPhongRepository.searchAvailableRoomTypes(ngayNhan, ngayTra, requiredGuests);
        } else {
            return loaiPhongRepository.findBySucChuaGreaterThanEqual(requiredGuests);
        }
    }
}
