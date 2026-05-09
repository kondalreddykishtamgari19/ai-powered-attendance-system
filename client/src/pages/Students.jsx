import { useEffect, useState } from "react";

function Students() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      });

  }, []);

  return (
    <div className="page-container">

      <h1>Total Students</h1>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student, index) => (

            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Students;