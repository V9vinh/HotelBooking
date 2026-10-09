package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.request.LocPhongRequest;
import com.hotelbooking.backend.dto.response.KiemTraPhongTrongResponse;
import com.hotelbooking.backend.dto.response.LoaiPhongResponse;
import com.hotelbooking.backend.dto.response.PhongResponse;

import java.time.LocalDate;
import java.util.List;

public interface PhongService {

    List<PhongResponse> getAllPhong();

    PhongResponse getChiTietPhong(Integer maPhong);

    List<PhongResponse> kiemTraPhongTrong(LocalDate ngayNhan, LocalDate ngayTra);

    KiemTraPhongTrongResponse kiemTraPhongTrongTheoId(Integer maPhong, LocalDate ngayNhan, LocalDate ngayTra);

    List<PhongResponse> locPhong(LocPhongRequest request);

    List<LoaiPhongResponse> getAllLoaiPhong();
}
