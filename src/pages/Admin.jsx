import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

/* ─── LOGIN FORM ──────────────────────────────────────────── */
function LoginForm() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminLoginWrap">
      <div className="adminLoginCard">
        <h1 className="adminLoginTitle">Admin Panel</h1>
        <p className="adminLoginSub">Rajib Portfolio — Secure Access</p>
        <form onSubmit={handleLogin} className="adminLoginForm">
          <div className="adminField">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@email.com"
              required
            />
          </div>
          <div className="adminField">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
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

/* ─── GALLERY TAB ─────────────────────────────────────────── */
function GalleryTab() {
  const [photos, setPhotos]     = useState([]);
  const [url, setUrl]           = useState('');
  const [title, setTitle]       = useState('');
  const [desc, setDesc]         = useState('');
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState('');

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap =>
      setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const addPhoto = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'gallery'), {
        url: url.trim(),
        title: title.trim(),
        description: desc.trim(),
        createdAt: serverTimestamp(),
      });
      setUrl(''); setTitle(''); setDesc('');
      setMsg('Photo added!');
      setTimeout(() => setMsg(''), 2500);
    } catch {
      setMsg('Error adding photo.');
    } finally {
      setSaving(false);
    }
  };

  const deletePhoto = async (id) => {
    if (!confirm('Delete this photo?')) return;
    await deleteDoc(doc(db, 'gallery', id));
  };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">Gallery Management</h2>

      {/* Add Photo Form */}
      <div className="adminCard">
        <h3>Add New Photo</h3>
        <p className="adminHint">Paste any public image URL (Google Drive shared, Imgur, etc.)</p>
        <form onSubmit={addPhoto} className="adminForm">
          <div className="adminField">
            <label>Image URL *</label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>
          <div className="adminField">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Photo title (optional)"
            />
          </div>
          <div className="adminField">
            <label>Description</label>
            <input
              type="text"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Short description (optional)"
            />
          </div>
          {msg && <p className="adminMsg">{msg}</p>}
          <button type="submit" className="adminSubmitBtn" disabled={saving}>
            {saving ? 'Adding...' : '+ Add Photo'}
          </button>
        </form>
      </div>

      {/* Photo Grid */}
      {photos.length === 0 ? (
        <div className="adminEmpty">No photos yet. Add your first photo above!</div>
      ) : (
        <div className="adminPhotoGrid">
          {photos.map(photo => (
            <div className="adminPhotoItem" key={photo.id}>
              <img src={photo.url} alt={photo.title || ''} />
              <div className="adminPhotoInfo">
                {photo.title && <span className="adminPhotoTitle">{photo.title}</span>}
                <button
                  className="adminDeleteBtn"
                  onClick={() => deletePhoto(photo.id)}
                >
                  🗑 Delete
                </button>
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
    const q = query(collection(db, 'downloads'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'downloads'), {
        name: name.trim(),
        description: desc.trim(),
        url: url.trim(),
        version: version.trim(),
        icon: icon.trim() || '💾',
        category: category.trim(),
        createdAt: serverTimestamp(),
      });
      setName(''); setDesc(''); setUrl('');
      setVersion(''); setIcon('💾'); setCategory('');
      setMsg('Software link added!');
      setTimeout(() => setMsg(''), 2500);
    } catch {
      setMsg('Error adding item.');
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this download link?')) return;
    await deleteDoc(doc(db, 'downloads', id));
  };

  return (
    <div className="adminTabContent">
      <h2 className="adminSectionTitle">Downloads Management</h2>

      {/* Add Form */}
      <div className="adminCard">
        <h3>Add Software / Download Link</h3>
        <form onSubmit={addItem} className="adminForm adminFormGrid">
          <div className="adminField">
            <label>Software Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. PO Mailer Tool" required />
          </div>
          <div className="adminField">
            <label>Icon (emoji)</label>
            <input type="text" value={icon} onChange={e => setIcon(e.target.value)} placeholder="💾" maxLength={4} />
          </div>
          <div className="adminField adminFieldFull">
            <label>Description</label>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="What does this software do?" />
          </div>
          <div className="adminField adminFieldFull">
            <label>Download URL *</label>
            <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://drive.google.com/..." required />
          </div>
          <div className="adminField">
            <label>Version</label>
            <input type="text" value={version} onChange={e => setVersion(e.target.value)} placeholder="1.0.0" />
          </div>
          <div className="adminField">
            <label>Category</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Utility, Tool" />
          </div>
          {msg && <p className="adminMsg adminFieldFull">{msg}</p>}
          <div className="adminFieldFull">
            <button type="submit" className="adminSubmitBtn" disabled={saving}>
              {saving ? 'Adding...' : '+ Add Download'}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="adminEmpty">No downloads yet. Add your first software link above!</div>
      ) : (
        <div className="adminDlList">
          {items.map(item => (
            <div className="adminDlItem" key={item.id}>
              <span className="adminDlIcon">{item.icon || '💾'}</span>
              <div className="adminDlInfo">
                <strong>{item.name}</strong>
                {item.version && <span className="adminDlVersion"> v{item.version}</span>}
                {item.category && <span className="adminDlCat">{item.category}</span>}
                <p className="adminDlDesc">{item.description}</p>
                <a className="adminDlUrl" href={item.url} target="_blank" rel="noreferrer">
                  {item.url.length > 50 ? item.url.slice(0, 50) + '...' : item.url}
                </a>
              </div>
              <button className="adminDeleteBtn" onClick={() => deleteItem(item.id)}>
                🗑 Delete
              </button>
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

  return (
    <div className="adminDashboard">
      {/* Sidebar */}
      <aside className="adminSidebar">
        <div className="adminSidebarBrand">⚡ Admin Panel</div>
        <nav className="adminSidebarNav">
          <button
            className={`adminNavItem ${tab === 'gallery' ? 'active' : ''}`}
            onClick={() => setTab('gallery')}
          >
            🖼️ Gallery
          </button>
          <button
            className={`adminNavItem ${tab === 'downloads' ? 'active' : ''}`}
            onClick={() => setTab('downloads')}
          >
            💾 Downloads
          </button>
        </nav>
        <div className="adminSidebarFooter">
          <a href="/" className="adminViewSiteBtn">← View Site</a>
          <button className="adminLogoutBtn" onClick={() => signOut(auth)}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="adminMain">
        {tab === 'gallery'   && <GalleryTab />}
        {tab === 'downloads' && <DownloadsTab />}
      </main>
    </div>
  );
}

/* ─── ROOT ────────────────────────────────────────────────── */
export default function Admin() {
  const [user, setUser]       = useState(undefined); // undefined = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="adminLoadingWrap">
        <div className="adminSpinner" />
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginForm />;
}
