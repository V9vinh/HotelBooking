package com.hotelbooking.backend.service;

import com.hotelbooking.backend.entity.DichVu;
import java.util.List;

public interface DichVuService {
    List<DichVu> getAllDichVu();
    DichVu getDichVuById(Integer id);
}
