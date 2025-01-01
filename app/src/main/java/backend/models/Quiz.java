package backend.models;
import java.util.List;

public class Quiz {
    private List<String> Questions;
    private List<String> Answers;

    public Quiz(List<String> questions) {
        Questions = questions;
    }

}
