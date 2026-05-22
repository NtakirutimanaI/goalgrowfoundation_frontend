import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Shield, Heart, Award, Globe, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function PartnersPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/partners').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  const tiers = [
    {
      title: t('tier1', 'title', "Founding Partners"),
      desc: t('tier1', 'desc', "Our primary collaborators who provide the foundational support for our core operations."),
      partners: [
        { name: t('tier1', 'p1_name', 'NIKE'), role: t('tier1', 'p1_role', 'Official Technical Partner'), logo: <Shield size={60} />, color: '#000' },
        { name: t('tier1', 'p2_name', 'UNICEF'), role: t('tier1', 'p2_role', 'Community & Safety Partner'), logo: <Heart size={60} />, color: '#1CABE2' },
        { name: t('tier1', 'p3_name', 'ADIDAS'), role: t('tier1', 'p3_role', 'Development Grantor'), logo: <Award size={60} />, color: '#000' }
      ]
    },
    {
      title: t('tier2', 'title', "Strategic Corporate Sponsors"),
      desc: t('tier2', 'desc', "Major organizations driving the scale and sustainability of our regional hubs."),
      partners: [
        { name: t('tier2', 'p1_name', 'MICROSOFT'), role: t('tier2', 'p1_role', 'Digital Transformation Partner') },
        { name: t('tier2', 'p2_name', 'VISA'), role: t('tier2', 'p2_role', 'Financial Literacy Sponsor') },
        { name: t('tier2', 'p3_name', 'COCA COLA'), role: t('tier2', 'p3_role', 'Hydration & Events Partner') },
        { name: t('tier2', 'p4_name', 'GOOGLE'), role: t('tier2', 'p4_role', 'Education Tech Partner') },
        { name: t('tier2', 'p5_name', 'EMIRATES'), role: t('tier2', 'p5_role', 'Official Travel Partner') },
        { name: t('tier2', 'p6_name', 'RED BULL'), role: t('tier2', 'p6_role', 'Performance Lab Partner') }
      ]
    }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Global Partners")} subtitle={t('header', 'subtitle', "Fueling the Revolution through Collaboration")} />

      {/* Tiers Section */}
      {tiers.map((tier, tIdx) => (
        <section key={tIdx} className="section" style={{ background: tIdx % 2 !== 0 ? '#f8fafc' : '#fff' }}>
           <div className="section-title">
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase' }}>{tier.title}</h2>
              <p>{tier.desc}</p>
           </div>

           {tIdx === 0 ? (
             <div className="grid-3">
                {tier.partners.map((p, pIdx) => (
                  <div key={pIdx} className="card" style={{ padding: '3rem', textAlign: 'center', border: '1px solid var(--border-color)', position: 'relative' }}>
                     <div style={{ color: 'var(--accent)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{(p as any).logo}</div>
                     <h3 style={{ fontWeight: 900, fontSize: '1.5rem' }}>{p.name}</h3>
                     <p style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1.5rem' }}>{p.role}</p>
                     <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Working together to redefine how young female athletes are trained, supported, and promoted on the world stage.</p>
                     <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', cursor: 'pointer' }}>
                        View Partnership Case Study <ExternalLink size={14} />
                     </div>
                  </div>
                ))}
             </div>
           ) : (
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                {tier.partners.map((p, pIdx) => (
                  <div key={pIdx} style={{ background: 'white', padding: '2rem', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                     <h4 style={{ fontWeight: 900, margin: 0 }}>{p.name}</h4>
                     <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.5rem' }}>{p.role}</p>
                  </div>
                ))}
             </div>
           )}
        </section>
      ))}

      {/* Partnership Benefits / Pillars */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
         <div className="section-title">
            <h2 style={{ color: 'white' }}>{t('benefits', 'title', 'Why Partner With GoalGrow?')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{t('benefits', 'subtitle', 'Leveraging sports to drive meaningful corporate and social impact.')}</p>
         </div>
         <div className="grid-3">
            <div style={{ display: 'flex', gap: '1.5rem' }}>
               <Zap size={40} color="var(--secondary)" />
               <div>
                  <h4 style={{ fontWeight: 900, textTransform: 'uppercase' }}>{t('benefits', 'b1_title', 'Brand Alignment')}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{t('benefits', 'b1_desc', 'Align your brand with excellence, empowerment, and the future of global female sports.')}</p>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
               <Globe size={40} color="var(--secondary)" />
               <div>
                  <h4 style={{ fontWeight: 900, textTransform: 'uppercase' }}>{t('benefits', 'b2_title', 'Community Impact')}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{t('benefits', 'b2_desc', 'Directly contribute to the health, education, and career success of thousands of girls.')}</p>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
               <Award size={40} color="var(--secondary)" />
               <div>
                  <h4 style={{ fontWeight: 900, textTransform: 'uppercase' }}>{t('benefits', 'b3_title', 'Technical Innovation')}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{t('benefits', 'b3_desc', 'Collaborate on groundbreaking research in female athletic performance and nutrition.')}</p>
               </div>
            </div>
         </div>
      </section>

      {/* Become a Partner Form Teaser */}
      <section className="section" style={{ background: '#fff', textAlign: 'center' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', border: '10px solid var(--accent)', padding: '4rem' }}>
            <h2 style={{ textTransform: 'uppercase', fontWeight: 900, fontSize: '2.5rem' }}>{t('cta', 'title', 'Ready to Partner?')}</h2>
            <p style={{ margin: '1.5rem 0' }}>{t('cta', 'desc', 'Join the ecosystem of world-class organizations that are making the champion’s journey possible. We offer tailored partnership tiers for organizations of all sizes.')}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
               <button className="btn-primary" style={{ width: 'auto' }}>{t('cta', 'btn1', 'Submit Partnership Inquiry')}</button>
               <button className="btn-secondary" style={{ width: 'auto', border: '1px solid var(--primary)' }}>{t('cta', 'btn2', 'Download Prospectus')}</button>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
