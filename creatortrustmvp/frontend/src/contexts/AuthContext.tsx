import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, User, CreatorProfile, BrandProfile } from '../lib/api';

interface AuthContextType {
  user: User | null;
  profile: CreatorProfile | BrandProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userType: 'creator' | 'brand') => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CreatorProfile | BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  const refreshUser = async () => {
    try {
      const data = await api.getMe();
      setUser(data.user);
      setProfile(data.profile);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      api.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data.user);
    await refreshUser();
  };

  const register = async (email: string, password: string, userType: 'creator' | 'brand') => {
    const data = await api.register(email, password, userType);
    setUser(data.user);
    await refreshUser();
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
