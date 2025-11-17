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
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Error fetching profile:', error.message);
        setCurrentUser(null);
    } else if (profile) {
        const lifetimeAccessEmails = ['maria.garcia@remax.es', 'rebeca.hernandez@remax.es'];
        let effectiveProfile = profile;

        if (user.email && lifetimeAccessEmails.includes(user.email) && !profile.has_lifetime_access) {
            const { data: updatedProfile, error: updateError } = await supabase
                .from('profiles')
                .update({ has_lifetime_access: true })
                .eq('id', user.id)
                .select()
                .single();
            
            if (updateError) {
                console.error('Failed to grant lifetime access', updateError.message);
            } else if (updatedProfile) {
                effectiveProfile = updatedProfile;
            }
        }
        
        const userWithProfile: CurrentUser = {
            ...user,
            id: user.id,
            email: user.email!,
            role: effectiveProfile.role || 'student',
            is_blocked: effectiveProfile.is_blocked || false,
            has_lifetime_access: effectiveProfile.has_lifetime_access || false,
            has_accepted_rules: effectiveProfile.has_accepted_rules || false,
            username: effectiveProfile.username,
            avatar_url: effectiveProfile.avatar_url,
        };
        setCurrentUser(userWithProfile);
    } else {
        setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
            await fetchAndSetUser(session.user);
        } else {
            setCurrentUser(null);
        }
        setLoading(false);
      }
    );
    
    const setInitialUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await fetchAndSetUser(session.user);
        }
        setLoading(false);
    }
    setInitialUser();

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchAndSetUser]);

  const refreshUserProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await fetchAndSetUser(user);
    }
  }, [fetchAndSetUser]);

  const signInWithPassword = useCallback((email: string, pass: string) => 
    supabase.auth.signInWithPassword({ email, password: pass }), 
  []);

  const signUp = useCallback(async (email: string, pass: string) => {
    return supabase.auth.signUp({ email, password: pass });
  }, []);

  const signOut = useCallback(() => supabase.auth.signOut(), []);

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
      {!loading && children}
    </AuthContext.Provider>
  );
};