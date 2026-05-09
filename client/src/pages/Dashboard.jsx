import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
  });

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {

      alert("Please Login First");

      navigate("/login");

      return;
    }

    fetch("http://localhost:5000/api/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      });

    fetch("http://localhost:5000/api/attendance")
      .then((response) => response.json())
      .then((data) => {
        setAttendance(data);
      });

  }, [navigate]);

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  // Weekly Graph Data
  const weeklyData = [
    { day: "Mon", attendance: 12 },
    { day: "Tue", attendance: 18 },
    { day: "Wed", attendance: 10 },
    { day: "Thu", attendance: 22 },
    { day: "Fri", attendance: 16 },
    { day: "Sat", attendance: 25 },
    { day: "Sun", attendance: 8 },
  ];

  // Monthly Graph Data
  const monthlyData = [
    { month: "Jan", attendance: 120 },
    { month: "Feb", attendance: 140 },
    { month: "Mar", attendance: 170 },
    { month: "Apr", attendance: 150 },
    { month: "May", attendance: 190 },
    { month: "Jun", attendance: 210 },
  ];

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>AI Attendance</h2>

        <ul>

          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/students">
              Students
            </Link>
          </li>

          <li>
            <Link to="/attendance">
              Attendance
            </Link>
          </li>

          <li onClick={handleLogout}>
            Logout
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="dashboard-content">

        <h1>Dashboard Overview</h1>

        {/* Cards */}
        <div className="card-container">

          <div className="dashboard-card">

            <h2>{stats.totalStudents}</h2>

            <p>Total Students</p>

          </div>

          <div className="dashboard-card">

            <h2>{attendance.length}</h2>

            <p>Present Today</p>

          </div>

          <div className="dashboard-card">

            <h2>
              {stats.totalStudents - attendance.length}
            </h2>

            <p>Absent Today</p>

          </div>

        </div>

        {/* Graph Section */}
        <div className="graph-section">

          {/* Weekly Graph */}
          <div className="graph-card">

            <h2>
              Weekly Attendance Report
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={weeklyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="attendance"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Monthly Graph */}
          <div className="graph-card">

            <h2>
              Monthly Attendance Report
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#16a34a"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Attendance Table */}
        <div className="attendance-section">

          <h2>Attendance Records</h2>

          <table>

            <thead>

              <tr>
                <th>Student Name</th>
                <th>Attendance Time</th>
              </tr>

            </thead>

            <tbody>

              {attendance.map(
                (student, index) => (

                  <tr key={index}>

                    <td>
                      {student.Name}
                    </td>

                    <td>
                      {student.Time}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;