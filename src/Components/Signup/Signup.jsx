import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../service/authService";
function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  return (
    <div className="auth-form-container smooth-zoom">
      <h2>Register</h2>
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          signUp(email, pass);
        }}
      >
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
          placeholder="Enter your password  "
          id="password"
          name="password"
        />
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
  );
}

export default Signup;
