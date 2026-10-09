package com.hotelbooking.backend.service;

import com.hotelbooking.backend.entity.LoaiPhong;
import java.util.List;

public interface LoaiPhongService {
    List<LoaiPhong> getAllLoaiPhong();
    LoaiPhong getLoaiPhongById(Integer id);
}
