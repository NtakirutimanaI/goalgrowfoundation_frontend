import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Mail, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function TeamPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/team').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  const staffGroups = [
    {
      title: t('group1', 'title', "Executive Leadership"),
      members: [
        { name: t('group1', 'm1_name', 'Sarah Jenkins'), role: t('group1', 'm1_role', 'Executive Director'), img: t('group1', 'm1_img', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'), bio: t('group1', 'm1_bio', 'Former Olympic consultant with 20 years in sports policy.') },
        { name: t('group1', 'm2_name', 'Marcus Chen'), role: t('group1', 'm2_role', 'Chief Technical Officer'), img: t('group1', 'm2_img', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'), bio: t('group1', 'm2_bio', 'UEFA Pro License coach with focus on youth systems.') },
        { name: t('group1', 'm3_name', 'David Smith'), role: t('group1', 'm3_role', 'Chief Operations Officer'), img: t('group1', 'm3_img', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'), bio: t('group1', 'm3_bio', 'Specialist in scaling non-profit infrastructures.') }
      ]
    },
    {
      title: t('group2', 'title', "Technical & Coaching Staff"),
      members: [
        { name: t('group2', 'm1_name', 'Robert Taylor'), role: t('group2', 'm1_role', 'Lead Technical Coach'), img: t('group2', 'm1_img', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'), bio: t('group2', 'm1_bio', 'Youth development expert with 10+ years experience.') },
        { name: t('group2', 'm2_name', 'Elena Rodriguez'), role: t('group2', 'm2_role', 'Head of Recruitment'), img: t('group2', 'm2_img', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'), bio: t('group2', 'm2_bio', 'Specialist in identifying raw talent in rural areas.') },
        { name: t('group2', 'm3_name', 'Michael Obasuyi'), role: t('group2', 'm3_role', 'Tactical Analyst'), img: t('group2', 'm3_img', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'), bio: t('group2', 'm3_bio', 'Expert in performance data and game theory.') }
      ]
    },
    {
      title: t('group3', 'title', "Medical & Performance"),
      members: [
        { name: t('group3', 'm1_name', 'Grace Kim'), role: t('group3', 'm1_role', 'Chief Nutritionist'), img: t('group3', 'm1_img', 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400'), bio: t('group3', 'm1_bio', 'Optimizing athletic output through tailored nutrition.') },
        { name: t('group3', 'm2_name', 'Linda Mbeki'), role: t('group3', 'm2_role', 'Sports Psychologist'), img: t('group3', 'm2_img', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400'), bio: t('group3', 'm2_bio', 'Supporting the mental resilience of our young stars.') },
        { name: t('group3', 'm3_name', 'Kevin Park'), role: t('group3', 'm3_role', 'Lead Physiotherapist'), img: t('group3', 'm3_img', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'), bio: t('group3', 'm3_bio', 'Injury prevention and high-performance recovery.') }
      ]
    }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "The Team")} subtitle={t('header', 'subtitle', "Professional Excellence Behind Every Champion")} />

      {staffGroups.map((group, gIdx) => (
        <section key={gIdx} className="section" style={{ background: gIdx % 2 !== 0 ? '#f8fafc' : '#fff' }}>
           <div className="section-title">
              <h2 style={{ fontSize: '2rem', textAlign: 'left', borderBottom: '4px solid var(--accent)', display: 'inline-block' }}>{group.title}</h2>
           </div>
           <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {group.members.map((member, mIdx) => (
                <div key={mIdx} className="card" style={{ padding: '0', border: 'none', background: 'white' }}>
                   <div style={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
                      <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                       <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <a href={t(`group${gIdx+1}`, `m${mIdx+1}_linkedin`, '#')} target="_blank" rel="noreferrer" style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', display: 'flex' }}><Linkedin size={18} /></a>
                          <a href={t(`group${gIdx+1}`, `m${mIdx+1}_twitter`, '#')} target="_blank" rel="noreferrer" style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem', display: 'flex' }}><Twitter size={18} /></a>
                       </div>
                    </div>
                    <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderTop: 'none' }}>
                       <h4 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.2rem' }}>{member.name}</h4>
                       <p style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1rem' }}>{member.role}</p>
                       <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{member.bio}</p>
                       <a href={t(`group${gIdx+1}`, `m${mIdx+1}_bio_link`, '#')} style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'none' }}>
                          Read Full Bio <ExternalLink size={14} />
                       </a>
                    </div>
                </div>
              ))}
           </div>
        </section>
      ))}

      {/* Recruitment Call */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
         <h2 style={{ color: 'white', textTransform: 'uppercase', fontWeight: 900 }}>{t('recruitment', 'title', 'Join Our Technical Team')}</h2>
         <p style={{ maxWidth: '600px', margin: '1rem auto', opacity: 0.8 }}>{t('recruitment', 'desc', 'We are always looking for passionate, world-class talent to help us redefine female sports development.')}</p>
         <button className="btn-primary" style={{ width: 'auto', background: 'var(--secondary)', color: 'var(--primary)', marginTop: '2rem' }}>{t('recruitment', 'btn', 'View Career Openings')}</button>
      </section>

      <Footer />
    </div>
  );
}
