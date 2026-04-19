package com.example.buggraveyard.service;

import com.example.buggraveyard.entity.User;
import com.example.buggraveyard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new UsernameNotFoundException("User not found: " + email);
        }
    }

    public User saveUser(User user) {
        user.setPassword_hash(passwordEncoder.encode(user.getPassword_hash()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User getCurrentUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    public User updateUser(String id, User userDetails) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (userDetails.getName() != null) {
                user.setName(userDetails.getName());
            }
            return userRepository.save(user);
        }
        return null;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
