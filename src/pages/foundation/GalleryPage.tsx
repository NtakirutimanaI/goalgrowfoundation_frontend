import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Camera, Video, Maximize2, Play, Heart, X } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

export default function GalleryPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/gallery').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = [
    { url: t('grid', 'img1_url', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c'), title: t('grid', 'img1_title', 'Summer Finals 2026'), cat: t('grid', 'img1_cat', 'Competition') },
    { url: t('grid', 'img2_url', 'https://images.unsplash.com/photo-1519315901367-f34ff9154487'), title: t('grid', 'img2_title', 'Rural Outreach Hub'), cat: t('grid', 'img2_cat', 'Community') },
    { url: t('grid', 'img3_url', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'), title: t('grid', 'img3_title', 'Elite Training Pitch'), cat: t('grid', 'img3_cat', 'Facility') },
    { url: t('grid', 'img4_url', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18'), title: t('grid', 'img4_title', 'Nutrition Workshop'), cat: t('grid', 'img4_cat', 'Academy') },
    { url: t('grid', 'img5_url', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846'), title: t('grid', 'img5_title', 'Digital Literacy'), cat: t('grid', 'img5_cat', 'Education') },
    { url: t('grid', 'img6_url', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644'), title: t('grid', 'img6_title', 'Scholarship Ceremony'), cat: t('grid', 'img6_cat', 'Academy') },
    { url: t('grid', 'img7_url', 'https://images.unsplash.com/photo-1526676037777-05a232554f77'), title: t('grid', 'img7_title', 'Coaching Seminar'), cat: t('grid', 'img7_cat', 'Training') },
    { url: t('grid', 'img8_url', 'https://images.unsplash.com/photo-1551958219-acbc608c6377'), title: t('grid', 'img8_title', 'U19 Squad Training'), cat: t('grid', 'img8_cat', 'Competition') },
    { url: t('grid', 'img9_url', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'), title: t('grid', 'img9_title', 'Leadership Summit'), cat: t('grid', 'img9_cat', 'Mentorship') }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Gallery")} subtitle={t('header', 'subtitle', "A Visual Journey of Empowerment")} />

      {/* Categories Filter */}
      <section className="section" style={{ background: '#fff', paddingBottom: 0 }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              t('filter', 'f1', 'All'),
              t('filter', 'f2', 'Competition'),
              t('filter', 'f3', 'Community'),
              t('filter', 'f4', 'Academy'),
              t('filter', 'f5', 'Education'),
              t('filter', 'f6', 'Training')
            ].map((cat, idx) => (
             <button key={idx} style={{ 
               padding: '0.75rem 2rem', 
               background: idx === 0 ? 'var(--primary)' : 'transparent', 
               color: idx === 0 ? 'white' : 'var(--primary)',
               border: '1px solid var(--primary)',
               fontWeight: 900,
               textTransform: 'uppercase',
               fontSize: '0.8rem',
               cursor: 'pointer'
             }}>
                {cat}
             </button>
           ))}
        </div>
      </section>

      {/* Image Grid */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '0.5rem' }}>
           {images.map((img, idx) => (
             <div key={idx} style={{ position: 'relative', overflow: 'hidden', height: '350px', cursor: 'pointer' }} onClick={() => setSelectedImage(img.url)}>
                <img src={`${img.url}?auto=format&fit=crop&q=80&w=800`} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="gallery-img" />
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  background: 'rgba(0, 29, 72, 0.8)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }} className="gallery-overlay">
                   <h3 style={{ color: 'white', textTransform: 'uppercase', fontWeight: 900, textAlign: 'center', margin: '0 1rem' }}>{img.title}</h3>
                   <span style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.5rem' }}>{img.cat}</span>
                   <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <div style={{ background: 'white', padding: '0.5rem' }}><Maximize2 size={20} color="var(--primary)" /></div>
                      <div style={{ background: 'white', padding: '0.5rem' }}><Heart size={20} color="var(--accent)" /></div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="section" style={{ background: '#f1f5f9' }}>
         <div className="section-title">
            <h2>{t('video', 'title', 'Video Highlights')}</h2>
            <p>{t('video', 'subtitle', 'Experience the energy and passion of GoalGrow in motion.')}</p>
         </div>
         <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))' }}>
            <div style={{ position: 'relative', background: '#000', height: '300px' }}>
               <img src={t('video', 'vid1_thumb', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--accent)', padding: '1.5rem', borderRadius: '50%', cursor: 'pointer' }}>
                  <Play size={30} fill="white" color="white" />
               </div>
               <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
                  <h4 style={{ fontWeight: 900, textTransform: 'uppercase' }}>{t('video', 'vid1_title', 'Season Highlights 2025')}</h4>
               </div>
            </div>
            <div style={{ position: 'relative', background: '#000', height: '300px' }}>
               <img src={t('video', 'vid2_thumb', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--accent)', padding: '1.5rem', borderRadius: '50%', cursor: 'pointer' }}>
                  <Play size={30} fill="white" color="white" />
               </div>
               <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
                  <h4 style={{ fontWeight: 900, textTransform: 'uppercase' }}>{t('video', 'vid2_title', 'Mentorship Summit Recap')}</h4>
               </div>
            </div>
         </div>
      </section>

      <Footer />

      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', cursor: 'pointer' }} onClick={() => setSelectedImage(null)}>
            <X color="white" size={40} />
          </div>
          <img 
            src={`${selectedImage}?auto=format&fit=crop&q=80&w=1200`} 
            alt="Expanded view" 
            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
