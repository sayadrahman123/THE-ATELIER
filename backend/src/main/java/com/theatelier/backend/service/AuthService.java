package com.theatelier.backend.service;

import com.theatelier.backend.dto.request.LoginRequest;
import com.theatelier.backend.dto.request.RefreshTokenRequest;
import com.theatelier.backend.dto.request.RegisterRequest;
import com.theatelier.backend.dto.response.AuthResponse;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.exception.AuthException;
import com.theatelier.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // ── Register ─────────────────────────────────────────────────────────

    public AuthResponse register(RegisterRequest request) {
        // Guard: duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException("An account with this email already exists");
        }

        // Build and save user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.CUSTOMER)
                .build();

        userRepository.save(user);

        // Generate tokens
        String accessToken  = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return buildAuthResponse(user, accessToken, refreshToken);
    }

    // ── Login ─────────────────────────────────────────────────────────────

    public AuthResponse login(LoginRequest request) {
        // Spring Security will throw BadCredentialsException if wrong
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("User not found"));

        String accessToken  = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return buildAuthResponse(user, accessToken, refreshToken);
    }

    // ── Refresh Token ─────────────────────────────────────────────────────

    public AuthResponse refresh(RefreshTokenRequest request) {
        String email = jwtService.extractUsername(request.getRefreshToken());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException("User not found"));

        if (!jwtService.isTokenValid(request.getRefreshToken(), user)) {
            throw new AuthException("Refresh token is invalid or expired. Please log in again.");
        }

        String newAccessToken  = jwtService.generateToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        return buildAuthResponse(user, newAccessToken, newRefreshToken);
    }

    // ── Private Helpers ───────────────────────────────────────────────────

    private AuthResponse buildAuthResponse(User user, String accessToken, String refreshToken) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
