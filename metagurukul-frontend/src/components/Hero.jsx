// src/components/Hero.jsx
import React from 'react';
import '../styles/components/hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className='brand'>Meta<span className='highlight'>Gurukul</span></span>
        <h3>Your Ultimate Streaming Platform For Learning</h3>
        <div className="hero-input-group">
          <input type="course" placeholder="Find your course"/>
          <button>Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
