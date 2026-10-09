package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.request.LocPhongRequest;
import com.hotelbooking.backend.dto.response.KiemTraPhongTrongResponse;
import com.hotelbooking.backend.dto.response.LoaiPhongResponse;
import com.hotelbooking.backend.dto.response.PhongResponse;
import com.hotelbooking.backend.entity.Phong;
import com.hotelbooking.backend.entity.TrangThaiLoaiPhong;
import com.hotelbooking.backend.entity.TrangThaiPhieuDat;
import com.hotelbooking.backend.entity.TrangThaiPhong;
import com.hotelbooking.backend.exception.BadRequestException;
import com.hotelbooking.backend.exception.ResourceNotFoundException;
import com.hotelbooking.backend.repository.LoaiPhongRepository;
import com.hotelbooking.backend.repository.PhongRepository;
import com.hotelbooking.backend.service.PhongService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PhongServiceImpl implements PhongService {

    private final PhongRepository phongRepository;
    private final LoaiPhongRepository loaiPhongRepository;

    public PhongServiceImpl(PhongRepository phongRepository, LoaiPhongRepository loaiPhongRepository) {
        this.phongRepository = phongRepository;
        this.loaiPhongRepository = loaiPhongRepository;
    }

    @Override
    public List<PhongResponse> getAllPhong() {
        return phongRepository.findAllWithLoaiPhong(TrangThaiLoaiPhong.HoatDong)
                .stream()
                .map(PhongResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public PhongResponse getChiTietPhong(Integer maPhong) {
        if (maPhong == null) {
            throw new BadRequestException("Mã phòng không được để trống");
        }

        Phong phong = phongRepository.findByIdWithLoaiPhong(maPhong)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng với mã: " + maPhong));

        return new PhongResponse(phong);
    }

    @Override
    public List<PhongResponse> kiemTraPhongTrong(LocalDate ngayNhan, LocalDate ngayTra) {
        validateDateRange(ngayNhan, ngayTra);

        List<Integer> busyRoomIds = phongRepository.findBusyRoomIds(ngayNhan, ngayTra, TrangThaiPhieuDat.DaHuy);

        List<Phong> availableRooms;
        if (busyRoomIds.isEmpty()) {
            availableRooms = phongRepository.findAllAvailableRooms(
                    TrangThaiLoaiPhong.HoatDong,
                    TrangThaiPhong.BaoTri
            );
        } else {
            availableRooms = phongRepository.findAvailableRoomsNotIn(
                    busyRoomIds,
                    TrangThaiLoaiPhong.HoatDong,
                    TrangThaiPhong.BaoTri
            );
        }

        return availableRooms.stream()
                .map(PhongResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public KiemTraPhongTrongResponse kiemTraPhongTrongTheoId(Integer maPhong, LocalDate ngayNhan, LocalDate ngayTra) {
        if (maPhong == null) {
            throw new BadRequestException("Mã phòng không được để trống");
        }
        validateDateRange(ngayNhan, ngayTra);

        Phong phong = phongRepository.findByIdWithLoaiPhong(maPhong)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng với mã: " + maPhong));

        if (phong.getTrangThai() == TrangThaiPhong.BaoTri) {
            return new KiemTraPhongTrongResponse(
                    phong.getMaPhong(),
                    phong.getSoPhong(),
                    ngayNhan,
                    ngayTra,
                    false,
                    "Phòng hiện đang bảo trì, không thể phục vụ"
            );
        }

        if (phong.getLoaiPhong() != null && phong.getLoaiPhong().getTrangThai() == TrangThaiLoaiPhong.Ngung) {
            return new KiemTraPhongTrongResponse(
                    phong.getMaPhong(),
                    phong.getSoPhong(),
                    ngayNhan,
                    ngayTra,
                    false,
                    "Loại phòng này hiện đang tạm ngưng phục vụ"
            );
        }

        List<Integer> busyRoomIds = phongRepository.findBusyRoomIds(ngayNhan, ngayTra, TrangThaiPhieuDat.DaHuy);
        boolean isBusy = busyRoomIds.contains(maPhong);

        if (isBusy) {
            return new KiemTraPhongTrongResponse(
                    phong.getMaPhong(),
                    phong.getSoPhong(),
                    ngayNhan,
                    ngayTra,
                    false,
                    "Phòng đã có khách đặt trong khoảng thời gian từ " + ngayNhan + " đến " + ngayTra
            );
        }

        return new KiemTraPhongTrongResponse(
                phong.getMaPhong(),
                phong.getSoPhong(),
                ngayNhan,
                ngayTra,
                true,
                "Phòng còn trống trong khoảng thời gian từ " + ngayNhan + " đến " + ngayTra
        );
    }

    @Override
    public List<PhongResponse> locPhong(LocPhongRequest request) {
        if (request == null) {
            return getAllPhong();
        }

        boolean hasDateFilter = request.getNgayNhan() != null || request.getNgayTra() != null;
        if (hasDateFilter) {
            validateDateRange(request.getNgayNhan(), request.getNgayTra());
        }

        List<Phong> list = phongRepository.filterRooms(
                request.getKeyword() != null ? request.getKeyword().trim() : null,
                request.getMaLoaiPhong(),
                request.getSucChua(),
                request.getGiaTu(),
                request.getGiaDen(),
                request.getTang(),
                request.getTrangThai(),
                TrangThaiLoaiPhong.HoatDong
        );

        if (hasDateFilter) {
            List<Integer> busyRoomIds = phongRepository.findBusyRoomIds(
                    request.getNgayNhan(),
                    request.getNgayTra(),
                    TrangThaiPhieuDat.DaHuy
            );
            Set<Integer> busySet = Set.copyOf(busyRoomIds);

            list = list.stream()
                    .filter(p -> p.getTrangThai() != TrangThaiPhong.BaoTri)
                    .filter(p -> !busySet.contains(p.getMaPhong()))
                    .collect(Collectors.toList());
        }

        return list.stream()
                .map(PhongResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<LoaiPhongResponse> getAllLoaiPhong() {
        return loaiPhongRepository.findByTrangThai(TrangThaiLoaiPhong.HoatDong)
                .stream()
                .map(LoaiPhongResponse::new)
                .collect(Collectors.toList());
    }

    private void validateDateRange(LocalDate ngayNhan, LocalDate ngayTra) {
        if (ngayNhan == null || ngayTra == null) {
            throw new BadRequestException("Ngày nhận phòng và ngày trả phòng không được để trống");
        }
        if (ngayNhan.isBefore(LocalDate.now())) {
            throw new BadRequestException("Ngày nhận phòng không được ở trong quá khứ");
        }
        if (!ngayTra.isAfter(ngayNhan)) {
            throw new BadRequestException("Ngày trả phòng phải sau ngày nhận phòng");
        }
    }
}
