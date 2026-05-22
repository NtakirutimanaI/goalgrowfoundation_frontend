import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  Clock,
  ArrowRight,
  Target,
  Award,
  Globe,
  CheckCircle,
  Zap,
  Mail,
  MapPin,
  Phone,
  Shield,
  Play
} from 'lucide-react';

import { useState, useEffect } from 'react';
import api from '../services/api';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/home').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  const leftSlides = [
    t('hero', 'slide1', "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1600"),
    t('hero', 'slide2', "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1600"),
    t('hero', 'slide3', "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600")
  ];
  const rightSlides = [
    t('trending', 'img1', "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400"),
    t('trending', 'img2', "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=400"),
    t('trending', 'img3', "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400")
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % leftSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* Magazine Edition Marker - Compact */}
      <div style={{ background: 'var(--primary)', color: 'white', padding: '0.3rem var(--container-padding)', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
        <span>{t('header', 'edition', 'Edition 2026 // No. 04')}</span>
        <span style={{ color: 'var(--secondary)' }}>{t('header', 'site_name', 'GoalGrow Times')}</span>
        <span>{t('header', 'location', 'Sport City, Global')}</span>
      </div>

      {/* 1. HERO - SPLIT SLIDER HEADLINE */}
      <section id="home" style={{ 
        height: '60vh',
        padding: '0 var(--container-padding)',
        display: 'grid',
        gridTemplateColumns: '1fr 220px',
        gap: '1rem',
        marginTop: '1rem',
        overflow: 'hidden'
      }}>
        {/* Left Primary Slider */}
        <div style={{ 
          position: 'relative', 
          background: 'var(--primary)',
          backgroundImage: `url("${leftSlides[activeSlide]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.8s ease-in-out'
        }}>
          <div className="hero-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(10, 26, 53, 0.9))' }}></div>
          <div className="hero-content" style={{ textAlign: 'left', maxWidth: '600px', position: 'absolute', bottom: '3rem', left: '3rem', zIndex: 5 }}>
            <span className="badge" style={{ background: 'var(--accent)', marginBottom: '1rem', fontSize: '0.65rem', padding: '0.2rem 0.6rem' }}>{t('hero', 'badge', 'HEADLINE STORY')}</span>
            <h1 style={{ fontSize: '3.5rem', lineHeight: 0.9, marginBottom: '1.5rem', color: 'white' }}>
              {t('hero', 'title_line1', 'THE FUTURE')} <br /> {t('hero', 'title_line2', 'IS')} <span style={{color: 'var(--secondary)'}}>{t('hero', 'title_highlight', 'FEMALE')}</span>.
            </h1>
            <div className="hero-actions" style={{ display: 'flex', gap: '0.8rem' }}>
               <Link to="/register" className="btn-primary" style={{ width: 'auto', padding: '0.7rem 1.5rem', fontSize: '0.8rem', background: 'var(--secondary)', color: 'var(--primary)' }}>
                  JOIN NOW
               </Link>
               <Link to="/about/story" className="btn-secondary" style={{ width: 'auto', padding: '0.7rem 1.5rem', fontSize: '0.8rem', border: '2px solid white', color: 'white' }}>
                  OUR LEGACY
               </Link>
            </div>
          </div>
        </div>

        {/* Right Vertical Secondary Slider - Horizontal Scroll */}
        <div style={{ 
          position: 'relative', 
          overflow: 'hidden',
          background: 'var(--primary)'
        }}>
          <div style={{ 
            display: 'flex',
            width: `${rightSlides.length * 100}%`,
            height: '100%',
            transform: `translateX(-${(activeSlide % rightSlides.length) * (100 / rightSlides.length)}%)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            {rightSlides.map((slide, i) => (
              <div key={i} style={{ 
                width: `${100 / rightSlides.length}%`,
                height: '100%',
                backgroundImage: `url("${slide}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
            ))}
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 26, 53, 0.4)' }}></div>
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 5 }}>
             <span style={{ color: 'var(--secondary)', fontWeight: 900, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('trending', 'title', 'Trending')}</span>
             <h4 style={{ color: 'white', fontSize: '0.8rem', fontWeight: 900, marginTop: '0.3rem', textTransform: 'uppercase' }}>{t('trending', 'subtitle', 'Elite Academy Intake Open')}</h4>
          </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL GRID - COMPACT */}
      <section className="section" style={{ background: '#fff', padding: '4rem var(--container-padding)' }}>
        <div className="about-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
          <div className="about-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent)', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              <div style={{ height: '2px', width: '20px', background: 'var(--accent)' }}></div>
              {t('welcome', 'badge', 'WELCOME TO THE CLUB')}
            </div>
            <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 0.95 }}>
              {t('welcome', 'title', 'EMPOWERING THE ATHLETE, THE LEADER.')}
            </h2>
            <p style={{ fontSize: '0.95rem', marginTop: '1.2rem', lineHeight: 1.5, color: 'var(--text-muted)' }}>
              {t('welcome', 'desc', 'GoalGrow Foundation provides an elite-level environment where world-class coaching meets rigorous academic support and leadership development.')}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
               <div>
                  <Target size={30} color="var(--accent)" />
                  <h4 style={{ fontWeight: 900, marginTop: '0.8rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>{t('stats', 's1_label', 'Elite Standards')}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('stats', 's1_desc', 'UEFA-pro methodologies to build technical mastery from age 8.')}</p>
               </div>
               <div>
                  <Globe size={30} color="var(--primary)" />
                  <h4 style={{ fontWeight: 900, marginTop: '0.8rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>{t('stats', 's2_label', 'Global Reach')}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('stats', 's2_desc', 'Worldwide network of scouts and professional clubs monitoring talent.')}</p>
               </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div style={{ position: 'relative' }}>
                <img src={t('founders', 'img', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=600')} alt="Action" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '0.8rem', left: '0.8rem', background: 'var(--primary)', color: 'white', padding: '0.3rem 0.7rem', fontSize: '0.6rem', fontWeight: 800 }}>{t('founders', 'title', 'Action ON THE PITCH')}</div>
             </div>
             <div style={{ background: 'var(--surface)', padding: '1.5rem', borderLeft: '5px solid var(--secondary)' }}>
                <h4 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('founders', 'subtitle', "Founders' Note")}</h4>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>{t('founders', 'quote', '"They are the ones leading the way."')}</p>
             </div>
          </div>
        </div>
      </section>

      {/* 2b. PLAYER SPOTLIGHTS - COMPACT */}
      <section className="section" style={{ background: '#f8fafc', padding: '4rem var(--container-padding)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, whiteSpace: 'nowrap' }}>{t('profiles', 'title', 'PLAYER PROFILES')}</h2>
            <div style={{ height: '3px', width: '100%', background: 'var(--primary)' }}></div>
         </div>
         <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1.5rem' }}>
            {[
               { name: 'Anita B.', age: 16, pos: 'Forward', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5' },
               { name: 'Grace K.', age: 14, pos: 'Midfield', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604' },
               { name: 'Sarah J.', age: 17, pos: 'GK', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' },
               { name: 'Linda M.', age: 15, pos: 'Defense', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' }
            ].map((p, i) => (
               <div key={i} style={{ minWidth: '280px', background: 'white', border: '1px solid var(--border-color)' }}>
                  <img src={`${p.img}?auto=format&fit=crop&q=80&w=400`} alt={p.name} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.2rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 900 }}>{p.name}</h4>
                        <span style={{ background: 'var(--primary)', color: 'white', padding: '0.15rem 0.4rem', fontSize: '0.6rem' }}>U{p.age}</span>
                     </div>
                     <p style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.7rem', marginTop: '0.3rem' }}>{p.pos} // SCHOLAR</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 3. THE NEWSROOM - COMPACT */}
      <section className="section" style={{ background: '#0a1a35', color: 'white', padding: '4rem var(--container-padding)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
           <div>
              <span style={{ color: 'var(--secondary)', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.7rem' }}>Newsletter Feed</span>
              <h2 style={{ color: 'white', fontSize: '2.2rem', margin: 0, lineHeight: 1 }}>{t('news', 'title', 'THE LATEST UPDATES')}</h2>
           </div>
           <Link to="/foundation/news" style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.75rem' }}>{t('news', 'btn', 'VIEW ALL STORIES')}</Link>
        </div>

        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {[
            { tag: t('news', 'item1_tag', 'ACADEMY'), title: t('news', 'item1_title', 'League Finals 2026'), desc: t('news', 'item1_desc', 'Selection trials begin June 15th.'), img: t('news', 'item1_img', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18') },
            { tag: 'IMPACT', title: 'Rural Growth Initiative', desc: '10 new multi-purpose pitches completed.', img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487' },
            { tag: 'EDUCATION', title: 'Leadership Seminar', desc: 'Alumni gather for the annual summit.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644' }
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
              <img src={`${item.img}?auto=format&fit=crop&q=80&w=600`} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.2rem' }}>
                <span style={{ color: 'var(--secondary)', fontWeight: 900, fontSize: '0.65rem' }}>{item.tag}</span>
                <h3 style={{ color: 'white', fontSize: '1.2rem', margin: '0.4rem 0 0.8rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.2rem' }}>{item.desc}</p>
                <Link to="/foundation/news" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: 800, fontSize: '0.7rem' }}>READ MORE <ArrowRight size={12} /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: 3b. VOICES OF CHAMPIONS - COMPACT TESTIMONIALS */}
      <section className="section" style={{ background: '#fff', padding: '4rem var(--container-padding)' }}>
         <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>Voices</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>{t('voices', 'title', 'OF OUR CHAMPIONS')}</h2>
         </div>
         <div className="grid-3" style={{ gap: '2rem' }}>
            {[
               { name: 'Kelia M.', role: 'U16 Captain', quote: 'GoalGrow taught me that my voice matters on and off the pitch. I am a leader now.', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5' },
               { name: 'Dr. Sarah T.', role: 'Parent', quote: 'The academic support is world-class. My daughter has grown in confidence and discipline.', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604' },
               { name: 'Coach Marcus', role: 'Technical Dir.', quote: 'We don’t just build players; we build the future leaders of our global community.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' }
            ].map((t, i) => (
               <div key={i} style={{ textAlign: 'center' }}>
                  <img src={`${t.img}?auto=format&fit=crop&q=80&w=200`} alt={t.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem' }} />
                  <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.5 }}>"{t.quote}"</p>
                  <h4 style={{ fontWeight: 900, marginTop: '1rem', fontSize: '1rem' }}>{t.name}</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800 }}>{t.role}</span>
               </div>
            ))}
         </div>
      </section>

      {/* NEW: 3c. UPCOMING EVENTS - MAGAZINE FIXTURE LIST */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white', padding: '4rem var(--container-padding)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900 }}>{t('events', 'title', 'UPCOMING EVENTS')}</h2>
            <Link to="/foundation/news" style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.75rem' }}>{t('events', 'btn', 'VIEW CALENDAR')}</Link>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
               { date: 'JUNE 15', title: 'National Selection Trials', location: 'Main Stadium', type: 'TRIALS' },
               { date: 'JULY 02', title: 'Empowerment Summit 2026', location: 'Innovation Hub', type: 'CONFERENCE' },
               { date: 'AUG 12', title: 'Global Partners Gala', location: 'Grand Hall', type: 'EVENT' }
            ].map((e, i) => (
               <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 150px 100px', alignItems: 'center', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ color: 'var(--secondary)', fontWeight: 900, fontSize: '1.1rem' }}>{e.date}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{e.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{e.location}</div>
                  <div style={{ textAlign: 'right', color: 'var(--accent)', fontWeight: 900, fontSize: '0.7rem' }}>{e.type}</div>
               </div>
            ))}
         </div>
      </section>

      {/* 4. THE STATS - COMPACT */}
      <section className="section" style={{ background: 'var(--secondary)', padding: '2.5rem var(--container-padding)' }}>
        <div className="grid-3" style={{ textAlign: 'center' }}>
          <div>
             <h2 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', margin: 0, lineHeight: 1 }}>{t('impact', 'c1_val', '12,000+')}</h2>
             <p style={{ textTransform: 'uppercase', fontWeight: 800, fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.3rem' }}>{t('impact', 'c1_label', 'GIRLS EMPOWERED')}</p>
          </div>
          <div>
             <h2 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', margin: 0, lineHeight: 1 }}>{t('impact', 'c2_val', '85%')}</h2>
             <p style={{ textTransform: 'uppercase', fontWeight: 800, fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.3rem' }}>{t('impact', 'c2_label', 'ACADEMIC SUCCESS')}</p>
          </div>
          <div>
             <h2 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', margin: 0, lineHeight: 1 }}>{t('impact', 'c3_val', '20+')}</h2>
             <p style={{ textTransform: 'uppercase', fontWeight: 800, fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.3rem' }}>{t('impact', 'c3_label', 'REGIONAL HUBS')}</p>
          </div>
        </div>
      </section>

      {/* 4b. TRAINING DRILL - COMPACT */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white', padding: '4rem var(--container-padding)' }}>
         <div className="about-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
               <img src={t('drill', 'img', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800')} alt="Drill" style={{ width: '100%', height: '350px', objectFit: 'cover', opacity: 0.8 }} />
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid var(--secondary)', padding: '1rem', background: 'rgba(10, 26, 53, 0.8)' }}>
                  <h3 style={{ color: 'var(--secondary)', fontSize: '1rem', fontWeight: 900 }}>{t('drill', 'badge', 'VIDEO SESSION')}</h3>
               </div>
            </div>
            <div>
               <span style={{ color: 'var(--secondary)', fontWeight: 900, fontSize: '0.7rem' }}>{t('drill', 'title', 'Masterclass')}</span>
               <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1, margin: '0.8rem 0' }}>{t('drill', 'subtitle', 'WEEKLY TRAINING DRILL.')}</h2>
               <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('drill', 'desc', 'Academy Director Marcus Chen breaks down the "High-Intensity Transition" drill.')}</p>
               <button className="btn-secondary" style={{ 
                  width: 'auto', 
                  padding: '0.8rem 2rem', 
                  fontSize: '0.85rem', 
                  background: 'var(--secondary)', 
                  color: 'var(--primary)', 
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(224, 184, 110, 0.3)'
               }}>
                  <Play size={16} fill="var(--primary)" />
                  {t('drill', 'btn', 'WATCH NOW')}
               </button>
            </div>
         </div>
      </section>

      {/* 5. CORE PILLARS - COMPACT */}
      <section className="section" style={{ background: '#fff', padding: '4rem var(--container-padding)' }}>
         <div className="about-grid" style={{ gridTemplateColumns: '0.8fr 1.2fr', gap: '3rem' }}>
            <div style={{ position: 'relative' }}>
               <img src={t('pillars', 'img', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800')} alt="Pillar" style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', top: '1.5rem', left: '-1.5rem', background: 'var(--accent)', color: 'white', padding: '1.2rem', maxWidth: '220px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{t('pillars', 'badge', 'ELITE COACHING.')}</h3>
                  <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.8 }}>{t('pillars', 'title', 'Bridging the gap to professional performance.')}</p>
               </div>
            </div>
            <div>
               <span style={{ color: 'var(--accent)', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.7rem' }}>Feature Focus</span>
               <h2 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1, margin: '0.8rem 0 1.5rem' }}>OUR CORE <br /> <span style={{ color: 'var(--primary)' }}>PILLARS.</span></h2>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                     <Trophy size={30} color="var(--primary)" />
                     <div>
                        <h4 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' }}>{t('pillars', 'f1_title', 'Elite Development')}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('pillars', 'f1_desc', 'Technical development led by UEFA-certified specialists.')}</p>
                        <Link to="/services/coaching" style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.65rem', marginTop: '0.3rem', display: 'block' }}>EXPLORE</Link>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                     <Users size={30} color="var(--primary)" />
                     <div>
                        <h4 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' }}>Global Mentorship</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pairing athletes with female leaders for career guidance.</p>
                        <Link to="/services/mentorship" style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.65rem', marginTop: '0.3rem', display: 'block' }}>EXPLORE</Link>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                     <Award size={30} color="var(--primary)" />
                     <div>
                        <h4 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' }}>Scholarship Hub</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ensuring financial barriers never stop a champion.</p>
                        <Link to="/services/scholarships" style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.65rem', marginTop: '0.3rem', display: 'block' }}>EXPLORE</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5b. LIFE AT GOALGROW - COMPACT MOSAIC */}
      <section className="section" style={{ background: '#f8fafc', padding: '4rem var(--container-padding)' }}>
         <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>Gallery</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>LIFE AT GOALGROW</h2>
         </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '180px', gap: '0.8rem' }}>
             <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}><img src={t('gallery', 'img1', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="G" /></div>
             <div><img src={t('gallery', 'img2', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="G" /></div>
             <div><img src={t('gallery', 'img3', 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=400')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="G" /></div>
             <div style={{ gridColumn: 'span 2' }}><img src={t('gallery', 'img4', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="G" /></div>
             <div><img src={t('gallery', 'img5', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="G" /></div>
             <div><img src={t('gallery', 'img6', 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=400')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="G" /></div>
          </div>
      </section>

      {/* 6. PARTNERS - COMPACT */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2rem var(--container-padding)' }}>
         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', opacity: 0.4 }}>
            <h3 style={{ fontWeight: 900, fontSize: '0.9rem' }}>NIKE</h3>
            <h3 style={{ fontWeight: 900, fontSize: '0.9rem' }}>UNICEF</h3>
            <h3 style={{ fontWeight: 900, fontSize: '0.9rem' }}>ADIDAS</h3>
            <h3 style={{ fontWeight: 900, fontSize: '0.9rem' }}>VISA</h3>
            <h3 style={{ fontWeight: 900, fontSize: '0.9rem' }}>COCA COLA</h3>
         </div>
      </section>

      {/* 7. THE JOIN SECTION - COMPACT */}
      <section className="section" style={{ background: '#fff', padding: '4rem var(--container-padding)' }}>
         <div style={{ maxWidth: '850px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--primary)' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '2.5rem' }}>
               <span style={{ color: 'var(--secondary)', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.65rem' }}>Subscription</span>
               <h2 style={{ color: 'white', fontSize: '2.2rem', margin: '0.8rem 0' }}>{t('subscription', 'title', 'JOIN THE MOVEMENT.')}</h2>
               <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>{t('subscription', 'desc', 'Receive bi-weekly updates on our progress and impact.')}</p>
               <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem', fontSize: '0.8rem' }}><CheckCircle size={16} color="var(--secondary)" /><span>Trial Alerts</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem', fontSize: '0.8rem' }}><CheckCircle size={16} color="var(--secondary)" /><span>Impact Reports</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.8rem' }}><CheckCircle size={16} color="var(--secondary)" /><span>Mentor Network</span></div>
               </div>
            </div>
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <form className="auth-form" style={{ padding: 0, margin: 0, maxWidth: 'none', background: 'transparent', boxShadow: 'none', border: 'none' }} onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 900 }}>NAME</label>
                    <input type="text" placeholder="John Doe" style={{ background: '#f8fafc', padding: '0.7rem', fontSize: '0.85rem' }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                    <label style={{ color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 900 }}>EMAIL</label>
                    <input type="email" placeholder="john@example.com" style={{ background: '#f8fafc', padding: '0.7rem', fontSize: '0.85rem' }} />
                  </div>
                  <button className="btn-primary" style={{ width: '100%', padding: '0.8rem', background: 'var(--accent)', textTransform: 'uppercase', fontWeight: 900, fontSize: '0.8rem' }}>{t('subscription', 'btn', 'SUBSCRIBE')}</button>
               </form>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
