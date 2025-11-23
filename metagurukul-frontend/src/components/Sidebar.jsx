import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { 
  FaBook, FaUsers, FaArrowLeft, FaHome,
  FaLayerGroup
} from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import "../styles/components/sidebar.css";

const Sidebar = ({ role }) => {
  const [expanded, setExpanded] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? "" : section);
  };

  // Get initial letter from name first, fallback to email
  const getInitial = (name, email) => {
    if (name && name.trim() !== "") {
      return name.charAt(0).toUpperCase();
    }
    if (email && email.trim() !== "") {
      return email.charAt(0).toUpperCase();
    }
    return "?";
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name");

    if (storedEmail) setEmail(storedEmail);
    if (storedName) setName(storedName)
    
  }, []);

  const navigate = useNavigate();
  const handleProfileClick = () => {
    if (role === "admin") {
      navigate("/admin-dashboard/admin-profile", { replace: true });
    } else {
      navigate("/user-dashboard/user-profile", { replace: true });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* Back to Home */}
        <div className="back-arrow" onClick={() => navigate("/")}>
          <FaArrowLeft />
          <span style={{ marginLeft: "8px" }}>Home</span>
        </div>

        {/* Profile */}
        <div className="user-avatar">
          <div className="profile-circle" onClick={handleProfileClick}>
            {getInitial(name, email)}
          </div>
          <p className="user-name">{name}</p>
          <p className="user-role">{role === "user" ? "Student" : "Admin"}</p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          <ul>
            {/* ==== USER NAVIGATION ==== */}
            {role === "user" && (
              <>
                {/* Courses */}
                <li
                  className={`sidebar-item ${expanded === "courses" ? "active" : ""}`}
                  onClick={() => toggleExpand("courses")}
                >
                  <div className="sidebar-link">
                    <FaBook className="sidebar-icon" />
                    <span className="sidebar-text">Courses</span>
                    {expanded === "courses" ? <IoChevronUp /> : <IoChevronDown />}
                  </div>
                </li>
                {expanded === "courses" && (
                  <ul className="subnav">
                    <li>
                      <NavLink
                        to="/user-dashboard/active-courses"
                        className={({ isActive }) =>
                          isActive ? "subnav-item active-sub" : "subnav-item"
                        }
                      >
                        Active courses
                      </NavLink>
                    </li> 
                  </ul>
                )}
  
                {/* Community */}
                <li>
                  <NavLink
                    to="/user-dashboard/community"
                    className={({ isActive }) =>
                      isActive ? "sidebar-item active" : "sidebar-item"
                    }
                  >
                    <div className="sidebar-link">
                      <FaUsers className="sidebar-icon" />
                      <span className="sidebar-text">Community</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}

            {/* ==== ADMIN NAVIGATION ==== */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/admin-dashboard/admin-home"
                    className={({ isActive }) =>
                      isActive ? "sidebar-item active" : "sidebar-item"
                    }
                  >
                    <div className="sidebar-link">
                      <FaHome className="sidebar-icon" />
                      <span className="sidebar-text">Home</span>
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/admin-dashboard/admin-courses"
                    className={({ isActive }) =>
                      isActive ? "sidebar-item active" : "sidebar-item"
                    }
                  >
                    <div className="sidebar-link">
                      <FaBook className="sidebar-icon" />
                      <span className="sidebar-text">Courses</span>
                    </div>
                  </NavLink>
                </li>
                                 <li>
                  <NavLink
                    to="/admin-dashboard/admin-bundles"
                    className={({ isActive }) =>
                      isActive ? "sidebar-item active" : "sidebar-item"
                    }
                  >
                    <div className="sidebar-link">
                      <FaLayerGroup className="sidebar-icon" />
                      <span className="sidebar-text">bundles</span>
                    </div>
                  </NavLink>
                </li>
                {/* Manage */}
                <li
                  className={`sidebar-item ${expanded === "manage" ? "active" : ""}`}
                  onClick={() => toggleExpand("manage")}
                >
                  <div className="sidebar-link">
                    <FaUsers className="sidebar-icon" />
                    <span className="sidebar-text">Users</span>
                    {expanded === "manage" ? <IoChevronUp /> : <IoChevronDown />}
                  </div>
                </li>
                {expanded === "manage" && (
                  <ul className="subnav">
                    <li>
                      <NavLink
                        to="/admin-dashboard/admin-learners"
                        className={({ isActive }) =>
                          isActive ? "subnav-item active-sub" : "subnav-item"
                        }
                      >
                        Learners
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin-dashboard/admin-admins"
                        className={({ isActive }) =>
                          isActive ? "subnav-item active-sub" : "subnav-item"
                        }
                      >
                        Admins
                      </NavLink>
                    </li>
                  </ul>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Bottom Buttons */}
      <div className="sidebar-bottom">
        <NavLink to="/membership">
          <button className="explore-btn">Explore membership</button>
        </NavLink>
        <NavLink to="/courses">
          <button className="store-btn">Visit Store</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
