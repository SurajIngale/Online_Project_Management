import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import EyeIcon from "/hide-password.svg"; // Assuming you have the eye.svg in the same directory

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (!email || !password) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(response.error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError(""); 
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError(""); 
    }
  };

  return (
    <div className="login-container">
      <img className="logo" src="/Logo.svg" alt="Logo" />
      <div className="logo-name">Online Project Management</div>
      <div className="login-box">
        <p>Login to get Started</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className={emailError ? "label-error" : ""}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={emailError ? "input-error" : ""}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
              className={passwordError ? "label-error" : ""}
            >
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={passwordError ? "input-error" : ""}
              />
              <img
                src={EyeIcon}
                alt="Toggle Password Visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              />
            </div>
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
