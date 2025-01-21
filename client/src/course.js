import React, { useEffect, useState } from "react";
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
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div style={{ backgroundColor: "#1a1a1a", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px" }}>
        Sadat's E-learning site
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "2px solid white",
              padding: "20px",
              width: "250px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              backgroundColor: "#333",
            }}
          >
            <h3 style={{ margin: "10px 0", color: "#ffd700" }}>{course.name}</h3>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>{course.content}</p>
            <div>
              {course.videoLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", color: "#00bfff", marginBottom: "5px" }}
                >
                  Video {index + 1}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;