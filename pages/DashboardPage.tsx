import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div className="container mx-auto px-6 py-12 animate-fadeIn">
      <h1 className="text-4xl font-bold font-poppins mb-4">
        {t('dashboard.welcome', { name: currentUser?.username || currentUser?.email })}
      </h1>
      <p className="text-gray-300 mb-8">{t('dashboard.intro')}</p>

      {error && (
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-8 border border-red-500/50">
          <p className="font-bold">{t('dashboard.errorTitle')}</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Link to="/playground" className="bg-gray-800/50 p-6 rounded-lg card-glow-border">
          <h2 className="text-2xl font-bold text-tech-cyan mb-2">{t('dashboard.playground.title')}</h2>
          <p className="text-gray-400">{t('dashboard.playground.description')}</p>
        </Link>
        <Link to="/marketplace" className="bg-gray-800/50 p-6 rounded-lg card-glow-border">
          <h2 className="text-2xl font-bold text-tech-cyan mb-2">{t('dashboard.marketplace.title')}</h2>
          <p className="text-gray-400">{t('dashboard.marketplace.description')}</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;