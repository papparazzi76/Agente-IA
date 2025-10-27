import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '../translations';

export type Language = 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('language');
      if (savedLang === 'es' || savedLang === 'pt') {
        return savedLang;
      }
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'pt' ? 'pt' : 'es';
    } catch (e) {
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    } catch (e) {
      console.error("Failed to set language in localStorage");
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  const t = (key: string, options?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    let fallbackResult: any = translations.es;
    let keyFound = true;

    for (const k of keys) {
      result = result?.[k];
      fallbackResult = fallbackResult?.[k];
      if (result === undefined) {
        keyFound = false;
        break;
      }
    }

    if (!keyFound) {
      console.warn(`Translation key '${key}' not found for language '${language}'. Falling back to Spanish.`);
      result = fallbackResult;
    }
    
    let translation = result || key;

    if (options && typeof translation === 'string') {
        Object.keys(options).forEach(optionKey => {
            const regex = new RegExp(`{{${optionKey}}}`, 'g');
            translation = translation.replace(regex, String(options[optionKey]));
        });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
