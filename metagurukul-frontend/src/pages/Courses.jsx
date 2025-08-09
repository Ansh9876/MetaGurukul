import React from "react";
import Layout from "../layouts/layout";
import '../styles/pages/courses.css'
const Courses = () => {
    return (
        <Layout>
            <div className="courses-page">
                <h2 className="courses-pg-heading">Available Courses</h2>
                    <div className="courses-grid">
                        <div className="courses-card">
                            <img src="https://via.placeholder.com/300x150" alt="Course" />
                            <h3>Atomic Habits</h3>
                            <p>Learn how to build better habits and break bad ones.</p>
                            <button>View Course</button>
                        </div>

                        <div className="courses-card">
                            <img src="https://via.placeholder.com/300x150" alt="Course" />
                            <h3>Rich Dad Poor Dad</h3>
                            <p>Understand the mindset of financial freedom.</p>
                            <button>View Course</button>
                        </div>

                        <div className="courses-card">
                            <img src="https://via.placeholder.com/300x150" alt="Course" />
                            <h3>Ikigai</h3>
                            <p>Discover the Japanese secret to a meaningful life.</p>
                            <button>View Course</button>
                        </div>

                        <div className="courses-card">
                            <img src="https://via.placeholder.com/300x150" alt="Course" />
                            <h3>Ikigai</h3>
                            <p>Discover the Japanese secret to a meaningful life.</p>
                            <button>View Course</button>
                        </div>
                    </div>
            </div>
        </Layout>
    )
};

export default Courses;