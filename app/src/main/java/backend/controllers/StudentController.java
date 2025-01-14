package backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import backend.models.Course;
import backend.models.LoginRequest;
import backend.models.Student;
import backend.services.StudentService;
import backend.utils.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private final StudentService studentService;

    @Autowired
    private JwtUtil jwtUtil;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Student student = studentService.updateStudent(id, updatedStudent);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/{id}/courses")
    public List<Course> getCourses(@PathVariable Long id) {
        return studentService.getEnrolledCourses(id);
    }

    @PutMapping("/{studentId}/enroll/{courseId}")
    public ResponseEntity<String> enrollInCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        studentService.enrollInCourse(studentId, courseId);
        return ResponseEntity.ok("Student enrolled in course successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Student student = studentService.authenticate(request.getUsername(), request.getPassword());
        String token = jwtUtil.generateToken(student.getUsername());
        return ResponseEntity.ok(token);
    }
}
