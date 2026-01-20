import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import navigate hook
import Layout from "../layouts/layout";
import axios from "axios";
import "../styles/pages/home.css";


import { FaVideo, FaBookOpen, FaUserTie, FaClock } from "react-icons/fa";

const Home = () => {
  const [latestCourses, setLatestCourses] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://metagurukul1.onrender.com/api/courses");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestCourses(sorted.slice(0, 4)); // show latest 4
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Layout>
      <section className="hero">
        <div className="hero-overlay"></div>
        <img src="/login-bg.jpg" alt="Hero Background" className="hero-image" />

        <div className="hero-content">
          <span className="brand">
            Meta<span className="highlight">Gurukul</span>
          </span>
          <h3>Your Ultimate Streaming Platform For Learning</h3>

          {/* ✅ Explore Courses Button */}
          <div className="hero-buttons">
            <button
              className="cta-btn primary"
              onClick={() => navigate("/courses")} // redirect to /courses page
            >
              Explore Courses
            </button>
          </div>
        </div>
      </section>

        {/* ===== LATEST COURSES SECTION ===== */}
        <section className="trending-section">
          <h2>🆕 Latest Courses</h2>

          <div className="home-course-grid">
            {latestCourses.length > 0 ? (
              latestCourses.map((course) => (
                <div
                  className="home-course-card"
                  key={course._id}
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  <img
                    src={
                      course.coverImage ||
                      "https://via.placeholder.com/300x150?text=Course+Image"
                    }
                    alt={course.title}
                  />
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
              ))
            ) : (
              <p className="loading-text">Loading latest courses...</p>
            )}
          </div>
        <br />
        <br />
        <br />
        <div className="image-container">
          <img
            src="/home_page_img.png"
            alt="Spotlight Feature"
            className="center-image"
          />
          <div className="image-text">
            <h1>
              <b>Meet MetaGurukul</b>
            </h1>
            <p>
              Expand your knowledge with our expert-led courses. Join Rahul and
              dive into diverse subjects and linguistic richness. Enhance your
              academic foundation and immerse yourself in the beauty of
              languages. All levels welcome.
            </p>
          </div>
        </div>
        <br />
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why-choose">
        <h2>Why Choose MetaGurukul?</h2>
        <div className="features-grid">
          <div className="feature-box">
            <FaVideo className="feature-icon" />
            <h3>Audio & Video Learning</h3>
            <p>
              Learn through engaging video lectures and audio summaries anytime,
              anywhere.
            </p>
          </div>
          <div className="feature-box">
            <FaBookOpen className="feature-icon" />
            <h3>Book Summaries</h3>
            <p>
              Get key insights from top books without reading the entire thing.
            </p>
          </div>
          <div className="feature-box">
            <FaUserTie className="feature-icon" />
            <h3>Top Mentors</h3>
            <p>
              Learn from experts and authors who break down complex ideas into
              simple lessons.
            </p>
          </div>
          <div className="feature-box">
            <FaClock className="feature-icon" />
            <h3>Flexible Learning</h3>
            <p>
              Access content anytime, whether you're commuting, working out, or
              relaxing.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MENTOR SECTION ===== */}
      <section className="MentorInfoCard">
        <h1 className="mentor-heading">Our Mentor</h1>
        <div className="MentorCard">
          <div className="MentorImg">
            <img src="/images/mentorimg.jpg" alt="Mentor" />
          </div>
          <div className="MentorInfo">
            <h2>Shri. Kuldip Kotambe Sir</h2>
            <ul>
              <li>Founder of Excellence IAS Academy Pune</li>
              <li>
                Veteran UPSC Trainer (Yashada Pune, BARTI Pune, SIAC Mumbai,
                SIAC Aurangabad, SIAC Nasik, etc.)
              </li>
              <li>7000+ students taught</li>
              <li>
                Conducted UPSC awareness programs in Maharashtra, Chhattisgarh,
                Telangana, and Madhya Pradesh
              </li>
              <li>
                Delivered talks on Literature, Philosophy, and History in 300+
                educational institutions
              </li>
              <li>Read 10,000+ books</li>
            </ul>
            <p>
              Shri. Kuldip Kotambe, a distinguished scholar of Philosophy,
              History & Literature, is the founder of Excellence IAS Academy in
              Pune. Beyond his academic prowess, he has delivered many
              insightful talks on Indian Heritage, Culture, Philosophy, and
              History in over 300 institutions. With an impressive record of
              reading more than 10,000 books, Shri. Kotambe's deep insights into
              literature, coupled with his understanding of Indian culture and
              history, make him an invaluable source of knowledge and
              inspiration in the academic community.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
