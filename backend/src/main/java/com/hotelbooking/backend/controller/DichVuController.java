package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.entity.DichVu;
import com.hotelbooking.backend.service.DichVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class DichVuController {

    @Autowired
    private DichVuService dichVuService;

    @GetMapping
    public ResponseEntity<List<DichVu>> getAllServices() {
        return ResponseEntity.ok(dichVuService.getAllDichVu());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DichVu> getServiceById(@PathVariable Integer id) {
        DichVu dichVu = dichVuService.getDichVuById(id);
        if (dichVu != null) {
            return ResponseEntity.ok(dichVu);
        }
        return ResponseEntity.notFound().build();
    }
}
