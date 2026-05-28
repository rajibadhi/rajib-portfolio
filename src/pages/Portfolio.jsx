import { useEffect, useState, useRef } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import profile from '../assets/rajib.jpeg';

/* ─── EMAILJS KEYS ────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_pbi0pzj";
const EMAILJS_TEMPLATE_ID = "template_02sbq9j";
const EMAILJS_PUBLIC_KEY  = "XoIU40ZK41ykpS0ms";

/* ─── SCROLL REVEAL ───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── TYPING EFFECT ───────────────────────────────────────── */
function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1800);
        return;
      }
      if (deleting && text === '') {
        setDeleting(false);
        setIdx(i => i + 1);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words]);
  return <span className="typed">{text}<span className="cursor">|</span></span>;
}

/* ─── STATIC DATA ─────────────────────────────────────────── */
const roles = ["IT Infrastructure Expert", "React Developer", "Network Engineer", "Hardware Specialist", "Software Trainer"];

const whatIDo = [
  { icon:"🖥️", title:"IT Infrastructure & Networking", desc:"Full-stack infrastructure — Windows Server, Active Directory, HPE switch management, VLAN configuration, file server setup with permissions, network printer sharing, and end-to-end network troubleshooting." },
  { icon:"🔒", title:"Security & Access Systems",      desc:"Sophos firewall management, CCTV/IP camera installation, biometric attendance device setup (installation, admin unlock), access control systems, and VPN configuration for secure remote access." },
  { icon:"🔧", title:"Hardware & Technical Support",    desc:"Computer and laptop repair, PC assembly, server hardware configuration, peripheral setup, helpdesk support, and preventive maintenance — plus hands-on training for any software platform." },
  { icon:"💻", title:"Software & Development",          desc:"Custom utility tools that simplify daily workflows, full web and mobile apps with React & React Native, VMware virtualization, and deployment via modern CI/CD pipelines." },
];

const capabilities = [
  { cat:"Server & Virtualization", icon:"🖥️", items:["Windows Server Administration","Active Directory & Group Policy","File Server Setup & Configuration","File/Folder Sharing & Permissions","VMware vSphere / ESXi","Server Hardware Configuration","Backup & Disaster Recovery","User Account Management"] },
  { cat:"Networking",              icon:"🌐", items:["HPE Switch Management & Configuration","VLAN Setup & Management","Network Printer Sharing","Sophos Firewall Rules & Policies","VPN Configuration","TCP/IP, DNS, DHCP","Network Troubleshooting & Diagnostics","Structured Cabling & Rack Setup"] },
  { cat:"Security & Access",       icon:"🔒", items:["CCTV / IP Camera Installation & Config","Access Control System Installation","Biometric Attendance Device Setup","Attendance Device Admin Unlock","Attendance Software Management","Sophos Firewall Security","Secure Remote Access"] },
  { cat:"Hardware & Support",      icon:"🔧", items:["Computer & Laptop Repair","PC Assembly & Build","Hardware Troubleshooting","Peripheral Installation","Printer Setup & Maintenance","IT Helpdesk & User Support","Preventive Maintenance","Asset Tracking & Lifecycle Management"] },
  { cat:"Software & Training",     icon:"📚", items:["Attendance Software Training","Any Software Training & Onboarding","Custom Utility Tool Development","Office Suite & Productivity Tools","POS System Setup","Documentation & SOPs","Remote Desktop Support","End-User Training Programs"] },
  { cat:"Development & Cloud",     icon:"☁️", items:["React & React Native (Expo)","TypeScript / JavaScript","Firebase (Firestore, Auth)","Vite & Modern Build Tools","AWS Cloud Services","Vercel & CI/CD Deployment","Git & GitHub","AdMob Integration","HTML / CSS","Docker Basics","EAS Build & Release"] },
];

