import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Users, MapPin, Heart, Shield, Globe, ArrowRight, Zap } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function CommunityProjectsPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/community-projects').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  const projects = [
    {
      title: t('projects', 'p1_title', 'Rural Pitch Initiative'),
      loc: t('projects', 'p1_loc', 'Northern Province'),
      desc: t('projects', 'p1_desc', 'Building safe and professional playing surfaces in remote areas where female sports infrastructure is non-existent.'),
      impact: t('projects', 'p1_impact', '15 Pitches Built'),
      img: t('projects', 'p1_img', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800')
    },
    {
      title: t('projects', 'p2_title', 'GoalGrow Health Week'),
      loc: t('projects', 'p2_loc', 'National Support'),
      desc: t('projects', 'p2_desc', 'Annual health screenings and nutritional workshops for over 2,000 girls and their families across the country.'),
      impact: t('projects', 'p2_impact', '5,000+ Screenings'),
      img: t('projects', 'p2_img', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800')
    },
    {
      title: t('projects', 'p3_title', 'Digital Literacy for Athletes'),
      loc: t('projects', 'p3_loc', 'All Regional Hubs'),
      desc: t('projects', 'p3_desc', 'Equipping our athletes with the digital skills necessary to succeed in the modern global economy.'),
      impact: t('projects', 'p3_impact', '1,200 Laptops Donated'),
      img: t('projects', 'p3_img', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800')
    }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Community Projects")} subtitle={t('header', 'subtitle', "Impact Beyond the Pitch")} />

      {/* Main Impact Section */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="section-title">
           <h2>{t('commitment', 'title', 'Our Social Commitment')}</h2>
           <p>{t('commitment', 'subtitle', 'We believe our responsibility extends to the communities that support our athletes.')}</p>
        </div>
         <div className="grid-3">
            <div className="card">
               <Users size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('commitment', 'p1_title', 'Local Engagement')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('commitment', 'p1_desc', 'We work directly with community leaders to ensure our projects address the most pressing local needs.')}</p>
            </div>
            <div className="card">
               <Shield size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('commitment', 'p2_title', 'Sustainable Change')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('commitment', 'p2_desc', 'Our projects are built for the long term, with local maintenance teams and ongoing support systems.')}</p>
            </div>
            <div className="card">
               <Globe size={32} color="var(--accent)" />
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '1rem' }}>{t('commitment', 'p3_title', 'Global Standards')}</h3>
               <p style={{ fontSize: '0.9rem' }}>{t('commitment', 'p3_desc', 'Every community project is held to the same rigorous quality standards as our elite academy operations.')}</p>
            </div>
         </div>
      </section>

      {/* Featured Projects List */}
      <section className="section" style={{ background: '#f8fafc' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {projects.map((p, idx) => (
              <div key={idx} className="project-row" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}>
                 <div className="project-img-col" style={{ flex: 1 }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <img src={p.img} alt={p.title} style={{ width: '100%', height: '400px', objectFit: 'cover', boxShadow: idx % 2 === 0 ? '20px 20px 0 var(--secondary)' : '-20px 20px 0 var(--secondary)' }} />
                    </div>
                 </div>
                 <div className="project-info-col" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                       <MapPin size={16} /> {p.loc}
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', lineHeight: 1, marginBottom: '1.5rem' }}>{p.title}</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>{p.desc}</p>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '1.5rem', display: 'inline-block' }}>
                       <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700, opacity: 0.7 }}>Cumulative Impact</span>
                       <h3 style={{ color: 'var(--secondary)', fontSize: '2rem', margin: 0 }}>{p.impact}</h3>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Corporate Social Responsibility (CSR) */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
         <h2 style={{ color: 'white', textTransform: 'uppercase', fontWeight: 900, fontSize: '3rem' }}>{t('cta', 'title', 'Partner For Impact')}</h2>
         <p style={{ maxWidth: '700px', margin: '1.5rem auto', opacity: 0.8, fontSize: '1.1rem' }}>{t('cta', 'desc', 'We collaborate with corporate partners to design and implement community initiatives that drive real, measurable social value.')}</p>
         <button className="btn-primary" style={{ width: 'auto', background: 'var(--secondary)', color: 'var(--primary)', marginTop: '2rem' }}>{t('cta', 'btn', 'Download Impact Prospectus')}</button>
      </section>

      <Footer />
    </div>
  );
}
