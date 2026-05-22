import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" style={{ background: '#0a1a35', color: 'white', padding: '1rem 0' }}>
      <div className="section">
        {/* Top Utility Row: Partners & Social */}
        <div className="footer-utility-row">
          <div style={{ position: 'absolute', left: '-1.5rem', top: '0', bottom: '1rem', width: '4px', background: '#dbbb3e' }}></div>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
             <Facebook size={24} color="white" style={{ cursor: 'pointer' }} />
             <Twitter size={24} color="white" style={{ cursor: 'pointer' }} />
             <Youtube size={24} color="white" style={{ cursor: 'pointer' }} />
             <Instagram size={24} color="white" style={{ cursor: 'pointer' }} />
             <Linkedin size={24} color="white" style={{ cursor: 'pointer' }} />
             <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7c.9 0 1.8.1 2.6.3l4.2-1.2-1.2 4.2a8.38 8.38 0 0 1 .3 2.6z"></path></svg>
             </span>
             <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 0 1-1.56-1.14v6.27c.02 1.63-.33 3.32-1.28 4.65-1.16 1.63-3.1 2.65-5.08 2.53-2.32-.12-4.52-1.8-5.18-4.04-.7-2.41.03-5.23 1.94-6.73 1.25-.97 2.89-1.37 4.47-1.1v4.04c-.66-.17-1.41-.12-2 .16-.92.42-1.44 1.43-1.27 2.4.2 1.13 1.4 1.93 2.51 1.73 1.02-.12 1.83-.98 1.96-2 .03-1.04.01-6.84.01-7.85z"/></svg>
             </span>
          </div>

          <Link to="/about/partners" style={{ 
            background: '#ed1c24', 
            color: 'white', 
            padding: '0.4rem 1rem', 
            fontSize: '0.7rem', 
            fontWeight: 900, 
            textDecoration: 'none',
            textTransform: 'uppercase'
          }}>
            Our Partners
          </Link>
        </div>

        {/* Middle Sitemap Row: 3 Side-by-Side Columns */}
        <div className="footer-sitemap">
          {[
            { title: 'The Club', links: [{ n: 'Story', p: '/about/story' }, { n: 'Mission', p: '/about/mission' }, { n: 'Team', p: '/about/team' }] },
            { title: 'Services', links: [{ n: 'Coaching', p: '/services/coaching' }, { n: 'Mentorship', p: '/services/mentorship' }, { n: 'Scholarships', p: '/services/scholarships' }] },
            { title: 'Foundation', links: [{ n: 'News', p: '/foundation/news' }, { n: 'Projects', p: '/foundation/projects' }, { n: 'Gallery', p: '/foundation/gallery' }] }
          ].map((col, idx) => (
            <div key={idx}>
              <h5 style={{ textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 900, marginBottom: '1.2rem', fontSize: '0.8rem' }}>{col.title}</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map((link, lIdx) => (
                  <li key={lIdx} style={{ marginBottom: '0.6rem' }}>
                    <Link to={link.p} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>{link.n}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row: Legal & Powered By */}
        <div className="footer-legal-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <span style={{ fontWeight: 900, color: 'white', letterSpacing: '1px' }}>GOALGROW FOUNDATION</span>
             <span>&copy; 2026 | Official Website</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Privacy', 'Terms', 'Cookies', 'Contact'].map((l, i) => (
              <Link key={i} to="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.2)' }}>
            Powered by <span style={{ color: 'var(--secondary)', fontWeight: 800 }}>MIS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
