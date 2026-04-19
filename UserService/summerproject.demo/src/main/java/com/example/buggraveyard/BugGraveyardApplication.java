package com.example.buggraveyard; // Matches the folder structure

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BugGraveyardApplication { // Capital 'B' for convention

    public static void main(String[] args) {
        SpringApplication.run(BugGraveyardApplication.class, args);
    }

}