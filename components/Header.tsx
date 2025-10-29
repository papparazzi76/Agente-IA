import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const buttonClass = (lang: 'es' | 'pt') =>
    `px-2 py-1 rounded-md text-sm font-medium transition-colors ${
      language === lang ? 'bg-tech-cyan text-corporate-dark' : 'text-gray-300 hover:bg-gray-700'
    }`;

  return (
    <div className="flex items-center space-x-1 bg-gray-800/50 p-1 rounded-lg">
      <button onClick={() => setLanguage('es')} className={buttonClass('es')}>ES</button>
      <button onClick={() => setLanguage('pt')} className={buttonClass('pt')}>PT</button>
    </div>
  );
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const { t } = useLanguage();

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `block py-2 px-3 rounded transition-colors duration-300 ${
      isActive ? 'text-pure-white bg-tech-blue' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-tech-blue/30 shadow-[0_4px_30px_rgba(0,191,255,0.1)]">
      <nav className="container mx-auto px-6 py-2 relative">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="transition-transform hover:scale-105">
            <img src="https://essjcgcsssyfwkqlshkc.supabase.co/storage/v1/object/sign/Logo/logo-agente-ia.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iY2I2NzRiZi0zZmI5LTQ0NWEtOTJlNi0yNDcyOGQyMzg4M2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMb2dvL2xvZ28tYWdlbnRlLWlhLnBuZyIsImlhdCI6MTc2MTY1NTEyNCwiZXhwIjoxNzkzMTkxMTI0fQ.KxpCPaSsjvM-Nf0SFWOoEBVHiWaeicWyoA8UPQVa0J0" alt="AgenteIA Logo" className="h-24 w-auto" />
          </NavLink>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>{t('header.navHome')}</NavLink>
            <NavLink to="/temario" className={navLinkClass}>{t('header.navSyllabus')}</NavLink>
            <NavLink to="/marketplace" className={navLinkClass}>{t('header.navMarketplace')}</NavLink>
            {currentUser ? (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>{t('header.navDashboard')}</NavLink>
                <NavLink to="/playground" className={navLinkClass}>{t('header.navPlayground')}</NavLink>
                {currentUser.role === 'admin' && (
                  <NavLink to="/admin" className={navLinkClass}>{t('header.navAdmin')}</NavLink>
                )}
                <button onClick={handleLogout} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300">
                  {t('header.navLogout')}
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/auth')} className="bg-tech-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                {t('header.navLogin')}
              </button>
            )}
            <LanguageSwitcher />
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div
          id="mobile-menu"
          className={`
            md:hidden absolute top-full left-0 w-full bg-corporate-dark/95 backdrop-blur-lg p-4 space-y-2 transition-all duration-300 ease-in-out transform
            ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-5 opacity-0 invisible'}
          `}
        >
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>{t('header.navHome')}</NavLink>
          <NavLink to="/temario" className={navLinkClass} onClick={closeMenu}>{t('header.navSyllabus')}</NavLink>
          <NavLink to="/marketplace" className={navLinkClass} onClick={closeMenu}>{t('header.navMarketplace')}</NavLink>
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass} onClick={closeMenu}>{t('header.navDashboard')}</NavLink>
              <NavLink to="/playground" className={navLinkClass} onClick={closeMenu}>{t('header.navPlayground')}</NavLink>
              {currentUser.role === 'admin' && (
                  <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>{t('header.navAdmin')}</NavLink>
              )}
              <button onClick={handleLogout} className="w-full text-left bg-red-600 text-white font-semibold py-2 px-3 rounded hover:bg-red-700 transition-all duration-300">
                {t('header.navLogout')}
              </button>
            </>
          ) : (
             <button onClick={() => { navigate('/auth'); closeMenu(); }} className="w-full text-left bg-tech-blue text-white font-semibold py-2 px-3 rounded hover:bg-blue-500 transition-all duration-300 shadow-md">
              {t('header.navLogin')}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;