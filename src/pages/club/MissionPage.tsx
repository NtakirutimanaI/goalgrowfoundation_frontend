import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Globe, TrendingUp, CheckCircle, Zap, Shield, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function MissionPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/mission').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', 'Mission & Vision')} subtitle={t('header', 'subtitle', 'Our Roadmap to 2030')} />

      {/* Primary Mission Card */}
      <section className="section">
         <div style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--primary)', color: 'white', padding: '4rem', border: '10px solid var(--secondary)' }}>
            <Target size={60} color="var(--secondary)" style={{ marginBottom: '2rem' }} />
            <h2 style={{ color: 'white', fontSize: '3rem', textTransform: 'uppercase', fontWeight: 900, lineHeight: 1 }}>{t('mission', 'title_start', 'To build champions who')} <span style={{color: 'var(--secondary)'}}>{t('mission', 'title_highlight', 'lead')}</span> {t('mission', 'title_end', 'on and off the pitch.')}</h2>
            <p style={{ fontSize: '1.2rem', marginTop: '2rem', opacity: 0.9 }}>{t('mission', 'desc', 'Our mission is to provide an elite-level environment where every young female athlete has access to world-class coaching, rigorous academic support, and comprehensive leadership development.')}</p>
         </div>
      </section>

      {/* Strategic Pillars */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="section-title">
          <h2>{t('pillars', 'title', 'Strategic Pillars')}</h2>
          <p>{t('pillars', 'subtitle', 'The four core areas of our operational focus.')}</p>
        </div>
        <div className="grid-3">
           <div className="card">
              <Zap size={32} color="var(--accent)" />
              <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('pillars', 'pillar1_title', 'I. Performance')}</h3>
              <p>{t('pillars', 'pillar1_desc', 'Developing technical mastery and tactical intelligence through our proprietary "GoalGrow" methodology.')}</p>
           </div>
           <div className="card">
              <BookOpen size={32} color="var(--accent)" />
              <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('pillars', 'pillar2_title', 'II. Education')}</h3>
              <p>{t('pillars', 'pillar2_desc', 'Ensuring that athletic pursuits never compromise academic excellence, with 100% target university placement.')}</p>
           </div>
           <div className="card">
              <Shield size={32} color="var(--accent)" />
              <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('pillars', 'pillar3_title', 'III. Integrity')}</h3>
              <p>{t('pillars', 'pillar3_desc', 'Building character through discipline, accountability, and the highest standards of child safeguarding.')}</p>
           </div>
           <div className="card">
              <Heart size={32} color="var(--accent)" />
              <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('pillars', 'pillar4_title', 'IV. Community')}</h3>
              <p>{t('pillars', 'pillar4_desc', 'Creating a supportive ecosystem of parents, mentors, and partners that extends beyond the club.')}</p>
           </div>
        </div>
      </section>

      {/* 2030 Vision Board */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
         <div className="about-grid">
            <div className="about-text">
               <h3 style={{ textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 900 }}>{t('vision', 'badge', 'Vision 2030')}</h3>
               <h2 style={{ fontSize: '3rem', textTransform: 'uppercase', fontWeight: 900, color: 'white', lineHeight: 1 }}>{t('vision', 'title_line1', 'Global Expansion &')} <br /> {t('vision', 'title_line2', 'Impact Leadership')}</h2>
               <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('vision', 'desc', 'By 2030, GoalGrow Foundation aims to have established a presence in 50 countries, impacting over 100,000 girls annually through our digital and physical training hubs.')}</p>
               
               <div style={{ marginTop: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                     <CheckCircle size={24} color="var(--secondary)" />
                     <span style={{ fontWeight: 700 }}>{t('vision', 'goal1', '50 Self-Sustaining Training Hubs')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                     <CheckCircle size={24} color="var(--secondary)" />
                     <span style={{ fontWeight: 700 }}>{t('vision', 'goal2', '1,000+ Full-Ride Scholarships Secured')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <CheckCircle size={24} color="var(--secondary)" />
                     <span style={{ fontWeight: 700 }}>{t('vision', 'goal3', 'Global Alumni Network of 200,000 Leaders')}</span>
                  </div>
               </div>
            </div>
            <div style={{ position: 'relative' }}>
               <img src={t('vision', 'image', "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800")} alt="Vision" style={{ width: '100%', borderRadius: '0' }} />
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{ textAlign: 'center', background: '#fff' }}>
         <h2 style={{ textTransform: 'uppercase', fontWeight: 900 }}>{t('cta', 'title', 'Be Part Of The Journey')}</h2>
         <p style={{ maxWidth: '700px', margin: '1rem auto' }}>{t('cta', 'desc', 'We invite partners, sponsors, and community leaders to join us in achieving this vision. Your contribution can change a life.')}</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
            <button className="btn-primary" style={{ width: 'auto' }}>{t('cta', 'btn1', 'Become a Partner')}</button>
            <button className="btn-secondary" style={{ width: 'auto', border: '1px solid var(--primary)' }}>{t('cta', 'btn2', 'View Impact Report')}</button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
