package com.example.buggraveyard.service;
import com.example.buggraveyard.dto.LoginRequest;
import com.example.buggraveyard.dto.LoginResponse;
import com.example.buggraveyard.dto.RegisterRequest;
import com.example.buggraveyard.entity.User;
import com.example.buggraveyard.repository.UserRepository;
import com.example.buggraveyard.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest authRequest) {
        // Check if user exists first
        if (!userRepository.findByEmail(authRequest.getEmail()).isPresent()) {
            throw new RuntimeException("User not found");
        }

        // Verify email + password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()
                )
        );

        // Generate JWT
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String token = jwtUtil.generateToken(userDetails);

        return new LoginResponse(token);
    }

    public User register(RegisterRequest request) {
        // Check email duplicate
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getUsername());  // username=name
        user.setPassword_hash(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.USER);
        user.setStatus(User.Status.ACTIVE);
        return userRepository.save(user);
    }
}
