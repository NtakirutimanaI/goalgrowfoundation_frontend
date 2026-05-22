import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Award, BookOpen, GraduationCap, Globe, CheckCircle, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function ScholarshipsPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/scholarships').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Scholarships")} subtitle={t('header', 'subtitle', "Removing Barriers to Excellence")} />

      {/* Program Intent */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="about-grid">
          <div className="about-text">
            <h3 style={{ textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 900 }}>{t('intent', 'badge', 'Financial Support')}</h3>
            <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{t('intent', 'title_line1', 'No Girl')} <br /> {t('intent', 'title_line2', 'Left Behind')}</h2>
            <p>{t('intent', 'desc1', 'At GoalGrow, we believe that talent is universal, but opportunity is not. Our scholarship programs are designed to ensure that financial constraints never stand in the way of an athlete’s potential.')}</p>
            <p>{t('intent', 'desc2', 'We provide comprehensive support that covers training fees, equipment, travel, and—most importantly—academic tuition and materials.')}</p>
            
            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
               <div>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 900 }}>{t('intent', 'stat1_val', '500+')}</h4>
                  <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.7rem' }}>{t('intent', 'stat1_label', 'Annual Scholars')}</p>
               </div>
               <div>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--accent)', fontWeight: 900 }}>{t('intent', 'stat2_val', '$2M+')}</h4>
                  <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.7rem' }}>{t('intent', 'stat2_label', 'Funds Disbursed')}</p>
               </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             <img src={t('intent', 'image', "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800")} alt="Scholarship" style={{ width: '100%', borderRadius: '0', boxShadow: '15px 15px 0 var(--secondary)' }} />
          </div>
        </div>
      </section>

      {/* Scholarship Tiers */}
      <section className="section" style={{ background: '#f8fafc' }}>
         <div className="section-title">
            <h2>{t('tiers', 'title', 'Our Scholarship Tiers')}</h2>
            <p>{t('tiers', 'subtitle', 'Tailored support for different needs and milestones.')}</p>
         </div>
         <div className="grid-3">
            <div className="card">
               <Heart size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('tiers', 't1_title', 'Foundational Grant')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('tiers', 't1_desc', 'Covers 100% of training fees and basic equipment for players from underprivileged backgrounds.')}</p>
            </div>
            <div className="card">
               <GraduationCap size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('tiers', 't2_title', 'Elite Academic Award')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('tiers', 't2_desc', 'Full tuition coverage for players who maintain a 3.5+ GPA while playing in our elite-tier squads.')}</p>
            </div>
            <div className="card">
               <Globe size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('tiers', 't3_title', 'Global Pathway Fund')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('tiers', 't3_desc', 'Supports travel and enrollment fees for international trials and university applications abroad.')}</p>
            </div>
         </div>
      </section>

      {/* Application Process */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
         <div className="section-title">
            <h2 style={{ color: 'white' }}>{t('process', 'title', 'How To Apply')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{t('process', 'subtitle', 'A transparent and merit-based selection process.')}</p>
         </div>
         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { step: '01', title: t('process', 's1_title', 'Talent Identification'), desc: t('process', 's1_desc', 'Secure a place in any of our regional development hubs through trials.') },
              { step: '02', title: t('process', 's2_title', 'Financial Assessment'), desc: t('process', 's2_desc', 'Submit proof of financial need through our secure community portal.') },
              { step: '03', title: t('process', 's3_title', 'Academic Review'), desc: t('process', 's3_desc', 'Our academic board reviews the player’s school performance and potential.') },
              { step: '04', title: t('process', 's4_title', 'Award & Onboarding'), desc: t('process', 's4_desc', 'Successful applicants are onboarded into the scholarship program.') }
            ].map((s, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '2rem', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                 <h2 style={{ color: 'var(--secondary)', fontWeight: 900 }}>{s.step}</h2>
                 <div>
                    <h4 style={{ textTransform: 'uppercase', fontWeight: 800 }}>{s.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{s.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
         <h2 style={{ textTransform: 'uppercase', fontWeight: 900 }}>{t('cta', 'title', 'Ready to Apply?')}</h2>
         <p style={{ maxWidth: '600px', margin: '1rem auto' }}>{t('cta', 'desc', 'The next scholarship window opens in August 2026. Prepare your documents and keep practicing.')}</p>
         <button className="btn-primary" style={{ width: 'auto' }}>{t('cta', 'btn', 'Download Application Guide')}</button>
      </section>

      <Footer />
    </div>
  );
}
