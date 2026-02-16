package com.example.myproject.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
// import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

/**
 * Configures security settings for the application, including HTTP security,
 * request authorization, and password encoding. It defines a security filter
 * chain
 * that applies various security measures such as authentication and
 * authorization
 * for HTTP requests.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger logger = LogManager.getLogger(SecurityConfig.class);

    /**
     * Defines the security filter chain that applies security configurations to
     * HTTP requests.
     * This method configures endpoint access permissions, requiring authentication
     * for most requests
     * while allowing unrestricted access to specified public endpoints. It sets up
     * basic authentication,
     * disables CSRF protection for API compatibility, and enforces stateless
     * session management.
     *
     * @param http HttpSecurity configuration object used to customize security
     *             configurations.
     * @return The configured SecurityFilterChain.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Using DSL for explicit configuration
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                        .requestMatchers("/actuator/**").hasRole("ADMIN")
                        .requestMatchers("/api/**", "/actuator/**", "/login", "/register", "/blog", "/aboutMe", "/",
                                "/aboutThisWebsite", "/techInsights", "/latestPosts", "/contactMe",
                                "/imprint", "/api/getBlogs", "/api/downloadPDF/**")
                        .permitAll() // Anpassung der Zugriffserlaubnis TODO: Zugriffe
                        .anyRequest().authenticated() // Anforderung der Authentifizierung für alle anderen Anfragen
                )
                .httpBasic(withDefaults()) // Einrichtung der Basisauthentifizierung, kann durch JWT-Authentifizierung
                                           // ersetzt werden
                // Standardmäßige CSRF-Protektion ist für APIs, die von nicht browserbasierten
                // Clients konsumiert werden, oft deaktiviert
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Konfiguration
                                                                                                               // für
                                                                                                               // stateless
                                                                                                               // Anwendungen

        return http.build();
    }

    /**
     * Creates a bean for encoding passwords using the BCrypt hashing algorithm.
     * This encoder is used throughout the application for password encryption and
     * verification.
     *
     * @return A PasswordEncoder instance using BCrypt hashing.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}