import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Students from "./Students";
import Login from "./login";
import Courses from "./course";
import CourseDetails from "./CourseDetails";
import ProtectedRoute from "./protectedRoute";
import CreateCourse from "./CreateCourse";
import EditCourse from "./EditCourse";

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
        

        {/* Redirect any unmatched route to /login */}
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
      </Routes>
    </div>
  );
}

export default App;

