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
        const res = await axios.get("https://metagurukul1.onrender.com/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="coursesPg">
        <h2 className="coursesPg__heading">Explore Courses</h2>

        <div className="coursesPg__grid">
          {courses.length === 0 ? (
            <p className="coursesPg__empty">No courses available yet.</p>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="coursesPg__card"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <img
                  className="coursesPg__cover"
                  src={
                    course.coverImage ||
                    "https://via.placeholder.com/300x150?text=Course+Image"
                  }
                  alt={course.title}
                />

                <div className="coursesPg__info">
                  <h3 className="coursesPg__title">{course.title}</h3>
                  <p className="coursesPg__desc">
                    {course.description ? course.description.slice(0, 80) : "No description"}...
                  </p>
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
