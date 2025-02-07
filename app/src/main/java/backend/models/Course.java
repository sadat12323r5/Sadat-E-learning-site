package backend.models;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique ID for the course

    @NotNull
    @Size(min = 3, max = 50)
    private String name; // Name of the course

    @Lob // Use a Large Object to store larger data
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @NotNull
    @Size(min = 5, max = 255)
    private String thumbnail; // URL of the thumbnail for the course

    @ElementCollection
    private List<String> videoLinks;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz; // Associated quiz for the course

    public List<String> getVideoLinks() {
        return videoLinks;
    }

    public void setVideoLinks(List<String> videoLinks) {
        this.videoLinks = videoLinks;
    }

    public Course() {
    }

    public Course(String name, String writtenContent, List<String> videoLinks, String thumbnail) {
        this.name = name;
        this.content = writtenContent;
        this.videoLinks = videoLinks;
        this.thumbnail = thumbnail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}

