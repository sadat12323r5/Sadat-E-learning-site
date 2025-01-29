package backend.controllers;

import backend.models.Course;
import backend.services.CourseService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course createdCourse = courseService.saveCourse(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        Course course = courseService.updateCourse(id, updatedCourse);
        return ResponseEntity.ok(course);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Course deleted successfully!");
    }

    @PatchMapping("/{id}/content")
    public ResponseEntity<Course> updateCourseContent(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String newContent = requestBody.get("content");
        if (newContent == null || newContent.isBlank()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }
        Course updatedCourse = courseService.updateCourseContent(id, newContent);
        return ResponseEntity.ok(updatedCourse);
    }
}
