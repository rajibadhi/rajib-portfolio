import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import profile from '../assets/rajib.jpeg';

/* ─── STATIC DATA ─────────────────────────────────────────── */
const skills = [
  {
    title: "Core IT & Infrastructure",
    items: ["Windows Server", "Linux Administration", "Active Directory", "Networking", "Sophos Firewall", "CCTV & IP Camera", "Attendance System", "IT Support & Troubleshooting"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Firebase (Firestore, Auth)", "Vercel", "EAS Build", "Docker Basics", "Backup & Recovery", "Monitoring & Alerting"],
  },
  {
    title: "Web & Mobile Development",
    items: ["React", "React Native", "Expo & Expo Router", "TypeScript", "JavaScript", "Vite", "HTML & CSS"],
  },
  {
    title: "Tools & Practices",
    items: ["Git & GitHub", "AdMob Integration", "Remote Support", "Documentation", "Asset Tracking", "Agile Basics"],
  },
];

const projects = [
  {
    icon: "💰",
    name: "CashMate Nepal",
    desc: "Full-featured business ledger and personal finance app built with React Native (Expo), Firebase Firestore for real-time sync, AdMob monetization, and deployed as a web app via Vercel.",
    link: "https://cashmate.rajibadhikari.com.np",
    tags: ["React Native", "Expo", "Firebase", "TypeScript", "AdMob"],
  },
  {
    icon: "🌐",
    name: "Portfolio Website",
    desc: "Personal portfolio with a Firebase-powered dynamic CMS — admin panel for managing gallery photos and software downloads. Deployed on Vercel with CI/CD.",
    link: "https://rajibadhikari.com.np",
    tags: ["React", "Vite", "Firebase", "Vercel"],
  },
];

const experience = [
  {
    icon: "🖥️",
    role: "Senior IT Executive",
    company: "Maharaja Casino (Marriott Kathmandu)",
    period: "Current",
    desc: "End-to-end IT operations — server administration, Active Directory, Sophos firewall management, CCTV infrastructure, network troubleshooting, and user support for a premium hospitality environment.",
  },
  {
    icon: "💻",
    role: "Frontend & Mobile Developer",
    company: "Freelance / Personal Projects",
    period: "2024 – Present",
    desc: "Designing and shipping production web and mobile apps using React, React Native (Expo), and Firebase. Focus on performance, clean UI, and real-world deployment pipelines.",
  },
];

const certifications = [
  {
    icon: "☁️",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    status: "completed",
  },
  {
    icon: "🛡️",
    name: "CompTIA Network+",
    issuer: "CompTIA",
    year: "2023",
    status: "completed",
  },
  {
    icon: "🪟",
    name: "Microsoft AZ-900",
    issuer: "Microsoft Azure",
    year: "In Progress",
    status: "inProgress",
  },
];

const stats = [
  { num: "5+", label: "Years IT Experience" },
  { num: "2",  label: "Live Apps Deployed"  },
  { num: "50+",label: "Systems Managed"     },
  { num: "100%",label: "Uptime Focus"       },
];

// ── Update these links ──
const LINKEDIN_URL = "https://linkedin.com/in/rajibadh";   // update gara
const GITHUB_URL   = "https://github.com/rajibadhi";
const RESUME_URL   = "#"; // Google Drive resume link halincha paxi

/* ─── COMPONENT ───────────────────────────────────────────── */
export default function Portfolio() {
  const [gallery,   setGallery]   = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [lightbox,  setLightbox]  = useState(null);

  useEffect(() => {
    const qG = query(collection(db, 'gallery'),   orderBy('createdAt', 'desc'));
    const qD = query(collection(db, 'downloads'), orderBy('createdAt', 'desc'));
    const unsubG = onSnapshot(qG, s => setGallery(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubD = onSnapshot(qD, s => setDownloads(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    return () => { unsubG(); unsubD(); };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navInner">
          <span className="navBrand">Rajib Adhikari</span>
          <div className="navLinks">
            <a className="navLink" href="#about">About</a>
            <a className="navLink" href="#skills">Skills</a>
            <a className="navLink" href="#certifications">Certs</a>
            <a className="navLink" href="#experience">Experience</a>
            <a className="navLink" href="#projects">Projects</a>
            {gallery.length   > 0 && <a className="navLink" href="#gallery">Gallery</a>}
            {downloads.length > 0 && <a className="navLink" href="#downloads">Downloads</a>}
            <a className="navCta btn small" href="#contact">Hire Me</a>
          </div>
        </div>
      </nav>

      <div className="container">

        {/* HERO */}
        <section className="hero">
          <div className="heroCard">
            <div className="heroSplit">
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
                  {RESUME_URL !== "#" && (
                    <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn outline">
                      ↓ Resume
                    </a>
                  )}
                </div>
              </div>
              <div className="heroRight">
                <img className="avatar" src={profile} alt="Rajib Adhikari" />
                <div className="statusBadge">
                  <span className="statusDot" />
                  Open to Work
                </div>
              </div>
            </div>
          </div>

          <div className="statsStrip">
            {stats.map(s => (
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
            <p className="muted">Nepal-based IT professional with hands-on experience in infrastructure and modern web development.</p>
          </div>
          <div className="grid2">
            <div className="card">
              <h3>Who I Am</h3>
              <p className="muted">I work across end-to-end IT operations — from user support to server administration, networking, firewall management, and CCTV systems. I also build and ship production apps with React and React Native.</p>
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
            <div className="card"><h3>🖥️ IT Operations</h3><p className="muted">Helpdesk support, asset management, backup planning, and routine preventive maintenance.</p></div>
            <div className="card"><h3>🏗️ Infrastructure</h3><p className="muted">Windows Server, Active Directory, user policies, Linux administration and CCTV IP camera setup.</p></div>
            <div className="card"><h3>🔒 Network & Security</h3><p className="muted">Network troubleshooting, Sophos firewall rules, VPN configuration, and secure remote access.</p></div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="sectionHead centerText">
            <h2>Skills</h2>
            <p className="muted">Tools and technologies I use in real projects and daily operations.</p>
          </div>
          <div className="grid2">
            {skills.map(g => (
              <div className="card" key={g.title}>
                <h3>{g.title}</h3>
                <div className="skills">
                  {g.items.map(s => <span key={s} className="pill">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="section" id="certifications">
          <div className="sectionHead centerText">
            <h2>Certifications</h2>
            <p className="muted">Professional credentials and ongoing learning.</p>
          </div>
          <div className="certGrid">
            {certifications.map((c, i) => (
              <div className="certCard" key={i}>
                <div className="certIcon">{c.icon}</div>
                <div className="certName">{c.name}</div>
                <div className="certIssuer">{c.issuer}</div>
                <div className="certYear">{c.year}</div>
                <span className={`certStatus ${c.status === 'inProgress' ? 'inProgress' : ''}`}>
                  {c.status === 'inProgress' ? '⏳ In Progress' : '✓ Completed'}
                </span>
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
            {projects.map(p => (
              <div className="card projectCard" key={p.name}>
                <div className="projectIcon">{p.icon}</div>
                <div className="projectTop">
                  <h3>{p.name}</h3>
                  <div className="tagRow">
                    {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
                <p className="muted">{p.desc}</p>
                <a className="link" href={p.link} target="_blank" rel="noreferrer">View Live Project →</a>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="section" id="gallery">
            <div className="sectionHead centerText">
              <h2>Gallery</h2>
              <p className="muted">Photos and snapshots from work and projects.</p>
            </div>
            <div className="galleryGrid">
              {gallery.map(photo => (
                <div className="galleryItem" key={photo.id} onClick={() => setLightbox(photo)}>
                  <img src={photo.url} alt={photo.title || ''} loading="lazy" />
                  {photo.title && <div className="galleryOverlay"><span>{photo.title}</span></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DOWNLOADS */}
        {downloads.length > 0 && (
          <section className="section" id="downloads">
            <div className="sectionHead centerText">
              <h2>Downloads</h2>
              <p className="muted">Useful tools and software.</p>
            </div>
            <div className="grid3">
              {downloads.map(dl => (
                <div className="card dlCard" key={dl.id}>
                  <div className="dlIcon">{dl.icon || '💾'}</div>
                  <h3>{dl.name}</h3>
                  {dl.version  && <span className="dlVersion">v{dl.version}</span>}
                  <p className="muted">{dl.description}</p>
                  {dl.category && <span className="dlCategory">{dl.category}</span>}
                  <a className="btn small dlBtn" href={dl.url} target="_blank" rel="noreferrer">↓ Download</a>
                </div>
              ))}
            </div>
          </section>
        )}

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
              <a className="btn small" href="mailto:rajibadh@gmail.com">Send Email →</a>
            </div>
            <div className="divider" />
            <div className="contactRow">
              <div>
                <p className="label">Location</p>
                <p className="value">Kathmandu, Nepal 🇳🇵</p>
              </div>
              <div>
                <p className="label">Availability</p>
                <p className="value" style={{ color: 'var(--accent3)' }}>Open to opportunities</p>
              </div>
            </div>
            <div className="divider" />
            <div className="socialLinks">
              <a className="socialBtn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a className="socialBtn" href={GITHUB_URL} target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} Rajib Adhikari — Kathmandu, Nepal</div>
        <div className="footerLinks">
          <a className="footerLink" href="mailto:rajibadh@gmail.com">Email</a>
          <a className="footerLink" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="footerLink" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a className="footerLink" href="https://cashmate.rajibadhikari.com.np" target="_blank" rel="noreferrer">CashMate</a>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightboxOverlay" onClick={() => setLightbox(null)}>
          <div className="lightboxInner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.title || ''} />
            {lightbox.title       && <p className="lightboxTitle">{lightbox.title}</p>}
            {lightbox.description && <p className="lightboxDesc">{lightbox.description}</p>}
            <button className="lightboxClose" onClick={() => setLightbox(null)}>✕ Close</button>
          </div>
        </div>
      )}
    </>
  );
}