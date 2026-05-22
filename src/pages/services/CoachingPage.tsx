import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Trophy, Target, Zap, Clock, Shield, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function CoachingPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/coaching').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Elite Coaching")} subtitle={t('header', 'subtitle', "Professional Technical Development")} />

      {/* Methodology Section */}
      <section className="section" style={{ background: '#fff' }}>
         <div className="about-grid">
            <div className="about-text">
               <h3 style={{ textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 900 }}>{t('methodology', 'badge', 'The Methodology')}</h3>
               <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{t('methodology', 'title_line1', 'Technical Mastery')} <br /> {t('methodology', 'title_line2', '& Tactical Intelligence')}</h2>
               <p>{t('methodology', 'desc1', "At GoalGrow, we don't just teach football; we develop athletes. Our proprietary training methodology is built on the pillars of technical precision, tactical understanding, and physical resilience.")}</p>
               <p>{t('methodology', 'desc2', "Each player undergoes a rigorous assessment and is placed into a tailored development tier that matches their current skill level while constantly pushing them toward the next milestone.")}</p>
               
               <div style={{ marginTop: '2rem' }}>
                  <h4 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>{t('methodology', 'focus_title', 'Key Focus Areas:')}</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                     <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={18} color="var(--accent)" /> {t('methodology', 'focus1', 'Ball Control & First Touch')}</li>
                     <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={18} color="var(--accent)" /> {t('methodology', 'focus2', 'Positional Awareness & Transition')}</li>
                     <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={18} color="var(--accent)" /> {t('methodology', 'focus3', 'High-Intensity Physical Conditioning')}</li>
                  </ul>
               </div>
            </div>
            <div style={{ position: 'relative' }}>
               <img src={t('methodology', 'image', "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800")} alt="Coaching" style={{ width: '100%', borderRadius: '0', boxShadow: '15px 15px 0 var(--secondary)' }} />
            </div>
         </div>
      </section>

      {/* Training Tiers */}
      <section className="section" style={{ background: '#f1f5f9' }}>
         <div className="section-title">
            <h2>{t('tiers', 'title', 'Development Tiers')}</h2>
            <p>{t('tiers', 'subtitle', 'Structured pathways for long-term athlete success.')}</p>
         </div>
         <div className="grid-3">
            <div className="card" style={{ background: 'white' }}>
               <h3 style={{ color: 'var(--accent)' }}>{t('tiers', 't1_title', 'Foundation (U8-U12)')}</h3>
               <p style={{ fontWeight: 700, marginBottom: '1rem' }}>{t('tiers', 't1_badge', 'Building the Basics')}</p>
               <p style={{ fontSize: '0.9rem' }}>{t('tiers', 't1_desc', 'Focus on technical fundamentals, coordination, and the joy of the game. 3 sessions per week with age-specific drills.')}</p>
            </div>
            <div className="card" style={{ background: 'white' }}>
               <h3 style={{ color: 'var(--primary)' }}>{t('tiers', 't2_title', 'Development (U13-U15)')}</h3>
               <p style={{ fontWeight: 700, marginBottom: '1rem' }}>{t('tiers', 't2_badge', 'Tactical Integration')}</p>
               <p style={{ fontSize: '0.9rem' }}>{t('tiers', 't2_desc', 'Introduction to complex tactical systems, positional specific training, and competitive psychology.')}</p>
            </div>
            <div className="card" style={{ background: 'white' }}>
               <h3 style={{ color: 'var(--secondary)' }}>{t('tiers', 't3_title', 'Elite (U16-U19)')}</h3>
               <p style={{ fontWeight: 700, marginBottom: '1rem' }}>{t('tiers', 't3_badge', 'Professional Pathway')}</p>
               <p style={{ fontSize: '0.9rem' }}>{t('tiers', 't3_desc', 'High-performance training aimed at securing professional contracts and university scholarships.')}</p>
            </div>
         </div>
      </section>

      {/* Performance Tracking */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
         <div className="section-title">
            <h2 style={{ color: 'white' }}>{t('performance', 'title', 'Data-Driven Performance')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{t('performance', 'subtitle', 'We use state-of-the-art technology to track every aspect of growth.')}</p>
         </div>
         <div className="grid-3">
            <div style={{ textAlign: 'center' }}>
               <Zap size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
               <h4 style={{ fontWeight: 800 }}>{t('performance', 'p1_title', 'GPS Tracking')}</h4>
               <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{t('performance', 'p1_desc', 'Live data on speed, distance covered, and heat maps for every session.')}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <Clock size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
               <h4 style={{ fontWeight: 800 }}>{t('performance', 'p2_title', 'Recovery Metrics')}</h4>
               <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{t('performance', 'p2_desc', 'Monitoring sleep, heart rate variability, and muscle fatigue to prevent injury.')}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <Award size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
               <h4 style={{ fontWeight: 800 }}>{t('performance', 'p3_title', 'Video Analysis')}</h4>
               <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{t('performance', 'p3_desc', 'Bi-weekly video reviews to improve tactical decision making.')}</p>
            </div>
         </div>
      </section>

      {/* Enrollment Call to Action */}
      <section className="section" style={{ textAlign: 'center' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', border: '5px solid var(--primary)', padding: '4rem' }}>
            <h2 style={{ textTransform: 'uppercase', fontWeight: 900 }}>{t('cta', 'title', 'Ready to Elevate Your Game?')}</h2>
            <p style={{ margin: '1.5rem 0' }}>{t('cta', 'desc', 'Selection trials are held quarterly across all our regional hubs. Join the academy that builds champions.')}</p>
            <button className="btn-primary" style={{ width: 'auto' }}>{t('cta', 'btn', 'Register for Next Trials')}</button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
