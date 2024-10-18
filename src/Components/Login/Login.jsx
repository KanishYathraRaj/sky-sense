import { useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import { useState } from "react";
import "./Login.css";

export const Login = (prop) => {
  const nav = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  return (
    <div className="login-container">
      <div className="auth-form-container smooth-zoom">
        <h2>Login</h2>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            login(email, pass);
            nav("/home");
          }}
        >
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="enter your password"
            id="password"
            name="password"
          />
          <button className="submit-btn" type="submit">
            Log In
          </button>
        </form>
        <button
          style={{ color: "black" }}
          className="link-btn"
          onClick={() => nav("/signup")}
        >
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};
