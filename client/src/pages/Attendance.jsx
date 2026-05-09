import { useEffect, useState } from "react";

function Attendance() {

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/attendance")
      .then((response) => response.json())
      .then((data) => {
        setAttendance(data);
      });

  }, []);

  return (
    <div className="page-container">

      <h1>Daily Attendance Records</h1>

      <table>

        <thead>
          <tr>
            <th>Student Name</th>
            <th>Attendance Time</th>
          </tr>
        </thead>

        <tbody>

          {attendance.map((student, index) => (

            <tr key={index}>
              <td>{student.Name}</td>
              <td>{student.Time}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Attendance;