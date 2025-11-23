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
        const res = await axios.get("http://localhost:5000/api/courses");
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
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete ❌");
    }
  };


  return (
    <div className="admin-courses">
      <div className="admin-header">
        <h2>Manage Courses</h2>
        <Link to="/admin-dashboard/create-course">
          <button className="create-btn">+ Create Course</button>
        </Link>
      </div>

      <div className="courses-grid">
        {courses.length === 0 ? (
          <p>No courses yet. Click "Create Course" to add one.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.coverImage} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="actions">
                <Link to={`/admin-dashboard/edit-course/${course._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
