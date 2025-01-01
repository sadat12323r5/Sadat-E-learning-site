package backend.models;
import java.util.List;

public class Course {
    private Long id; // Unique ID for the course
    private String name; // Name of the course

    private List<String> content;
    private List<Long> videoIds;
    private List<courseAdmin> admins;
    private List<Quiz> quizzes;

    public Course(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Course(Long id, String name, List<String> content, List<Long> videoIds, List<courseAdmin> admins) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.videoIds = videoIds;
        this.admins = admins;
    }

    public void addVideoId(Long videoId) {
        this.videoIds.add(videoId);
    }

    public void removeVideoId(Long videoId) {
        this.videoIds.remove(videoId);
    }

    public void addAdmin(courseAdmin admin) {
        this.admins.add(admin);
    }

    public void removeAdmin(courseAdmin admin) {
        this.admins.remove(admin);
    }

    public void addQuiz(Quiz quiz) {
        this.quizzes.add(quiz);
    }

    public void removeQuiz(Quiz quiz) {
        this.quizzes.remove(quiz);
    }
}
