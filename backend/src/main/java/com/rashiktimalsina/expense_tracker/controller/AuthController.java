package com.rashiktimalsina.expense_tracker.controller;

import com.rashiktimalsina.expense_tracker.dto.LoginRequest;
import com.rashiktimalsina.expense_tracker.dto.RegisterRequest;
import com.rashiktimalsina.expense_tracker.dto.response.ApiResponse;
import com.rashiktimalsina.expense_tracker.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author RashikTimalsina
 * @created 22/03/2026
 */

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, String>>> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

}
