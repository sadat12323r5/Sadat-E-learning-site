import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Students from './Students';
import Login from "./login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </div>
  );
}

export default App;

