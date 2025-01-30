import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(""); // New state for course name
  const [thumbnail, setThumbnail] = useState("");
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState("");

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
        setName(response.data.name || ""); // Initialize course name
        setThumbnail(response.data.thumbnail || "");
        setVideos(response.data.videoLinks || []);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setError("Failed to fetch course details");
      });
  }, [id]);

  const handleUpdateCourse = () => {
    const token = localStorage.getItem("token");

    api
      .patch(
        `/courses/${id}/details`,
        { name, thumbnail, videoLinks: videos },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Course updated successfully!");
        navigate(`/course/${id}`);
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        alert("Failed to update course.");
      });
  };

  const handleDeleteCourse = () => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this course?")) {
      api
        .delete(`/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("Course deleted successfully!");
          navigate("/courses");
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
          alert("Failed to delete course.");
        });
    }
  };

  const handleAddVideo = () => {
    if (!newVideo.trim()) {
      alert("Video URL cannot be empty!");
      return;
    }
    setVideos([...videos, newVideo.trim()]);
    setNewVideo("");
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  if (!course) {
    return <div style={{ color: "gray", textAlign: "center" }}>Loading course details...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "yellow" }}>Edit Course</h1>
      <div style={{ marginBottom: "20px" }}>
        <h3>Edit Course Name</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter course name"
          style={{ width: "70%", padding: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h3>Update Thumbnail</h3>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Enter thumbnail URL"
          style={{ width: "70%", padding: "5px" }}
        />
      </div>
      <h3>Manage Videos</h3>
      {videos.map((video, index) => (
        <div key={index}>
          <input type="text" value={video} readOnly style={{ width: "70%" }} />
          <button onClick={() => handleRemoveVideo(index)}>Remove</button>
        </div>
      ))}
      <input
        type="text"
        value={newVideo}
        onChange={(e) => setNewVideo(e.target.value)}
        placeholder="New video URL"
        style={{ width: "70%", padding: "5px" }}
      />
      <button onClick={handleAddVideo}>Add Video</button>

      <br />
      <button onClick={handleUpdateCourse}>Save Changes</button>
      <button onClick={handleDeleteCourse} style={{ backgroundColor: "red", color: "white" }}>
        Delete Course
      </button>
      <button onClick={() => navigate(`/course/${id}`)}>Cancel</button>
    </div>
  );
};

export default EditCourse;