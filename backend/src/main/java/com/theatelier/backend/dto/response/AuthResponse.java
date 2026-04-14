package com.theatelier.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String refreshToken;

    // Embedded user info — no need for separate /me endpoint on login
    private Long userId;
    private String name;
    private String email;
    private String role;
}
