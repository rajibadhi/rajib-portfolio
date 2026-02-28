import "./App.css";
import profile from "./assets/rajib.jpeg";
import { useEffect } from "react";

const skills = [
  {
    title: "Core Infrastructure",
    items: [
      "Windows Server",
      "Linux",
      "Active Directory",
      "Networking",
      "Sophos Firewall",
      "CCTV Systems",
    ],
  },
  {
    title: "Cloud",
    items: ["AWS", "Backup Strategy", "Monitoring", "Disaster Recovery"],
  },
  {
    title: "Development",
    items: ["React", "Vite", "Firebase", "JavaScript"],
  },
];

const projects = [
  {
    name: "CashMate Nepal",
    desc: "Real time finance tracking system with authentication and cloud database.",
    link: "https://rajibadh.rajibadhikari.com.np",
  },
  {
    name: "Portfolio Website",
    desc: "Performance focused portfolio deployed on Vercel with modern UI design.",
    link: "https://rajibadhikari.com.np",
  },
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
      <nav className="nav">
        <div className="navInner">
          <div className="logo">RA</div>
          <div className="navLinks">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="hero reveal">
          <img className="avatar" src={profile} alt="Rajib" />
          <h1 className="gradientText">Rajib Adhikari</h1>
          <p className="subtitle">
            IT Operations Specialist focused on secure infrastructure and scalable systems.
          </p>
          <div className="heroActions">
            <a href="#contact" className="btn">Hire Me</a>
            <a href="#projects" className="btn ghost">View Work</a>
          </div>
        </section>

        <section id="about" className="section reveal">
          <h2>About</h2>
          <p className="muted centerText maxW">
            I manage enterprise IT systems focusing on uptime performance security and structured documentation.
          </p>
        </section>

        <section id="skills" className="section reveal">
          <h2>Skills</h2>
          <div className="grid3">
            {skills.map(group => (
              <div key={group.title} className="card">
                <h3>{group.title}</h3>
                <div className="skills">
                  {group.items.map(item => (
                    <span key={item} className="pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal">
          <h2>Projects</h2>
          <div className="grid2">
            {projects.map(p => (
              <div key={p.name} className="card projectCard">
                <h3>{p.name}</h3>
                <p className="muted">{p.desc}</p>
                <a href={p.link} target="_blank" rel="noreferrer" className="link">
                  Visit Project
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section reveal">
          <h2>Contact</h2>
          <div className="card contactCard">
            <p className="muted">Available for collaboration and opportunities.</p>
            <a className="btn small" href="mailto:rajibadh@gmail.com">
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