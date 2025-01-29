import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [editedContent, setEditedContent] = useState(""); // Editable content
  const navigate = useNavigate();

  // Fetch course details on component mount
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
        setEditedContent(response.data.content); // Initialize content editor with course content
        setCurrentVideo(null);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setError("Failed to fetch course details");
      });
  }, [id]);

  // Handle content save using PATCH
  const handleSaveContent = () => {
    const token = localStorage.getItem("token");

    api
      .patch(
        `/courses/${id}/content`,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Course content updated successfully!");
        setCourse(response.data); // Update course state with new content
      })
      .catch((error) => {
        console.error("Error updating course content:", error);
        alert("Failed to update course content.");
      });
  };

  // ReactQuill editor configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["formula"], // Formula editor for math equations
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
    "formula",
  ];

  // Error handling and loading state
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
      <div style={{ margin: "20px auto", maxWidth: "800px" }}>
        <h3>Edit Course Content:</h3>
        <ReactQuill
          theme="snow"
          value={editedContent}
          onChange={(value) => setEditedContent(value)}
          modules={quillModules}
          formats={quillFormats}
        />
        <button
          onClick={handleSaveContent}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "black",
            color: "yellow",
            border: "1px solid yellow",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Content
        </button>
      </div>
      <h3 style={{ marginTop: "40px" }}>Videos:</h3>
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
                : currentVideo
            }
            title="Course Video"
            style={{ border: "none" }}
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