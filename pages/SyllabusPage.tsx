import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { modules } from '../constants';
import ModuleCard from '../components/ModuleCard';

const SyllabusPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-fadeIn">
      <section className="relative py-20 md:py-24 text-pure-white bg-corporate-dark">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 leading-tight text-glow">
            {t('syllabus.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto">
            {t('syllabus.subtitle')}
          </p>
        </div>
      </section>
      <section className="py-10 md:py-16 bg-corporate-dark">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SyllabusPage;