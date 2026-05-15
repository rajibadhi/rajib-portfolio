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
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── STATIC DATA ─────────────────────────────────────────── */
const skills = [
  { title:"Core IT & Infrastructure",   items:["Windows Server","Linux Administration","Active Directory","Networking","Sophos Firewall","CCTV & IP Camera","Attendance System","IT Support & Troubleshooting"] },
  { title:"Cloud & DevOps",             items:["AWS","Firebase (Firestore, Auth)","Vercel","EAS Build","Docker Basics","Backup & Recovery","Monitoring & Alerting"] },
  { title:"Web & Mobile Development",   items:["React","React Native","Expo & Expo Router","TypeScript","JavaScript","Vite","HTML & CSS"] },
  { title:"Tools & Practices",          items:["Git & GitHub","AdMob Integration","Remote Support","Documentation","Asset Tracking","Agile Basics"] },
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
  { num:"5+",  label:"Years IT Experience" },
  { num:"2",   label:"Live Apps Deployed"  },
  { num:"50+", label:"Systems Managed"     },
  { num:"100%",label:"Uptime Focus"        },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/rajib-adhikari-63191365/";
const RESUME_URL   = "#"; // Google Drive resume PDF link halnu

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ hasGallery, hasDownloads }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links = [
    { label:"About",      href:"#about"          },
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
      <nav className="navbar">
        <div className="navInner">
          <a href="#" className="navBrand" onClick={close}>RA</a>
          <div className="navLinks">
            {links.map(l => <a key={l.label} className="navLink" href={l.href}>{l.label}</a>)}
            <a className="navCta" href="#contact">Hire Me</a>
          </div>
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
        { from_name: form.name, from_email: form.email, message: form.message, to_name: 'Rajib' },
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
      <div className="cfRow">
        <div className="adminField">
          <label>Name</label>
          <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required />
        </div>
        <div className="adminField">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
        </div>
      </div>
      <div className="adminField">
        <label>Message</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." required />
      </div>
      {status === 'success' && <p className="cfSuccess">✓ Message sent! Rajib will get back to you soon.</p>}
      {status === 'error'   && <p className="cfError">Something went wrong. Please email directly at rajibadh@gmail.com</p>}
      <button type="submit" className="btn cfBtn" disabled={status === 'sending'}>
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
      <Navbar hasGallery={gallery.length > 0} hasDownloads={downloads.length > 0} />

      <div className="container">

        {/* HERO */}
        <section className="hero">
          <div className="heroCard">
            <div className="heroSplit">
              <div className="heroLeft">
                <span className="kicker">IT Support · Cloud · Frontend</span>
                <h1 className="heroName">Rajib<br />Adhikari</h1>
                <p className="subtitle">Nepal-based IT professional who keeps systems running and ships clean, fast web &amp; mobile apps with React and Expo.</p>
                <div className="heroChips">
                  {["Windows Server","Linux","AWS","Sophos Firewall","React","React Native","Firebase"].map(c => <span key={c} className="chip">{c}</span>)}
                </div>
                <div className="heroActions">
                  <a href="#contact" className="btn">Contact Me</a>
                  <a href="#projects" className="btn ghost">View Work →</a>
                  {RESUME_URL !== "#" && <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn outline">↓ Resume</a>}
                </div>
              </div>
              <div className="heroRight">
                <img className="avatar" src={profile} alt="Rajib Adhikari" />
                <div className="statusBadge"><span className="statusDot" />Open to Work</div>
              </div>
            </div>
          </div>
          <div className="statsStrip">
            {stats.map(s => <div className="statItem" key={s.label}><div className="statNum">{s.num}</div><div className="statLabel">{s.label}</div></div>)}
          </div>
        </section>

        {/* ABOUT */}
        <section className="section reveal" id="about">
          <div className="sectionHead centerText"><h2>About Me</h2><p className="muted">Nepal-based IT professional with hands-on experience in infrastructure and modern web development.</p></div>
          <div className="grid2">
            <div className="card reveal"><h3>Who I Am</h3><p className="muted">I work across end-to-end IT operations — from user support to server administration, networking, firewall management, and CCTV systems. I also build and ship production apps with React and React Native.</p></div>
            <div className="card reveal"><h3>What I Focus On</h3><ul className="list"><li>Stable systems and fast incident resolution</li><li>Security-first mindset and access control</li><li>Documentation and preventive maintenance</li><li>Scalable web and mobile app development</li><li>Real-world deployment: Vercel, EAS Build, Firebase</li></ul></div>
          </div>
        </section>

        {/* WHAT I DO */}
        <section className="section reveal">
          <div className="sectionHead centerText"><h2>What I Do</h2><p className="muted">A quick snapshot of my practical strengths.</p></div>
          <div className="grid3">
            <div className="card reveal"><h3>🖥️ IT Operations</h3><p className="muted">Helpdesk support, asset management, backup planning, and routine preventive maintenance.</p></div>
            <div className="card reveal"><h3>🏗️ Infrastructure</h3><p className="muted">Windows Server, Active Directory, user policies, Linux administration and CCTV IP camera setup.</p></div>
            <div className="card reveal"><h3>🔒 Network & Security</h3><p className="muted">Network troubleshooting, Sophos firewall rules, VPN configuration, and secure remote access.</p></div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section reveal" id="skills">
          <div className="sectionHead centerText"><h2>Skills</h2><p className="muted">Tools and technologies I use in real projects and daily operations.</p></div>
          <div className="grid2">
            {skills.map(g => (
              <div className="card reveal" key={g.title}>
                <h3>{g.title}</h3>
                <div className="skills">{g.items.map(s => <span key={s} className="pill">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="section reveal" id="certifications">
          <div className="sectionHead centerText"><h2>Certifications</h2><p className="muted">Professional credentials and ongoing learning.</p></div>
          <div className="certGrid">
            {certifications.map((c,i) => (
              <div className="certCard reveal" key={i}>
                <div className="certIcon">{c.icon}</div>
                <div className="certName">{c.name}</div>
                <div className="certIssuer">{c.issuer}</div>
                <div className="certYear">{c.year}</div>
                <span className={`certStatus ${c.status==='inProgress'?'inProgress':''}`}>
                  {c.status==='inProgress' ? '⏳ In Progress' : '✓ Completed'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section reveal" id="experience">
          <div className="sectionHead centerText"><h2>Experience</h2><p className="muted">Where I've applied my skills in the real world.</p></div>
          <div className="card reveal">
            <div className="timeline">
              {experience.map((e,i) => (
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
        <section className="section reveal" id="projects">
          <div className="sectionHead centerText"><h2>Projects</h2><p className="muted">Selected work and live deployments.</p></div>
          <div className="grid2">
            {projects.map(p => (
              <div className="card projectCard reveal" key={p.name}>
                <div className="projectIcon">{p.icon}</div>
                <div className="projectTop">
                  <h3>{p.name}</h3>
                  <div className="tagRow">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                </div>
                <p className="muted">{p.desc}</p>
                <a className="link" href={p.link} target="_blank" rel="noreferrer">View Live Project →</a>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="section reveal" id="gallery">
            <div className="sectionHead centerText"><h2>Gallery</h2><p className="muted">Photos and snapshots from work and projects.</p></div>
            <div className="galleryGrid">
              {gallery.map(photo => (
                <div className="galleryItem reveal" key={photo.id} onClick={() => setLightbox(photo)}>
                  <img src={photo.url} alt={photo.title||''} loading="lazy" />
                  {photo.title && <div className="galleryOverlay"><span>{photo.title}</span></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DOWNLOADS */}
        {downloads.length > 0 && (
          <section className="section reveal" id="downloads">
            <div className="sectionHead centerText"><h2>Downloads</h2><p className="muted">Useful tools and software.</p></div>
            <div className="grid3">
              {downloads.map(dl => (
                <div className="card dlCard reveal" key={dl.id}>
                  <div className="dlIcon">{dl.icon||'💾'}</div>
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
        <section className="section reveal" id="contact">
          <div className="sectionHead centerText">
            <h2>Let's Connect</h2>
            <p className="muted">Open for IT roles, freelance projects, or collaboration.</p>
          </div>
          <div className="grid2">
            <div className="card reveal">
              <div className="contactInfo">
                <div><p className="label">Email</p><p className="value">rajibadh@gmail.com</p></div>
                <div><p className="label">Location</p><p className="value">Kathmandu, Nepal 🇳🇵</p></div>
                <div><p className="label">Availability</p><p className="value" style={{color:'var(--accent3)'}}>Open to opportunities</p></div>
                <div className="socialLinks">
                  <a className="socialBtn" href="mailto:rajibadh@gmail.com">✉ Email Me</a>
                  <a className="socialBtn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="card reveal">
              <h3 style={{marginBottom:'16px'}}>Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </section>

      </div>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Rajib Adhikari — Kathmandu, Nepal</div>
        <div className="footerLinks">
          <a className="footerLink" href="mailto:rajibadh@gmail.com">Email</a>
          <a className="footerLink" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="footerLink" href="https://cashmate.rajibadhikari.com.np" target="_blank" rel="noreferrer">CashMate</a>
        </div>
      </footer>

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
