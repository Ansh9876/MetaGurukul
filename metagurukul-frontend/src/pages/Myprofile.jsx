import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/pages/myprofile.css';
import ProfileImage from '../components/ProfileImage';

const Myprofile = () => {  
  return (
      <Sidebar>
        <ProfileImage/>
      </Sidebar>
  );
};

export default Myprofile;
