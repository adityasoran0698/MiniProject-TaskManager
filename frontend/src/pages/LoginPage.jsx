import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are Required!");
      return;
    }
    try {
      const response = await axios.post(
        "https://miniproject-taskmanager.onrender.com/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="loginBox">
      {error && <div className="error">{error}</div>}

      <div className="form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            Don't have account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
