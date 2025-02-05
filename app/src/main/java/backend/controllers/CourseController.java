package backend.controllers;

import backend.exceptions.ResourceNotFoundException;
import backend.models.Course;
import backend.models.Quiz;
import backend.models.Question;
import backend.services.CourseService;
import backend.repositories.CourseRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;
    private final CourseRepository courseRepository;

    public CourseController(CourseService courseService, CourseRepository courseRepository) {
        this.courseService = courseService;
        this.courseRepository = courseRepository;
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

    @PatchMapping("/{id}/content")
    public ResponseEntity<Course> updateCourseContent(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String newContent = requestBody.get("content");
        if (newContent == null || newContent.isBlank()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }
        Course updatedCourse = courseService.updateCourseContent(id, newContent);
        return ResponseEntity.ok(updatedCourse);
    }

    @PatchMapping("/{id}/details")
    public ResponseEntity<Course> updateCourseDetails(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        String name = (String) requestBody.get("name");
        String thumbnail = (String) requestBody.get("thumbnail");
        ObjectMapper objectMapper = new ObjectMapper();
        List<String> videoLinks = objectMapper.convertValue(requestBody.get("videoLinks"), new TypeReference<List<String>>() {});
        Course updatedCourse = courseService.updateCourseDetails(id, name, thumbnail, videoLinks);
        return ResponseEntity.ok(updatedCourse);
    }

    // New Endpoints

    @PostMapping("/{courseId}/quiz")
    public ResponseEntity<Quiz> createQuiz(@PathVariable Long courseId, @RequestBody Quiz quiz) {
        Quiz createdQuiz = courseService.createQuizForCourse(courseId, quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuiz);
    }

    @GetMapping("/{courseId}/quiz")
    public ResponseEntity<Quiz> getQuizByCourse(@PathVariable Long courseId) {
        Quiz quiz = courseService.getQuizByCourse(courseId);
        return ResponseEntity.ok(quiz);
    }

    @PostMapping("/{courseId}/quiz/submit")
    public ResponseEntity<Map<String, Object>> submitQuiz(
        @PathVariable Long courseId,
        @RequestBody Map<String, Map<String, Integer>> requestBody) {
    
        // Extract the "answers" object
        Map<String, Integer> answersAsStringKeys = requestBody.get("answers");

        // Convert keys from String to Long
        Map<Long, Integer> answers = new HashMap<>();
        for (Map.Entry<String, Integer> entry : answersAsStringKeys.entrySet()) {
            try {
                Long questionId = Long.parseLong(entry.getKey());
                answers.put(questionId, entry.getValue());
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid question ID: " + entry.getKey());
            }
        }

        // Call the service to process the quiz submission
        Map<String, Object> result = courseService.submitQuiz(courseId, answers);
        return ResponseEntity.ok(result);
    }
}
