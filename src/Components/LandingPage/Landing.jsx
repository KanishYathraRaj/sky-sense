import React from "react";
import "./Landing.css";

function Landing() {
  return (
    <>
      <main>
        <nav className="landing-navbar">
          <img src="" alt="logo" />
          <div className="signin-signup-div">
            <button>Login</button>
            <button>Register</button>
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
          <button>Create account</button>
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
      </main>
    </>
  );
}

export default Landing;
