import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MapPin, Shield, Zap, Clock, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function FacilitiesPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/facilities').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  const facilityList = [
    {
      name: t('list', 'f1_name', "Elite Training Pitch A"),
      desc: t('list', 'f1_desc', "Full-size hybrid turf pitch with stadium-grade floodlighting and drainage."),
      img: t('list', 'f1_img', "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800")
    },
    {
      name: t('list', 'f2_name', "High-Performance Gym"),
      desc: t('list', 'f2_desc', "Specialized strength and conditioning equipment tailored for female athletes."),
      img: t('list', 'f2_img', "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800")
    },
    {
      name: t('list', 'f3_name', "Academic Study Center"),
      desc: t('list', 'f3_desc', "High-speed internet, library, and quiet spaces for mandatory study sessions."),
      img: t('list', 'f3_img', "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800")
    },
    {
      name: t('list', 'f4_name', "Recovery & Medical Suite"),
      desc: t('list', 'f4_desc', "Physiotherapy rooms, ice baths, and a specialized nutrition lab."),
      img: t('list', 'f4_img', "https://images.unsplash.com/photo-1544161515-4ad6ce67d346?auto=format&fit=crop&q=80&w=800")
    },
    {
      name: t('list', 'f5_name', "Residential Wing"),
      desc: t('list', 'f5_desc', "Safe and modern accommodation for our national-tier residential scholars."),
      img: t('list', 'f5_img', "https://images.unsplash.com/photo-1555854811-8221a7eaa145?auto=format&fit=crop&q=80&w=800")
    },
    {
      name: t('list', 'f6_name', "Media & Leadership Hub"),
      desc: t('list', 'f6_desc', "Modern studio for public speaking training and tactical video analysis."),
      img: t('list', 'f6_img', "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800")
    }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Our Facilities")} subtitle={t('header', 'subtitle', "World-Class Infrastructure for Development")} />

      {/* Facilities Grid */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="section-title">
           <h2>{t('intro', 'title', 'State-of-the-Art Spaces')}</h2>
           <p>{t('intro', 'subtitle', 'Every facility is designed to support the elite development of our athletes.')}</p>
        </div>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
           {facilityList.map((f, idx) => (
             <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <img src={f.img} alt={f.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderTop: 'none' }}>
                   <h4 style={{ fontWeight: 900, textTransform: 'uppercase' }}>{f.name}</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{f.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Maintenance & Safety */}
      <section className="section" style={{ background: '#f1f5f9' }}>
         <div className="about-grid">
            <div className="about-text">
               <h3 style={{ textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 900 }}>{t('safety', 'badge', 'Safety & Standards')}</h3>
               <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{t('safety', 'title_line1', 'Built For')} <br /> {t('safety', 'title_line2', 'Excellence')}</h2>
               <p>{t('safety', 'desc', 'We believe that a professional environment creates a professional mindset. All our facilities undergo bi-weekly safety inspections and are managed by full-time maintenance specialists.')}</p>
               
               <div style={{ marginTop: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                     <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem' }}><Shield size={20} /></div>
                     <div>
                        <h5 style={{ fontWeight: 800, margin: 0 }}>{t('safety', 'f1_title', 'Safe Environment')}</h5>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>{t('safety', 'f1_desc', '24/7 security and strict child safeguarding protocols.')}</p>
                     </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem' }}><Zap size={20} /></div>
                     <div>
                        <h5 style={{ fontWeight: 800, margin: 0 }}>{t('safety', 'f2_title', 'Elite Technology')}</h5>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>{t('safety', 'f2_desc', 'Equipped with the latest sports tech and academic tools.')}</p>
                     </div>
                  </div>
               </div>
            </div>
            <div style={{ position: 'relative' }}>
               <div style={{ background: 'var(--primary)', color: 'white', padding: '4rem', textAlign: 'center' }}>
                  <Star size={60} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>{t('rating', 'val', '5-Star')}</h3>
                  <p style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '2px' }}>{t('rating', 'label', 'Technical Rating')}</p>
               </div>
            </div>
         </div>
      </section>

      {/* Booking Teaser */}
      <section className="section" style={{ textAlign: 'center' }}>
         <h2 style={{ textTransform: 'uppercase', fontWeight: 900 }}>{t('cta', 'title', 'Visit Our Hubs')}</h2>
         <p style={{ maxWidth: '600px', margin: '1rem auto' }}>{t('cta', 'desc', 'Want to see where champions are built? We host monthly open-house tours for prospective players and partners.')}</p>
         <button className="btn-primary" style={{ width: 'auto' }}>{t('cta', 'btn', 'Book a Facility Tour')}</button>
      </section>

      <Footer />
    </div>
  );
}
