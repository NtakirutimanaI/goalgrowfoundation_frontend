import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Loader2, CheckCircle, ArrowLeft, Mail, User, Phone, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function EventRegistrationPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  useEffect(() => {
    fetchLink();
  }, [slug]);

  const fetchLink = async () => {
    try {
      const res = await api.get(`/registrations/link/${slug}`);
      setLink(res.data);
    } catch (err) {
      toast.error('Event not found or closed');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`/registrations/submit/${slug}`, form);
      setSuccess(true);
      toast.success('Registration successful!');
    } catch (err) {
      toast.error('Failed to register. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" size={48} color="var(--primary)" />
    </div>
  );

  if (success) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#166534' }}>
            <CheckCircle size={40} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '1rem' }}>YOU'RE IN!</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>Thank you for registering for <strong>{link.title}</strong>. We've received your details and will be in touch soon.</p>
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
            <ArrowLeft size={18} /> BACK TO HOME
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ background: 'var(--primary)', padding: '3rem 2rem', borderRadius: '24px 24px 0 0', color: 'white', textAlign: 'center' }}>
            <span style={{ background: 'var(--secondary)', color: 'var(--primary)', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block' }}>Official Event</span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>{link.title}</h1>
            <div style={{ width: '40px', height: '4px', background: 'var(--accent)', margin: '1.5rem auto' }}></div>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Fill in the form below to secure your spot.</p>
          </div>
          
          <div style={{ background: 'white', padding: '3rem', borderRadius: '0 0 24px 24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <User size={14} /> Full Name
                </label>
                <input 
                  type="text" 
                  required 
                  value={form.fullName}
                  onChange={e => setForm({...form, fullName: e.target.value})}
                  placeholder="Enter your full name"
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Mail size={14} /> Email Address
                </label>
                <input 
                  type="email" 
                  required 
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Phone size={14} /> Phone Number
                </label>
                <input 
                  type="tel" 
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="+250 ..."
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Info size={14} /> Additional Info
                </label>
                <textarea 
                  rows={4}
                  value={form.additionalInfo}
                  onChange={e => setForm({...form, additionalInfo: e.target.value})}
                  placeholder="Anything else we should know?"
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', resize: 'none' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                style={{ 
                  padding: '1.25rem', background: 'var(--primary)', color: 'white', 
                  border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', 
                  fontSize: '1rem', transition: '0.3s', marginTop: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                }}
              >
                {submitting ? <Loader2 className="animate-spin" size={20} /> : 'CONFIRM REGISTRATION'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
