import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/courses", {
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "yellow" }}>Sadat's E-learning site</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {courses.map((course) => (
          <Link
            to={`/course/${course.id}`}
            key={course.id}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#333",
                borderRadius: "10px",
                padding: "20px",
                width: "250px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
              }}
            >
              <h2 style={{ color: "yellow" }}>{course.name}</h2>
              <p>{course.content}</p>
              <div>
                {course.videoLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "lightblue", display: "block" }}
                  >
                    Video {index + 1}
                  </a>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;