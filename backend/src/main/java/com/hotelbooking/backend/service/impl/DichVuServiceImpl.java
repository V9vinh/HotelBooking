package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.entity.DichVu;
import com.hotelbooking.backend.repository.DichVuRepository;
import com.hotelbooking.backend.service.DichVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DichVuServiceImpl implements DichVuService {

    @Autowired
    private DichVuRepository dichVuRepository;

    @Override
    public List<DichVu> getAllDichVu() {
        return dichVuRepository.findAll();
    }

    @Override
    public DichVu getDichVuById(Integer id) {
        return dichVuRepository.findById(id).orElse(null);
    }
}
