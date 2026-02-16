package com.example.myproject.util;

import java.security.Key;
import com.example.myproject.model.Account;
import com.example.myproject.repository.AccountRepository;
import com.example.myproject.service.TokenService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class TokenUtil {

    private static final Logger logger = LogManager.getLogger(TokenUtil.class);
    private static final Key key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256); // TODO: Store keys
                                                                                                // centralized and
                                                                                                // securely
    private final AccountRepository accountRepository;

    public TokenUtil(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public static String getEmailFromToken(String token) { // TODO: Make it not static
        Claims claims = Jwts.parser().verifyWith((javax.crypto.SecretKey) key).build().parseSignedClaims(token)
                .getBody();
        ;
        return claims.getSubject();
    }

    public Account getAccountFromToken(String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            Jws<Claims> jws = Jwts.parser().setSigningKey(TokenService.getKey()).build()
                    .parseClaimsJws(token);
            Claims claims = jws.getBody();
            String email = claims.getSubject();
            return this.accountRepository.findByEmail(email);
        } catch (Exception e) {
            logger.warn("Retrieve Account with TokenService failed: {}", e.getMessage());
            return null;
        }
    }
}
