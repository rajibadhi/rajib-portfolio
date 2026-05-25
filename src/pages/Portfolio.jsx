import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import profile from '../assets/rajib.jpeg';

/* ─── EMAILJS KEYS ────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_pbi0pzj";
const EMAILJS_TEMPLATE_ID = "template_02sbq9j";
const EMAILJS_PUBLIC_KEY  = "XoIU40ZK41ykpS0ms";

/* ─── SCROLL REVEAL HOOK ──────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── STATIC DATA ─────────────────────────────────────────── */
const skills = [
  { title:"Core IT & Infrastructure",   icon:"🖥️", items:["Windows Server","Linux Administration","Active Directory","Networking","Sophos Firewall","CCTV & IP Camera","Attendance System","IT Support & Troubleshooting"] },
  { title:"Cloud & DevOps",             icon:"☁️", items:["AWS","Firebase (Firestore, Auth)","Vercel","EAS Build","Docker Basics","Backup & Recovery","Monitoring & Alerting"] },
  { title:"Web & Mobile Development",   icon:"⚡", items:["React","React Native","Expo & Expo Router","TypeScript","JavaScript","Vite","HTML & CSS"] },
  { title:"Tools & Practices",          icon:"🔧", items:["Git & GitHub","AdMob Integration","Remote Support","Documentation","Asset Tracking","Agile Basics"] },
];

const whatIDo = [
  { icon:"🖥️", title:"IT Operations",       desc:"Helpdesk support, asset management, backup planning, and routine preventive maintenance across enterprise systems.", items:["Helpdesk & User Support","Asset Management","Backup Planning","Preventive Maintenance"] },
  { icon:"🏗️", title:"Infrastructure",      desc:"Windows Server, Active Directory, user policies, Linux administration and CCTV IP camera setup.", items:["Windows Server & AD","Linux Administration","CCTV & IP Camera Setup","User Policy Management"] },
  { icon:"🔒", title:"Network & Security",   desc:"Network troubleshooting, Sophos firewall rules, VPN configuration, and secure remote access.", items:["Sophos Firewall Rules","VPN Configuration","Network Troubleshooting","Secure Remote Access"] },
  { icon:"💻", title:"Web & App Development",desc:"Building and shipping production web and mobile apps using React, React Native, and Firebase.", items:["React & React Native","Firebase Integration","Vercel Deployment","EAS Build & Release"] },
];

const projects = [
  { icon:"💰", name:"CashMate Nepal",    desc:"Full-featured business ledger and personal finance app built with React Native (Expo), Firebase Firestore for real-time sync, AdMob monetization, and deployed as a web app via Vercel.", link:"https://cashmate.rajibadhikari.com.np", tags:["React Native","Expo","Firebase","TypeScript","AdMob"] },
  { icon:"🌐", name:"Portfolio Website", desc:"Personal portfolio with a Firebase-powered dynamic CMS — admin panel for managing gallery photos and software downloads. Deployed on Vercel with CI/CD.", link:"https://rajibadhikari.com.np", tags:["React","Vite","Firebase","Vercel"] },
];

const experience = [
  { icon:"🖥️", role:"Senior IT Executive",        company:"Hospitality & Gaming Industry", period:"Current",        desc:"End-to-end IT operations — server administration, Active Directory, Sophos firewall management, CCTV infrastructure, network troubleshooting, and user support in a high-availability enterprise environment." },
  { icon:"💻", role:"Frontend & Mobile Developer", company:"Freelance / Personal Projects",  period:"2024 – Present", desc:"Designing and shipping production web and mobile apps using React, React Native (Expo), and Firebase. Focus on performance, clean UI, and real-world deployment pipelines." },
];

