import React from 'react'
import './Navbar.css'

import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  return (
    <header className="home-header">
        <div className="logo">
        <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} className="logo-img" />
        </div>
        
        <div className="search-bar-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search City..." />
          </div>
        </div>


        <div className="auth-section">
        <button className="auth-button">Login / Signup</button>
        </div>

        <div className="profile-section">
        <img src={profile} alt="User Profile" className="profile-img" /> {/* Replace with user's image */}
        <button className="logout-button">Logout</button>
    </div>
  </header>
  )
}

export default Navbar