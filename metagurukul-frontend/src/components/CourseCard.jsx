// src/components/CourseCard.jsx
import React from 'react';
import '../styles/components/coursecard.css';

const CourseCard = ({ title, description, image }) => {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-image" />
      <div className="course-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="enroll-btn">View Course</button>
      </div>
    </div>
  );
};

export default CourseCard;
