import React, { useEffect, useState } from 'react';
import api from './api';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    api.get('/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Students;