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
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll() // Allow H2 Console
                .requestMatchers(new AntPathRequestMatcher("/login"), new AntPathRequestMatcher("/register")).permitAll() // Public APIs
                .anyRequest().authenticated()) // Secure all other endpoints
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable())); // Fix for H2 Console

        return http.build();
    }
}
