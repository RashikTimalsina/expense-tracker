package com.rashiktimalsina.expense_tracker.service;

import com.rashiktimalsina.expense_tracker.dto.LoginRequest;
import com.rashiktimalsina.expense_tracker.dto.RegisterRequest;
import com.rashiktimalsina.expense_tracker.dto.response.ApiResponse;
import com.rashiktimalsina.expense_tracker.model.User;
import com.rashiktimalsina.expense_tracker.repository.UserRepository;
import com.rashiktimalsina.expense_tracker.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author RashikTimalsina
 * @created 22/03/2026
 */

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Register a new user and return a JWT token
    public ApiResponse<Map<String, String>> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return ApiResponse.success("Registration successful", Map.of("token", token));
    }

    // Authenticate user for login and return a JWT token
    public ApiResponse<Map<String, String>> login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return ApiResponse.success("Login successful", Map.of("token", token));
    }
}
