package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.RegisterRequest;
import com.hotelbooking.backend.dto.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
}
