import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveCourses = () => {
  const [activeCourses, setActiveCourses] = useState([]); // ✅ empty array, not undefined
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://metagurukul1.onrender.com/api/user/active-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActiveCourses(res.data || []); // ✅ always fallback to []
      } catch (error) {
        console.error("Failed to load active courses:", error);
        setActiveCourses([]); // fallback to avoid crash
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (!activeCourses || activeCourses.length === 0)
    return <p>No active courses found.</p>;

  return (
    <div>
      <h2>Your Active Courses</h2>
      {activeCourses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ActiveCourses;
