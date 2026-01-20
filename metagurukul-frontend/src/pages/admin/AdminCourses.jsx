import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/components/dashboard.css";
import "../../styles/pages/admin/admincourses.css";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]); // start empty

  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://metagurukul1.onrender.com/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  // If new course was just created, add to list without waiting for refetch
  useEffect(() => {
    if (location.state?.newCourse) {
      setCourses((prev) => [location.state.newCourse, ...prev]);
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://metagurukul1.onrender.com/api/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete ❌");
    }
  };


  return (
  <div className="admin-courses-page">
    <div className="admin-courses-header">
      <h2>Manage Courses</h2>
      <Link to="/admin-dashboard/create-course">
        <button className="admin-courses-create-btn">+ Create Course</button>
      </Link>
    </div>

    <div className="admin-courses-grid">
      {courses.length === 0 ? (
        <p className="admin-courses-empty">
          No courses yet. Click "Create Course" to add one.
        </p>
      ) : (
        courses.map((course) => (
          <div key={course._id} className="admin-course-card">
            <img
              src={course.coverImage}
              alt={course.title}
              className="admin-course-img"
            />

            <h3 className="admin-course-title">{course.title}</h3>
            <p className="admin-course-desc">{course.description}</p>

            <div className="admin-course-actions">
              <Link to={`/admin-dashboard/edit-course/${course._id}`}>
                <button className="admin-course-edit-btn">Edit</button>
              </Link>

              <button
                className="admin-course-delete-btn"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
};
export default AdminCourses;
