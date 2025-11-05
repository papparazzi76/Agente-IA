import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { supabase } from '../supabase';
import { useAuth } from './AuthContext';
import { ForumSection, ForumThread, ForumPost } from '../types';

interface ForumContextType {
  sections: ForumSection[];
  loading: boolean;
  error: string | null;
  getThreads: (sectionId: string) => Promise<ForumThread[]>;
  getThread: (threadId: string) => Promise<ForumThread | null>;
  getPosts: (threadId: string) => Promise<ForumPost[]>;
  createThread: (sectionId: string, title: string, content: string) => Promise<ForumThread | null>;
  createPost: (threadId: string, content: string) => Promise<ForumPost | null>;
  acceptForumRules: () => Promise<boolean>;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

const forumSectionsData: { [key: string]: ForumSection } = {
  'dudas-y-consultas': {
    id: 'd0a1b2c3-d4e5-f6a7-b8c9-d0a1b2c3d4e5',
    slug: 'dudas-y-consultas',
    title: { es: 'Dudas y Consultas', pt: 'Dúvidas e Consultas' },
    description: { es: '¿Atascado con un prompt? ¿No entiendes un concepto? Este es tu sitio para preguntar y obtener ayuda de la comunidad y los instructores.', pt: 'Encalhado com um prompt? Não entende um conceito? Este é o seu lugar para perguntar e obter ajuda da comunidade e dos instrutores.' }
  },
  'nuevas-herramientas-ia': {
    id: 'e1b2c3d4-e5f6-a7b8-c9d0-e1b2c3d4e5f6',
    slug: 'nuevas-herramientas-ia',
    title: { es: 'Nuevas Herramientas IA', pt: 'Novas Ferramentas de IA' },
    description: { es: '¿Has descubierto una nueva IA increíble para generar vídeos o analizar datos? ¡Compártela aquí! Este es el espacio para descubrir y debatir sobre las últimas tecnologías.', pt: 'Descobriu uma nova IA incrível para gerar vídeos ou analisar dados? Partilhe-a aqui! Este é o espaço para descobrir e debater as últimas tecnologias.' }
  },
  'propuestas-de-mejora': {
    id: 'f2c3d4e5-f6a7-b8c9-d0e1-f2c3d4e5f6a7',
    slug: 'propuestas-de-mejora',
    title: { es: 'Propuestas de Mejora', pt: 'Propostas de Melhoria' },
    description: { es: '¿Echas en falta algún contenido en el curso? ¿Tienes una idea para mejorar el Playground? Propón tus ideas para que la academia siga evolucionando.', pt: 'Sente falta de algum conteúdo no curso? Tem uma ideia para mejorar o Playground? Proponha as suas ideias para que a academia continue a evoluir.' }
  }
};

const sections = Object.values(forumSectionsData);

export const ForumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getThreads = useCallback(async (sectionId: string): Promise<ForumThread[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from('forum_thread')
        .select(`*, author:profiles(username)`)
        .eq('section_id', sectionId)
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      // FIX: Handle case where data is null to prevent crash on .map
      return (data || []).map((d: any) => ({ ...d, author_username: d.author?.username }));
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getThread = useCallback(async (threadId: string): Promise<ForumThread | null> => {
     setLoading(true);
     setError(null);
     try {
       const { data, error: dbError } = await supabase
         .from('forum_thread')
         .select(`*, author:profiles(username)`)
         .eq('id', threadId)
         .single();
        if (dbError && dbError.code !== 'PGRST116') { // Ignore 'exact one row' error for not found
            throw dbError;
        }
        // FIX: Handle case where data is null (thread not found) to prevent crash on spread operator
        if (!data) return null;
        return { ...data, author_username: (data.author as any)?.username };
     } catch(err: any) {
         console.error(err);
         setError(err.message);
         return null;
     } finally {
         setLoading(false);
     }
  }, []);

  const getPosts = useCallback(async (threadId: string): Promise<ForumPost[]> => {
    setLoading(true);
    setError(null);
    try {
        const { data, error: dbError } = await supabase
            .from('forum_posts')
            .select(`*, author:profiles(username)`)
            .eq('thread_id', threadId)
            .order('created_at', { ascending: true });
        if (dbError) throw dbError;
        // FIX: Handle case where data is null to prevent crash on .map
        return (data || []).map((d: any) => ({ ...d, author_username: d.author?.username }));
    } catch (err: any) {
        console.error(err);
        setError(err.message);
        return [];
    } finally {
        setLoading(false);
    }
  }, []);

  const createThread = useCallback(async (sectionId: string, title: string, content: string): Promise<ForumThread | null> => {
    if (!currentUser) return null;
    setLoading(true);
    setError(null);
    try {
        const { data: threadData, error: threadError } = await supabase
            .from('forum_thread')
            .insert({ section_id: sectionId, user_id: currentUser.id, title })
            .select()
            .single();
        if (threadError) throw threadError;
        // FIX: Handle case where thread creation returns no data
        if (!threadData) throw new Error("Failed to create thread.");

        const { error: postError } = await supabase
            .from('forum_posts')
            .insert({ thread_id: threadData.id, user_id: currentUser.id, content });
        if (postError) {
            // Rollback: delete the orphaned thread if the post creation fails
            await supabase.from('forum_thread').delete().eq('id', threadData.id);
            throw postError;
        }

        return threadData;
    } catch (err: any) {
        console.error(err);
        setError(err.message);
        return null;
    } finally {
        setLoading(false);
    }
  }, [currentUser]);
  
  const createPost = useCallback(async (threadId: string, content: string): Promise<ForumPost | null> => {
      if (!currentUser) return null;
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
            .from('forum_posts')
            .insert({ thread_id: threadId, user_id: currentUser.id, content })
            .select()
            .single();
        if (dbError) throw dbError;
        return data;
      } catch (err: any) {
          console.error(err);
          setError(err.message);
          return null;
      } finally {
          setLoading(false);
      }
  }, [currentUser]);

  const acceptForumRules = useCallback(async (): Promise<boolean> => {
    if (!currentUser) return false;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ has_accepted_rules: true })
        .eq('id', currentUser.id);
      if (error) throw error;
      await refreshUserProfile();
      return true;
    } catch (err: any) {
      console.error("Error accepting rules:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentUser, refreshUserProfile]);

  const value = useMemo(() => ({
    sections,
    loading,
    error,
    getThreads,
    getThread,
    getPosts,
    createThread,
    createPost,
    acceptForumRules,
  }), [loading, error, getThreads, getThread, getPosts, createThread, createPost, acceptForumRules]);

  return <ForumContext.Provider value={value}>{children}</ForumContext.Provider>;
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};