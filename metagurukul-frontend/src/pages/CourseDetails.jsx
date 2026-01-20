import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/layout";
import axios from "axios";
import "../styles/pages/admin/coursedetails.css";
import { FaArrowLeft, FaPlay, FaLock } from "react-icons/fa";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [hasAccess, setHasAccess] = useState(true);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // ✅ Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://metagurukul1.onrender.com/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  // ✅ Check user access (demo)
  useEffect(() => {
    const checkAccess = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("https://metagurukul1.onrender.com/api/users/access-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasAccess(res.data.hasFullAccess);
      } catch (err) {
        console.error("Error checking access:", err);
      }
    };
    checkAccess();
  }, []);

  if (!course)
    return (
      <Layout>
        <div className="loading-container">
          <p>Loading course details...</p>
        </div>
      </Layout>
    );

  const handleWatchNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!hasAccess) return;

    // If free → go directly
    if (!course.isPaid) {
      navigate(`/watch/${course._id}`);
    } else {
      // Paid → show payment modal
      setShowPaymentPopup(true);
    }
  };

  const handlePaymentConfirm = () => {
    setShowPaymentPopup(false);
    navigate(`/watch/${course._id}`);
  };

  return (
    <Layout>
      <div className="course-detail-container">
        <button className="back-btn-top" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>

        <div className="course-banner">
          <img
            src={
              course.coverImage ||
              "https://via.placeholder.com/1200x600?text=Course+Image"
            }
            alt={course.title}
            className="course-banner-img"
          />
          <div className="course-banner-overlay" />
          <div className="course-banner-text">
            <h1 className="course-title">{course.title}</h1>
            <p className="course-subtitle">{course.description}</p>

            {/* ✅ Access Control */}
            {!hasAccess ? (
              <div className="restricted-box">
                <FaLock style={{ fontSize: "22px", color: "#ff5555" }} />
                <p>Access temporarily restricted.</p>
                <p style={{ fontSize: "14px", color: "#ccc" }}>
                  Please contact the administrator.
                </p>
              </div>
            ) : course.isPaid ? (
              <div className="paid-box">
                <h3 className="price">₹{course.price}</h3>
                <button
                  className="buy-btn"
                  onClick={() => setShowPaymentPopup(true)}
                >
                  Buy Course
                </button>
              </div>
            ) : (
              <button className="start-btn" onClick={handleWatchNow}>
                <FaPlay /> Start Course
              </button>
            )}

            {/* Progress Bar */}
            <div className="progress-wrapper">
              <p>Progress: {progress}%</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info Section */}
        <div className="course-info-section">
          <h2>About this course</h2>
          <ul>
            <li>Instructor: {course.instructor || "MetaGurukul Mentor"}</li>
            <li>Category: {course.tags?.join(", ") || "General"}</li>
            <li>Duration: {course.duration || "Approx. 3 hours"}</li>
            <li>Language: {course.language || "English / Marathi"}</li>
            <li>Includes: Recorded sessions, quizzes, and notes</li>
          </ul>
        </div>
      </div>

      {/* ✅ Payment Popup Modal */}
      {showPaymentPopup && (
        <div className="payment-popup-overlay">
          <div className="payment-popup">
            <h3>Confirm Purchase</h3>
            <p>
              This course costs <strong>₹{course.price}</strong>. <br />
              Proceed with payment?
            </p>
            <div className="popup-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowPaymentPopup(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={handlePaymentConfirm}>
                Pay & Access
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CourseDetail;
