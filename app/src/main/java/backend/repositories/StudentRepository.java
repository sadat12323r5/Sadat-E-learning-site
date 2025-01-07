package backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {}
