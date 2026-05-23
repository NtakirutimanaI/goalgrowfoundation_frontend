import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

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
  login: (token: string, userData: User) => void;
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
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // 1. Decode token to immediately authenticate the user locally
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userData = {
            id: payload.sub || '',
            email: payload.email || '',
            role: payload.role || 'user',
            fullName: payload.name || '',
            createdAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : ''
          } as any;
          setUser(userData);
          setLoading(false); // Render UI immediately

          // 2. Fetch full profile in the background to get complete user details
          try {
            const res = await api.get('/auth/profile');
            setUser(res.data);
          } catch (profileErr: any) {
            console.error('Failed to fetch full user profile', profileErr);
            if (profileErr.response?.status === 401) {
              // Token is invalid/expired according to server, clear session
              localStorage.removeItem('access_token');
              setUser(null);
            }
          }
        } catch (e) {
          console.error('Failed to decode token', e);
          localStorage.removeItem('access_token');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('access_token', token);
    setUser(userData);
  };

  const logout = () => {
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
