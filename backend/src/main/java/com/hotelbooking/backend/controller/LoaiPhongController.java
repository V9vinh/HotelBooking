package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.entity.LoaiPhong;
import com.hotelbooking.backend.service.LoaiPhongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class LoaiPhongController {

    @Autowired
    private LoaiPhongService loaiPhongService;

    @GetMapping("/types")
    public ResponseEntity<List<LoaiPhong>> getAllRoomTypes() {
        return ResponseEntity.ok(loaiPhongService.getAllLoaiPhong());
    }

    @GetMapping("/types/{id}")
    public ResponseEntity<LoaiPhong> getRoomTypeById(@PathVariable Integer id) {
        LoaiPhong loaiPhong = loaiPhongService.getLoaiPhongById(id);
        if (loaiPhong != null) {
            return ResponseEntity.ok(loaiPhong);
        }
        return ResponseEntity.notFound().build();
    }
}
