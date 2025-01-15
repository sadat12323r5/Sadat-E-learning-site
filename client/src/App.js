import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [students, setStudents] = useState([]);

    // Fetch students from the backend
    useEffect(() => {
        axios.get("http://localhost:8080/students")
            .then(response => {
                setStudents(response.data); // Set students in state
            })
            .catch(error => {
                console.error("Error fetching students:", error);
            });
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;