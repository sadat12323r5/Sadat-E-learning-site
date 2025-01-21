import React, { useEffect, useState } from 'react';
import api from './api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token is not available. Please log in.");
        }
        const response = await api.get('/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
