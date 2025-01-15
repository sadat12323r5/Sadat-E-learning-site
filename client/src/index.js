import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Students from './Students';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
