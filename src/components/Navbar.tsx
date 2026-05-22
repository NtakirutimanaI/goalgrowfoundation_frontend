import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Search, Globe, ChevronDown, X, Menu, Heart, LogOut, Layout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Track which dropdown is open on mobile (by name)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  return (
    <header className="header-sticky">
      {/* Top Utility Bar */}
      <div className="top-bar">
        {user ? (
          <>
            <Link to="/dashboard" className="top-bar-link" onClick={closeMobileMenu}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profile" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <Layout size={16} />
              )}
              <span>Dashboard</span>
            </Link>
            <div onClick={handleLogout} className="top-bar-link" style={{ cursor: 'pointer' }}>
              <LogOut size={16} />
              <span>Logout</span>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="top-bar-link" onClick={closeMobileMenu}>
              <User size={16} />
              <span>Login</span>
            </Link>
            <Link to="/register" className="top-bar-btn" onClick={closeMobileMenu}>
              Join Foundation
            </Link>
          </>
        )}
        <Link to="/donate" className="top-bar-link" style={{ color: 'var(--secondary)', fontWeight: 800 }} onClick={closeMobileMenu}>
          <Heart size={16} />
          <span>Donate</span>
        </Link>
        <div className="top-bar-link">
          <Globe size={16} />
          <span>EN</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Mobile Menu Toggle */}
          <div
            className="mobile-only"
            style={{ cursor: 'pointer', color: 'var(--primary)' }}
            onClick={() => {
              setIsMobileMenuOpen(prev => !prev);
              setOpenDropdown(null);
            }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            GoalGrow<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links${isMobileMenuOpen ? ' mobile-show' : ''}`}>
          <li>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
          </li>

          {/* CLUB dropdown */}
          <li className={`nav-item-dropdown${openDropdown === 'club' ? ' mobile-dropdown-open' : ''}`}>
            <span
              className="nav-dropdown-trigger"
              onClick={() => toggleDropdown('club')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
            >
              CLUB
              <ChevronDown size={14} className={`dropdown-chevron${openDropdown === 'club' ? ' rotated' : ''}`} />
            </span>
            <ul className="dropdown-menu">
              <span className="dropdown-title">THE CLUB</span>
              <li><Link to="/about/story" onClick={closeMobileMenu}>Our Story</Link></li>
              <li><Link to="/about/mission" onClick={closeMobileMenu}>Mission &amp; Vision</Link></li>
              <li><Link to="/about/team" onClick={closeMobileMenu}>Our Team</Link></li>
              <li><Link to="/about/partners" onClick={closeMobileMenu}>Global Partners</Link></li>
            </ul>
          </li>

          {/* SERVICES dropdown */}
          <li className={`nav-item-dropdown${openDropdown === 'services' ? ' mobile-dropdown-open' : ''}`}>
            <span
              className="nav-dropdown-trigger"
              onClick={() => toggleDropdown('services')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
            >
              Services
              <ChevronDown size={14} className={`dropdown-chevron${openDropdown === 'services' ? ' rotated' : ''}`} />
            </span>
            <ul className="dropdown-menu">
              <span className="dropdown-title">Programs</span>
              <li><Link to="/services/coaching" onClick={closeMobileMenu}>Elite Coaching</Link></li>
              <li><Link to="/services/mentorship" onClick={closeMobileMenu}>Mentorship</Link></li>
              <li><Link to="/services/scholarships" onClick={closeMobileMenu}>Scholarships</Link></li>
              <li><Link to="/services/facilities" onClick={closeMobileMenu}>Facilities</Link></li>
            </ul>
          </li>

          {/* FOUNDATION dropdown */}
          <li className={`nav-item-dropdown${openDropdown === 'foundation' ? ' mobile-dropdown-open' : ''}`}>
            <span
              className="nav-dropdown-trigger"
              onClick={() => toggleDropdown('foundation')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
            >
              Foundation
              <ChevronDown size={14} className={`dropdown-chevron${openDropdown === 'foundation' ? ' rotated' : ''}`} />
            </span>
            <ul className="dropdown-menu">
              <span className="dropdown-title">Impact</span>
              <li><Link to="/foundation/news" onClick={closeMobileMenu}>Latest News</Link></li>
              <li><Link to="/foundation/projects" onClick={closeMobileMenu}>Community Projects</Link></li>
              <li><Link to="/foundation/gallery" onClick={closeMobileMenu}>Gallery</Link></li>
              <li><Link to="/contacts" onClick={closeMobileMenu}>Contact Us</Link></li>
            </ul>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--primary)', flex: isSearchOpen ? 1 : 0, justifyContent: 'flex-end' }}>
          {isSearchOpen ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f1f5f9',
              padding: '0.5rem 1rem',
              width: '100%',
              maxWidth: '400px',
              border: '1px solid var(--border-color)'
            }}>
              <Search size={18} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '0.5rem',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <X
                size={18}
                style={{ cursor: 'pointer' }}
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Search
              size={24}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSearchOpen(true)}
            />
          )}
        </div>
      </nav>

      {/* Mobile backdrop — clicking outside closes the menu */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
