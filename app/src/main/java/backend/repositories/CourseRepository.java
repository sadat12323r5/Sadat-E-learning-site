package backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.models.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
