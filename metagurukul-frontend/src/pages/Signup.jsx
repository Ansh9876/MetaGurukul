import React, { useState } from "react";
import Footer from "../components/Footer";
import MiniNav from "../components/MiniNav";
import "../styles/pages/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsNumber: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        whatsNumber: formData.whatsNumber,
      });

      console.log(res.data);

      // ✅ Success Popup
      Swal.fire({
        title: "Signup Successful 🎉",
        text: "Redirecting to login page...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#fff8e7",
        color: "#7d380a",
        timerProgressBar: true,
      });

      // ⏳ Redirect after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Signup failed";
      setMessage(errorMsg);

      // ❌ Error Popup
      Swal.fire({
        title: "Signup Failed",
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#7d380a",
      });
    }
  };

  return (
    <>
      <MiniNav />
      <div className="signup-page">
        <div className="signup-overlay">
          <form className="signup-box" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <input
              type="text"
              name="name"
              placeholder="Username"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="whatsNumber"
              placeholder="WhatsApp Number"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

            <button className="signup-btn" type="submit">
              Sign Up
            </button>

            {message && (
              <p style={{ color: "yellow", marginTop: "10px" }}>{message}</p>
            )}

            <p className="login-text">
              Already have an account?{" "}
              <Link to="/login">
                <span>Sign in now.</span>
              </Link>
            </p>

            <small className="captcha-note">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <a href="/LearnMore">Learn more.</a>
            </small>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
