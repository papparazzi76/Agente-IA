import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { modules } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';

const PlaygroundIcon: React.FC = () => (
    <svg className="w-8 h-8 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const CircularProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-gray-700"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className="text-tech-cyan"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-pure-white font-poppins">{progress}<span className="text-xl">%</span></span>
            </div>
        </div>
    );
};

const DashboardPage: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const { getModuleProgress, getTotalCourseProgress } = useProgress();
  const [accessError, setAccessError] = useState('');

  useEffect(() => {
      if (location.state?.error) {
          setAccessError(location.state.error);
          // Clear state to prevent message from showing on refresh
          window.history.replaceState({}, document.title)
          
          const timer = setTimeout(() => {
              setAccessError('');
          }, 5000);
          return () => clearTimeout(timer);
      }
  }, [location.state]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const totalProgress = getTotalCourseProgress();

  return (
    <div className="animate-fadeIn">
      <section className="relative py-20 md:py-24 text-pure-white bg-corporate-dark">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 leading-tight">{t('dashboard.title')}</h1>
          <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto">
            {t('dashboard.welcome')}, <span className="text-tech-cyan font-semibold">{currentUser?.email}</span>
          </p>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-corporate-dark">
        <div className="container mx-auto px-6 max-w-4xl">
           {accessError && (
              <div className="bg-red-500/20 text-red-300 p-4 rounded-lg text-center mb-8 border border-red-500/50">
                  {accessError}
              </div>
          )}
          {currentUser?.role === 'admin' && (
              <div className="bg-yellow-500/20 text-yellow-300 p-4 rounded-lg text-center mb-8 border border-yellow-500/50">
                  {t('dashboard.adminNotice')}
              </div>
          )}

          <div className="mb-8 bg-gray-800/50 p-6 md:p-8 rounded-lg border border-tech-cyan/20 card-glow-border">
            <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                    <PlaygroundIcon />
                </div>
                <div className="flex-grow text-center sm:text-left">
                    <h2 className="font-poppins text-2xl font-bold mb-2">{t('dashboard.playgroundTitle')}</h2>
                    <p className="text-gray-300 mb-4">{t('dashboard.playgroundSubtitle')}</p>
                </div>
                <Link to="/playground" className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 bg-tech-blue text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
                  {t('dashboard.playgroundCta')}
                </Link>
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
            <h2 className="font-poppins text-2xl font-bold mb-6 text-center">{t('dashboard.progressTitle')}</h2>
            
            <div className="mb-12 flex flex-col items-center">
                <CircularProgressBar progress={totalProgress.percentage} />
                <p className="mt-4 text-lg text-gray-300">
                    {totalProgress.completed} / {totalProgress.total} {t('dashboard.lessonsCompleted')}
                </p>
            </div>

            <h3 className="font-poppins text-xl font-bold mb-4">{t('dashboard.moduleBreakdown')}</h3>
            <div className="space-y-4 mb-8">
              {modules.map(module => {
                const moduleProgress = getModuleProgress(module);
                return (
                  <div 
                    key={module.id} 
                    className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                  >
                      <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-pure-white">
                              {module.title[language]}
                          </span>
                           <Link to={`/modulo/${module.id}`} className="text-tech-cyan hover:underline text-sm font-semibold flex-shrink-0">
                            {t('dashboard.goToModule')}
                          </Link>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="w-full bg-gray-700 rounded-full h-1.5 flex-grow">
                              <div className="bg-tech-cyan h-1.5 rounded-full transition-all duration-500" style={{ width: `${moduleProgress.percentage}%` }}></div>
                          </div>
                          <span className="text-xs font-mono text-gray-400 w-10 text-right">{moduleProgress.percentage}%</span>
                      </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
            >
              {t('dashboard.logoutButton')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
