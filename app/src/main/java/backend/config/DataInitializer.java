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
        course1.setVideoLinks(List.of("https://www.youtube.com/watch?v=grnP3mduZkM", "https://youtu.be/i6sbjtJjJ-A?si=_JDWf5Agrq5wU1ol"));
        course1.setThumbnail("https://www.aaudxp-media.aau.dk/cache/5/5/6/7/7/8/556778b213ebf0d20463bf129c99b7dc2534e1f2.webp");

        Course course2 = new Course();
        course2.setName("Physics 101");
        course2.setContent("Introduction to Mechanics");
        course2.setVideoLinks(List.of("https://www.youtube.com/watch?v=Hj9ewdPxkpU", "https://www.youtube.com/watch?v=oh-_VU8KvLI"));
        course2.setThumbnail("https://i1.sndcdn.com/artworks-000014276299-fiv8oj-t500x500.jpg");

        Course course3 = new Course();
        course3.setName("Electronics 101");
        course3.setContent("Digital and analog circuits");
        course3.setVideoLinks(List.of("https://www.youtube.com/watch?v=M0mx8S05v60", "https://www.youtube.com/watch?v=F5h3z8p9dPg"));
        course3.setThumbnail("https://blog.codinghorror.com/content/images/uploads/2006/04/6a0120a85dcdae970b0120a86d5daa970b-pi.png");
        courseRepository.saveAll(List.of(course1, course2, course3));

        // Create a sample student
        Student student = new Student();
        student.setName("John Doe");
        student.setEmail("john.doe@example.com");
        student.setGrade(90);
        student.setUsername("johndoe");
        student.setPassword("password");
        student.setCourses(List.of(course1, course2, course3));

        studentRepository.save(student);
    }

}
