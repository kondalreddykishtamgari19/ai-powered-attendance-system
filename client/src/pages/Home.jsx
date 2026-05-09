import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>AI Attendance System</h1>

      <p>Smart Face Recognition Attendance Platform</p>

      <h2>{message}</h2>

      <button onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
}

export default Home;