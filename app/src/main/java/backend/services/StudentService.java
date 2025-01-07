package backend.services;

import backend.models.Student;
import backend.repositories.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import backend.exceptions.ResourceNotFoundException;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
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
}
