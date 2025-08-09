import React, { useState } from 'react';
import '../styles/components/sidebar.css';
import { Link } from 'react-router-dom';
import { FaBook, FaVideo, FaBookmark, FaUsers } from 'react-icons/fa';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const Sidebar = () => {
  const [expanded, setExpanded] = useState('courses');

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? '' : section);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="user-avatar">
          <div className="profile-circle">A</div>
          <p className="user-name">Ansh Nandeshwar</p>
          <p className="user-role">Student</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {/* Courses */}
            <li
              className={`sidebar-item ${expanded === 'courses' ? 'active' : ''}`}
              onClick={() => toggleExpand('courses')}
            >
              <div className="sidebar-link">
                <FaBook className="sidebar-icon" />
                <span className="sidebar-text">Courses</span>
                {expanded === 'courses' ? <IoChevronUp /> : <IoChevronDown />}
              </div>
            </li>
            {expanded === 'courses' && (
              <ul className="subnav">
                <li className="subnav-item active-sub">Active courses</li>
                <li className="subnav-item">Archived courses</li>
              </ul>
            )}

            {/* Webinars */}
            <li
              className={`sidebar-item ${expanded === 'webinars' ? 'active' : ''}`}
              onClick={() => toggleExpand('webinars')}
            >
              <div className="sidebar-link">
                <FaVideo className="sidebar-icon" />
                <span className="sidebar-text">Webinars</span>
                {expanded === 'webinars' ? <IoChevronUp /> : <IoChevronDown />}
              </div>
            </li>
            {expanded === 'webinars' && (
              <ul className="subnav">
                <li className="subnav-item">Upcoming</li>
                <li className="subnav-item">Recorded</li>
              </ul>
            )}

            {/* Bookmarks */}
            <li
              className={`sidebar-item ${expanded === 'bookmarks' ? 'active' : ''}`}
              onClick={() => toggleExpand('bookmarks')}
            >
              <div className="sidebar-link">
                <FaBookmark className="sidebar-icon" />
                <span className="sidebar-text">Bookmarks</span>
                {expanded === 'bookmarks' ? <IoChevronUp /> : <IoChevronDown />}
              </div>
            </li>

            {/* Community */}
            <li className="sidebar-item no-toggle">
              <div className="sidebar-link">
                <FaUsers className="sidebar-icon" />
                <span className="sidebar-text">Community</span>
                <span style={{ width: '1em' }}></span> {/* keeps icon spacing consistent */}
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <Link to="/membership"><button className="explore-btn">Explore membership</button></Link>
        <Link to="/courses"><button className="store-btn">Visit Store</button></Link>
      </div>
    </div>
  );
};

export default Sidebar;
