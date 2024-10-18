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
          <img src="skysense-white.png" alt="logo" />
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
          <h2>Real Time weather info</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, quam? Commodi repellat sed non esse! Fugit enim
            temporibus inventore eos neque ratione perferendis, nostrum totam
            laboriosam quasi quibusdam maiores commodi!
          </p>
          <button onClick={() => nav('/login')}>Create account</button>
        </section>
        <section>
          <h2>industry specific info!</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            voluptatibus alias distinctio amet nam rerum? Minima, deserunt
            ducimus nam suscipit quia deleniti repudiandae, harum, cumque qui ut
            odit odio perferendis?
          </p>
        </section>
        <section>
            <h2>Risk Mitigation</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A ipsa quisquam vero explicabo porro eveniet perspiciatis, tenetur temporibus aliquam veritatis sed doloremque incidunt quidem voluptatem tempora fugit ratione omnis quaerat.</p>
        </section>
      </main>
    </>
  );
}

export default Landing;
