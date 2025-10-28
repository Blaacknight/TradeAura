// src/landing_page/signup/Login.js

import React, { useState, useContext } from "react"; // Add useContext
import axios from "../../utils/axiosInstance.js";
import GeneralContext from "../../components/GeneralContext.js"; // Import context
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // --- ADDED --- Get loginSuccess from context
  const { loginSuccess } = useContext(GeneralContext); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true);
    try {
      // --- MODIFIED --- Get the response data
      const response = await axios.post("/api/auth/login", form); 

      // --- ADDED --- Update context state *before* navigating
      loginSuccess(response.data.user); 
      
      // Navigate after state is updated
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account to continue</p>

        {error && (
          <div className="error-message show" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ... (form inputs remain the same) ... */}
           <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <div className="checkbox-wrapper">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`auth-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}>
            {!isLoading && "Log In"}
          </button>
        </form>

        <div className="switch-text">
          New user?{" "}
          <Link to="/signup" className="switch-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;