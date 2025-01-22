package backend.models;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @NotNull
    @Size(min = 10)
    private String content;

    @NotNull
    @Size(min = 5, max = 255)
    private String thumbnail; // URL of the thumbnail for the course

    @ElementCollection
    private List<String> videoLinks;

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
    
}
