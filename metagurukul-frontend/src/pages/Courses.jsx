import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/layout";
import axios from "axios";
import "../styles/pages/courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="courses-page">
        <h2 className="courses-pg-heading">Explore Courses</h2>

        <div className="courses-grid">
          {courses.length === 0 ? (
            <p className="no-courses-text">No courses available yet.</p>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="course-card"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <img
                  className="course-cover"
                  src={
                    course.coverImage ||
                    "https://via.placeholder.com/300x150?text=Course+Image"
                  }
                  alt={course.title}
                />
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description?.slice(0, 80)}...</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
