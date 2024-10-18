import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-component">
      <div className="footer-content">
        <div className="footer-about">
          <h3>About Skysense</h3>
          <p>
            At Skysense, we aim to provide real-time weather insights that help businesses make informed decisions and mitigate risks. Our AI-powered solutions offer industry-specific information and risk management tools to support your operations.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@skysense.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Skysense. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
