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
    try {
        // Timeout for profile fetch to prevent hanging indefinitely
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
        );

        const profilePromise = supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        let effectiveProfile: Partial<UserProfile> = {};
        
        try {
            // Race the DB call against the timeout
            const { data: profile, error } = await Promise.race([profilePromise, timeoutPromise]) as any;

            if (error) {
                console.warn('Profile fetch warning (using fallback):', error.message);
                effectiveProfile = { role: 'student' };
            } else if (profile) {
                effectiveProfile = profile;
                
                const lifetimeAccessEmails = ['maria.garcia@remax.es', 'rebeca.hernandez@remax.es'];
                if (user.email && lifetimeAccessEmails.includes(user.email) && !profile.has_lifetime_access) {
                    // Fire and forget update
                    supabase
                        .from('profiles')
                        .update({ has_lifetime_access: true })
                        .eq('id', user.id)
                        .then(({ error: updateError }) => {
                             if(updateError) console.error("Error updating lifetime access", updateError);
                        });
                    effectiveProfile.has_lifetime_access = true;
                }
            } else {
                 effectiveProfile = { role: 'student' };
            }
        } catch (e) {
            console.warn("Profile fetch failed or timed out, using fallback profile.", e);
            effectiveProfile = { role: 'student' };
        }

        // Check for local avatar override
        try {
            const storedAvatar = localStorage.getItem(`avatar_${user.id}`);
            if (storedAvatar) {
                effectiveProfile.avatar_url = storedAvatar;
            }
        } catch (e) {
            console.warn("Could not read avatar from localStorage", e);
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

    } catch (e) {
        console.error("Unexpected error in fetchAndSetUser:", e);
        // Don't set null, try to keep the auth user active at least
        setCurrentUser({
             ...user,
             id: user.id,
             email: user.email!,
             role: 'student'
        } as CurrentUser);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
        try {
            // 1. Get Session
            const { data: { session }, error } = await supabase.auth.getSession();
            
            if (error) {
                console.error("Error getting session:", error);
                throw error;
            }

            if (mounted) {
                if (session?.user) {
                    await fetchAndSetUser(session.user);
                } else {
                    setCurrentUser(null);
                }
            }
        } catch (err) {
            console.error("Auth initialization failed:", err);
            if (mounted) setCurrentUser(null);
        } finally {
            if (mounted) {
                setLoading(false);
            }
        }
    };

    initAuth();

    // 2. Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event: AuthChangeEvent, session: Session | null) => {
            if (!mounted) return;
            
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
                if (session?.user) {
                    await fetchAndSetUser(session.user);
                }
            } else if (event === 'SIGNED_OUT') {
                setCurrentUser(null);
                setLoading(false);
            } else if (event === 'INITIAL_SESSION') {
                // Also handle initial session event if it fires
                if (session?.user) {
                    await fetchAndSetUser(session.user);
                } else {
                    setCurrentUser(null);
                }
                setLoading(false);
            }
        }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
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
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-corporate-dark">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-tech-blue mb-4"></div>
                <p className="text-tech-cyan font-poppins animate-pulse">Cargando...</p>
            </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};