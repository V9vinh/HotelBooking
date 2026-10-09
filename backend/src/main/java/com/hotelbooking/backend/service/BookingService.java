package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.BookingRequest;
import com.hotelbooking.backend.dto.BookingResponse;

import java.util.List;
import com.hotelbooking.backend.dto.BookingHistoryDTO;

public interface BookingService {
    BookingResponse bookRoom(BookingRequest request);
    List<BookingHistoryDTO> getBookingHistory(Integer maKhachHang);
}
