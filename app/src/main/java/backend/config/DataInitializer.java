package backend.config;
import backend.models.Course;
import backend.models.Student;
import backend.repositories.CourseRepository;
import backend.repositories.StudentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostConstruct
    public void init() {
        // Create sample courses
        Course course1 = new Course();
        course1.setName("Math 101");
        course1.setContent("Introduction to Algebra");
        course1.setVideoLinks(List.of("https://example.com/video1", "https://example.com/video2"));

        Course course2 = new Course();
        course2.setName("Physics 101");
        course2.setContent("Introduction to Mechanics");
        course2.setVideoLinks(List.of("https://example.com/video3", "https://example.com/video4"));

        courseRepository.saveAll(List.of(course1, course2));

        // Create a sample student
        Student student = new Student();
        student.setName("John Doe");
        student.setEmail("john.doe@example.com");
        student.setGrade(90);
        student.setUsername("johndoe");
        student.setPassword("password");
        student.setCourses(List.of(course1, course2));

        studentRepository.save(student);
    }
    
}
