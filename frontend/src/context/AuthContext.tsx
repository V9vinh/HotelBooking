import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ProfileDTO, LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileDTO | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<ProfileDTO>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ProfileDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const res = await fetch('http://localhost:8088/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        localStorage.removeItem('token');
      }
    } catch (e) {
      console.error(e);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    const res = await fetch('http://localhost:8088/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Login failed');
    }

    const resData: LoginResponse = await res.json();
    localStorage.setItem('token', resData.token);
    await fetchProfile(resData.token);
  };

  const register = async (data: RegisterRequest) => {
    const res = await fetch('http://localhost:8088/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (data: Partial<ProfileDTO>) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch('http://localhost:8088/api/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...user, ...data }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Update failed');
    }

    const updatedUser = await res.json();
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
