package backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"backend"})
public class StudentGradingSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudentGradingSystemApplication.class, args);
    }

    
}
