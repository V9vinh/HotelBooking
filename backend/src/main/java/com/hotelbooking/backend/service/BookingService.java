package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.BookingRequest;
import com.hotelbooking.backend.dto.BookingResponse;

public interface BookingService {
    BookingResponse bookRoom(BookingRequest request);
}
