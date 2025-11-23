import React, { useState } from "react";
import Footer from "../components/Footer";
import MiniNav from "../components/MiniNav";
import '../styles/pages/login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

       
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", email);
      localStorage.setItem("name", res.data.name);

      setMessage("Login successful 🎉");

      setTimeout(() => {
        if (res.data.role === "admin") {
          navigate("/admin-dashboard"); 
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <>
      <MiniNav />
      <div className="login-page img">
        <div className="login-overlay">
          <div className="login-box">
            <h1>Sign In</h1>

            <input
              type="text"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="sign-in-btn" onClick={handleLogin}>
              Sign In
            </button>

            {message && <p style={{ color: "yellow", marginTop: "10px" }}>{message}</p>}

            <div className="or">OR</div>

            <button className="signin-code-btn">Use a sign-in code</button>

            <a href="/forgotPass" className="forgot">Forgot password?</a>

            <div className="remember-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <p className="signup-text">
              New to MetaGurukul? <Link to='/signup'><span>Sign up now.</span></Link>
            </p>

            <small className="captcha-note">
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="/learnMore">Learn more.</a>
            </small>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
