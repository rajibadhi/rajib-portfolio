import "./App.css";

export default function App() {
  return (
    <div className="container">
      {/* HERO */}
      <section className="hero">
        <h1>Rajib Adhikari</h1>
        <p>Frontend Developer | React | Vite</p>
        <a href="#contact" className="btn">Contact Me</a>
      </section>

      {/* ABOUT */}
      <section className="section">
        <h2>About Me</h2>
        <p>
          I am a passionate frontend developer from Nepal. I love building
          clean, fast, and responsive web applications using React.
        </p>
      </section>

      {/* SKILLS */}
      <section className="section">
        <h2>Skills</h2>
        <div className="skills">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>Vite</span>
          <span>Firebase</span>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <h2>Projects</h2>

        <div className="project">
          <h3>CashMate Nepal</h3>
          <p>Personal finance & bookkeeping web app.</p>
          <a href="https://cashmate.rajibadhikari.com.np" target="_blank">
            View Project →
          </a>
        </div>

        <div className="project">
          <h3>Portfolio Website</h3>
          <p>My personal portfolio built with React + Vite.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <h2>Contact</h2>
        <p>Email: <b>rajibadhikari@email.com</b></p>
        <p>GitHub: <a href="https://github.com/rajibadhi" target="_blank">github.com/rajibadhi</a></p>
      </section>

      <footer>
        © {new Date().getFullYear()} Rajib Adhikari
      </footer>
    </div>
  );
}
