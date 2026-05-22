import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { 
  LogOut, LayoutDashboard, User, Trophy, Search, Moon, Sun, Bell, 
  Camera, Save, Building, Users, Info, Edit, FileText
} from 'lucide-react';

export default function SponsorDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const [profile, setProfile] = useState<any>(null);
  const [players, setPlayers] = useState([]);
  const [competitions, setCompetitions] = useState([]);

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'profile') {
        try {
          const res = await api.get('/profiles/sponsor');
          setProfile(res.data);
          setCompanyName(res.data.companyName || '');
          setContactPerson(res.data.contactPerson || '');
          setDescription(res.data.description || '');
          setLogoUrl(res.data.logoUrl || '');
        } catch (e: any) {
          if (e.response?.status !== 404) throw e;
        }
      } else if (activeTab === 'players') {
        const res = await api.get('/profiles/players/all');
        setPlayers(res.data);
      } else if (activeTab === 'competitions') {
        const res = await api.get('/competitions');
        setCompetitions(res.data);
      }
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setLogoUrl(res.data.url);
      toast.success('Logo uploaded!');
    } catch (err) {
      toast.error('Failed to upload logo');
    }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { companyName, contactPerson, description, logoUrl };
    try {
      if (profile) {
        await api.patch('/profiles/sponsor', payload);
      } else {
        await api.post('/profiles/sponsor', payload);
      }
      toast.success('Profile saved!');
      fetchData();
    } catch (err) {
      toast.error('Failed to save profile');
    }
  };

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-theme' : ''}`} style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar */}
      <aside className="sidebar" style={{ 
        width: '240px', background: isDarkMode ? '#1e293b' : 'white', 
        borderRight: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <LayoutDashboard size={20} />
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: isDarkMode ? 'white' : 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>GoalGrow</h2>
          </div>

          <nav>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li onClick={() => setActiveTab('profile')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'profile' ? 'var(--primary)' : 'transparent', color: activeTab === 'profile' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, transition: '0.2s', fontSize: '0.85rem' }}>
                <Building size={18} /> My Profile
              </li>
              <li onClick={() => setActiveTab('players')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'players' ? 'var(--primary)' : 'transparent', color: activeTab === 'players' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, transition: '0.2s', fontSize: '0.85rem' }}>
                <Users size={18} /> Players
              </li>
              <li onClick={() => setActiveTab('competitions')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'competitions' ? 'var(--primary)' : 'transparent', color: activeTab === 'competitions' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, transition: '0.2s', fontSize: '0.85rem' }}>
                <Trophy size={18} /> Competitions
              </li>
            </ul>
          </nav>
        </div>
        <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}` }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem', border: 'none', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.7rem', width: '100%', borderRadius: '8px' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '60px', background: isDarkMode ? '#1e293b' : 'white', borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ color: '#94a3b8', cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)} />
              {showSearch && <input type="text" placeholder="Search..." style={{ marginLeft: '0.75rem', padding: '0.4rem 0.75rem', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', outline: 'none', width: '200px', fontSize: '0.8rem' }} autoFocus />}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div onClick={() => setIsDarkMode(!isDarkMode)} style={{ color: isDarkMode ? '#fbbf24' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div style={{ color: '#64748b', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '-1px', right: '-1px', width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={() => setActiveTab('profile')} className="cursor-pointer">
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: isDarkMode ? 'white' : 'var(--primary)' }}>{user?.fullName || 'Sponsor'}</p>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', overflow: 'hidden', background: 'var(--primary)' }}>
                {logoUrl ? <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.8rem' }}>S</div>}
              </div>
            </div>
          </div>
        </header>

        <div style={{ padding: '1rem 2rem', overflowY: 'auto' }}>
          {activeTab === 'profile' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Company Profile</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Sponsorship and contact details.</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }}>
                <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1rem', borderRadius: '20px', overflow: 'hidden', background: 'var(--primary)' }}>
                    {logoUrl ? <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Building size={40} /></div>}
                    <label style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '0.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Camera size={14} style={{ color: 'white' }} />
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: isDarkMode ? 'white' : 'var(--primary)' }}>{companyName || 'New Sponsor'}</p>
                </div>

                <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                  <form onSubmit={saveProfile}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Company Name</label>
                        <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', outline: 'none', fontSize: '0.8rem' }} required />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Contact Person</label>
                        <input type="text" value={contactPerson} onChange={e => setContactPerson(e.target.value)} style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', outline: 'none', fontSize: '0.8rem' }} required />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', outline: 'none', fontSize: '0.8rem' }} rows={2} />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <Save size={16} /> Save Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'players' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Sponsored Players</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Track foundation athletes.</p>
              </div>
              <div style={{ background: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, overflow: 'hidden' }}>
                <table className="data-table" style={{ border: 'none' }}>
                  <thead style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                    <tr>
                      <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Name</th>
                      <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Email</th>
                      <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Bio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p: any) => (
                      <tr key={p.id} style={{ borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`, color: isDarkMode ? '#cbd5e1' : 'inherit' }}>
                        <td style={{ fontWeight: 700, padding: '0.4rem', fontSize: '0.85rem' }}>{p.fullName}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{p.user?.email || '-'}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.75rem', opacity: 0.8 }}>{p.bio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'competitions' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Foundation Competitions</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Latest and upcoming events.</p>
              </div>
              <div style={{ background: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, overflow: 'hidden' }}>
                <table className="data-table" style={{ border: 'none' }}>
                  <thead style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                    <tr>
                      <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Title</th>
                      <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Date</th>
                      <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitions.map((c: any) => (
                      <tr key={c.id} style={{ borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`, color: isDarkMode ? '#cbd5e1' : 'inherit' }}>
                        <td style={{ fontWeight: 700, padding: '0.4rem', fontSize: '0.85rem' }}>{c.title}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{new Date(c.date).toLocaleDateString()}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{c.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
