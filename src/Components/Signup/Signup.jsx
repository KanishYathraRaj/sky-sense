import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAndCreateProfile } from "../../service/authService";

function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email to ensure it ends with '@gmail.com'
    if (!email.endsWith("@gmail.com")) {
      setError("Email must be a Gmail address (e.g., example@gmail.com)");
      return;
    }
    
    if (pass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }
    
    setError("");
    signUpAndCreateProfile(email, pass, name);
    nav("/home");
  };

  return (
    <div className="signup-container">
      <div className="auth-form-container smooth-zoom">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name :</label>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Enter your full name"
          />
          <label htmlFor="email">Email :</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password :</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
          />
          <label htmlFor="confirm-password">Confirm Password :</label>
          <input
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            id="confirm-password"
            name="confirm-password"
          />
          {error && <p className="error-message">{error}</p>}
          <button className="submit-btn" type="submit">
            Register
          </button>
          <button
            className="link-btn"
            style={{ color: "black" }}
            onClick={() => nav("/login")}
          >
            Already have an account? Login here.
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
