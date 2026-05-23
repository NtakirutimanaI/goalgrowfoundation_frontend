import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { supabase } from '../services/supabase';

interface User {
  id: string;
  email: string;
  role: string;
  fullName?: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
        if (session?.access_token) {
          // Use Supabase JWT as access token
          localStorage.setItem('access_token', session.access_token);
          const { user } = session;
          const userData = {
            id: user.id,
            email: user.email || '',
            role: user.role || 'user',
            fullName: user.user_metadata?.full_name || '',
            createdAt: user.created_at || ''
          } as any;
          setUser(userData);
          setLoading(false);
          // Optionally fetch additional profile from backend if needed
          try {
            const res = await api.get('/auth/profile');
            setUser(res.data);
          } catch (profileErr: any) {
            console.error('Failed to fetch backend profile', profileErr);
          }
        } else {
          setLoading(false);
        }
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    if (data.session?.access_token) {
      localStorage.setItem('access_token', data.session.access_token);
      const { user } = data.session;
      const userData = {
        id: user.id,
        email: user.email || '',
        role: user.role || 'user',
        fullName: user.user_metadata?.full_name || '',
        createdAt: user.created_at || ''
      } as any;
      setUser(userData);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
        {loading ? <div className="spinner" style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div> : children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
