// src/main/java/com/example/buggraveyard/dto/AuthResponse.java  
package com.example.buggraveyard.dto;
//After successful login, server sends:
//Token (JWT)
//Token type

public class LoginResponse {
    private String token;
    private String type = "Bearer";

    public LoginResponse(String token) { this.token = token; }
    public String getToken() { return token; }
    public String getType() { return type; }
}