import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { jsonDb } from '../lib/jsonDatabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('sindhudurg_auth_user');
      if (saved) return JSON.parse(saved);
      const db = jsonDb.getDatabase();
      return db.users.find((u) => u.role === 'customer') || db.users[0];
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sindhudurg_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sindhudurg_auth_user');
    }
  }, [user]);

  const login = async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      const db = jsonDb.getDatabase();
      const existingUser = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        setUser(existingUser);
        return { success: true };
      }

      // If user doesn't exist, create profile in local JSON database
      const determinedRole: UserRole = email.includes('admin')
        ? 'admin'
        : email.includes('seller')
        ? 'seller'
        : 'customer';

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        fullName: email.split('@')[0],
        role: determinedRole,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`
      };

      db.users.push(newUser);
      jsonDb.saveDatabase(db);
      setUser(newUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, _password: string, fullName: string, requestedRole: UserRole = 'customer') => {
    setIsLoading(true);
    try {
      const db = jsonDb.getDatabase();
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        fullName,
        role: requestedRole,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
      };

      db.users.push(newUser);
      jsonDb.saveDatabase(db);
      setUser(newUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  const switchDemoRole = (newRole: UserRole) => {
    const db = jsonDb.getDatabase();
    const targetUser = db.users.find((u) => u.role === newRole);
    if (targetUser) {
      setUser(targetUser);
    } else {
      setUser({
        id: `usr-${newRole}-01`,
        email: `${newRole}@sindhudurg.demo.in`,
        fullName: `${newRole.toUpperCase()} Persona`,
        role: newRole
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'customer',
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        signup,
        logout,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
