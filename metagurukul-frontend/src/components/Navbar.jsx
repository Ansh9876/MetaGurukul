import React, { useEffect, useState } from "react";
import '../styles/components/navbar.css';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setEmail(null);
    navigate("/login");
  };

  const getInitial = (email) => email ? email.charAt(0).toUpperCase() : "?";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setEmail(localStorage.getItem("email"));

    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-wrapper")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/"><img src="/logo.png" alt="MetaGururkul" className="logo" /></a>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/webinars">Webinars</a></li>
        <li><a href="/membership">Memberships</a></li>

        {token && (
          <li><Link to="/user-dashboard">My Dashboard</Link></li>
        )}
      </ul>

      <div className="navbar-right">
        {token ? (
          <div className="profile-wrapper"> 
           <div className="profile-circle"
              onClick={(e) => {
                e.stopPropagation(); 
                setDropdownOpen(!dropdownOpen);
              }}
              >{getInitial(email)}  
              </div>
              
            
            {dropdownOpen && (
              <div
                className="custom-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <Link to="/profile">My Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}

          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
