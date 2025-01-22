import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoLinks, setVideoLinks] = useState([""]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddVideoLink = () => {
    setVideoLinks([...videoLinks, ""]);
  };

  const handleVideoLinkChange = (index, value) => {
    const updatedLinks = [...videoLinks];
    updatedLinks[index] = value;
    setVideoLinks(updatedLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const course = { name, content, thumbnail, videoLinks };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      alert("Course created successfully!");
      navigate("/courses");
    } catch (err) {
      console.error("Error creating course:", err);
      setError(err.message);
    }
  };

  return (
    <div className="create-course-container">
      <h1>Create New Course</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Course Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <div>
          {videoLinks.map((link, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Video Link ${index + 1}`}
              value={link}
              onChange={(e) => handleVideoLinkChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddVideoLink}>
            Add Video Link
          </button>
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;