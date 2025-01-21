import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourse(response.data);
        setCurrentVideo(null); // Reset video when the course loads
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setError("Failed to fetch course details");
      });
  }, [id]);

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ color: "gray", textAlign: "center" }}>
        Loading course details...
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "yellow" }}>{course.name}</h1>
      <h3>{course.content}</h3>
      <h3>Videos:</h3>
      <div>
        {course.videoLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(link)}
            style={{
              margin: "10px",
              padding: "10px",
              backgroundColor: "black",
              color: "yellow",
              border: "1px solid yellow",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Video {index + 1}
          </button>
        ))}
      </div>
      {currentVideo && (
        <div style={{ marginTop: "20px" }}>
          <iframe
            width="560"
            height="315"
            src={
              currentVideo.includes("youtube.com/watch")
                ? currentVideo.replace("watch?v=", "embed/")
                : currentVideo.includes("youtu.be/")
                ? currentVideo.replace("youtu.be/", "www.youtube.com/embed/")
                : currentVideo // Use the link as is if it's already in embed format
            }
            title="Course Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <button
        onClick={() => navigate("/courses")}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "black",
          color: "yellow",
          border: "1px solid yellow",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Courses
      </button>
    </div>
  );
};

export default CourseDetails;