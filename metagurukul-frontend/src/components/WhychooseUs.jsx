// src/components/WhyChoose.jsx
import React from 'react';
import '../styles/components/whychooseus.css';
import { FaVideo, FaBookOpen, FaUserTie, FaClock } from 'react-icons/fa';

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <h2>Why Choose MetaGurukul?</h2>
      <div className="features-grid">
        <div className="feature-box">
          <FaVideo className="feature-icon" />
          <h3>Audio & Video Learning</h3>
          <p>Learn through engaging video lectures and audio summaries anytime, anywhere.</p>
        </div>
        <div className="feature-box">
          <FaBookOpen className="feature-icon" />
          <h3>Book Summaries</h3>
          <p>Get key insights from top books without reading the entire thing.</p>
        </div>
        <div className="feature-box">
          <FaUserTie className="feature-icon" />
          <h3>Top Mentors</h3>
          <p>Learn from experts and authors who break down complex ideas into simple lessons.</p>
        </div>
        <div className="feature-box">
          <FaClock className="feature-icon" />
          <h3>Flexible Learning</h3>
          <p>Access content anytime, whether you're commuting, working out, or relaxing.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
