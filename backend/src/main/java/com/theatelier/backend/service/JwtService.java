package com.theatelier.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    // ── Token Generation ─────────────────────────────────────────────────

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails, jwtExpiration);
    }

    // NOTE: Refresh tokens are now opaque UUIDs managed by RefreshTokenService (DB-backed).
    // This service only issues short-lived ACCESS JWTs.

    private String generateToken(Map<String, Object> extraClaims,
                                  UserDetails userDetails,
                                  long expiration) {
        return Jwts.builder()
                .claims(extraClaims)                              // 0.12: claims() not setClaims()
                .subject(userDetails.getUsername())               // 0.12: subject() not setSubject()
                .issuedAt(new Date(System.currentTimeMillis()))   // 0.12: issuedAt() not setIssuedAt()
                .expiration(new Date(System.currentTimeMillis() + expiration)) // 0.12: expiration()
                .signWith(getSigningKey())                        // 0.12: key only, algorithm inferred
                .compact();
    }

    // ── Token Validation ─────────────────────────────────────────────────

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ── Claims Extraction ────────────────────────────────────────────────

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()                          // 0.12: parser() not parserBuilder()
                .verifyWith(getSigningKey())           // 0.12: verifyWith() not setSigningKey()
                .build()
                .parseSignedClaims(token)             // 0.12: parseSignedClaims() not parseClaimsJws()
                .getPayload();                        // 0.12: getPayload() not getBody()
    }

    // ── Signing Key ───────────────────────────────────────────────────────

    private SecretKey getSigningKey() {              // 0.12: returns SecretKey not Key
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
