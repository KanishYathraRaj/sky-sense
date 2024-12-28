import React from 'react';
import './Home.css';

import logo from '../assets/logo.png';
import profile from '../assets/profile.png';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">

        <div className="logo">
          <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} className="logo-img" />
        </div>
        
        <div className="search-bar">
            <input type="text" placeholder="Search your prefered city for weather..." />
        </div>

        <div className="auth-section">
          <button className="auth-button">Login / Signup</button>
        </div>

        <div className="profile-section">
          <img src={profile} alt="User Profile" className="profile-img" /> {/* Replace with user's image */}
          <button className="logout-button">Logout</button>
        </div>
      </header>
    </div>
  );
};

export default Home;
