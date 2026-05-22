import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Target, Users, History, Globe, Award, Shield, Heart, Zap, CheckCircle, Star, TrendingUp, HelpCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AboutPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/about').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title="The Club" subtitle="Excellence, Empowerment & Leadership" />

      {/* 1. OUR STORY - EXTENDED */}
      <section id="story" className="section" style={{ background: '#fff' }}>
        <div className="section-title">
           <h2>Our Story</h2>
           <p>From a singular vision to a global standard in female sports empowerment.</p>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', fontWeight: 800 }}>{t('story', 'founding_title', 'The Founding Years (2020-2021)')}</h3>
            <p>{t('story', 'founding_p1', 'In the wake of global challenges, a group of dedicated educators and coaches realized that the gap in female sports development was widening. GoalGrow Foundation was born from a simple but powerful idea: that every girl, regardless of her background, deserves a safe space to compete, learn, and lead.')}</p>
            <p>{t('story', 'founding_p2', 'Our first center opened in a modest community park with just 15 worn-out balls and a lot of heart. Within six months, we had 200 active players and a waiting list that spanned three cities.')}</p>
            
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', fontWeight: 800, marginTop: '2rem' }}>{t('story', 'scaling_title', 'Scaling the Impact (2022-2023)')}</h3>
            <p>{t('story', 'scaling_p1', 'As our numbers grew, so did our methodology. We realized that elite sports performance requires elite support. We integrated academic tutoring, nutrition tracking, and psychological counseling into our core curriculum, becoming the first holistic female sports foundation in the region.')}</p>
            <p>{t('story', 'scaling_p2', 'Today, we operate in 12 regional hubs, supporting over 5,000 girls annually through our various development tiers.')}</p>
          </div>
          <div style={{ position: 'relative' }}>
             <img src={t('story', 'image', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800')} alt="About" style={{ width: '100%', borderRadius: '0', boxShadow: '15px 15px 0 var(--secondary)' }} />
             <div style={{ background: 'var(--primary)', color: 'white', padding: '2rem', marginTop: '2rem' }}>
                <h4 style={{ textTransform: 'uppercase', fontWeight: 900, marginBottom: '0.5rem' }}>{t('story', 'founders_msg_title', 'A Message From the Founders')}</h4>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>"{t('story', 'founders_msg_text', "We didn't build GoalGrow just to win matches; we built it to win futures. Our greatest victory isn't a trophy—it's seeing an alumna lead her community with the same fire she had on the pitch.")}"</p>
             </div>
          </div>
        </div>

        <div style={{ marginTop: '5rem' }}>
           <h3 style={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: 900, marginBottom: '3rem' }}>Our Philosophy</h3>
           <div className="grid-3">
              <div className="card">
                 <h4 style={{ fontWeight: 800 }}>The Triple Threat</h4>
                 <p style={{ fontSize: '0.85rem' }}>We focus on Athleticism, Academics, and Attitude. A player who lacks in one will be supported until they excel in all three.</p>
              </div>
              <div className="card">
                 <h4 style={{ fontWeight: 800 }}>Inclusive Excellence</h4>
                 <p style={{ fontSize: '0.85rem' }}>We maintain professional standards while ensuring that no girl is ever turned away due to financial constraints.</p>
              </div>
              <div className="card">
                 <h4 style={{ fontWeight: 800 }}>Lifelong Mentorship</h4>
                 <p style={{ fontSize: '0.85rem' }}>Our commitment doesn't end at graduation. We track our alumni for 5 years to ensure they are thriving in their careers.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 2. MISSION & VISION - EXTENDED */}
      <section id="mission" className="section" style={{ background: '#f1f5f9' }}>
        <div className="section-title">
           <h2>Mission & Vision</h2>
           <p>Our roadmap for the next decade of growth and impact.</p>
        </div>
        <div className="grid-3">
          <div className="card" style={{ borderTop: '8px solid var(--accent)' }}>
             <Target size={40} color="var(--accent)" />
             <h3 style={{ marginTop: '1.5rem', fontWeight: 900 }}>Our Mission</h3>
             <p>To provide an elite-level environment for young female athletes to thrive, integrating high-performance sports training with rigorous academic support and leadership development to create the next generation of global champions.</p>
          </div>
          <div className="card" style={{ borderTop: '8px solid var(--primary)' }}>
             <Globe size={40} color="var(--primary)" />
             <h3 style={{ marginTop: '1.5rem', fontWeight: 900 }}>Our Vision</h3>
             <p>To be recognized as the world's premier center for female athletic empowerment, serving as a blueprint for holistic development that can be replicated in every community across the globe.</p>
          </div>
          <div className="card" style={{ borderTop: '8px solid var(--secondary)' }}>
             <TrendingUp size={40} color="var(--secondary)" />
             <h3 style={{ marginTop: '1.5rem', fontWeight: 900 }}>Strategic Goals 2030</h3>
             <ul style={{ padding: 0, listStyle: 'none', fontSize: '0.85rem' }}>
                <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> 50,000+ Girls Impacted Globally</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> 100% University Placement Rate</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> 50 Self-Sustaining Training Hubs</li>
             </ul>
          </div>
        </div>

        <div style={{ marginTop: '4rem', background: 'white', padding: '4rem', border: '1px solid var(--border-color)' }}>
           <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>The Four Pillars of GoalGrow</h3>
           <div className="grid-3">
              <div>
                 <h4 style={{ color: 'var(--accent)', fontWeight: 900 }}>01. ATHLETIC</h4>
                 <p style={{ fontSize: '0.9rem' }}>Elite technical skills, tactical understanding, and physical conditioning tailored for female athletes.</p>
              </div>
              <div>
                 <h4 style={{ color: 'var(--accent)', fontWeight: 900 }}>02. ACADEMIC</h4>
                 <p style={{ fontSize: '0.9rem' }}>Comprehensive tutoring, scholarship assistance, and career counseling for sustainable futures.</p>
              </div>
              <div>
                 <h4 style={{ color: 'var(--accent)', fontWeight: 900 }}>03. CHARACTER</h4>
                 <p style={{ fontSize: '0.9rem' }}>Leadership training, emotional intelligence, and resilience workshops to build community leaders.</p>
              </div>
              <div>
                 <h4 style={{ color: 'var(--accent)', fontWeight: 900 }}>04. COMMUNITY</h4>
                 <p style={{ fontSize: '0.9rem' }}>Parent engagement, rural outreach, and global partnerships to ensure a supportive ecosystem.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 3. OUR TEAM - EXTENDED */}
      <section id="team" className="section">
        <div className="section-title">
          <h2>Our Professional Team</h2>
          <p>A world-class collective of specialists dedicated to female empowerment.</p>
        </div>

        {/* Executive Leadership */}
        <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginBottom: '2rem', borderBottom: '2px solid var(--accent)', display: 'inline-block' }}>Executive Leadership</h3>
        <div className="grid-3" style={{ marginBottom: '4rem' }}>
           {[
             { name: 'Sarah Jenkins', role: 'Executive Director', bio: 'Former Olympic consultant with 20 years in sports policy.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
             { name: 'Marcus Chen', role: 'Chief Technical Officer', bio: 'UEFA Pro License coach with focus on youth systems.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
             { name: 'David Smith', role: 'Chief Operations Officer', bio: 'Specialist in scaling non-profit infrastructures.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
           ].map((m, i) => (
             <div key={i} className="card" style={{ padding: '0' }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                   <h4 style={{ fontWeight: 900, textTransform: 'uppercase' }}>{m.name}</h4>
                   <p style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.8rem' }}>{m.role}</p>
                   <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{m.bio}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Technical & Medical Staff */}
        <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginBottom: '2rem', borderBottom: '2px solid var(--primary)', display: 'inline-block' }}>Technical & Medical Staff</h3>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '4rem' }}>
           {[
             { name: 'Dr. Elena Rodriguez', role: 'Academic Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
             { name: 'Grace Kim', role: 'Nutritionist', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400' },
             { name: 'Linda Mbeki', role: 'Counselor', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400' },
             { name: 'Robert Taylor', role: 'S&C Coach', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' }
           ].map((m, i) => (
             <div key={i} className="card" style={{ padding: '0' }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1rem' }}>
                   <h5 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem' }}>{m.name}</h5>
                   <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.7rem' }}>{m.role}</p>
                </div>
             </div>
           ))}
        </div>

        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
           <h3 style={{ textTransform: 'uppercase', fontWeight: 900 }}>Join Our Team</h3>
           <p style={{ maxWidth: '600px', margin: '1rem auto' }}>We are always looking for passionate professionals to help us build the future of female sports.</p>
           <button className="btn-primary" style={{ width: 'auto' }}>View Career Openings</button>
        </div>
      </section>

      {/* 4. GLOBAL PARTNERS - EXTENDED */}
      <section id="partners" className="section" style={{ background: 'var(--primary)', color: 'white' }}>
        <div className="section-title">
           <h2 style={{ color: 'white' }}>Partnership Ecosystem</h2>
           <p style={{ color: 'rgba(255,255,255,0.6)' }}>Fueling the revolution through strategic global collaborations.</p>
        </div>
        
        <div className="grid-3">
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
             <Shield size={60} style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }} />
             <h3 style={{ color: 'white', fontWeight: 900 }}>NIKE</h3>
             <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Providing elite-level equipment and apparel for our high-performance squads since 2021.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
             <Heart size={60} style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }} />
             <h3 style={{ color: 'white', fontWeight: 900 }}>UNICEF</h3>
             <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Collaborating on community outreach and child safeguarding protocols across all our hubs.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
             <Award size={60} style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }} />
             <h3 style={{ color: 'white', fontWeight: 900 }}>ADIDAS</h3>
             <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Funding the "GoalGrow Futures" scholarship program, supporting 500+ girls annually.</p>
          </div>
        </div>

        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
           <h4 style={{ textTransform: 'uppercase', fontWeight: 900, marginBottom: '3rem', opacity: 0.8 }}>Corporate & Community Sponsors</h4>
           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', opacity: 0.4 }}>
              <h3 style={{ fontWeight: 900 }}>COCA COLA</h3>
              <h3 style={{ fontWeight: 900 }}>VISA</h3>
              <h3 style={{ fontWeight: 900 }}>MICROSOFT</h3>
              <h3 style={{ fontWeight: 900 }}>PEPSI</h3>
              <h3 style={{ fontWeight: 900 }}>GOOGLE</h3>
              <h3 style={{ fontWeight: 900 }}>RED BULL</h3>
              <h3 style={{ fontWeight: 900 }}>EMIRATES</h3>
           </div>
        </div>

        <div style={{ marginTop: '6rem', padding: '4rem', background: 'var(--accent)', color: 'white', textAlign: 'center' }}>
           <h2 style={{ color: 'white', fontSize: '3rem' }}>Partner With Us</h2>
           <p style={{ maxWidth: '700px', margin: '1rem auto', fontSize: '1.1rem' }}>Your organization can be the catalyst for the next champion. Join our mission to empower the future.</p>
           <button className="btn-primary" style={{ width: 'auto', background: 'white', color: 'var(--accent)', marginTop: '2rem' }}>Become a Sponsor</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
