import React from 'react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../constants';
import ModuleCard from '../components/ModuleCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

const SyllabusPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-pure-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: `url('https://picsum.photos/1920/1080?random=99')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-corporate-dark/80 to-corporate-dark"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4 leading-tight text-glow">{t('syllabus.heroTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto">{t('syllabus.heroSubtitle')}</p>
        </div>
      </section>

      {/* Modules Grid */}
      <section ref={gridRef} className={`py-20 transition-all duration-1000 ease-out ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className={`py-20 bg-gray-900/30 transition-all duration-1000 ease-out ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pure-white font-poppins">{t('syllabus.finalCtaTitle')}</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{t('syllabus.finalCtaSubtitle')}</p>
          <button onClick={() => navigate('/compra')} className="btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-4 px-10 rounded-lg text-xl hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('syllabus.finalCtaButton')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default SyllabusPage;