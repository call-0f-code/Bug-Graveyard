package com.example.buggraveyard.controller;
import com.example.buggraveyard.dto.LoginRequest;
import com.example.buggraveyard.dto.LoginResponse;
import com.example.buggraveyard.dto.ErrorResponse;
import com.example.buggraveyard.dto.RegisterRequest;
import com.example.buggraveyard.entity.User;
import com.example.buggraveyard.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest authRequest) {
        try {
            LoginResponse response = authService.login(authRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
        }}

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {  //  RegisterRequest + @Valid
        try {
            User savedUser = authService.register(registerRequest);  //  registerRequest
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }}
