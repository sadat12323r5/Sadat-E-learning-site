package backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtRequestFilter jwtRequestFilter) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity (only if necessary)
            .cors(withDefaults()) // Enable CORS with defaults (ensure CorsConfig is correctly set)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll() // Allow access to H2 console
                .requestMatchers(new AntPathRequestMatcher("/students/login")).permitAll() // Allow public login access
                .requestMatchers(new AntPathRequestMatcher("/courses")).authenticated() // Allow public login access
                .requestMatchers(new AntPathRequestMatcher("/courses/**")).authenticated() // Allow public login access
                .requestMatchers(new AntPathRequestMatcher("/students/**")).authenticated() // Protect all other endpoints
            )
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class) // Add the JWT filter
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin())); // Allow frames for H2 console
        return http.build();
    }
}
