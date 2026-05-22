import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { 
  LogOut, LayoutDashboard, Trophy, Search, Moon, Sun, Bell, 
  Save, Edit, FileText, Plus
} from 'lucide-react';

export default function ManagerDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('competitions');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  // State for Competition Form
  const [compForm, setCompForm] = useState({ title: '', description: '', date: '', location: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'competitions') {
        const res = await api.get('/competitions');
        setCompetitions(res.data);
      }
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  const createCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/competitions', compForm);
      toast.success('Competition created!');
      setCompForm({ title: '', description: '', date: '', location: '' });
      fetchData();
    } catch (err) {
      toast.error('Failed to create competition');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: isDarkMode ? 'white' : 'var(--primary)' }}>{user?.email}</p>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.8rem' }}>M</div>
            </div>
          </div>
        </header>

        <div style={{ padding: '1rem 2rem', overflowY: 'auto' }}>
          {activeTab === 'competitions' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Competition Management</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Add and manage events.</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '300px', background: isDarkMode ? '#1e293b' : 'white', padding: '1rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                  <h3 style={{ marginBottom: '0.75rem', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', color: isDarkMode ? '#94a3b8' : '#64748b' }}>Create New</h3>
                  <form onSubmit={createCompetition} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input type="text" placeholder="Title" value={compForm.title} onChange={e => setCompForm({...compForm, title: e.target.value})} style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} required />
                    <input type="date" value={compForm.date} onChange={e => setCompForm({...compForm, date: e.target.value})} style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} required />
                    <input type="text" placeholder="Location" value={compForm.location} onChange={e => setCompForm({...compForm, location: e.target.value})} style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} required />
                    <textarea placeholder="Description" value={compForm.description} onChange={e => setCompForm({...compForm, description: e.target.value})} style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} rows={2} required />
                    <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '0.7rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <Plus size={14} /> Add Competition
                    </button>
                  </form>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ background: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, overflow: 'hidden' }}>
                    <table className="data-table" style={{ border: 'none' }}>
                      <thead style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                        <tr>
                          <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Title</th>
                          <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Date</th>
                          <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Location</th>
                          <th style={{ color: isDarkMode ? '#94a3b8' : '#64748b', padding: '0.5rem' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitions.map((c: any) => (
                          <tr key={c.id} style={{ borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`, color: isDarkMode ? '#cbd5e1' : 'inherit' }}>
                            <td style={{ fontWeight: 700, padding: '0.4rem', fontSize: '0.85rem' }}>{c.title}</td>
                            <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{new Date(c.date).toLocaleDateString()}</td>
                            <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{c.location}</td>
                            <td style={{ padding: '0.4rem' }}>
                              <button onClick={() => toast.error('Edit permission restricted to Admin')} style={{ padding: '0.2rem 0.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.65rem', opacity: 0.5 }}>Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
