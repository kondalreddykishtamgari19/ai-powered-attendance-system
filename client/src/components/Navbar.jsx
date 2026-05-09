import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2>AI Attendance</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/register">
          Register
        </Link>

        {isLoggedIn && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;