const projects = [
  { icon:"💰", name:"CashMate Nepal", desc:"Business ledger & personal finance app — React Native, Firebase real-time sync, AdMob monetization, deployed on Vercel.", link:"https://cashmate.rajibadhikari.com.np", tags:["React Native","Expo","Firebase","TypeScript","AdMob"] },
  { icon:"🌐", name:"Portfolio Website", desc:"This site — dynamic CMS with Firebase admin panel for gallery & downloads, deployed on Vercel with CI/CD.", link:"https://rajibadhikari.com.np", tags:["React","Vite","Firebase","Vercel"] },
];

const experience = [
  { icon:"🖥️", role:"Senior IT Executive", company:"Hospitality & IT Industry", period:"2015 – Present", desc:"End-to-end IT operations — server administration, Active Directory, Sophos firewall, CCTV infrastructure, network troubleshooting, and user support. Over a decade of hands-on experience keeping critical systems running 24/7." },
  { icon:"💻", role:"Frontend & Mobile Developer", company:"Freelance / Personal Projects", period:"2024 – Present", desc:"Designing and shipping production web and mobile apps using React, React Native (Expo), and Firebase. Focus on clean UI, performance, and real-world deployment." },
];

const stats = [
  { num:"10+", label:"Years in IT" },
  { num:"2",   label:"Live Apps" },
  { num:"50+", label:"Systems Managed" },
  { num:"100%",label:"Uptime Focus" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/rajib-adhikari-63191365/";

/* ─── (removed accordion — using simple grid now) ── */

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
    { label:"About",      href:"#about" },
    { label:"Services",   href:"#services" },
    { label:"Skills",    href:"#stack" },
    { label:"Experience", href:"#experience" },
    { label:"Projects",   href:"#projects" },
    ...(hasGallery   ? [{ label:"Gallery",   href:"#gallery" }] : []),
    ...(hasDownloads ? [{ label:"Downloads", href:"#downloads" }] : []),
    { label:"Contact",    href:"#contact" },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#" className="nav__logo" onClick={close}>
            <span className="nav__logo-icon">💻</span>
            <span>RAJIB<span className="nav__logo-dot">.</span></span>
          </a>
          <ul className="nav__links">
            {links.map(l => <li key={l.label}><a className="nav__link" href={l.href}>{l.label}</a></li>)}
            <li><a className="btn btn--gold nav__cta" href="#contact">Let's Talk</a></li>
          </ul>
          <button className={`burger ${open ? 'burger--open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {open && (
        <div className="mob-menu">
          {links.map(l => <a key={l.label} className="mob-menu__link" href={l.href} onClick={close}>{l.label}</a>)}
          <a className="btn btn--gold mob-menu__cta" href="#contact" onClick={close}>Let's Talk</a>
        </div>
      )}
    </>
  );
}

/* ─── CONTACT FORM ───────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setForm({ name:'', email:'', message:'' });
    } catch { setStatus('error'); }
  };
  return (
    <form className="c-form" onSubmit={onSubmit}>
      <div className="c-form__group">
        <input name="name" type="text" value={form.name} onChange={onChange} placeholder="Your Name" required />
      </div>
      <div className="c-form__group">
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email Address" required />
      </div>
      <div className="c-form__group">
        <textarea name="message" rows={5} value={form.message} onChange={onChange} placeholder="Your message..." required />
      </div>
      {status === 'success' && <p className="c-form__ok">✓ Message sent! Rajib will reply soon.</p>}
      {status === 'error' && <p className="c-form__err">Something went wrong. Try rajibadh@gmail.com directly.</p>}
      <button type="submit" className="btn btn--gold c-form__btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
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
  return <button className="btt" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} aria-label="Top">↑</button>;
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function Portfolio() {
  const [gallery, setGallery] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  useReveal();

  useEffect(() => {
    const qG = query(collection(db,'gallery'), orderBy('createdAt','desc'));
    const qD = query(collection(db,'downloads'), orderBy('createdAt','desc'));
    const unG = onSnapshot(qG, s => setGallery(s.docs.map(d => ({ id:d.id,...d.data() }))));
    const unD = onSnapshot(qD, s => setDownloads(s.docs.map(d => ({ id:d.id,...d.data() }))));
    return () => { unG(); unD(); };
  }, []);

  return (
    <>
      <Navbar hasGallery={gallery.length > 0} hasDownloads={downloads.length > 0} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid">
          <div className="hero__text">
            <div className="hero__badge">AVAILABLE FOR WORK</div>
            <h1 className="hero__name">
              Hi, I'm <span className="hero__accent">Rajib</span>
            </h1>
            <h2 className="hero__roles">
              <TypeWriter words={roles} />
            </h2>
            <p className="hero__desc">
              10+ years keeping enterprise systems rock-solid. Now building modern web & mobile apps with React and Expo — bridging infrastructure and innovation from Kathmandu.
            </p>
            <div className="hero__btns">
              <a href="#contact" className="btn btn--gold">Get In Touch</a>
              <a href="#projects" className="btn btn--outline">View Projects</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__card">
              <div className="hero__card-glow" />
              <img src={profile} alt="Rajib Adhikari" className="hero__avatar" />
              <div className="hero__card-info">
                <span className="hero__card-name">Rajib Adhikari</span>
                <span className="hero__card-role">Assistant Manager – IT</span>
                <span className="hero__card-loc">📍 Kathmandu, Nepal</span>
              </div>
              <div className="hero__card-stats">
                {stats.map(s => (
                  <div className="hero__card-stat" key={s.label}>
                    <strong>{s.num}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll to explore</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      <div className="wrap">

        {/* ── ABOUT ── */}
        <section className="sec reveal" id="about">
          <div className="sec__label">ABOUT</div>
          <h2 className="sec__title">The Backstory</h2>
          <div className="about">
            <div className="about__main">
              <p className="about__lead">I've spent over a decade in enterprise IT — keeping servers alive, networks secure, and users productive across high-availability environments in Nepal's hospitality and gaming industry.</p>
              <p>In recent years, I've expanded into full-stack development — building and shipping production apps with React, React Native, Firebase, and modern tooling. I believe the best IT professionals understand both the infrastructure and the code that runs on it.</p>
              <p>When I'm not managing firewalls or writing components, I'm exploring cloud platforms, contributing to side projects, and looking for the next problem worth solving.</p>
            </div>
            <div className="about__highlights">
              <div className="about__hl"><span className="about__hl-icon">🎯</span><div><strong>Focus</strong><span>Enterprise IT + Modern Dev</span></div></div>
              <div className="about__hl"><span className="about__hl-icon">📍</span><div><strong>Based in</strong><span>Kathmandu, Nepal</span></div></div>
              <div className="about__hl"><span className="about__hl-icon">💼</span><div><strong>Industry</strong><span>Hospitality / IT Services</span></div></div>
              <div className="about__hl"><span className="about__hl-icon">🚀</span><div><strong>Status</strong><span>Open to opportunities</span></div></div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="sec" id="services">
          <div className="sec__label reveal">WHAT I DO</div>
          <h2 className="sec__title reveal">Services & Expertise</h2>
          <div className="services">
            {whatIDo.map((s,i) => (
              <div className="svc reveal" key={s.title} style={{'--delay': `${i * 0.1}s`}}>
                <div className="svc__icon">{s.icon}</div>
                <h3 className="svc__title">{s.title}</h3>
                <p className="svc__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="sec" id="stack">
          <div className="sec__label reveal">SKILLS</div>
          <h2 className="sec__title reveal">Technical Skills</h2>
          <div className="skills-grid">
            {capabilities.map((g,i) => (
              <div className="sk reveal" key={g.cat} style={{'--delay': `${i * 0.08}s`}}>
                <div className="sk__head">
                  <span className="sk__icon">{g.icon}</span>
                  <h3 className="sk__cat">{g.cat}</h3>
                </div>
                <div className="sk__pills">
                  {g.items.map(t => <span className="stack__pill" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="sec" id="experience">
          <div className="sec__label reveal">CAREER</div>
          <h2 className="sec__title reveal">Experience</h2>
          <div className="timeline">
            {experience.map((e,i) => (
              <div className="tl reveal" key={i} style={{'--delay': `${i * 0.12}s`}}>
                <div className="tl__marker"><span>{e.icon}</span></div>
                <div className="tl__body">
                  <div className="tl__head">
                    <h3>{e.role}</h3>
                    <span className="tl__period">{e.period}</span>
                  </div>
                  <div className="tl__company">{e.company}</div>
                  <p>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="sec" id="projects">
          <div className="sec__label reveal">WORK</div>
          <h2 className="sec__title reveal">Projects</h2>
          <div className="projs">
            {projects.map((p,i) => (
              <div className="proj reveal" key={p.name} style={{'--delay': `${i * 0.1}s`}}>
                <div className="proj__head">
                  <span className="proj__emoji">{p.icon}</span>
                  <h3>{p.name}</h3>
                </div>
                <p>{p.desc}</p>
                <div className="proj__tags">{p.tags.map(t => <span key={t} className="stack__pill">{t}</span>)}</div>
                <a className="proj__link" href={p.link} target="_blank" rel="noreferrer">View Live →</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ── */}
        {gallery.length > 0 && (
          <section className="sec" id="gallery">
            <div className="sec__label reveal">GALLERY</div>
            <h2 className="sec__title reveal">Photos</h2>
            <div className="gal">
              {gallery.map(p => (
                <div className="gal__item reveal" key={p.id} onClick={() => setLightbox(p)}>
                  <img src={p.url} alt={p.title||''} loading="lazy" />
                  {p.title && <div className="gal__over"><span>{p.title}</span></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── DOWNLOADS ── */}
        {downloads.length > 0 && (
          <section className="sec" id="downloads">
            <div className="sec__label reveal">DOWNLOADS</div>
            <h2 className="sec__title reveal">Software & Tools</h2>
            <div className="dls">
              {downloads.map(dl => (
                <div className="dl reveal" key={dl.id}>
                  <span className="dl__icon">{dl.icon||'💾'}</span>
                  <div className="dl__info">
                    <h3>{dl.name}{dl.version && <span className="dl__ver">v{dl.version}</span>}</h3>
                    <p>{dl.description}</p>
                    {dl.category && <span className="dl__cat">{dl.category}</span>}
                  </div>
                  <a className="btn btn--outline btn--sm" href={dl.url} target="_blank" rel="noreferrer">↓ Get</a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CONTACT ── */}
        <section className="sec" id="contact">
          <div className="sec__label reveal">CONTACT</div>
          <h2 className="sec__title reveal">Let's Work Together</h2>
          <div className="contact reveal">
            <div className="contact__info">
              <p className="contact__lead">Open for IT roles, freelance projects, and collaboration opportunities. Let's build something great.</p>
              <div className="contact__cards">
                <a className="contact__card" href="mailto:rajibadh@gmail.com">
                  <span>📧</span><div><strong>Email</strong><span>rajibadh@gmail.com</span></div>
                </a>
                <a className="contact__card" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <span>💼</span><div><strong>LinkedIn</strong><span>Connect with me</span></div>
                </a>
                <div className="contact__card">
                  <span>📍</span><div><strong>Location</strong><span>Kathmandu, Nepal</span></div>
                </div>
              </div>
            </div>
            <div className="contact__form-wrap">
              <ContactForm />
            </div>
          </div>
        </section>

      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">💻 RAJIB<span className="nav__logo-dot">.</span></span>
          <span className="footer__copy">© {new Date().getFullYear()} Rajib Adhikari</span>
          <div className="footer__links">
            <a href="mailto:rajibadh@gmail.com">Email</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://cashmate.rajibadhikari.com.np" target="_blank" rel="noreferrer">CashMate</a>
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lb" onClick={() => setLightbox(null)}>
          <div className="lb__inner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.title||''} />
            {lightbox.title && <p className="lb__title">{lightbox.title}</p>}
            {lightbox.description && <p className="lb__desc">{lightbox.description}</p>}
            <button className="lb__close" onClick={() => setLightbox(null)}>✕</button>
          </div>
        </div>
      )}

      <BackToTop />
    </>
  );
}
