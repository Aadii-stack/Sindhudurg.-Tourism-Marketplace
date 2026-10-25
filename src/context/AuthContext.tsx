import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

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

const DEMO_USERS: Record<UserRole, UserProfile> = {
  customer: {
    id: 'usr-tourist-01',
    email: 'rohit.traveler@example.com',
    fullName: 'Rohit Deshmukh (Tourist)',
    phone: '+91 98200 11223',
    role: 'customer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  seller: {
    id: 's1',
    email: 'dattaram.devgad@example.com',
    fullName: 'Dattaram Rane (Devgad Orchardist)',
    phone: '+91 98221 44521',
    role: 'seller',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  admin: {
    id: 'usr-admin-01',
    email: 'admin.sindhudurg@demo.in',
    fullName: 'Sindhudurg Admin Council',
    phone: '+91 2362 228899',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sindhudurg_auth_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.customer;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sindhudurg_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sindhudurg_auth_user');
    }
  }, [user]);

  // Sync with Supabase Auth if credentials exist
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const checkSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email || session.user.email || '',
              fullName: profile.full_name || 'Sindhudurg Member',
              phone: profile.phone,
              role: profile.role || 'customer',
              avatarUrl: profile.avatar_url
            });
          }
        }
      } catch (err) {
        console.warn('Supabase session fetch fallback:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = client.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name || 'Sindhudurg Member',
          role: (session.user.user_metadata?.role as UserRole) || 'customer'
        });
      } else {
        // Fall back to demo tourist profile
        setUser(DEMO_USERS.customer);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            role: (data.user.user_metadata?.role as UserRole) || 'customer'
          });
          return { success: true };
        }
      }

      // Demo login fallback
      const matchingRole: UserRole = email.includes('admin')
        ? 'admin'
        : email.includes('seller')
        ? 'seller'
        : 'customer';

      const demo = DEMO_USERS[matchingRole];
      setUser({ ...demo, email, fullName: email.split('@')[0] });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string, requestedRole: UserRole = 'customer') => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: requestedRole
            }
          }
        });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email,
            fullName,
            role: requestedRole
          });
          return { success: true };
        }
      }

      // Demo signup
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        fullName,
        role: requestedRole,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
      };
      setUser(newUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Signout notice:', err);
      }
    }
    setUser(null);
  };

  const switchDemoRole = (newRole: UserRole) => {
    setUser(DEMO_USERS[newRole]);
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
