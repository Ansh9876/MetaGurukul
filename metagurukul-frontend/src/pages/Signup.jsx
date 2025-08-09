 
import React, { useState } from "react";
import Footer from "../components/Footer";
import MiniNav from "../components/MiniNav";
import '../styles/pages/signup.css';
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      setMessage("Signup successful 🎉");
      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <MiniNav />
      <div className="signup-page">
        <div className="signup-overlay">
          <form className="signup-box" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            <button className="signup-btn" type="submit">Sign Up</button>

            {message && <p style={{ color: "yellow", marginTop: "10px" }}>{message}</p>}

            <p className="login-text">
              Already have an account? <Link to='/login'><span>Sign in now.</span></Link>
            </p>

            <small className="captcha-note">
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="/LearnMore">Learn more.</a>
            </small>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
