import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection, addDoc, deleteDoc, updateDoc,
  doc, onSnapshot, orderBy, query, serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase';

/* ─── LOGIN ───────────────────────────────────────────────── */
function LoginForm() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch { setError('Invalid email or password.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="adminLoginWrap">
      <div className="adminLoginCard">
        <h1 className="adminLoginTitle">Admin Panel</h1>
        <p className="adminLoginSub">Rajib Portfolio — Secure Access</p>
        <form onSubmit={handleLogin} className="adminLoginForm">
          <div className="adminField">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" required />
          </div>
          <div className="adminField">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="adminError">{error}</p>}
          <button type="submit" className="adminLoginBtn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
        <a href="/" className="adminBackLink">← Back to Portfolio</a>
      </div>
    </div>
  );
}

/* ─── REUSABLE: Simple List Manager ─────────────────────────
   Used for Skills groups, chips, etc.                        */
function TagEditor({ tags, onChange }) {
  const [input, setInput] = useState('');
  const add = () => {
    if (!input.trim()) return;
    onChange([...tags, input.trim()]);
    setInput('');
  };
  const remove = i => onChange(tags.filter((_, idx) => idx !== i));
  return (
    <div className="tagEditor">
      <div className="tagEditorRow">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())} placeholder="Type and press Enter or Add" />
        <button type="button" className="tagAddBtn" onClick={add}>+ Add</button>
      </div>
      <div className="tagEditorPills">
        {tags.map((t, i) => (
          <span key={i} className="tagEditorPill">{t} <button onClick={() => remove(i)}>×</button></span>
        ))}
      </div>
    </div>
  );
}

