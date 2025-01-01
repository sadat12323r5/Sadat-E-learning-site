package backend.models;
import java.util.List;

public class Student {
    public int id;
    public String name;
    public String email;
    public List<Course> courses;

    public Student(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public void takeQuiz(Course course) {
    }

    public void viewContent(Course course) {
    }
}
