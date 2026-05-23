import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      try {
        await login(email, password);
        toast.success('Login successful!');
        navigate('/dashboard');
      } catch (err: any) {
        toast.error(err.message || 'Login failed');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="auth-container" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', padding: '4rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <form onSubmit={handleSubmit} className="auth-form" style={{ background: 'white', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: '10px 10px 0 var(--accent)' }}>
            <h2 style={{ textTransform: 'uppercase', fontWeight: 900, fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', color: 'var(--primary)' }}>Welcome Back</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.85rem' }}>Login to your GoalGrow account</p>
            
            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <input 
                type="email" 
                placeholder="Email Address"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border-color)', outline: 'none', background: '#f8fafc', fontSize: '0.9rem' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem', position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border-color)', outline: 'none', background: '#f8fafc', fontSize: '0.9rem', paddingRight: '2.5rem' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontWeight: 900, textTransform: 'uppercase', background: 'var(--accent)' }}>Login</button>
            
            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 800 }}>Join The Foundation</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
