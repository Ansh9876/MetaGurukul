import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/components/dashboard.css";
import "../../styles/pages/admin/adminhome.css"

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/api/users");
        const courseRes = await axios.get("http://localhost:5000/api/courses");
        setTotalUsers(userRes.data.length);
        setTotalCourses(courseRes.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard Overview</h1>
      <div className="dashboard-cards">
        <div className="card user-card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>

        <div className="card course-card">
          <h3>Total Courses</h3>
          <p>{totalCourses}</p>
        </div>

        <div className="card revenue-card">
          <h3>Total Revenue</h3>
          <p>₹12,450</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
