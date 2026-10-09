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

    @GetMapping("/search")
    public ResponseEntity<List<LoaiPhong>> searchRooms(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String checkIn,
            @RequestParam(required = false) String checkOut,
            @RequestParam(required = false) Integer guests) {
        return ResponseEntity.ok(loaiPhongService.searchLoaiPhong(destination, checkIn, checkOut, guests));
    }

    @PostMapping("/types")
    public ResponseEntity<LoaiPhong> createRoomType(@RequestBody LoaiPhong loaiPhong) {
        return ResponseEntity.ok(loaiPhongService.createLoaiPhong(loaiPhong));
    }

    @PutMapping("/types/{id}")
    public ResponseEntity<LoaiPhong> updateRoomType(@PathVariable Integer id, @RequestBody LoaiPhong loaiPhong) {
        LoaiPhong updated = loaiPhongService.updateLoaiPhong(id, loaiPhong);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/types/{id}")
    public ResponseEntity<Void> deleteRoomType(@PathVariable Integer id) {
        loaiPhongService.deleteLoaiPhong(id);
        return ResponseEntity.ok().build();
    }
}
