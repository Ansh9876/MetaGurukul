import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; 
import '../styles/components/mininav.css'; 

const MiniNav = () => {
  return (
    <div className="mini-nav">
      <Link to="/">
        <img src={logo} alt="MetaGurukul Logo" className="mini-logo" />
      </Link>
    </div>
  );
};

export default MiniNav;
