import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  role: 'student' | 'admin';
  is_blocked?: boolean;
  has_lifetime_access?: boolean;
}

export type CurrentUser = User & UserProfile;

interface AuthContextType {
  currentUser: CurrentUser | null;
  loading: boolean;
  signInWithPassword: (email: string, pass: string) => Promise<any>;
  signUp: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<any>;
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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error.message);
            setCurrentUser(null);
          } else {
            const userWithProfile: CurrentUser = {
              ...session.user,
              id: session.user.id,
              email: session.user.email!,
              role: profile?.role || 'student',
              is_blocked: profile?.is_blocked || false,
              has_lifetime_access: profile?.has_lifetime_access || false,
            };
            setCurrentUser(userWithProfile);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }
    );
    
    // Set initial user
    const setInitialUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
             const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            
            if (error) {
                console.error('Error fetching initial profile:', error.message);
            } else {
                const userWithProfile: CurrentUser = {
                  ...session.user,
                  id: session.user.id,
                  email: session.user.email!,
                  role: profile?.role || 'student',
                  is_blocked: profile?.is_blocked || false,
                  has_lifetime_access: profile?.has_lifetime_access || false,
                };
                setCurrentUser(userWithProfile);
            }
        }
        setLoading(false);
    }
    setInitialUser();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signInWithPassword: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        // Create a profile entry for the new user.
        // Supabase triggers are a better way to do this, but this works for client-side logic.
        if (!error && data.user) {
            await supabase.from('profiles').insert({
                id: data.user.id,
                email: email,
                role: 'student'
            });
        }
        return { data, error };
    },
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};