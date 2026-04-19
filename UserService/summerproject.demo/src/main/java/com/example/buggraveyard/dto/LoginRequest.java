package com.example.buggraveyard.dto;
//Carries login data from client to backend
import jakarta.validation.constraints.*;
//jakarta library provides annotations like @Notblank and @Email to reduce manual code

public class LoginRequest {
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
// without jakarta library controller becomes
// @PostMapping("/login")
//public ResponseEntity<?> login(@RequestBody AuthRequest request) {
//
//    if (request.getEmail() == null || request.getEmail().isEmpty()) {
//        return ResponseEntity.badRequest().body("Email cannot be empty");
//    }
//
//    if (!request.getEmail().contains("@")) {
//        return ResponseEntity.badRequest().body("Invalid email format");
//    }
//
//    if (request.getPassword() == null || request.getPassword().length() < 6) {
//        return ResponseEntity.badRequest().body("Password too short");
//    }
//
//    return ResponseEntity.ok("Success");
//}