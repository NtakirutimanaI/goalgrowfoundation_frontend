import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Calendar, User, ArrowRight, Share2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

export default function NewsPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/news').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  const featuredImages = [
    t('featured', 'img1', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800'),
    t('featured', 'img2', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800'),
    t('featured', 'img3', 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800')
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const newsItems = [
    {
      tag: t('news', 'item1_tag', 'First Team'),
      date: t('news', 'item1_date', '10 HRS AGO'),
      title: t('news', 'item1_title', 'GoalGrow U-19 Secures Spot in Continental Finals'),
      desc: t('news', 'item1_desc', 'Our senior development squad has qualified for the finals after a thrilling 3-1 victory in the playoffs.'),
      img: t('news', 'item1_img', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800')
    },
    {
      tag: t('news', 'item2_tag', 'Foundation'),
      date: t('news', 'item2_date', '2 DAYS AGO'),
      title: t('news', 'item2_title', 'New Training Hub Opens in the North Region'),
      desc: t('news', 'item2_desc', 'Expanding our reach to support another 500 aspiring female athletes with world-class facilities.'),
      img: t('news', 'item2_img', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800')
    },
    {
      tag: t('news', 'item3_tag', 'Academy'),
      date: t('news', 'item3_date', 'MAY 10, 2026'),
      title: t('news', 'item3_title', 'Scholarship Applications for Fall 2026 Now Open'),
      desc: t('news', 'item3_desc', 'We are inviting applications for our elite academic and athletic scholarship programs.'),
      img: t('news', 'item3_img', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800')
    },
    {
      tag: t('news', 'item4_tag', 'Partnership'),
      date: t('news', 'item4_date', 'MAY 05, 2026'),
      title: t('news', 'item4_title', 'Nike Renews Commitment to GoalGrow Futures'),
      desc: t('news', 'item4_desc', 'The global sports brand has extended its partnership for another three years, focusing on innovation.'),
      img: t('news', 'item4_img', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800')
    }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Latest News")} subtitle={t('header', 'subtitle', "Stay Updated with GoalGrow Foundation")} />

      {/* Featured News */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="about-grid" style={{ alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
             <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: `${featuredImages.length * 100}%`,
                transform: `translateY(-${activeSlide * (100 / featuredImages.length)}%)`,
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
             }}>
                {featuredImages.map((img, i) => (
                   <img key={i} src={img} alt={`Featured ${i}`} style={{ height: `${100 / featuredImages.length}%`, width: '100%', objectFit: 'cover' }} />
                ))}
             </div>
             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, var(--primary))', padding: '3rem', color: 'white' }}>
                <span style={{ background: 'var(--accent)', padding: '0.2rem 1rem', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase' }}>{newsItems[0].tag}</span>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', margin: '1rem 0' }}>{newsItems[0].title}</h2>
                <div style={{ display: 'flex', gap: '2rem', opacity: 0.8, fontSize: '0.9rem' }}>
                   <span><Calendar size={16} /> {newsItems[0].date}</span>
                   <span><User size={16} /> By Admin</span>
                </div>
             </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '3rem', height: '500px', overflowY: 'auto' }}>
             <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginBottom: '2rem' }}>{t('sidebar', 'title', 'Trending Topics')}</h3>
             {newsItems.slice(1).map((item, idx) => (
               <div key={idx} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem' }}>
                  <img src={item.img} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  <div>
                     <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>{item.tag}</span>
                     <h4 style={{ fontWeight: 800, fontSize: '1rem', margin: '0.2rem 0' }}>{item.title}</h4>
                     <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* News Feed Grid */}
      <section className="section" style={{ background: '#f1f5f9' }}>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
           {[...newsItems, ...newsItems].map((item, idx) => (
             <div key={idx} className="project-card" style={{ background: 'white' }}>
                <div style={{ position: 'relative' }}>
                   <img src={item.img} alt={item.title} className="project-img" style={{ height: '200px' }} />
                   <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--primary)', color: 'white', padding: '0.2rem 1rem', fontSize: '0.7rem', fontWeight: 900 }}>{item.tag}</span>
                </div>
                <div className="project-info" style={{ padding: '1.5rem' }}>
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{item.date}</p>
                   <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{item.title}</h3>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{item.desc}</p>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                         <Share2 size={16} />
                         <MessageSquare size={16} />
                      </div>
                      <Link to="#" style={{ color: 'var(--primary)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
                         READ MORE <ArrowRight size={14} />
                      </Link>
                   </div>
                </div>
             </div>
           ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
           <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 3rem' }}>{t('feed', 'btn_load', 'Load More Stories')}</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