const certifications = [
  { icon:"☁️", name:"AWS Cloud Practitioner", issuer:"Amazon Web Services", year:"2024",        status:"completed"  },
  { icon:"🛡️", name:"CompTIA Network+",       issuer:"CompTIA",            year:"2023",        status:"completed"  },
  { icon:"🪟", name:"Microsoft AZ-900",        issuer:"Microsoft Azure",    year:"In Progress", status:"inProgress" },
];

const stats = [
  { num:"5+",  label:"Years Experience" },
  { num:"2",   label:"Live Apps"        },
  { num:"50+", label:"Systems Managed"  },
  { num:"100%",label:"Uptime Focus"     },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/rajib-adhikari-63191365/";
const RESUME_URL   = "#";

/* ─── FLOATING PARTICLES ──────────────────────────────────── */
function Particles() {
  useEffect(() => {
    const el = document.getElementById('particles');
    if (!el || el.children.length > 0) return;
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (10 + Math.random() * 10) + 's';
      el.appendChild(p);
    }
  }, []);
  return <div className="particles" id="particles" />;
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ hasGallery, hasDownloads }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label:"About",      href:"#about"          },
    { label:"Services",   href:"#services"       },
    { label:"Skills",     href:"#skills"         },
    { label:"Certs",      href:"#certifications" },
    { label:"Experience", href:"#experience"     },
    { label:"Projects",   href:"#projects"       },
    ...(hasGallery   ? [{ label:"Gallery",   href:"#gallery"   }] : []),
    ...(hasDownloads ? [{ label:"Downloads", href:"#downloads" }] : []),
    { label:"Contact",    href:"#contact"        },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navInner">
          <a href="#" className="logo" onClick={close}>⚡ RAJIB ADHIKARI</a>
          <ul className="navLinks">
            {links.map(l => <li key={l.label}><a className="navLink" href={l.href}>{l.label}</a></li>)}
            <li><a className="btn btn-primary navCta" href="#contact">Hire Me</a></li>
          </ul>
          <button className={`hamburger ${open ? 'open':''}`} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {open && (
        <div className="mobileMenu">
          {links.map(l => <a key={l.label} className="mobileLink" href={l.href} onClick={close}>{l.label}</a>)}
          <a className="mobileLink mobileCta" href="#contact" onClick={close}>Hire Me</a>
        </div>
      )}
    </>
  );
}

