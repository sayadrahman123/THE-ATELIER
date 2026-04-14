package com.theatelier.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AtelierBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(AtelierBackendApplication.class, args);
    }
}
