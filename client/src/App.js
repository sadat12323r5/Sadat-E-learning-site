import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Students from './Students';
import Login from "./login";
import Courses from "./course";
import CourseDetails from "./CourseDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>
    </div>
  );
}

export default App;

