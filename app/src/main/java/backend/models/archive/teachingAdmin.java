package backend.models.archive;
import java.util.List;

import backend.models.Course;
import backend.models.Student;

public class teachingAdmin extends courseAdmin {

	public teachingAdmin(int id, String name, String email) {
		super(id, email, email);
	}

	public Quiz createQuiz() {
		return null;
	}

	public void addCourseContent(Course course, String content) {
	}

	public void removeCourseContent(Course course, String content) {
	}

	public void setGrade(Student student, Course course, int grade) {
	}

}
