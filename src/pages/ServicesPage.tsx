import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trophy, Users, Award, BookOpen, Heart, Shield } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ServicesPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/services').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title="Programs & Services" subtitle="World-Class Pathways for Every Athlete" />

      {/* Main Programs */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
        <div className="section-title">
          <h2 style={{ color: 'white' }}>{t('programs', 'title', 'World-Class Development')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('programs', 'subtitle', "Tailored pathways for every stage of an athlete's journey.")}</p>
        </div>
        <div className="grid-3">
          <div className="card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="card-icon" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}><Trophy size={20} /></div>
            <h3 style={{ color: 'white' }}>{t('programs', 'card1_title', 'Elite Coaching')}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('programs', 'card1_desc', 'Technical and tactical training from certified professionals using world-class methodologies.')}</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
               <li>• Weekly technical drills</li>
               <li>• Tactical awareness sessions</li>
               <li>• Performance analysis</li>
            </ul>
          </div>
          <div className="card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="card-icon" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}><Users size={20} /></div>
            <h3 style={{ color: 'white' }}>Mentorship</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Connecting young talents with established female leaders to foster growth and confidence.</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
               <li>• 1-on-1 career guidance</li>
               <li>• Leadership workshops</li>
               <li>• Networking opportunities</li>
            </ul>
          </div>
          <div className="card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="card-icon" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}><Award size={20} /></div>
            <h3 style={{ color: 'white' }}>Scholarships</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Ensuring that financial barriers never stand in the way of academic or athletic excellence.</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
               <li>• Full tuition support</li>
               <li>• Study material provision</li>
               <li>• University placement help</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Holistic Support */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="section-title">
           <h2>Holistic Support System</h2>
           <p>We care for the athlete as a whole person, not just a player.</p>
        </div>
        <div className="grid-3">
          <div className="card">
             <BookOpen size={24} color="var(--accent)" />
             <h4 style={{ textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 800 }}>Academic Tutoring</h4>
             <p style={{ fontSize: '0.85rem' }}>Extra classes in Mathematics, Sciences, and Languages to ensure players excel in the classroom.</p>
          </div>
          <div className="card">
             <Heart size={24} color="var(--accent)" />
             <h4 style={{ textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 800 }}>Health & Nutrition</h4>
             <p style={{ fontSize: '0.85rem' }}>Comprehensive medical check-ups and personalized nutrition plans for peak performance.</p>
          </div>
          <div className="card">
             <Shield size={24} color="var(--accent)" />
             <h4 style={{ textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 800 }}>Mental Wellness</h4>
             <p style={{ fontSize: '0.85rem' }}>Sports psychologists and counselors available to support the emotional well-being of our athletes.</p>
          </div>
        </div>
      </section>

      {/* Training Facilities Showcase */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="section-title">
           <h2>Our Facilities</h2>
           <p>Providing safe and professional environments for growth.</p>
        </div>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
           {[
             { name: 'Elite Pitch A', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400' },
             { name: 'Strength Lab', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400' },
             { name: 'Study Center', img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400' },
             { name: 'Recovery Lounge', img: 'https://images.unsplash.com/photo-1544161515-4ad6ce67d346?auto=format&fit=crop&q=80&w=400' }
           ].map((facility, idx) => (
             <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <img src={facility.img} alt={facility.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                   <h5 style={{ textTransform: 'uppercase', fontWeight: 800, fontSize: '0.75rem' }}>{facility.name}</h5>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Success Stories / Teaser */}
      <section className="section">
         <div className="about-grid">
            <div style={{ position: 'relative' }}>
               <img src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800" alt="Success Story" style={{ width: '100%', borderRadius: '0' }} />
            </div>
            <div className="about-text">
               <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontWeight: 800 }}>Success Story</h3>
               <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>From Local Pitches <br /> To Pro Leagues</h2>
               <p>"GoalGrow gave me the confidence to chase my dreams. Their scholarship didn't just pay for my school; it gave me a future I never thought possible."</p>
               <h4 style={{ fontWeight: 800, color: 'var(--accent)' }}>— Anita B., Under-19 Graduate</h4>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
