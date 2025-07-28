import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      setError("All fields are Required!");
      return;
    }
    try {
      const response = await axios.post(
        "https://miniproject-taskmanager.onrender.com/user/signup",
        {
          fullname,
          email,
          password,
        }
      );
      Navigate("/login");
    } catch (error) {
      setError("User already exists");
      return;
    }
  };
  return (
    <div className="signupBox">
      {error && <div className="error">{error}</div>}
      <div className="signup-form">
        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
