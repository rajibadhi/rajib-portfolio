import "./App.css";
import profile from "./assets/rajib.jpeg";

/* ─── DATA ────────────────────────────────────────────────── */

const skills = [
  {
    title: "Core IT & Infrastructure",
    items: [
      "Windows Server",
      "Linux Administration",
      "Active Directory",
      "Networking",
      "Sophos Firewall",
      "CCTV & IP Camera",
      "Attendance System",
      "IT Support & Troubleshooting",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "Firebase (Firestore, Auth, Hosting)",
      "Vercel",
      "EAS Build",
      "Docker Basics",
      "Backup & Recovery",
      "Monitoring & Alerting",
    ],
  },
  {
    title: "Web & Mobile Development",
    items: [
      "React",
      "React Native",
      "Expo & Expo Router",
      "TypeScript",
      "JavaScript",
      "Vite",
      "HTML & CSS",
    ],
  },
  {
    title: "Tools & Practices",
    items: [
      "Git & GitHub",
      "AdMob Integration",
      "Remote Support",
      "Documentation",
      "Asset Tracking",
      "Agile Basics",
    ],
  },
];

const projects = [
  {
    icon: "💰",
    name: "CashMate Nepal",
    desc: "A full-featured business ledger and personal finance app for Nepal. Built with React Native (Expo), Firebase Firestore for real-time sync, AdMob monetization, and deployed as a web app via Vercel.",
    link: "https://cashmate.rajibadhikari.com.np",
    tags: ["React Native", "Expo", "Firebase", "TypeScript", "AdMob"],
  },
  {
    icon: "🌐",
    name: "Portfolio Website",
    desc: "Personal portfolio built with React and Vite showcasing IT infrastructure experience and frontend development projects. Deployed on Vercel with CI/CD.",
    link: "https://rajibadhikari.com.np",
    tags: ["React", "Vite", "Vercel", "CSS"],
  },
];

const experience = [
  {
    icon: "🖥️",
    role: "Senior IT Executive",
    desc: "End-to-end IT operations covering server administration, Active Directory, Sophos firewall management, CCTV infrastructure, network troubleshooting, and user support for a premium hospitality environment.",
  },
  {
    icon: "💻",
    role: "Frontend Developer",
    company: "Freelance / Personal Projects",
    period: "2024 – Present",
    desc: "Designing and shipping production web and mobile applications using React, React Native (Expo), and Firebase. Focus on performance, clean UI, and real-world deployment pipelines.",
  },
];

const stats = [
  { num: "5+", label: "Years IT Experience" },
  { num: "2", label: "Live Apps Deployed" },
  { num: "50+", label: "Systems Managed" },
  { num: "100%", label: "Uptime Focus" },
];

/* ─── COMPONENT ───────────────────────────────────────────── */

