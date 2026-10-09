package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.entity.KhuyenMai;
import com.hotelbooking.backend.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promotions")
@CrossOrigin(origins = "*")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping("/check")
    public ResponseEntity<KhuyenMai> checkPromoCode(@RequestParam String code) {
        KhuyenMai khuyenMai = khuyenMaiService.checkPromoCode(code);
        if (khuyenMai != null) {
            return ResponseEntity.ok(khuyenMai);
        }
        return ResponseEntity.badRequest().build();
    }
}
