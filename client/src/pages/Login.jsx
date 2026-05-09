import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.message === "Login Successful") {

        localStorage.setItem("isLoggedIn", true);

        navigate("/dashboard");
      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="form-container">

      <form onSubmit={handleLogin} className="form-box">

        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

        <p className="register-text">
          Don't have an account?{" "}

          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;