package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.BookingRequest;
import com.hotelbooking.backend.dto.BookingResponse;

import java.util.List;
import com.hotelbooking.backend.dto.BookingHistoryDTO;
import com.hotelbooking.backend.dto.PaymentRequestDTO;
import com.hotelbooking.backend.dto.ReviewRequestDTO;

public interface BookingService {
    BookingResponse bookRoom(BookingRequest request);
    List<BookingHistoryDTO> getBookingHistory(Integer maKhachHang);
    BookingResponse payBooking(Integer maPhieu, PaymentRequestDTO paymentRequest);
    BookingResponse createReview(ReviewRequestDTO request);
}
