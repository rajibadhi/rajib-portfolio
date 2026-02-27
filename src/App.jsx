import "./App.css";
import profile from "./assets/rajib.jpeg";

const skills = [
  {
    title: "Core IT",
    items: [
      "Windows Server",
      "Linux Administration",
      "Active Directory",
      "Networking",
      "Sophos Firewall",
      "CCTV and IP Camera",
      "Attendance System",
      "IT Support and Troubleshooting",
    ],
  },
  {
    title: "Cloud and DevOps",
    items: ["AWS", "Cloud Basics", "Backup and Recovery", "Monitoring Basics"],
  },
  {
    title: "Web",
    items: ["HTML", "CSS", "JavaScript", "React", "Vite", "Firebase"],
  },
  {
    title: "Tools",
    items: ["Git and GitHub", "Remote Support", "Documentation", "Asset Tracking"],
  },
];

const projects = [
  {
    name: "CashMate Nepal",
    desc: "Personal finance and bookkeeping web app.",
    link: "https://rajibadh.rajibadhikari.com.np",
    tags: ["React", "Vite", "Firebase"],
  },
  {
    name: "Portfolio Website",
    desc: "Personal portfolio built with React and Vite deployed on Vercel.",
    link: "https://rajibadhikari.com.np",
    tags: ["React", "Vite", "Vercel"],
  },
];

export default function App() {
  return (
    <div className="container">
      {/* HERO */}
      <section className="hero">
        <div className="heroCard center">
          <img className="avatar" src={profile} alt="Rajib Adhikari" />

          <p className="kicker">IT Support and Operations</p>
          <h1>Rajib Adhikari</h1>
          <p className="subtitle centerText">
            I build reliable high performance IT systems.
          </p>

          <div className="heroChips">
            <span className="chip">Windows Server</span>
            <span className="chip">Linux</span>
            <span className="chip">AWS</span>
            <span className="chip">Networking</span>
            <span className="chip">Sophos Firewall</span>
            <span className="chip">React</span>
          </div>

          <div className="heroActions">
            <a href="#contact" className="btn">
              Contact Me
            </a>
            <a href="#projects" className="btn ghost">
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="sectionHead centerText">
          <h2>About Me</h2>
          <p className="muted maxW">
            Nepal based IT professional with strong hands on experience in infrastructure support and modern web development.
          </p>
        </div>

        <div className="grid2">
          <div className="card">
            <h3>Who I am</h3>
            <p className="muted">
              I work across end to end IT operations from user support to server administration networking firewall
              management and CCTV systems with a strong focus on stability reliability and efficient issue resolution.
            </p>
          </div>

          <div className="card">
            <h3>What I focus on</h3>
            <ul className="list">
              <li>Stable systems and fast resolution</li>
              <li>Security first mindset and access control</li>
              <li>Documentation and preventive maintenance</li>
              <li>Simple scalable web experiences</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="section">
        <div className="sectionHead centerText">
          <h2>What I Do</h2>
          <p className="muted maxW">A quick snapshot of my practical strengths.</p>
        </div>

        <div className="grid3">
          <div className="card">
            <h3>IT Operations</h3>
            <p className="muted">
              Helpdesk support asset management backup planning and routine maintenance.
            </p>
          </div>
          <div className="card">
            <h3>Infrastructure</h3>
            <p className="muted">
              Windows Server Active Directory user policies permissions and Linux administration.
            </p>
          </div>
          <div className="card">
            <h3>Network and Security</h3>
            <p className="muted">
              Network troubleshooting Sophos firewall rules VPN and CCTV IP camera setup.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="sectionHead centerText">
          <h2>Skills</h2>
          <p className="muted maxW">Tools and technologies I use in real projects and daily operations.</p>
        </div>

        <div className="grid2">
          {skills.map((group) => (
            <div className="card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skills">
                {group.items.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="sectionHead centerText">
          <h2>Projects</h2>
          <p className="muted maxW">Selected work and live deployments.</p>
        </div>

        <div className="grid2">
          {projects.map((p) => (
            <div className="card projectCard" key={p.name}>
              <div className="projectTop">
                <h3>{p.name}</h3>
                <div className="tagRow">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="muted">{p.desc}</p>

              <a className="link" href={p.link} target="_blank" rel="noreferrer">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="sectionHead centerText">
          <h2>Contact</h2>
          <p className="muted maxW">For collaboration.</p>
        </div>

        <div className="card">
          <div className="contactRow">
            <div>
              <p className="label">Email</p>
              <p className="value">rajibadh@gmail.com</p>
            </div>
            <a className="btn small" href="mailto:rajibadh@gmail.com">
              Email Me
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Rajib Adhikari</footer>
    </div>
  );
}
