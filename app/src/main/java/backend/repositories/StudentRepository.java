package backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUsernameAndPassword(String username, String password);
}