/* ─── GALLERY TAB ─────────────────────────────────────────── */
function GalleryTab() {
  const [photos, setPhotos] = useState([]);
  const [url, setUrl]       = useState('');
  const [title, setTitle]   = useState('');
  const [desc, setDesc]     = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState('');

  useEffect(() => {
    const q = query(collection(db,'gallery'), orderBy('createdAt','desc'));
    return onSnapshot(q, s => setPhotos(s.docs.map(d => ({ id:d.id,...d.data() }))));
  }, []);

  const addPhoto = async e => {
    e.preventDefault(); if (!url.trim()) return; setSaving(true);
    try {
      await addDoc(collection(db,'gallery'), { url:url.trim(), title:title.trim(), description:desc.trim(), createdAt:serverTimestamp() });
      setUrl(''); setTitle(''); setDesc('');
      setMsg('Photo added!'); setTimeout(() => setMsg(''), 2500);
    } catch { setMsg('Error.'); }
    finally { setSaving(false); }
  };

  const deletePhoto = async id => { if (!confirm('Delete?')) return; await deleteDoc(doc(db,'gallery',id)); };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">🖼️ Gallery</h2>
      <div className="adminCard">
        <h3>Add Photo</h3>
        <p className="adminHint">Paste any public image URL (Imgur, Google Drive shared link, etc.)</p>
        <form onSubmit={addPhoto} className="adminForm">
          <div className="adminField"><label>Image URL *</label><input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." required /></div>
          <div className="adminField"><label>Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Optional title" /></div>
          <div className="adminField"><label>Description</label><input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional description" /></div>
          {msg && <p className="adminMsg">{msg}</p>}
          <button type="submit" className="adminSubmitBtn" disabled={saving}>{saving ? 'Adding...' : '+ Add Photo'}</button>
        </form>
      </div>
      {photos.length === 0 ? <div className="adminEmpty">No photos yet.</div> : (
        <div className="adminPhotoGrid">
          {photos.map(p => (
            <div className="adminPhotoItem" key={p.id}>
              <img src={p.url} alt={p.title||''} />
              <div className="adminPhotoInfo">
                <span className="adminPhotoTitle">{p.title||'Untitled'}</span>
                <button className="adminDeleteBtn" onClick={() => deletePhoto(p.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── DOWNLOADS TAB ───────────────────────────────────────── */
function DownloadsTab() {
  const [items, setItems]       = useState([]);
  const [name, setName]         = useState('');
  const [desc, setDesc]         = useState('');
  const [url, setUrl]           = useState('');
  const [version, setVersion]   = useState('');
  const [icon, setIcon]         = useState('💾');
  const [category, setCategory] = useState('');
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState('');

  useEffect(() => {
    const q = query(collection(db,'downloads'), orderBy('createdAt','desc'));
    return onSnapshot(q, s => setItems(s.docs.map(d => ({ id:d.id,...d.data() }))));
  }, []);

  const addItem = async e => {
    e.preventDefault(); if (!name.trim()||!url.trim()) return; setSaving(true);
    try {
      await addDoc(collection(db,'downloads'), { name:name.trim(), description:desc.trim(), url:url.trim(), version:version.trim(), icon:icon.trim()||'💾', category:category.trim(), createdAt:serverTimestamp() });
      setName(''); setDesc(''); setUrl(''); setVersion(''); setIcon('💾'); setCategory('');
      setMsg('Added!'); setTimeout(() => setMsg(''), 2500);
    } catch { setMsg('Error.'); }
    finally { setSaving(false); }
  };

  const deleteItem = async id => { if (!confirm('Delete?')) return; await deleteDoc(doc(db,'downloads',id)); };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">💾 Downloads</h2>
      <div className="adminCard">
        <h3>Add Software / Download Link</h3>
        <form onSubmit={addItem} className="adminForm adminFormGrid">
          <div className="adminField"><label>Name *</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Software name" required /></div>
          <div className="adminField"><label>Icon (emoji)</label><input type="text" value={icon} onChange={e => setIcon(e.target.value)} placeholder="💾" maxLength={4} /></div>
          <div className="adminField adminFieldFull"><label>Description</label><input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="What does it do?" /></div>
          <div className="adminField adminFieldFull"><label>Download URL *</label><input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://drive.google.com/..." required /></div>
          <div className="adminField"><label>Version</label><input type="text" value={version} onChange={e => setVersion(e.target.value)} placeholder="1.0.0" /></div>
          <div className="adminField"><label>Category</label><input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Utility / Tool" /></div>
          {msg && <p className="adminMsg adminFieldFull">{msg}</p>}
          <div className="adminFieldFull"><button type="submit" className="adminSubmitBtn" disabled={saving}>{saving?'Adding...':'+ Add Download'}</button></div>
        </form>
      </div>
      {items.length === 0 ? <div className="adminEmpty">No downloads yet.</div> : (
        <div className="adminDlList">
          {items.map(item => (
            <div className="adminDlItem" key={item.id}>
              <span className="adminDlIcon">{item.icon||'💾'}</span>
              <div className="adminDlInfo">
                <strong>{item.name}</strong>{item.version && <span className="adminDlVersion"> v{item.version}</span>}
                {item.category && <span className="adminDlCat">{item.category}</span>}
                <p className="adminDlDesc">{item.description}</p>
                <a className="adminDlUrl" href={item.url} target="_blank" rel="noreferrer">{item.url.length>60?item.url.slice(0,60)+'...':item.url}</a>
              </div>
              <button className="adminDeleteBtn" onClick={() => deleteItem(item.id)}>🗑 Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── SKILLS TAB ──────────────────────────────────────────── */
function SkillsTab() {
  const [groups, setGroups] = useState([]);
  const [title, setTitle]   = useState('');
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const q = query(collection(db,'skills'), orderBy('createdAt','asc'));
    return onSnapshot(q, s => setGroups(s.docs.map(d => ({ id:d.id,...d.data() }))));
  }, []);

  const save = async e => {
    e.preventDefault(); if (!title.trim()||items.length===0) return; setSaving(true);
    try {
      if (editing) {
        await updateDoc(doc(db,'skills',editing), { title:title.trim(), items });
        setEditing(null);
      } else {
        await addDoc(collection(db,'skills'), { title:title.trim(), items, createdAt:serverTimestamp() });
      }
      setTitle(''); setItems([]);
      setMsg('Saved!'); setTimeout(() => setMsg(''), 2500);
    } catch { setMsg('Error.'); }
    finally { setSaving(false); }
  };

  const startEdit = g => { setEditing(g.id); setTitle(g.title); setItems(g.items||[]); };
  const cancelEdit = () => { setEditing(null); setTitle(''); setItems([]); };
  const deleteGroup = async id => { if (!confirm('Delete this skill group?')) return; await deleteDoc(doc(db,'skills',id)); };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">🛠️ Skills</h2>
      <div className="adminCard">
        <h3>{editing ? 'Edit Skill Group' : 'Add Skill Group'}</h3>
        <form onSubmit={save} className="adminForm">
          <div className="adminField"><label>Group Title *</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Cloud & DevOps" required /></div>
          <div className="adminField"><label>Skills</label><TagEditor tags={items} onChange={setItems} /></div>
          {msg && <p className="adminMsg">{msg}</p>}
          <div style={{display:'flex',gap:'10px'}}>
            <button type="submit" className="adminSubmitBtn" disabled={saving}>{saving?'Saving...': editing?'Update Group':'+ Add Group'}</button>
            {editing && <button type="button" className="adminCancelBtn" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </div>
      {groups.length === 0 ? <div className="adminEmpty">No skill groups yet — add one above!<br/><small style={{color:'var(--muted)',marginTop:'8px',display:'block'}}>Note: If empty, portfolio shows default hardcoded skills.</small></div> : (
        <div className="adminDlList">
          {groups.map(g => (
            <div className="adminDlItem" key={g.id}>
              <div className="adminDlInfo" style={{flex:1}}>
                <strong>{g.title}</strong>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'8px'}}>
                  {(g.items||[]).map((s,i) => <span key={i} className="tagEditorPill" style={{cursor:'default'}}>{s}</span>)}
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                <button className="adminEditBtn" onClick={() => startEdit(g)}>✏️ Edit</button>
                <button className="adminDeleteBtn" onClick={() => deleteGroup(g.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── PROJECTS TAB ────────────────────────────────────────── */
function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [name, setName]         = useState('');
  const [desc, setDesc]         = useState('');
  const [link, setLink]         = useState('');
  const [icon, setIcon]         = useState('🌐');
  const [tags, setTags]         = useState([]);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState('');
  const [editing, setEditing]   = useState(null);

  useEffect(() => {
    const q = query(collection(db,'projects'), orderBy('createdAt','asc'));
    return onSnapshot(q, s => setProjects(s.docs.map(d => ({ id:d.id,...d.data() }))));
  }, []);

  const save = async e => {
    e.preventDefault(); if (!name.trim()||!link.trim()) return; setSaving(true);
    const data = { name:name.trim(), description:desc.trim(), link:link.trim(), icon:icon.trim()||'🌐', tags };
    try {
      if (editing) { await updateDoc(doc(db,'projects',editing), data); setEditing(null); }
      else { await addDoc(collection(db,'projects'), { ...data, createdAt:serverTimestamp() }); }
      setName(''); setDesc(''); setLink(''); setIcon('🌐'); setTags([]);
      setMsg('Saved!'); setTimeout(() => setMsg(''), 2500);
    } catch { setMsg('Error.'); }
    finally { setSaving(false); }
  };

  const startEdit = p => { setEditing(p.id); setName(p.name); setDesc(p.description||''); setLink(p.link); setIcon(p.icon||'🌐'); setTags(p.tags||[]); };
  const cancelEdit = () => { setEditing(null); setName(''); setDesc(''); setLink(''); setIcon('🌐'); setTags([]); };
  const deleteProject = async id => { if (!confirm('Delete project?')) return; await deleteDoc(doc(db,'projects',id)); };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">🚀 Projects</h2>
      <div className="adminCard">
        <h3>{editing ? 'Edit Project' : 'Add Project'}</h3>
        <form onSubmit={save} className="adminForm adminFormGrid">
          <div className="adminField"><label>Project Name *</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. CashMate Nepal" required /></div>
          <div className="adminField"><label>Icon (emoji)</label><input type="text" value={icon} onChange={e => setIcon(e.target.value)} placeholder="🌐" maxLength={4} /></div>
          <div className="adminField adminFieldFull"><label>Description *</label><input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="What does this project do?" required /></div>
          <div className="adminField adminFieldFull"><label>Live Link *</label><input type="url" value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." required /></div>
          <div className="adminField adminFieldFull"><label>Tech Tags</label><TagEditor tags={tags} onChange={setTags} /></div>
          {msg && <p className="adminMsg adminFieldFull">{msg}</p>}
          <div className="adminFieldFull" style={{display:'flex',gap:'10px'}}>
            <button type="submit" className="adminSubmitBtn" disabled={saving}>{saving?'Saving...':editing?'Update Project':'+ Add Project'}</button>
            {editing && <button type="button" className="adminCancelBtn" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </div>
      {projects.length === 0 ? <div className="adminEmpty">No projects yet — add one above!<br/><small style={{color:'var(--muted)',marginTop:'8px',display:'block'}}>Note: If empty, portfolio shows default hardcoded projects.</small></div> : (
        <div className="adminDlList">
          {projects.map(p => (
            <div className="adminDlItem" key={p.id}>
              <span className="adminDlIcon">{p.icon}</span>
              <div className="adminDlInfo" style={{flex:1}}>
                <strong>{p.name}</strong>
                <p className="adminDlDesc">{p.description}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'6px'}}>
                  {(p.tags||[]).map((t,i) => <span key={i} className="tagEditorPill" style={{cursor:'default'}}>{t}</span>)}
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                <button className="adminEditBtn" onClick={() => startEdit(p)}>✏️ Edit</button>
                <button className="adminDeleteBtn" onClick={() => deleteProject(p.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── EXPERIENCE TAB ──────────────────────────────────────── */
function ExperienceTab() {
  const [items, setItems]     = useState([]);
  const [role, setRole]       = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod]   = useState('');
  const [desc, setDesc]       = useState('');
  const [icon, setIcon]       = useState('🖥️');
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const q = query(collection(db,'experience'), orderBy('createdAt','asc'));
    return onSnapshot(q, s => setItems(s.docs.map(d => ({ id:d.id,...d.data() }))));
  }, []);

  const save = async e => {
    e.preventDefault(); if (!role.trim()||!company.trim()) return; setSaving(true);
    const data = { role:role.trim(), company:company.trim(), period:period.trim(), description:desc.trim(), icon:icon.trim()||'🖥️' };
    try {
      if (editing) { await updateDoc(doc(db,'experience',editing), data); setEditing(null); }
      else { await addDoc(collection(db,'experience'), { ...data, createdAt:serverTimestamp() }); }
      setRole(''); setCompany(''); setPeriod(''); setDesc(''); setIcon('🖥️');
      setMsg('Saved!'); setTimeout(() => setMsg(''), 2500);
    } catch { setMsg('Error.'); }
    finally { setSaving(false); }
  };

  const startEdit = e => { setEditing(e.id); setRole(e.role); setCompany(e.company); setPeriod(e.period||''); setDesc(e.description||''); setIcon(e.icon||'🖥️'); };
  const cancelEdit = () => { setEditing(null); setRole(''); setCompany(''); setPeriod(''); setDesc(''); setIcon('🖥️'); };
  const deleteItem = async id => { if (!confirm('Delete?')) return; await deleteDoc(doc(db,'experience',id)); };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">💼 Experience</h2>
      <div className="adminCard">
        <h3>{editing ? 'Edit Experience' : 'Add Experience'}</h3>
        <form onSubmit={save} className="adminForm adminFormGrid">
          <div className="adminField"><label>Role *</label><input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Senior IT Executive" required /></div>
          <div className="adminField"><label>Icon (emoji)</label><input type="text" value={icon} onChange={e => setIcon(e.target.value)} placeholder="🖥️" maxLength={4} /></div>
          <div className="adminField"><label>Company *</label><input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name" required /></div>
          <div className="adminField"><label>Period</label><input type="text" value={period} onChange={e => setPeriod(e.target.value)} placeholder="e.g. 2022 – Present" /></div>
          <div className="adminField adminFieldFull"><label>Description</label><textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe your role..." style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--border)',borderRadius:'10px',padding:'11px 14px',color:'var(--text)',fontFamily:'inherit',fontSize:'0.95rem',outline:'none',resize:'vertical',width:'100%'}} /></div>
          {msg && <p className="adminMsg adminFieldFull">{msg}</p>}
          <div className="adminFieldFull" style={{display:'flex',gap:'10px'}}>
            <button type="submit" className="adminSubmitBtn" disabled={saving}>{saving?'Saving...':editing?'Update':'+ Add Experience'}</button>
            {editing && <button type="button" className="adminCancelBtn" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </div>
      {items.length === 0 ? <div className="adminEmpty">No experience yet.<br/><small style={{color:'var(--muted)',marginTop:'8px',display:'block'}}>Note: If empty, portfolio shows default hardcoded experience.</small></div> : (
        <div className="adminDlList">
          {items.map(e => (
            <div className="adminDlItem" key={e.id}>
              <span className="adminDlIcon">{e.icon}</span>
              <div className="adminDlInfo" style={{flex:1}}>
                <strong>{e.role}</strong>
                <p style={{fontSize:'0.88rem',color:'var(--accent2)',margin:'2px 0'}}>{e.company}</p>
                <p style={{fontSize:'0.8rem',color:'var(--muted)'}}>{e.period}</p>
                <p className="adminDlDesc">{e.description}</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                <button className="adminEditBtn" onClick={() => startEdit(e)}>✏️ Edit</button>
                <button className="adminDeleteBtn" onClick={() => deleteItem(e.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── CERTIFICATIONS TAB ──────────────────────────────────── */
function CertificationsTab() {
  const [certs, setCerts]     = useState([]);
  const [name, setName]       = useState('');
  const [issuer, setIssuer]   = useState('');
  const [year, setYear]       = useState('');
  const [icon, setIcon]       = useState('📜');
  const [status, setStatus]   = useState('completed');
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const q = query(collection(db,'certifications'), orderBy('createdAt','asc'));
    return onSnapshot(q, s => setCerts(s.docs.map(d => ({ id:d.id,...d.data() }))));
  }, []);

  const save = async e => {
    e.preventDefault(); if (!name.trim()) return; setSaving(true);
    const data = { name:name.trim(), issuer:issuer.trim(), year:year.trim(), icon:icon.trim()||'📜', status };
    try {
      if (editing) { await updateDoc(doc(db,'certifications',editing), data); setEditing(null); }
      else { await addDoc(collection(db,'certifications'), { ...data, createdAt:serverTimestamp() }); }
      setName(''); setIssuer(''); setYear(''); setIcon('📜'); setStatus('completed');
      setMsg('Saved!'); setTimeout(() => setMsg(''), 2500);
    } catch { setMsg('Error.'); }
    finally { setSaving(false); }
  };

  const startEdit = c => { setEditing(c.id); setName(c.name); setIssuer(c.issuer||''); setYear(c.year||''); setIcon(c.icon||'📜'); setStatus(c.status||'completed'); };
  const cancelEdit = () => { setEditing(null); setName(''); setIssuer(''); setYear(''); setIcon('📜'); setStatus('completed'); };
  const deleteCert = async id => { if (!confirm('Delete?')) return; await deleteDoc(doc(db,'certifications',id)); };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">🏅 Certifications</h2>
      <div className="adminCard">
        <h3>{editing ? 'Edit Certification' : 'Add Certification'}</h3>
        <form onSubmit={save} className="adminForm adminFormGrid">
          <div className="adminField"><label>Cert Name *</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. AWS Cloud Practitioner" required /></div>
          <div className="adminField"><label>Icon (emoji)</label><input type="text" value={icon} onChange={e => setIcon(e.target.value)} placeholder="📜" maxLength={4} /></div>
          <div className="adminField"><label>Issuer</label><input type="text" value={issuer} onChange={e => setIssuer(e.target.value)} placeholder="e.g. Amazon Web Services" /></div>
          <div className="adminField"><label>Year</label><input type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="2024 or In Progress" /></div>
          <div className="adminField adminFieldFull">
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--border)',borderRadius:'10px',padding:'11px 14px',color:'var(--text)',fontFamily:'inherit',fontSize:'0.95rem',outline:'none'}}>
              <option value="completed">✓ Completed</option>
              <option value="inProgress">⏳ In Progress</option>
            </select>
          </div>
          {msg && <p className="adminMsg adminFieldFull">{msg}</p>}
          <div className="adminFieldFull" style={{display:'flex',gap:'10px'}}>
            <button type="submit" className="adminSubmitBtn" disabled={saving}>{saving?'Saving...':editing?'Update':'+ Add Cert'}</button>
            {editing && <button type="button" className="adminCancelBtn" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </div>
      {certs.length === 0 ? <div className="adminEmpty">No certifications yet.<br/><small style={{color:'var(--muted)',marginTop:'8px',display:'block'}}>Note: If empty, portfolio shows default hardcoded certs.</small></div> : (
        <div className="adminDlList">
          {certs.map(c => (
            <div className="adminDlItem" key={c.id}>
              <span className="adminDlIcon">{c.icon}</span>
              <div className="adminDlInfo" style={{flex:1}}>
                <strong>{c.name}</strong>
                <p style={{fontSize:'0.85rem',color:'var(--accentL)',margin:'2px 0'}}>{c.issuer}</p>
                <p style={{fontSize:'0.8rem',color:'var(--muted)'}}>{c.year}</p>
                <span className={`certStatus ${c.status==='inProgress'?'inProgress':''}`}>{c.status==='inProgress'?'⏳ In Progress':'✓ Completed'}</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                <button className="adminEditBtn" onClick={() => startEdit(c)}>✏️ Edit</button>
                <button className="adminDeleteBtn" onClick={() => deleteCert(c.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── DASHBOARD ───────────────────────────────────────────── */
function Dashboard() {
  const [tab, setTab] = useState('gallery');
  const tabs = [
    { id:'gallery',        label:'🖼️ Gallery'        },
    { id:'downloads',      label:'💾 Downloads'      },
    { id:'skills',         label:'🛠️ Skills'         },
    { id:'projects',       label:'🚀 Projects'       },
    { id:'experience',     label:'💼 Experience'     },
    { id:'certifications', label:'🏅 Certifications' },
  ];
  return (
    <div className="adminDashboard">
      <aside className="adminSidebar">
        <div className="adminSidebarBrand">⚡ Admin Panel</div>
        <nav className="adminSidebarNav">
          {tabs.map(t => (
            <button key={t.id} className={`adminNavItem ${tab===t.id?'active':''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="adminSidebarFooter">
          <a href="/" className="adminViewSiteBtn">← View Site</a>
          <button className="adminLogoutBtn" onClick={() => signOut(auth)}>Sign Out</button>
        </div>
      </aside>
      <main className="adminMain">
        {tab === 'gallery'        && <GalleryTab />}
        {tab === 'downloads'      && <DownloadsTab />}
        {tab === 'skills'         && <SkillsTab />}
        {tab === 'projects'       && <ProjectsTab />}
        {tab === 'experience'     && <ExperienceTab />}
        {tab === 'certifications' && <CertificationsTab />}
      </main>
    </div>
  );
}

/* ─── ROOT ────────────────────────────────────────────────── */
export default function Admin() {
  const [user, setUser]     = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
  }, []);
  if (loading) return <div className="adminLoadingWrap"><div className="adminSpinner" /></div>;
  return user ? <Dashboard /> : <LoginForm />;
}
