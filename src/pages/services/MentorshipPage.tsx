import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Users, Heart, Star, Globe, Shield, CheckCircle, MessageSquare, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function MentorshipPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/mentorship').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Mentorship")} subtitle={t('header', 'subtitle', "Guiding the Next Generation of Leaders")} />

      {/* Program Overview */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="about-grid">
           <div style={{ position: 'relative' }}>
              <img src={t('overview', 'image', "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800")} alt="Mentorship" style={{ width: '100%', borderRadius: '0', boxShadow: '-15px 15px 0 var(--primary)' }} />
           </div>
           <div className="about-text">
             <h3 style={{ textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 900 }}>{t('overview', 'badge', 'The Philosophy')}</h3>
             <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{t('overview', 'title', 'Beyond The Game')}</h2>
             <p>{t('overview', 'desc1', 'Our mentorship program is the heartbeat of GoalGrow. We believe that while skill gets you to the top, character keeps you there. We pair every elite-tier player with an established female leader from the worlds of business, sports, or education.')}</p>
             <p>{t('overview', 'desc2', 'Through monthly 1-on-1 sessions, workshops, and leadership seminars, our mentors help athletes navigate the challenges of professional sports and prepare for life after their athletic careers.')}</p>
             
             <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                <div>
                   <h4 style={{ fontSize: '2rem', color: 'var(--accent)', fontWeight: 900 }}>{t('overview', 'stat1_val', '1-on-1')}</h4>
                   <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.7rem' }}>{t('overview', 'stat1_label', 'Dedicated Guidance')}</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 900 }}>{t('overview', 'stat2_val', '12+')}</h4>
                   <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.7rem' }}>{t('overview', 'stat2_label', 'Monthly Workshops')}</p>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Core Pillars of Mentorship */}
      <section className="section" style={{ background: '#f8fafc' }}>
         <div className="section-title">
            <h2>{t('pillars', 'title', 'Pillars of Mentorship')}</h2>
            <p>{t('pillars', 'subtitle', 'Our holistic approach to character development.')}</p>
         </div>
         <div className="grid-3">
            <div className="card">
               <Shield size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('pillars', 'p1_title', 'Emotional Resilience')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('pillars', 'p1_desc', 'Managing the pressures of high-stakes competition and building the mental strength to bounce back from setbacks.')}</p>
            </div>
            <div className="card">
               <MessageSquare size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('pillars', 'p2_title', 'Public Speaking')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('pillars', 'p2_desc', 'Developing the communication skills necessary to become effective leaders and representatives of their communities.')}</p>
            </div>
            <div className="card">
               <Briefcase size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('pillars', 'p3_title', 'Career Readiness')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('pillars', 'p3_desc', 'Exploring professional pathways beyond the pitch, from sports management to entrepreneurship and global policy.')}</p>
            </div>
         </div>
      </section>

      {/* Mentor Highlight */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
         <div className="section-title">
            <h2 style={{ color: 'white' }}>{t('mentors', 'title', 'Our Global Mentors')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{t('mentors', 'subtitle', 'Meet the world-class women guiding our future champions.')}</p>
         </div>
         <div className="grid-3">
            {[
              { name: t('mentors', 'm1_name', 'Dr. Sarah Jenkins'), role: t('mentors', 'm1_role', 'Executive Mentor'), bio: t('mentors', 'm1_bio', 'Expert in sports policy and gender equality.') },
              { name: t('mentors', 'm2_name', 'Anita B.'), role: t('mentors', 'm2_role', 'Alumna Mentor'), bio: t('mentors', 'm2_bio', 'Professional player and entrepreneur.') },
              { name: t('mentors', 'm3_name', 'Linda Mbeki'), role: t('mentors', 'm3_role', 'Community Lead'), bio: t('mentors', 'm3_bio', 'Specialist in rural leadership development.') }
            ].map((m, idx) => (
              <div key={idx} className="card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <h4 style={{ color: 'white', fontWeight: 900, textTransform: 'uppercase' }}>{m.name}</h4>
                 <p style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.75rem', marginBottom: '1rem' }}>{m.role}</p>
                 <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{m.bio}</p>
              </div>
            ))}
         </div>
         <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn-primary" style={{ width: 'auto', background: 'var(--secondary)', color: 'var(--primary)' }}>{t('mentors', 'btn', 'View Full Mentor Network')}</button>
         </div>
      </section>

      {/* Call to Mentors */}
      <section className="section" style={{ textAlign: 'center' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', border: '5px solid var(--accent)', padding: '4rem' }}>
            <h2 style={{ textTransform: 'uppercase', fontWeight: 900 }}>{t('cta', 'title', 'Want to Become a Mentor?')}</h2>
            <p style={{ margin: '1.5rem 0' }}>{t('cta', 'desc', 'We are always looking for accomplished women to join our global network. Share your wisdom and help build the leaders of tomorrow.')}</p>
            <button className="btn-primary" style={{ width: 'auto', background: 'var(--accent)' }}>{t('cta', 'btn', 'Apply to Mentor')}</button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
