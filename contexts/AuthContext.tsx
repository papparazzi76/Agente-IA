import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { supabase } from '../supabase';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { UserProfile } from '../types';

export type CurrentUser = User & UserProfile;

interface AuthContextType {
  currentUser: CurrentUser | null;
  loading: boolean;
  signInWithPassword: (email: string, pass: string) => Promise<any>;
  signUp: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<any>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAndSetUser = useCallback(async (user: User) => {
    // BYPASS ADMIN DESARROLLO
    if (user.email === 'admin@agenteia.com') {
      setCurrentUser({
        ...user,
        id: user.id || 'admin-dev-id',
        email: user.email!,
        role: 'admin',
        username: 'Administrador Principal',
        has_lifetime_access: true,
        has_accepted_rules: true,
        is_blocked: false
      } as CurrentUser);
      return;
    }

    try {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        const userWithProfile: CurrentUser = {
            ...user,
            id: user.id,
            email: user.email!,
            role: profile?.role || 'student',
            is_blocked: profile?.is_blocked || false,
            has_lifetime_access: profile?.has_lifetime_access || false,
            has_accepted_rules: profile?.has_accepted_rules || false,
            username: profile?.username || user.email?.split('@')[0],
            avatar_url: profile?.avatar_url,
        };
        setCurrentUser(userWithProfile);

    } catch (e) {
        console.error("Unexpected error in fetchAndSetUser:", e);
        setCurrentUser({ ...user, role: 'student' } as CurrentUser);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const initAuth = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (mounted && session?.user) {
                await fetchAndSetUser(session.user);
            }
        } catch (err) {
            console.error("Auth initialization failed:", err);
        } finally {
            if (mounted) setLoading(false);
        }
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
            if (!mounted) return;
            if (session?.user) {
                await fetchAndSetUser(session.user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchAndSetUser]);

  const signInWithPassword = useCallback(async (email: string, pass: string) => {
    // BYPASS PARA DESARROLLO
    if (email === 'admin@agenteia.com' && pass === 'admin1234') {
      const mockUser = { id: 'admin-dev-id', email: 'admin@agenteia.com' } as User;
      await fetchAndSetUser(mockUser);
      return { data: { user: mockUser }, error: null };
    }
    return supabase.auth.signInWithPassword({ email, password: pass });
  }, [fetchAndSetUser]);

  const signUp = useCallback((email: string, pass: string) => 
    supabase.auth.signUp({ email, password: pass }), 
  []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  }, []);

  const refreshUserProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await fetchAndSetUser(user);
  }, [fetchAndSetUser]);

  const value = useMemo(() => ({
    currentUser,
    loading,
    signInWithPassword,
    signUp,
    signOut,
    refreshUserProfile,
  }), [currentUser, loading, signInWithPassword, signUp, signOut, refreshUserProfile]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-corporate-dark">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-tech-blue"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};