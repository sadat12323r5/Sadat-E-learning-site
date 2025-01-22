import React, { useEffect, useState } from "react"; 
import api from "./api";
import "./course.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const studentName = localStorage.getItem("studentName"); // Retrieve student name from localStorage

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses");
      });
  }, []);

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>{error}</div>
    );
  }

  return (
  <div className="courses-container">
    <div className="header">Sadat's E-learning Site</div>
    <div className="greeting"> Hi, {studentName}!</div>
    <div className="courses-grid">
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <img
            src={course.thumbnail || "https://via.placeholder.com/300"}
            alt={`${course.name} Thumbnail`}
            className="course-thumbnail"
          />
          <div className="course-content">
            <h2>{course.name}</h2>
            <p>{course.content}</p>
            <a href={`/course/${course.id}`} className="course-link">
              View Details
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Courses;