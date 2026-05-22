import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ProjectsPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/projects').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title="Projects & Events" subtitle="The Latest Happenings in the GoalGrow Community" />

      {/* Latest News Newsroom */}
      <section className="section">
        <div className="section-title">
          <h2>News & Updates</h2>
          <p>The latest happenings in the GoalGrow community.</p>
        </div>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          {[
            { tag: 'Foundation News', title: 'Summer League Finals 2026', desc: 'Join us for the most anticipated youth soccer event of the year.', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800' },
            { tag: 'Community', title: 'Rural Growth Initiative', desc: 'Expanding our reach to over 15 new rural communities this month.', img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800' },
            { tag: 'Education', title: 'Empowerment Seminar', desc: 'Leadership workshops for our under-15 development squad.', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800' },
            { tag: 'Health', title: 'Nutrition Workshops', desc: 'Educating athletes on the importance of sports nutrition.', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800' },
            { tag: 'Coaching', title: 'Coach Certification', desc: 'Empowering local coaches with modern training techniques.', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800' },
            { tag: 'Facilities', title: 'Stadium Renovation', desc: 'Building safe and professional spaces for our girls to play.', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800' }
          ].map((project, idx) => (
            <div key={idx} className="project-card">
              <img src={project.img} alt={project.title} className="project-img" />
              <div className="project-info">
                <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Calendar Teaser */}
      <section className="section" style={{ background: '#f1f5f9' }}>
        <div className="section-title">
           <h2>Event Calendar</h2>
           <p>Mark your calendars for our upcoming matches and workshops.</p>
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { date: 'JUN 15', time: '10:00 AM', title: 'Under-15 Selection Trials', loc: 'Sport City Stadium' },
            { date: 'JUN 22', time: '02:00 PM', title: 'Parent-Coach Workshop', loc: 'Community Hall' },
            { date: 'JUL 05', time: '09:00 AM', title: 'GoalGrow Invitational Cup', loc: 'National Arena' },
            { date: 'JUL 12', time: '04:00 PM', title: 'Scholarship Ceremony', loc: 'Foundation Office' }
          ].map((event, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: 'white', padding: '1rem 2rem', border: '1px solid var(--border-color)' }}>
               <div style={{ textAlign: 'center', minWidth: '80px', borderRight: '1px solid var(--border-color)', paddingRight: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent)', margin: 0 }}>{event.date}</h3>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>{event.time}</span>
               </div>
               <div style={{ flex: 1 }}>
                  <h4 style={{ textTransform: 'uppercase', fontWeight: 800, margin: 0 }}>{event.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                     <MapPin size={14} /> {event.loc}
                  </div>
               </div>
               <button className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Register</button>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
        <div className="grid-3" style={{ textAlign: 'center' }}>
          <div>
             <Users size={40} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
             <h2 style={{ color: 'white', fontSize: '3rem', margin: 0 }}>{t('stats', 'stat1_value', '12,000+')}</h2>
             <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{t('stats', 'stat1_label', 'Community Impact')}</p>
          </div>
          <div>
             <Award size={40} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
             <h2 style={{ color: 'white', fontSize: '3rem', margin: 0 }}>{t('stats', 'stat2_value', '85%')}</h2>
             <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{t('stats', 'stat2_label', 'Scholarship Rate')}</p>
          </div>
          <div>
             <Calendar size={40} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
             <h2 style={{ color: 'white', fontSize: '3rem', margin: 0 }}>{t('stats', 'stat3_value', '500+')}</h2>
             <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{t('stats', 'stat3_label', 'Annual Events')}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
