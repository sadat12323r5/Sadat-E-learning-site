import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Students from './Students';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Students />} />
    </Routes>
  );
}

export default App;

