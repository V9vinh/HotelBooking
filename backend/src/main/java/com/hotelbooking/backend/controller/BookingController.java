package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.dto.BookingRequest;
import com.hotelbooking.backend.dto.BookingResponse;
import com.hotelbooking.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request) {
        BookingResponse response = bookingService.bookRoom(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/history/{maKH}")
    public ResponseEntity<java.util.List<com.hotelbooking.backend.dto.BookingHistoryDTO>> getBookingHistory(@PathVariable Integer maKH) {
        return ResponseEntity.ok(bookingService.getBookingHistory(maKH));
    }

    @PostMapping("/{maPhieu}/pay")
    public ResponseEntity<BookingResponse> payBooking(
            @PathVariable Integer maPhieu,
            @RequestBody com.hotelbooking.backend.dto.PaymentRequestDTO paymentRequest) {
        BookingResponse response = bookingService.payBooking(maPhieu, paymentRequest);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/reviews")
    public ResponseEntity<BookingResponse> createReview(@RequestBody com.hotelbooking.backend.dto.ReviewRequestDTO request) {
        BookingResponse response = bookingService.createReview(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
