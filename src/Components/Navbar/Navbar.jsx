import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Assuming you have your styles here

function Navbar() {
  // State to control which form is active: 'login' or 'signup'
  const [activeForm, setActiveForm] = useState('login');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with login form by default
  const openModal = () => {
    setActiveForm('login');
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Switch between login and signup forms
  const switchToSignup = () => {
    setActiveForm('signup');
  };

  const switchToLogin = () => {
    setActiveForm('login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="skysense-black.png" alt="Skysense Logo" />
          </Link>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navbar-links">
          <button>Current Location</button>
        </div>
        <div className="navbar-login">
          <button onClick={openModal}>Login / Signup</button>
        </div>
      </nav>

      {/* Modal for Login/Signup */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>

            {/* Render login or signup form based on activeForm state */}
            {activeForm === 'login' ? (
              <>
                <h2>Login</h2>
                <form>
                  <label>Email:</label>
                  <input type="email" placeholder="Enter your email" required />
                  <label>Password:</label>
                  <input type="password" placeholder="Enter your password" required />
                  <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <span className="switch-link" onClick={switchToSignup}>Sign Up</span></p>
              </>
            ) : (
              <>
                <h2>Sign Up</h2>
                <form>
                  <label>Email:</label>
                  <input type="email" placeholder="Enter your email" required />
                  <label>Password:</label>
                  <input type="password" placeholder="Create a password" required />
                  <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <span className="switch-link" onClick={switchToLogin}>Login</span></p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
