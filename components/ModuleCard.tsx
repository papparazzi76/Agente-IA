import React from 'react';
import { Link } from 'react-router-dom';
import { Module } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ModuleCardProps {
  module: Module;
}

const ModuleIcon: React.FC<{ iconKey: string }> = ({ iconKey }) => {
  const iconProps = {
    className: "w-9 h-9 text-tech-cyan",
    strokeWidth: "1.5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    'aria-hidden': true
  };

  switch (iconKey) {
    case 'id-card':
      return (
        <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3m-3 4h3m-3 4h3m-6 .5a.5.5 0 00.5-.5V8.5a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h6zM5 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" /></svg>
      );
    case 'prospecting':
      return (
        <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10a2 2 0 100-4 2 2 0 000 4z" /><circle cx="10" cy="10" r="7" /></svg>
      );
    case 'valuation':
      return (
        <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 15l3-3 2 2 3-3" /></svg>
      );
    case 'image-generation':
      return (
        <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v.01M12 12v.01M12 16v.01M8 12h.01M16 12h.01M8 8h.01M16 8h.01M8 16h.01M16 16h.01" /></svg>
      );
    case 'assistants':
      return (
        <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-4 4v-4m-4-4h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 16v-1a1 1 0 011-1h4a1 1 0 011 1v1m-6-8h.01M15 8h.01" /></svg>
      );
    case 'marketing':
      return (
        <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
      );
    case 'documents':
      return (
        <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      );
    case 'admin':
      return (
        <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v10m-8-5v5m-4-2v2m12-13h-2a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V6a1 1 0 00-1-1zm-6 3h-2a1 1 0 00-1 1v9a1 1 0 001 1h2a1 1 0 001-1v-9a1 1 0 00-1-1zm-6 4H2a1 1 0 00-1 1v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1z" /></svg>
      );
    case 'users':
        return (
          <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>
        );
    default:
      return null;
  }
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-tech-blue/20 group card-glow-border">
      <div className="p-8 flex flex-col items-start h-full">
        <div className="w-16 h-16 mb-5 rounded-full bg-tech-blue/10 border border-tech-blue/30 flex items-center justify-center shadow-inner shadow-black/20 group-hover:bg-tech-blue/25 transition-colors duration-300">
          <ModuleIcon iconKey={module.icon} />
        </div>
        <h3 className="font-poppins text-2xl font-bold text-pure-white mb-3">{module.title[language]}</h3>
        <p className="font-inter text-gray-300 flex-grow mb-6">{module.description[language]}</p>
        <Link to={`/modulo/${module.id}`} className="mt-auto bg-transparent border-2 border-tech-cyan text-tech-cyan font-semibold py-2 px-5 rounded-lg group-hover:bg-tech-cyan group-hover:text-white transition-all duration-300 self-start">
          {t('moduleCard.viewContent')}
        </Link>
      </div>
    </div>
  );
};

export default ModuleCard;