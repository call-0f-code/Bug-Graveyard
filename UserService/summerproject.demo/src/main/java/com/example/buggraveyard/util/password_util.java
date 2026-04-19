package com.example.buggraveyard.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class password_util {

    private static final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();
    // in built password hashing tool in springboot

    // convert plain password to hashed password
    public static String hash_password(String raw_password) {
        return encoder.encode(raw_password);
    } // converts given string to a hashed password

    // check if password matches
    public static boolean check_password(String raw_password, String stored_hash) {
        return encoder.matches(raw_password, stored_hash);
    }
    //cannot use .equals because one is string and one is hashed pass.. matches will hash it for us and check
}
