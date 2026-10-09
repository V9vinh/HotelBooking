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
}
