import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api";

const TakeQuiz = () => {
  const { id } = useParams(); // Course ID
  const [quiz, setQuiz] = useState(null); // Store the quiz
  const [answers, setAnswers] = useState({}); // Store user answers
  const [results, setResults] = useState(null); // Store results after submission
  const [error, setError] = useState(null); // Handle errors
  const navigate = useNavigate();

  // Fetch the quiz data
  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/courses/${id}/quiz`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((err) => {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz. Please try again later.");
      });
  }, [id]);

  // Handle answer selection
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  // Submit the quiz
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    api
      .post(
        `/courses/${id}/quiz/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setResults(response.data);
      })
      .catch((err) => {
        console.error("Error submitting quiz:", err);
        setError("Failed to submit quiz. Please try again later.");
      });
  };

  // Render results if quiz is submitted
  if (results) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Quiz Results</h1>
        <p>Score: {results.score} / {results.totalQuestions}</p>
        <h3>Details:</h3>
        <ul>
          {results.details.map((detail, index) => (
            <li key={index}>
              Question ID: {detail.questionId} -{" "}
              {detail.isCorrect ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate(`/course/${id}`)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "black",
            color: "yellow",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Course
        </button>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  if (!quiz) {
    return (
      <div style={{ textAlign: "center", color: "gray" }}>
        Loading quiz...
      </div>
    );
  }

  // Render the quiz
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((question) => (
        <div key={question.id} style={{ margin: "20px 0" }}>
          <h3>{question.text}</h3>
          {question.choices.map((choice, index) => (
            <label key={index} style={{ display: "block", margin: "10px 0" }}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={index}
                checked={answers[question.id] === index}
                onChange={() => handleAnswerChange(question.id, index)}
              />
              {choice}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default TakeQuiz;
