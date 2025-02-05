package backend.services;

import backend.models.Course;
import backend.models.Quiz;
import backend.models.Question;

import backend.repositories.CourseRepository;
import backend.exceptions.ResourceNotFoundException;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + id));
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        return courseRepository.findById(id).map(course -> {
            course.setName(updatedCourse.getName());
            course.setContent(updatedCourse.getContent());
            course.setVideoLinks(updatedCourse.getVideoLinks());
            course.setThumbnail(updatedCourse.getThumbnail());
            return courseRepository.save(course);
        }).orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + id));
    }

    public Course updateCourseContent(Long id, String newContent) {
        Course existingCourse = courseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + id));
        
        existingCourse.setContent(newContent);
        return courseRepository.save(existingCourse);
    }


    // Update course name, thumbnail, and video links
    public Course updateCourseDetails(Long id, String name, String thumbnail, List<String> videoLinks) {
        Course existingCourse = getCourseById(id);

        if (name != null && !name.isBlank()) {
            existingCourse.setName(name);
        }
        if (thumbnail != null && !thumbnail.isBlank()) {
            existingCourse.setThumbnail(thumbnail);
        }
        if (videoLinks != null) {
            existingCourse.setVideoLinks(videoLinks);
        }

        return courseRepository.save(existingCourse);
    }

    // New Methods

    public Quiz createQuizForCourse(Long courseId, Quiz quiz) {
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + courseId));
    
        // Set the reference for the questions to the quiz
        for (Question question : quiz.getQuestions()) {
            question.setQuiz(quiz);
        }

        // Associate the quiz with the course and save
        course.setQuiz(quiz);
        courseRepository.save(course);

        // Return the saved course's quiz, ensuring it's refreshed
        Course updatedCourse = courseRepository.findById(courseId)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found after saving quiz with id " + courseId));
        return updatedCourse.getQuiz();
    }

    public Quiz getQuizByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + courseId));
        return course.getQuiz();
    }

    public Map<String, Object> submitQuiz(Long courseId, Map<Long, Integer> answers) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + courseId));
    
        Quiz quiz = course.getQuiz();
        if (quiz == null) {
            throw new ResourceNotFoundException("Quiz not found for the course with id " + courseId);
        }
    
        int score = 0;
        int totalQuestions = quiz.getQuestions().size();
        List<Map<String, Object>> details = new ArrayList<>();
    
        for (Question question : quiz.getQuestions()) {
            int submittedAnswer = answers.getOrDefault(question.getId(), -1);
            boolean isCorrect = question.getCorrectAnswerIndex() == submittedAnswer;
    
            if (isCorrect) {
                score++;
            }
    
            Map<String, Object> questionResult = new HashMap<>();
            questionResult.put("questionId", question.getId());
            questionResult.put("isCorrect", isCorrect);
            details.add(questionResult);
        }
    
        Map<String, Object> result = new HashMap<>();
        result.put("score", score);
        result.put("totalQuestions", totalQuestions);
        result.put("details", details);
    
        return result;
    }
    

}