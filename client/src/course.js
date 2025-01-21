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
    <div style={styles.container}>
      <h1 style={styles.title}>Sadat's E-learning site</h1>
      <div style={styles.grid}>
        {courses.map((course) => (
          <div key={course.id} style={styles.card}>
            <h2 style={styles.courseTitle}>{course.name}</h2>
            <p>{course.content}</p>
            {course.videoLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                Video {index + 1}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#ffdd57",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
  },
  card: {
    backgroundColor: "#2b2b2b",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  courseTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#ffd700",
  },
  link: {
    display: "block",
    marginTop: "10px",
    color: "#1e90ff",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  linkHover: {
    color: "#87cefa",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  },
};

export default Courses;