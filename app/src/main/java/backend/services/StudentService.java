package backend.services;

import backend.models.Course;
import backend.models.Student;
import backend.repositories.CourseRepository;
import backend.repositories.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import backend.exceptions.ResourceNotFoundException;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public StudentService(StudentRepository studentRepository, CourseRepository courseRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }   

    public Student login(String username, String password) {
        return studentRepository.findByUsernameAndPassword(username, password).orElse(null);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setGrade(updatedStudent.getGrade());
            return studentRepository.save(student);
        }).orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + id));
    }

    public List<Course> getEnrolledCourses(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
            () -> new ResourceNotFoundException("Student not found with id " + studentId)
        );
        return student.getCourses();
    }

    public void enrollInCourse(Long studentId, Long courseId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + studentId));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + courseId));
        student.getCourses().add(course);
        studentRepository.save(student);
    }
}
