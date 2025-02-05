import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api";

const CreateQuiz = () => {
  const { id } = useParams(); // Course ID from the URL
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", choices: ["", "", "", "", ""], correctAnswerIndex: 0 },
  ]);
  const [error, setError] = useState("");

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", choices: ["", "", "", "", ""], correctAnswerIndex: 0 },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "text") {
      updatedQuestions[index].text = value;
    } else if (field === "correctAnswerIndex") {
      updatedQuestions[index].correctAnswerIndex = parseInt(value, 10);
    } else {
      updatedQuestions[index].choices[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    if (!quizTitle.trim()) {
      setError("Quiz title cannot be empty");
      return;
    }

    if (questions.some((q) => !q.text.trim() || q.choices.some((c) => !c.trim()))) {
      setError("All fields for questions and choices must be filled");
      return;
    }

    setError("");

    const token = localStorage.getItem("token");
    const payload = { title: quizTitle, questions };

    try {
      await api.post(`/courses/${id}/quiz`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Quiz created successfully!");
      navigate(`/course/${id}`);
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Create Quiz</h1>

      {/* Quiz Title */}
      <div style={{ marginBottom: "20px" }}>
        <label>Quiz Title:</label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Enter quiz title"
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        />
      </div>

      {/* Questions */}
      {questions.map((question, index) => (
        <div
          key={index}
          style={{
            marginBottom: "30px",
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <label>Question {index + 1}:</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(index, "text", e.target.value)
            }
            placeholder="Enter question text"
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />

          {/* Choices */}
          {question.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex} style={{ marginTop: "10px" }}>
              <label>Choice {choiceIndex + 1}:</label>
              <input
                type="text"
                value={choice}
                onChange={(e) =>
                  handleQuestionChange(index, choiceIndex, e.target.value)
                }
                placeholder={`Enter choice ${choiceIndex + 1}`}
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              />
            </div>
          ))}

          {/* Correct Answer */}
          <div style={{ marginTop: "10px" }}>
            <label>Correct Answer:</label>
            <select
              value={question.correctAnswerIndex}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswerIndex", e.target.value)
              }
              style={{ padding: "10px", width: "100%" }}
            >
              {question.choices.map((_, choiceIndex) => (
                <option key={choiceIndex} value={choiceIndex}>
                  Choice {choiceIndex + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Remove Question */}
          <button
            onClick={() => handleRemoveQuestion(index)}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove Question
          </button>
        </div>
      ))}

      {/* Add Question Button */}
      <button
        onClick={handleAddQuestion}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Question
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit Quiz
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate(`/course/${id}`)}
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
        Back to Course
      </button>
    </div>
  );
};

export default CreateQuiz;