package backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll() // Allow H2 Console access
                .requestMatchers(new AntPathRequestMatcher("/login"), new AntPathRequestMatcher("/register")).permitAll() // Allow login and register
                .requestMatchers(new AntPathRequestMatcher("/students")).permitAll() // Allow public access to /students
                .anyRequest().authenticated() // Secure all other endpoints
            )
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable())); // Fix for H2 Console

        return http.build();
    }
}