export default function App() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navInner">
          <span className="navBrand">Rajib Adhikari</span>
          <div className="navLinks">
            <a className="navLink" href="#about">About</a>
            <a className="navLink" href="#skills">Skills</a>
            <a className="navLink" href="#experience">Experience</a>
            <a className="navLink" href="#projects">Projects</a>
            <a className="navCta btn small" href="#contact">Hire Me</a>
          </div>
        </div>
      </nav>

      <div className="container">

        {/* HERO */}
        <section className="hero">
          <div className="heroCard">
            <div className="heroSplit">

              {/* Left: text + CTAs */}
              <div className="heroLeft">
                <span className="kicker">IT Support · Cloud · Frontend</span>
                <h1 className="heroName">Rajib<br />Adhikari</h1>
                <p className="subtitle">
                  Nepal-based IT professional who keeps systems running and ships clean, fast web &amp; mobile apps with React and Expo.
                </p>

                <div className="heroChips">
                  <span className="chip">Windows Server</span>
                  <span className="chip">Linux</span>
                  <span className="chip">AWS</span>
                  <span className="chip">Sophos Firewall</span>
                  <span className="chip">React</span>
                  <span className="chip">React Native</span>
                  <span className="chip">Firebase</span>
                </div>

                <div className="heroActions">
                  <a href="#contact" className="btn">Contact Me</a>
                  <a href="#projects" className="btn ghost">View Work →</a>
                </div>
              </div>

              {/* Right: avatar + status */}
              <div className="heroRight">
                <img className="avatar" src={profile} alt="Rajib Adhikari" />
                <div className="statusBadge">
                  <span className="statusDot" />
                  Open to Work
                </div>
              </div>

            </div>
          </div>

          {/* STATS STRIP */}
          <div className="statsStrip">
            {stats.map((s) => (
              <div className="statItem" key={s.label}>
                <div className="statNum">{s.num}</div>
                <div className="statLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="sectionHead centerText">
            <h2>About Me</h2>
            <p className="muted">
              Nepal-based IT professional with strong hands-on experience in infrastructure support and modern web development.
            </p>
          </div>

          <div className="grid2">
            <div className="card">
              <h3>Who I Am</h3>
              <p className="muted">
                I work across end-to-end IT operations — from user support to server administration, networking, firewall management, and CCTV systems. I also build and ship production apps with React and React Native, focused on performance and clean UI.
              </p>
            </div>
            <div className="card">
              <h3>What I Focus On</h3>
              <ul className="list">
                <li>Stable systems and fast incident resolution</li>
                <li>Security-first mindset and access control</li>
                <li>Documentation and preventive maintenance</li>
                <li>Scalable web and mobile app development</li>
                <li>Real-world deployment: Vercel, EAS Build, Firebase</li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHAT I DO */}
        <section className="section">
          <div className="sectionHead centerText">
            <h2>What I Do</h2>
            <p className="muted">A quick snapshot of my practical strengths.</p>
          </div>

          <div className="grid3">
            <div className="card">
              <h3>🖥️ IT Operations</h3>
              <p className="muted">
                Helpdesk support, asset management, backup planning, and routine preventive maintenance.
              </p>
            </div>
            <div className="card">
              <h3>🏗️ Infrastructure</h3>
              <p className="muted">
                Windows Server, Active Directory, user policies and permissions, Linux administration and CCTV IP camera setup.
              </p>
            </div>
            <div className="card">
              <h3>🔒 Network & Security</h3>
              <p className="muted">
                Network troubleshooting, Sophos firewall rules, VPN configuration, and secure remote access.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="sectionHead centerText">
            <h2>Skills</h2>
            <p className="muted">Tools and technologies I use in real projects and daily operations.</p>
          </div>

          <div className="grid2">
            {skills.map((group) => (
              <div className="card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skills">
                  {group.items.map((s) => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <div className="sectionHead centerText">
            <h2>Experience</h2>
            <p className="muted">Where I've applied my skills in the real world.</p>
          </div>

          <div className="card">
            <div className="timeline">
              {experience.map((e, i) => (
                <div className="timelineItem" key={i}>
                  <div className="timelineDot">{e.icon}</div>
                  <div className="timelineContent">
                    <h3>{e.role}</h3>
                    <div className="timelineCompany">{e.company}</div>
                    <div className="timelinePeriod">{e.period}</div>
                    <p className="timelineDesc">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="sectionHead centerText">
            <h2>Projects</h2>
            <p className="muted">Selected work and live deployments.</p>
          </div>

          <div className="grid2">
            {projects.map((p) => (
              <div className="card projectCard" key={p.name}>
                <div className="projectIcon">{p.icon}</div>
                <div className="projectTop">
                  <h3>{p.name}</h3>
                  <div className="tagRow">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <p className="muted">{p.desc}</p>
                <a className="link" href={p.link} target="_blank" rel="noreferrer">
                  View Live Project →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="sectionHead centerText">
            <h2>Let's Connect</h2>
            <p className="muted">Open for IT roles, freelance projects, or collaboration.</p>
          </div>

          <div className="card">
            <div className="contactRow">
              <div>
                <p className="label">Email</p>
                <p className="value">rajibadh@gmail.com</p>
              </div>
              <a className="btn small" href="mailto:rajibadh@gmail.com">
                Send Email →
              </a>
            </div>
            <div className="divider" />
            <div className="contactRow">
              <div>
                <p className="label">Location</p>
                <p className="value">Kathmandu, Nepal 🇳🇵</p>
              </div>
              <div>
                <p className="label">Availability</p>
                <p className="value" style={{ color: "var(--accent2)" }}>Open to opportunities</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} Rajib Adhikari — Kathmandu, Nepal</div>
        <div className="footerLinks">
          <a className="footerLink" href="mailto:rajibadh@gmail.com">Email</a>
          <a className="footerLink" href="https://cashmate.rajibadhikari.com.np" target="_blank" rel="noreferrer">CashMate</a>
          <a className="footerLink" href="#about">About</a>
        </div>
      </footer>
    </>
  );
}
