import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // The CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="skysense-black.png" alt="Skysense Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/industry" className="nav-link">Industry Insight</Link>
        </li>
        <li>
          <Link to="/analytics" className="nav-link">Weather Analytics</Link>
        </li>
        <li>
          <Link to="/preferences" className="nav-link">User Preferences</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
