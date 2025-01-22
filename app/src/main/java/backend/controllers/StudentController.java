package backend.controllers;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import backend.exceptions.InvalidCredentialsException;
import backend.models.Course;
import backend.models.LoginRequest;
import backend.models.Student;
import backend.services.StudentService;
import backend.utils.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private final StudentService studentService;

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Retrieves all students.
     */
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    /**
     * Handles login for students.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {
        try {
            logger.info("Login attempt for user: {}", request.getUsername());
            Student student = studentService.authenticate(request.getUsername(), request.getPassword());
            String token = jwtUtil.generateToken(student.getUsername());
            logger.info("Login successful for user: {}", request.getUsername());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("studentName", student.getName());

            return ResponseEntity.ok(response);

        } catch (InvalidCredentialsException e) {

            logger.warn("Invalid login attempt for user: {}", request.getUsername());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid username or password");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    /**
     * Retrieves a student by their ID.
     */
    @GetMapping("/{id:[0-9]+}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    /**
     * Creates a new student.
     */
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student createdStudent = studentService.saveStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    /**
     * Deletes a student by their ID.
     */
    @DeleteMapping("/{id:[0-9]+}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    /**
     * Updates a student's information.
     */
    @PutMapping("/{id:[0-9]+}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Student student = studentService.updateStudent(id, updatedStudent);
        return ResponseEntity.ok(student);
    }

    /**
     * Retrieves all courses a student is enrolled in.
     */
    @GetMapping("/{id:[0-9]+}/courses")
    public List<Course> getCourses(@PathVariable Long id) {
        return studentService.getEnrolledCourses(id);
    }

    /**
     * Enrolls a student in a course.
     */
    @PutMapping("/{studentId}/enroll/{courseId}")
    public ResponseEntity<String> enrollInCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        studentService.enrollInCourse(studentId, courseId);
        return ResponseEntity.ok("Student enrolled in course successfully!");
    }
}
