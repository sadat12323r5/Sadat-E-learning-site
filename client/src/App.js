import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Students from "./Students";
import Login from "./login";
import Courses from "./course";
import CourseDetails from "./CourseDetails";
import ProtectedRoute from "./protectedRoute";
import CreateCourse from "./CreateCourse";
import EditCourse from "./EditCourse";
import CreateQuiz from "./CreateQuiz"; // Import the CreateQuiz component
import TakeQuiz from "./TakeQuiz";

function App() {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-course/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id/create-quiz"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/:id/take-quiz"
          element={
           <ProtectedRoute>
            <TakeQuiz />
          </ProtectedRoute>
          }
        />


      </Routes>
    </div>
  );
}

export default App;

