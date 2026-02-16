package com.example.myproject.service;

import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.util.List;
import java.util.ArrayList;
import java.util.function.Function;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

//TODO: Replace Tokenservice with Keycloak

/**
 * Service for managing JSON Web Tokens (JWT), including creation, validation,
 * and handling token blacklisting.
 */
public class TokenService {

	private final static Key key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
	private static final Logger logger = LogManager.getLogger(TokenService.class);
	private List<String> blacklist = new ArrayList<>();

	public static String createToken(String email) {
		Date expirationDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24);
		String token = Jwts.builder()
				.setSubject(email)
				.setExpiration(expirationDate)
				.signWith(key)
				.compact();
		if (isValidToken(token)) {
			logger.info("Token created and validated");
		} else {
			logger.warn("Creation or Validation of Token failed");
		}
		return token;
	}

	public Boolean validateToken(String token, String username) {
		final String usernameInToken = getUsernameFromToken(token);
		return (usernameInToken.equals(username) && !isTokenExpired(token));
	}

	public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	private Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser()
				.verifyWith((javax.crypto.SecretKey) key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	public static boolean isValidToken(String token) {
		try {
			if (token.startsWith("Bearer ")) {
				token = token.substring(7);
			}
			Jwts.parser().verifyWith((javax.crypto.SecretKey) key).build().parseSignedClaims(token);
			return true;
		} catch (ExpiredJwtException ex) {
			// Token abgelaufen
			logger.warn("Token expired: " + ex.getMessage());
			return false;
		} catch (UnsupportedJwtException ex) {
			// Ungültiges TokenService
			logger.warn("Invalid Token: " + ex.getMessage());
			return false;
		} catch (MalformedJwtException ex) {
			// Fehlerhaftes Token
			logger.warn("Incorrect Token: " + ex.getMessage());
			return false;
		} catch (SignatureException ex) {
			// Fehlerhafte Signatur
			logger.warn("Incorrect signature: " + ex.getMessage());
			return false;
		} catch (Exception ex) {
			// Andere Fehler
			logger.warn("Error when validating the token: " + ex.getMessage());
			return false;
		}
	}

	public List<String> addTokenToDeletedList(String token) {
		blacklist.add(token);
		return blacklist;
	}

	public boolean checkTokenToDeletedList(String token) {
		return blacklist.contains(token);
	}

	public static Key getKey() {
		return key;
	}

}