import "./App.css";
import profile from "./assets/rajib.jpeg";
import { useEffect } from "react";

const experience = [
  {
    role: "IT Operations Officer",
    company: "Your Company",
    period: "2022 Present",
    desc: "Managing infrastructure security monitoring backup strategy and enterprise user support."
  },
  {
    role: "IT Support Executive",
    company: "Previous Company",
    period: "2020 2022",
    desc: "Handled networking firewall configuration system deployment and troubleshooting."
  }
];

const projects = [
  {
    name: "CashMate Nepal",
    desc: "Cloud based finance system with authentication real time data and structured reporting.",
    link: "https://rajibadh.rajibadhikari.com.np"
  },
  {
    name: "Portfolio Website",
    desc: "Performance optimized React portfolio deployed globally with CI CD workflow.",
    link: "https://rajibadhikari.com.np"
  }
];

export default function App() {

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      <div className="bgAnimation"></div>

      <nav className="nav">
        <div className="navInner">
          <div className="logo">RA</div>
          <div className="navLinks">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <div className="container">

        <section className="hero reveal">
          <img src={profile} className="avatar" alt="Rajib" />
          <h1 className="gradientText">Rajib Adhikari</h1>
          <p className="subtitle">
            IT Infrastructure and Systems Engineer  
            Building Secure Scalable and Reliable Digital Environments
          </p>
          <a href="/Rajib_Adhikari_CV.pdf" className="btn">Download Resume</a>
        </section>

        <section id="experience" className="section reveal">
          <h2>Experience</h2>
          <div className="timeline">
            {experience.map((exp, index) => (
              <div key={index} className="timelineItem">
                <h3>{exp.role}</h3>
                <span>{exp.company} | {exp.period}</span>
                <p>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal">
          <h2>Projects</h2>
          <div className="grid2">
            {projects.map((p, i) => (
              <div key={i} className="card">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <a href={p.link} target="_blank" rel="noreferrer">Visit Project</a>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section reveal">
          <h2>Contact</h2>
          <div className="card contactCard">
            <p>Open for opportunities and collaboration.</p>
            <a href="mailto:rajibadh@gmail.com" className="btn small">
              rajibadh@gmail.com
            </a>
          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Rajib Adhikari
        </footer>

      </div>
    </>
  );
}