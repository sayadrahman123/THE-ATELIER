package com.theatelier.backend.service;

import com.theatelier.backend.entity.RefreshToken;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.exception.AuthException;
import com.theatelier.backend.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpirationMs;  // milliseconds

    // ── Create a new opaque refresh token ────────────────────────────────

    @Transactional
    public RefreshToken createRefreshToken(User user) {
        RefreshToken token = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiresAt(LocalDateTime.now().plusSeconds(refreshExpirationMs / 1000))
                .revoked(false)
                .build();
        return refreshTokenRepository.save(token);
    }

    // ── Verify + rotate ───────────────────────────────────────────────────
    // Returns the now-revoked OLD token entity (caller creates new token).
    // Throws AuthException for any invalid / expired / revoked state.

    @Transactional
    public RefreshToken verifyAndRotate(String rawToken) {
        RefreshToken stored = refreshTokenRepository.findByToken(rawToken)
                .orElseThrow(() -> new AuthException("Refresh token not found. Please log in again."));

        // ── Reuse detection ───────────────────────────────────────────────
        // A revoked token being submitted = someone is replaying a stolen token.
        // Wipe ALL tokens for this user immediately.
        if (stored.isRevoked()) {
            log.warn("⚠️  Refresh token reuse detected for user {}. Revoking all sessions.",
                    stored.getUser().getEmail());
            refreshTokenRepository.revokeAllByUser(stored.getUser());
            throw new AuthException("Security alert: refresh token reused. All sessions have been terminated. Please log in again.");
        }

        if (stored.isExpired()) {
            // Tidy up the expired record
            refreshTokenRepository.delete(stored);
            throw new AuthException("Refresh token expired. Please log in again.");
        }

        // Mark OLD token as revoked (rotation: used once only)
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        return stored;  // Caller can read stored.getUser()
    }

    // ── Revoke a single token (logout) ────────────────────────────────────

    @Transactional
    public void revokeToken(String rawToken) {
        refreshTokenRepository.findByToken(rawToken).ifPresent(t -> {
            t.setRevoked(true);
            refreshTokenRepository.save(t);
            log.info("Refresh token revoked for user {}", t.getUser().getEmail());
        });
    }

    // ── Revoke ALL tokens for a user (logout-all-devices) ─────────────────

    @Transactional
    public void revokeAllForUser(User user) {
        refreshTokenRepository.revokeAllByUser(user);
        log.info("All refresh tokens revoked for {}", user.getEmail());
    }

    // ── Scheduled cleanup every 24 hours ─────────────────────────────────

    @Scheduled(cron = "0 0 3 * * *")  // 3 AM daily
    @Transactional
    public void cleanupExpiredTokens() {
        refreshTokenRepository.deleteExpiredAndRevoked(LocalDateTime.now());
        log.info("Cleaned up expired/revoked refresh tokens");
    }
}
