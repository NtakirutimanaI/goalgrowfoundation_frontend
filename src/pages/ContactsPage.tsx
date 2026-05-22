import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ContactsPage() {
  const [cms, setCms] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/contact').then(res => setCms(res.data)).catch(console.error);
  }, []);

  const t = (section: string, key: string, defaultValue: string) => {
    const item = cms.find(c => c.section === section && c.key === key);
    return item ? item.value : defaultValue;
  };
  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader title={t('header', 'title', "Connect With Us")} subtitle={t('header', 'subtitle', "Get In Touch with the GoalGrow Team")} />

      {/* Main Contact Area */}
      <section className="section" style={{ background: '#f1f5f9' }}>
        <div className="contact-container" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
          <div className="contact-info" style={{ padding: '3rem', background: 'var(--primary)', color: 'white' }}>
            <h3 style={{ color: 'white', fontSize: '1.8rem' }}>{t('info', 'title', 'Get In Touch')}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '0.9rem' }}>{t('info', 'desc', "Ready to be part of the future? Reach out to our team today. Whether you are a player, a parent, or a potential sponsor, we'd love to hear from you.")}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="info-item" style={{ color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem' }}><MapPin size={20} /></div>
                  <div>
                     <h5 style={{ textTransform: 'uppercase', margin: 0, fontWeight: 800 }}>{t('info', 'address_label', 'Headquarters')}</h5>
                     <span>{t('info', 'address_value', '123 Goal Street, Sport City, SC 54321')}</span>
                  </div>
               </div>
               <div className="info-item" style={{ color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem' }}><Mail size={20} /></div>
                  <div>
                     <h5 style={{ textTransform: 'uppercase', margin: 0, fontWeight: 800 }}>{t('info', 'email_label', 'Email Address')}</h5>
                     <span>{t('info', 'email_value', 'office@goalgrow.org')}</span>
                  </div>
               </div>
               <div className="info-item" style={{ color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem' }}><Phone size={20} /></div>
                  <div>
                     <h5 style={{ textTransform: 'uppercase', margin: 0, fontWeight: 800 }}>{t('info', 'phone_label', 'Phone Number')}</h5>
                     <span>{t('info', 'phone_value', '+1 (800) GROW-NOW')}</span>
                  </div>
               </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
               <h5 style={{ textTransform: 'uppercase', fontWeight: 800, marginBottom: '1rem' }}>{t('social', 'title', 'Follow Our Progress')}</h5>
               <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', cursor: 'pointer' }}><Facebook size={18} /></div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', cursor: 'pointer' }}><Twitter size={18} /></div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', cursor: 'pointer' }}><Instagram size={18} /></div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', cursor: 'pointer' }}><Linkedin size={18} /></div>
               </div>
            </div>
          </div>

          <form className="auth-form" style={{ padding: '3rem', margin: 0, maxWidth: 'none', background: 'white', boxShadow: 'none', border: 'none' }} onSubmit={(e) => e.preventDefault()}>
             <div className="form-group">
               <label style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{t('form', 'name_label', 'Full Name')}</label>
               <input type="text" placeholder={t('form', 'name_placeholder', "Enter your name")} style={{ background: '#f8fafc', color: 'var(--primary)', padding: '0.75rem' }} />
             </div>
             <div className="form-group">
               <label style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{t('form', 'email_label', 'Email Address')}</label>
               <input type="email" placeholder={t('form', 'email_placeholder', "Enter your email")} style={{ background: '#f8fafc', color: 'var(--primary)', padding: '0.75rem' }} />
             </div>
             <div className="form-group">
                <label style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{t('form', 'reason_label', 'Reason for Contact')}</label>
                <select style={{ background: '#f8fafc', padding: '0.75rem' }}>
                   <option>{t('form', 'opt1', 'Player Recruitment')}</option>
                   <option>{t('form', 'opt2', 'Sponsorship Inquiry')}</option>
                   <option>{t('form', 'opt3', 'Media & PR')}</option>
                   <option>{t('form', 'opt4', 'General Support')}</option>
                </select>
             </div>
             <div className="form-group">
               <label style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{t('form', 'message_label', 'Message')}</label>
               <textarea style={{ width: '100%', padding: '1rem', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '0', color: 'var(--primary)', minHeight: '150px' }} placeholder={t('form', 'message_placeholder', "Tell us how we can help...")}></textarea>
             </div>
             <button className="btn-primary" style={{ textTransform: 'uppercase', padding: '1rem' }}>{t('form', 'btn', 'Send Message')}</button>
          </form>
        </div>
      </section>

      {/* Regional Offices / Locations */}
      <section className="section">
         <div className="section-title">
            <h2>{t('presence', 'title', 'Our Presence')}</h2>
            <p>{t('presence', 'subtitle', 'Visit us at one of our regional training centers.')}</p>
         </div>
         <div className="grid-3">
            {[
              { city: t('presence', 'p1_city', 'North Region'), loc: t('presence', 'p1_loc', 'Training Center Alpha'), phone: t('presence', 'p1_phone', '+1 (555) 010-221') },
              { city: t('presence', 'p2_city', 'East Region'), loc: t('presence', 'p2_loc', 'Foundation Hub East'), phone: t('presence', 'p2_phone', '+1 (555) 010-334') },
              { city: t('presence', 'p3_city', 'South Region'), loc: t('presence', 'p3_loc', 'Elite Sports Park'), phone: t('presence', 'p3_phone', '+1 (555) 010-556') }
            ].map((office, idx) => (
              <div key={idx} className="card">
                 <h4 style={{ textTransform: 'uppercase', fontWeight: 900, color: 'var(--accent)' }}>{office.city}</h4>
                 <p style={{ fontWeight: 700, margin: '0.5rem 0' }}>{office.loc}</p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <Phone size={14} /> {office.phone}
                 </div>
                 <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                    {t('presence', 'view_map', 'View on Map')} <ExternalLink size={14} />
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section" style={{ background: '#f8fafc' }}>
         <div className="section-title">
            <h2>{t('faq', 'title', 'Frequently Asked Questions')}</h2>
         </div>
         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { q: t('faq', 'q1', 'How do I register a player?'), a: t('faq', 'a1', 'You can register through our online portal or visit any regional center during selection trials.') },
              { q: t('faq', 'q2', 'Is there an age limit?'), a: t('faq', 'a2', 'Our programs currently support girls aged 8 to 19 years old.') },
              { q: t('faq', 'q3', 'How can I become a sponsor?'), a: t('faq', 'a3', 'Please use the contact form above and select "Sponsorship Inquiry" to reach our partnerships team.') }
            ].map((faq, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                 <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '1rem', marginBottom: '0.5rem' }}>Q: {faq.q}</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>A: {faq.a}</p>
              </div>
            ))}
         </div>
      </section>

      <Footer />
    </div>
  );
}
