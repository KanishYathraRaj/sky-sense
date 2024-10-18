import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Landing() {
  const nav = useNavigate();
  return (
    <>
      <main>
        <nav className="landing-navbar">
          <img src="skysense-black.png" alt="Skysense logo" />
          <div className="signin-signup-div">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Register</button>
            </Link>
          </div>
        </nav>

        <section>
          <h2>Real-Time Weather Intelligence</h2>
          <p>
            At Skysense, we leverage AI and real-time weather data to provide
            businesses with the tools they need to make informed decisions. From
            accurate forecasting to instant alerts, our platform helps you stay
            ahead of the weather, minimizing disruptions and maximizing
            operational efficiency.
          </p>
          <button onClick={() => nav('/signup')}>Create Account</button>
        </section>

        <section>
          <h2>Industry-Specific Insights</h2>
          <p>
            Every industry faces unique challenges when it comes to weather.
            Whether you're in agriculture, construction, logistics, or energy,
            our AI-driven insights give you tailored data to anticipate
            potential impacts, optimize resources, and plan for the future.
          </p>
        </section>

        <section>
          <h2>Risk Mitigation and Decision Support</h2>
          <p>
            Make proactive decisions with Skysense's advanced risk mitigation
            tools. Our platform assesses weather risks in real time, helping you
            protect your business assets, enhance safety protocols, and ensure
            continuity in the face of adverse weather conditions.
          </p>
        </section>
      </main>
    </>
  );
}

export default Landing;