/* ─── CONTACT FORM ───────────────────────────────────────── */
function ContactForm() {
  const [form,   setForm]   = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name:'', email:'', message:'' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Name</label>
        <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" required />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." required />
      </div>
      {status === 'success' && <p className="cfSuccess">✓ Message sent! Rajib will get back to you soon.</p>}
      {status === 'error'   && <p className="cfError">Something went wrong. Please email directly at rajibadh@gmail.com</p>}
      <button type="submit" className="btn btn-primary cfBtn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}

/* ─── BACK TO TOP ────────────────────────────────────────── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!show) return null;
  return (
    <button className="backToTop" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} aria-label="Back to top">↑</button>
  );
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function Portfolio() {
  const [gallery,   setGallery]   = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [lightbox,  setLightbox]  = useState(null);

  useReveal();

  useEffect(() => {
    const qG = query(collection(db,'gallery'),   orderBy('createdAt','desc'));
    const qD = query(collection(db,'downloads'), orderBy('createdAt','desc'));
    const unG = onSnapshot(qG, s => setGallery(s.docs.map(d => ({ id:d.id,...d.data() }))));
    const unD = onSnapshot(qD, s => setDownloads(s.docs.map(d => ({ id:d.id,...d.data() }))));
    return () => { unG(); unD(); };
  }, []);

  return (
    <>
      <div className="bg-pattern" />
      <Particles />
      <Navbar hasGallery={gallery.length > 0} hasDownloads={downloads.length > 0} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✦ IT PROFESSIONAL & DEVELOPER ✦</div>
          <h1 className="hero-name">Rajib Adhikari</h1>
          <p className="hero-subtitle">IT Support · Cloud Infrastructure · Web & Mobile Development</p>
          <p className="hero-desc">
            Nepal-based IT professional who keeps enterprise systems running smoothly and ships clean, fast web & mobile apps with React and Expo. From server rooms to code editors — I bridge the gap between infrastructure and innovation.
          </p>
          <div className="heroSplit-visual">
            <div className="hero-avatar-wrap">
              <img className="avatar" src={profile} alt="Rajib Adhikari" />
              <div className="statusBadge"><span className="statusDot" />Open to Work</div>
            </div>
          </div>
          <div className="hero-chips">
            {["Windows Server","Linux","AWS","Sophos Firewall","React","React Native","Firebase"].map(c => <span key={c} className="chip">{c}</span>)}
          </div>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">Contact Me</a>
            <a href="#projects" className="btn btn-secondary">View My Work</a>
            {RESUME_URL !== "#" && <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn btn-secondary">↓ Resume</a>}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip fade-in">
        {stats.map(s => (
          <div className="stat-item" key={s.label}>
            <div className="stat-number">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="container">

        {/* ABOUT */}
        <section className="section fade-in" id="about">
          <div className="section-header">
            <h2>About Me</h2>
            <div className="divider" />
            <p>Nepal-based IT professional with hands-on experience in infrastructure and modern web development.</p>
          </div>
          <div className="about-grid">
            <div className="about-image">
              <div className="about-image-frame">
                <img className="about-avatar" src={profile} alt="Rajib Adhikari" />
                <div className="name-display">RAJIB ADHIKARI</div>
                <div className="title-display">IT Professional & Developer</div>
              </div>
            </div>
            <div className="about-text">
              <h3>Your Reliable IT Partner</h3>
              <p>I work across end-to-end IT operations — from user support to server administration, networking, firewall management, and CCTV systems. My focus is on keeping enterprise environments stable, secure, and efficient.</p>
              <p>Beyond infrastructure, I build and ship production apps with React and React Native. I believe in bridging the gap between traditional IT and modern development — bringing reliability and innovation together.</p>
              <p>Currently working in Nepal's hospitality and gaming industry while pursuing cloud certifications and building side projects that solve real problems.</p>
            </div>
          </div>
        </section>

        {/* SERVICES / WHAT I DO */}
        <section className="section" id="services">
          <div className="section-header fade-in">
            <h2>What I Do</h2>
            <div className="divider" />
            <p>A practical snapshot of my technical strengths and service areas</p>
          </div>
          <div className="services-grid">
            {whatIDo.map(s => (
              <div className="service-card fade-in" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="service-list">
                  {s.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="section-header fade-in">
            <h2>Skills & Technologies</h2>
            <div className="divider" />
            <p>Tools and technologies I use in real projects and daily operations</p>
          </div>
          <div className="skills-grid">
            {skills.map(g => (
              <div className="skill-card fade-in" key={g.title}>
                <div className="service-icon">{g.icon}</div>
                <h3>{g.title}</h3>
                <div className="pills">{g.items.map(s => <span key={s} className="pill">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="section" id="certifications">
          <div className="section-header fade-in">
            <h2>Certifications</h2>
            <div className="divider" />
            <p>Professional credentials and ongoing learning</p>
          </div>
          <div className="cert-grid">
            {certifications.map((c,i) => (
              <div className="cert-card fade-in" key={i}>
                <div className="cert-icon">{c.icon}</div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-year">{c.year}</div>
                <span className={`cert-status ${c.status==='inProgress'?'inProgress':''}`}>
                  {c.status==='inProgress' ? '⏳ In Progress' : '✓ Completed'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <div className="section-header fade-in">
            <h2>Experience</h2>
            <div className="divider" />
            <p>Where I've applied my skills in the real world</p>
          </div>
          <div className="timeline-wrap fade-in">
            {experience.map((e,i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot">{e.icon}</div>
                <div className="timeline-content">
                  <h3>{e.role}</h3>
                  <div className="timeline-company">{e.company}</div>
                  <div className="timeline-period">{e.period}</div>
                  <p>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="section-header fade-in">
            <h2>Projects</h2>
            <div className="divider" />
            <p>Selected work and live deployments</p>
          </div>
          <div className="projects-grid">
            {projects.map(p => (
              <div className="project-card fade-in" key={p.name}>
                <div>
                  <span className="project-tag">{p.icon} {p.name}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="tag-row">{p.tags.map(t => <span className="pill" key={t}>{t}</span>)}</div>
                </div>
                <div className="project-meta">
                  <a className="project-link" href={p.link} target="_blank" rel="noreferrer">View Live Project →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="section" id="gallery">
            <div className="section-header fade-in">
              <h2>Gallery</h2>
              <div className="divider" />
              <p>Photos and snapshots from work and projects</p>
            </div>
            <div className="gallery-grid">
              {gallery.map(photo => (
                <div className="gallery-item fade-in" key={photo.id} onClick={() => setLightbox(photo)}>
                  <img src={photo.url} alt={photo.title||''} loading="lazy" />
                  {photo.title && <div className="gallery-overlay"><span>{photo.title}</span></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DOWNLOADS */}
        {downloads.length > 0 && (
          <section className="section" id="downloads">
            <div className="section-header fade-in">
              <h2>Downloads</h2>
              <div className="divider" />
              <p>Useful tools and software</p>
            </div>
            <div className="downloads-grid">
              {downloads.map(dl => (
                <div className="service-card fade-in" key={dl.id}>
                  <div className="service-icon">{dl.icon||'💾'}</div>
                  <h3>{dl.name}</h3>
                  {dl.version  && <span className="dl-version">v{dl.version}</span>}
                  <p>{dl.description}</p>
                  {dl.category && <span className="dl-category">{dl.category}</span>}
                  <a className="btn btn-primary small" href={dl.url} target="_blank" rel="noreferrer">↓ Download</a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="section-header fade-in">
            <h2>Let's Connect</h2>
            <div className="divider" />
            <p>Open for IT roles, freelance projects, or collaboration</p>
          </div>
          <div className="contact-grid fade-in">
            <div className="contact-info">
              <h3>Talk to Rajib</h3>
              <p>Feel free to reach out for any IT project, technical consultation, or collaboration opportunity. I'll get back to you as soon as possible.</p>
              <div className="contact-item">
                <div className="contact-item-icon">📧</div>
                <div className="contact-item-text">
                  <strong>Email</strong>
                  rajibadh@gmail.com
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <strong>Location</strong>
                  Kathmandu, Nepal 🇳🇵
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">🟢</div>
                <div className="contact-item-text">
                  <strong>Availability</strong>
                  Open to opportunities
                </div>
              </div>
              <div className="contact-socials">
                <a className="btn btn-secondary" href="mailto:rajibadh@gmail.com">✉ Email Me</a>
                <a className="btn btn-secondary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:6}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="contact-form-card">
              <h3>Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">⚡ RAJIB ADHIKARI</div>
        <p>© {new Date().getFullYear()} Rajib Adhikari — IT Professional & Developer | Kathmandu, Nepal</p>
        <div className="footerLinks">
          <a className="footerLink" href="mailto:rajibadh@gmail.com">Email</a>
          <a className="footerLink" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="footerLink" href="https://cashmate.rajibadhikari.com.np" target="_blank" rel="noreferrer">CashMate</a>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightboxOverlay" onClick={() => setLightbox(null)}>
          <div className="lightboxInner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.title||''} />
            {lightbox.title       && <p className="lightboxTitle">{lightbox.title}</p>}
            {lightbox.description && <p className="lightboxDesc">{lightbox.description}</p>}
            <button className="lightboxClose" onClick={() => setLightbox(null)}>✕ Close</button>
          </div>
        </div>
      )}

      <BackToTop />
    </>
  );
}