import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { History, TrendingUp, Star, Award, Shield, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

export default function StoryPage() {
  const [activeSlide1, setActiveSlide1] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/story').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };

  const images1 = [
    t('chapter1', 'img1', "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800"),
    t('chapter1', 'img2', "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"),
    t('chapter1', 'img3', "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800")
  ];

  const images2 = [
    t('chapter2', 'img1', "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800"),
    t('chapter2', 'img2', "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800"),
    t('chapter2', 'img3', "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800")
  ];

  useEffect(() => {
    const timer1 = setInterval(() => {
      setActiveSlide1((prev) => (prev + 1) % images1.length);
    }, 4000);
    const timer2 = setInterval(() => {
      setActiveSlide2((prev) => (prev + 1) % images2.length);
    }, 4500);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', 'Our Story')} subtitle={t('header', 'subtitle', 'A Legacy of Empowerment since 2020')} />

      {/* Chapter 1: The Spark */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="about-grid">
          <div className="about-text">
            <h3 style={{ textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 900 }}>{t('chapter1', 'badge', 'Chapter I: The Spark (2020)')}</h3>
            <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{t('chapter1', 'title', 'Where It All Began')}</h2>
            <p>{t('chapter1', 'desc1', 'In a world of rapidly changing sports landscapes, a critical gap remained: the professional-level development of young female athletes. GoalGrow was founded in a small community center in Sport City by three coaches who refused to accept the status quo.')}</p>
            <p>{t('chapter1', 'desc2', 'We started with nothing but a dozen footballs, two sets of bibs, and a relentless belief that girls deserved the same pathway to excellence as their male counterparts.')}</p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', boxShadow: '15px 15px 0 var(--secondary)', height: '400px' }}>
             <div style={{ 
               display: 'flex',
               width: `${images1.length * 100}%`,
               height: '100%',
               transform: `translateX(-${activeSlide1 * (100 / images1.length)}%)`,
               transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
             }}>
               {images1.map((img, i) => (
                 <img key={i} src={img} alt={`Founding ${i}`} style={{ width: `${100 / images1.length}%`, height: '100%', objectFit: 'cover', borderRadius: '0' }} />
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Scaling The Impact */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="about-grid">
           <div style={{ position: 'relative', overflow: 'hidden', boxShadow: '-15px 15px 0 var(--accent)', height: '400px' }}>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: `${images2.length * 100}%`,
                transform: `translateY(-${activeSlide2 * (100 / images2.length)}%)`,
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {images2.map((img, i) => (
                  <img key={i} src={img} alt={`Growth ${i}`} style={{ height: `${100 / images2.length}%`, width: '100%', objectFit: 'cover', borderRadius: '0' }} />
                ))}
              </div>
           </div>
           <div className="about-text">
             <h3 style={{ textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 900 }}>{t('chapter2', 'badge', 'Chapter II: The Growth (2021-2022)')}</h3>
             <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{t('chapter2', 'title', 'Building The Infrastructure')}</h2>
             <p>{t('chapter2', 'desc1', 'As word spread, we realized we needed more than just pitches. We needed a system. We established our first technical curriculum, partnered with global NGOs for safeguarding protocols, and launched our regional talent identification program.')}</p>
             <p>{t('chapter2', 'desc2', 'By the end of 2022, GoalGrow had successfully expanded to 5 regional hubs, supporting over 1,500 active players and training 50+ female coaches.')}</p>
           </div>
        </div>
      </section>

      {/* Detailed Timeline */}
      <section className="section">
        <div className="section-title">
          <h2>Detailed Timeline</h2>
          <p>Every milestone that shaped our foundation.</p>
        </div>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
           {[
             { year: t('timeline', 'item1_year', '2020 Q1'), title: t('timeline', 'item1_title', 'Founding'), desc: t('timeline', 'item1_desc', 'Official incorporation of GoalGrow Foundation.') },
             { year: t('timeline', 'item2_year', '2020 Q3'), title: t('timeline', 'item2_title', 'First Pitch'), desc: t('timeline', 'item2_desc', 'Inauguration of our primary training center in Sport City.') },
             { year: t('timeline', 'item3_year', '2021 Q2'), title: t('timeline', 'item3_title', 'Academic Launch'), desc: t('timeline', 'item3_desc', 'Integration of mandatory academic tutoring for all players.') },
             { year: t('timeline', 'item4_year', '2021 Q4'), title: t('timeline', 'item4_title', 'National Cup'), desc: t('timeline', 'item4_desc', 'GoalGrow U-17 wins its first national developmental trophy.') },
             { year: t('timeline', 'item5_year', '2022 Q2'), title: t('timeline', 'item5_title', 'Rural Reach'), desc: t('timeline', 'item5_desc', 'Opening of 3 centers in remote rural communities.') },
             { year: t('timeline', 'item6_year', '2022 Q4'), title: t('timeline', 'item6_title', 'Global Partnership'), desc: t('timeline', 'item6_desc', 'Nike joins as the official technical equipment sponsor.') },
             { year: t('timeline', 'item7_year', '2023 Q1'), title: t('timeline', 'item7_title', 'The Hub'), desc: t('timeline', 'item7_desc', 'Completion of our state-of-the-art residential academy.') },
             { year: t('timeline', 'item8_year', '2023 Q3'), title: t('timeline', 'item8_title', 'First Pro'), desc: t('timeline', 'item8_desc', 'Our first alumna signs a professional contract in Europe.') }
           ].map((item, idx) => (
             <div key={idx} style={{ display: 'flex', gap: '2rem', padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <h4 style={{ minWidth: '100px', fontWeight: 900, color: 'var(--accent)' }}>{item.year}</h4>
                <div>
                   <h5 style={{ textTransform: 'uppercase', fontWeight: 800 }}>{item.title}</h5>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Philosophical Foundations */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
         <div className="section-title">
            <h2 style={{ color: 'white' }}>Our Philosophy</h2>
         </div>
         <div className="grid-3">
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
               <Shield size={32} color="var(--secondary)" />
               <h3 style={{ color: 'white', marginTop: '1rem' }}>{t('philosophy', 'pillar1_title', 'Discipline')}</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('philosophy', 'pillar1_desc', 'We believe that character is built through consistency. On-time is late, and hard work is the minimum requirement.')}</p>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
               <Award size={32} color="var(--secondary)" />
               <h3 style={{ color: 'white', marginTop: '1rem' }}>{t('philosophy', 'pillar2_title', 'Excellence')}</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('philosophy', 'pillar2_desc', "We don't aim to be the best \"female\" club. We aim to be the best developmental club in the world, period.")}</p>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
               <Star size={32} color="var(--secondary)" />
               <h3 style={{ color: 'white', marginTop: '1rem' }}>{t('philosophy', 'pillar3_title', 'Growth')}</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('philosophy', 'pillar3_desc', 'Winning is a byproduct. Our true goal is the continuous evolution of our players as human beings.')}</p>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
