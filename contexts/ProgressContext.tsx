import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { modules } from '../constants';
import { Module } from '../types';

// Structure: { "moduleId": ["itemId1", "itemId2"] }
export type ModuleProgress = Record<string, string[]>;

interface ProgressContextType {
  moduleProgress: ModuleProgress;
  toggleItemComplete: (moduleId: string, itemId: string) => void;
  getModuleProgress: (module: Module) => { completed: number; total: number; percentage: number };
  getTotalCourseProgress: () => { completed: number; total: number; percentage: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

const PROGRESS_STORAGE_KEY = 'agenteIA-moduleProgress';

const getCompletableItems = (module: Module): string[] => {
    const items: string[] = [];
    items.push('content');
    if (module.videos) {
        module.videos.forEach((_, index) => items.push(`video-${index}`));
    }
    if (module.flashcards && module.flashcards.length > 0) items.push('flashcards');
    if (module.resources.downloads.length > 0) items.push('resources');
    return items;
};

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        setModuleProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
        try {
            localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(moduleProgress));
        } catch (error) {
            console.error("Failed to save progress to localStorage", error);
        }
    }
  }, [moduleProgress, loading]);

  const toggleItemComplete = useCallback((moduleId: string, itemId: string) => {
    setModuleProgress(prev => {
      const currentModuleProgress = prev[moduleId] || [];
      const isCompleted = currentModuleProgress.includes(itemId);
      const newModuleProgress = isCompleted
        ? currentModuleProgress.filter(id => id !== itemId)
        : [...currentModuleProgress, itemId];
      return { ...prev, [moduleId]: newModuleProgress };
    });
  }, []);

  const getModuleProgress = useCallback((module: Module) => {
    const totalItems = getCompletableItems(module).length;
    if (totalItems === 0) return { completed: 0, total: 0, percentage: 0 };
    
    const completedItems = moduleProgress[module.id]?.length || 0;
    const percentage = Math.round((completedItems / totalItems) * 100);

    return { completed: completedItems, total: totalItems, percentage };
  }, [moduleProgress]);

  const getTotalCourseProgress = useCallback(() => {
    let totalCompleted = 0;
    let totalItems = 0;

    modules.forEach(module => {
        const moduleItems = getCompletableItems(module);
        totalItems += moduleItems.length;
        const completedModuleItems = moduleProgress[module.id] || [];
        totalCompleted += completedModuleItems.length;
    });

    if (totalItems === 0) return { completed: 0, total: 0, percentage: 0 };
    const percentage = Math.round((totalCompleted / totalItems) * 100);
    
    return { completed: totalCompleted, total: totalItems, percentage };
  }, [moduleProgress]);


  const value = {
    moduleProgress,
    toggleItemComplete,
    getModuleProgress,
    getTotalCourseProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {!loading && children}
    </ProgressContext.Provider>
  );
};