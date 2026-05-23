import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, Activity, Shield, LogOut, Heart, DollarSign, Check, X, 
  Edit3, Camera, Loader2, Search, Moon, Sun, Bell, LayoutDashboard, Save, Plus
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  useEffect(() => {
    if (user) setActiveTab('overview');
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => setIsSidebarOpen(false);

  const handleSaveProfile = async () => {
    try {
      const res = await api.patch('/users/me', editForm);
      updateUser(res.data);
      setIsEditing(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);
    try {
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const avatarUrl = uploadRes.data.url;
      const userRes = await api.patch('/users/me', { avatarUrl });
      updateUser(userRes.data);
      toast.success('Picture updated!');
    } catch (err) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-theme' : ''}`} style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      {/* Mobile toggle button */}
      <button className="mobile-sidebar-toggle mobile-only" onClick={() => setIsSidebarOpen(prev => !prev)} style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'transparent', border: 'none', color: isDarkMode ? '#fbbf24' : '#64748b', cursor: 'pointer', zIndex: 1100 }} aria-label="Toggle sidebar">
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ 
        width: '240px', background: isDarkMode ? '#1e293b' : 'white', 
        borderRight: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
        display: 'flex', flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000
      }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <LayoutDashboard size={20} />
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: isDarkMode ? 'white' : 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>GoalGrow</h2>
          </div>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
              <li><Link to="/about/story" onClick={closeMobileMenu}>Our Story</Link></li>
              <li><Link to="/about/mission" onClick={closeMobileMenu}>Mission & Vision</Link></li>
              <li><Link to="/about/team" onClick={closeMobileMenu}>Our Team</Link></li>
              <li><Link to="/services/coaching" onClick={closeMobileMenu}>Coaching</Link></li>
              <li><Link to="/services/mentorship" onClick={closeMobileMenu}>Mentorship</Link></li>
              <li><Link to="/services/scholarships" onClick={closeMobileMenu}>Scholarships</Link></li>
              <li><Link to="/services/facilities" onClick={closeMobileMenu}>Facilities</Link></li>
              <li><Link to="/donate" onClick={closeMobileMenu}>Donate</Link></li>
            </ul>
          </nav>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li onClick={() => {setActiveTab('profile'); closeMobileMenu();}} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'profile' ? 'var(--primary)' : 'transparent', color: activeTab === 'profile' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, transition: '0.2s', fontSize: '0.85rem' }}>
                <UserIcon size={18} /> Profile
              </li>
              <li onClick={() => {setActiveTab('history'); closeMobileMenu();}} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'history' ? 'var(--primary)' : 'transparent', color: activeTab === 'history' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, transition: '0.2s', fontSize: '0.85rem' }}>
                <Activity size={18} /> Activity
              </li>
              <li onClick={() => {setActiveTab('security'); closeMobileMenu();}} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'security' ? 'var(--primary)' : 'transparent', color: activeTab === 'security' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, transition: '0.2s', fontSize: '0.85rem' }}>
                <Shield size={18} /> Security
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
        {isSidebarOpen && (
          <div className="mobile-nav-backdrop" onClick={() => setIsSidebarOpen(false)} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 900
          }}></div>
        )}

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: isSidebarOpen ? '240px' : '0', transition: 'margin-left 0.3s ease-in-out' }}>
        <header style={{ height: '60px', background: isDarkMode ? '#1e293b' : 'white', borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => {/* placeholder for add action */}} style={{ background: 'transparent', border: 'none', color: isDarkMode ? 'white' : 'var(--primary)', cursor: 'pointer' }} aria-label="Add">
              <Plus size={20} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div onClick={() => setIsDarkMode(!isDarkMode)} style={{ color: isDarkMode ? '#fbbf24' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div style={{ color: '#64748b', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '-1px', right: '-1px', width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="cursor-pointer" onClick={() => setActiveTab('profile')}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', overflow: 'hidden', background: 'var(--primary)' }}>
                {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.8rem' }}>U</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: isDarkMode ? 'white' : 'var(--primary)' }}>{user.fullName || 'User'}</p>
              </div>
              <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} aria-label="Logout"><LogOut size={16} /></button>
            </div>
          </div>
        </header>

        <div style={{ padding: '1rem 2rem', overflowY: 'auto' }}>
          {activeTab === 'overview' && (
            <div style={{ padding: '1rem 2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: isDarkMode ? 'white' : 'var(--primary)' }}>Dashboard Overview</h2>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Welcome back, {user.fullName || user.email}! Here’s a quick snapshot of your activity.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: isDarkMode ? 'white' : 'var(--primary)' }}>Donations</h3>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', fontWeight: 800 }}>$0.00</p>
                </div>
                <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: isDarkMode ? 'white' : 'var(--primary)' }}>Projects</h3>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', fontWeight: 800 }}>0</p>
                </div>
                <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: isDarkMode ? 'white' : 'var(--primary)' }}>Status</h3>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', fontWeight: 800, color: '#22c55e' }}>Active</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'profile' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>My Profile</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Personal and contact information.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }}>
                <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1rem', borderRadius: '20px', overflow: 'hidden', background: 'var(--primary)' }}>
                    {isUploading ? <Loader2 className="animate-spin" size={40} /> : (user.avatarUrl ? <img src={user.avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><UserIcon size={40} /></div>)}
                    <label style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '0.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Camera size={14} style={{ color: 'white' }} />
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                    </label>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: isDarkMode ? 'white' : 'var(--primary)' }}>{user.fullName || 'Member'}</p>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase' }}>{user.role}</p>
                </div>

                <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div className="form-group" style={{ gridColumn: isEditing ? 'span 2' : 'auto' }}>
                      <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Full Name</label>
                      {isEditing ? <input type="text" value={editForm.fullName} onChange={e => setEditForm({...editForm, fullName: e.target.value})} style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', outline: 'none', fontSize: '0.8rem' }} /> : <p style={{ fontWeight: 700, margin: 0 }}>{user.fullName}</p>}
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Email</label>
                      <p style={{ fontWeight: 700, margin: 0, opacity: 0.7 }}>{user.email}</p>
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Phone</label>
                      {isEditing ? <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', outline: 'none', fontSize: '0.8rem' }} /> : <p style={{ fontWeight: 700, margin: 0 }}>{user.phone || '-'}</p>}
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Address</label>
                      {isEditing ? <textarea value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', outline: 'none', fontSize: '0.8rem' }} rows={2} /> : <p style={{ fontWeight: 700, margin: 0 }}>{user.address || '-'}</p>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {isEditing ? (
                      <>
                        <button onClick={handleSaveProfile} style={{ flex: 1, padding: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '0.7rem' }}>Save</button>
                        <button onClick={() => setIsEditing(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '0.7rem' }}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => setIsEditing(true)} style={{ width: '100%', padding: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><Edit3 size={14} /> Edit Profile</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Activity History</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Your impact and contributions.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Donations', val: '$0.00', icon: Heart, color: '#ef4444' },
                  { label: 'Projects', val: '0', icon: Activity, color: 'var(--primary)' },
                  { label: 'Status', val: 'Active', icon: Check, color: '#22c55e' }
                ].map((stat, i) => (
                  <div key={i} style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><stat.icon size={18} /></div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{stat.label}</p>
                      <p style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: isDarkMode ? 'white' : 'var(--primary)' }}>{stat.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '2rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, textAlign: 'center' }}>
                <Activity size={32} style={{ color: '#94a3b8', marginBottom: '0.75rem' }} />
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No recent activity records found.</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ maxWidth: '500px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Security</h1>
              </div>
              <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 800 }}>Password</h4>
                  <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: '#64748b' }}>Change your password regularly for better security.</p>
                  <button style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>Reset Password</button>
                </div>
                <div style={{ paddingTop: '1.5rem', borderTop: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}` }}>
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 800, color: '#ef4444' }}>Danger Zone</h4>
                  <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: '#64748b' }}>Permanently delete your account and all associated data.</p>
                  <button style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
