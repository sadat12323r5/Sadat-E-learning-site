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
  const [editedContent, setEditedContent] = useState(""); 
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
        setEditedContent(response.data.content);
        setCurrentVideo(null);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setError("Failed to fetch course details");
      });
  }, [id]);

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
      .then(() => {
        alert("Course content updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating course content:", error);
        alert("Failed to update course content.");
      });
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
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
  ];

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  if (!course) {
    return <div style={{ color: "gray", textAlign: "center" }}>Loading course details...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1 style={{ color: "yellow" }}>{course.name}</h1>

      {/* Course Thumbnail */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={course.thumbnail || "https://via.placeholder.com/400"}
          alt="Course Thumbnail"
          style={{ maxWidth: "400px", borderRadius: "10px" }}
        />
      </div>

      {/* Course Content Editor */}
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

      {/* Video Section */}
      <h3 style={{ marginTop: "40px" }}>Videos:</h3>
      <div>
        {course.videoLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(link)}
            style={{
              margin: "10px",
              padding: "10px",
              backgroundColor: currentVideo === link ? "yellow" : "black",
              color: currentVideo === link ? "black" : "yellow",
              border: "1px solid yellow",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Video {index + 1}
          </button>
        ))}
      </div>

      {/* Video Player */}
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Edit Course Button */}
      <button
        onClick={() => navigate(`/edit-course/${id}`)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Edit Course
      </button>

      {/* Create Quiz Button */}
        <button
          onClick={() => navigate(`/courses/${id}/create-quiz`)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
        }}
      >
        Create Quiz
      </button>

        {/* Take Quiz Button */}
      <button
          onClick={() => navigate(`/courses/${id}/take-quiz`)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "purple",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
      >
        Take Quiz
      </button>


      {/* Back Button */}
      <button
        onClick={() => navigate("/courses")}
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
        Back to Courses
      </button>
    </div>
  );
};

export default CourseDetails;