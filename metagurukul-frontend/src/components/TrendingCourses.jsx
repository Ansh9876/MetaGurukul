import React from 'react';
import CourseCard from './CourseCard';
import '../styles/components/trending.css';

const dummyCourses = [
    {
        title: "Women In Acient India",
        description: "Unveiling the legacy of trailblazing women scholars in ancient India",
        image: "/images/ancient-india.png"
    },
    {
        title: "Ramayan",
        description: "Explore the epic tale of Ramayana from a modern perspective.",
        image: "/images/Ramayan.png"
    },
    {
        title: "Mahabharat",
        description: "Explore the epic tale of Mahabharat from a modern perspective.",
        image: "/images/Mahabharat.jpg"
    },
    {
        title: "Isrrale",
        description: "Discover the Japanese secret to a long and happy life.",
        image: "/images/Isrrale.jpg"
    },
];

const TrendingCourses = () => {
    return (
        <section className="trending-section">
            <h2>🔥 Trending Courses</h2>
            <div className="course-grid">
                {dummyCourses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
            <br/><br/><br/><br/>
            <div className='image-container'>
                <img
                    src="/home_page_img.png" 
                    alt="Spotlight Feature"
                    className="center-image"
                />
                <div className='image-text'>
                    <h1><b>Meet MetaGurukul</b></h1>
                    <p>Expand your knowledge with our expert-led courses. Join Rahul and dive into diverse subjects and linguistic richness. Enhance your academic foundation and immerse yourself in the beauty of languages. All levels welcome.</p>
                </div>
            </div>
            <br/>
        </section>
    );
};

export default TrendingCourses;