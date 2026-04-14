package com.theatelier.backend.service;

import com.theatelier.backend.dto.request.LoginRequest;
import com.theatelier.backend.dto.request.RefreshTokenRequest;
import com.theatelier.backend.dto.request.RegisterRequest;
import com.theatelier.backend.dto.response.AuthResponse;
import com.theatelier.backend.entity.RefreshToken;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.exception.AuthException;
import com.theatelier.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository        userRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtService            jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService   refreshTokenService;

    // ── Register ──────────────────────────────────────────────────────────

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException("An account with this email already exists.");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.CUSTOMER)
                .build();
        userRepository.save(user);

        return issueTokens(user);
    }

    // ── Login ─────────────────────────────────────────────────────────────

    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("User not found."));

        return issueTokens(user);
    }

    // ── Refresh ───────────────────────────────────────────────────────────
    // 1. Verify + rotate the old opaque refresh token (DB lookup)
    // 2. Issue new access JWT + new opaque refresh token

    @Transactional
    public AuthResponse refresh(RefreshTokenRequest request) {
        // verifyAndRotate throws AuthException on invalid/expired/reused token
        RefreshToken oldToken = refreshTokenService.verifyAndRotate(request.getRefreshToken());
        User user = oldToken.getUser();

        // Issue brand-new access JWT + new refresh token
        return issueTokens(user);
    }

    // ── Logout ────────────────────────────────────────────────────────────
    // Revoke the supplied refresh token in DB (access JWTs expire naturally).

    @Transactional
    public void logout(RefreshTokenRequest request) {
        refreshTokenService.revokeToken(request.getRefreshToken());
    }

    // ── Logout All Devices ────────────────────────────────────────────────

    @Transactional
    public void logoutAll(String email) {
        userRepository.findByEmail(email).ifPresent(refreshTokenService::revokeAllForUser);
    }

    // ── Private Helpers ───────────────────────────────────────────────────

    private AuthResponse issueTokens(User user) {
        String accessToken          = jwtService.generateToken(user);
        RefreshToken refreshToken   = refreshTokenService.createRefreshToken(user);

        log.info("Tokens issued for {}", user.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())  // opaque UUID (not JWT)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
