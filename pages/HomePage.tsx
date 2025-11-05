import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { modules } from '../constants';
import ModuleCard from '../components/ModuleCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

const CheckIcon: React.FC = () => (
    <svg className="w-6 h-6 text-tech-cyan mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const StarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.5 21.75l-.398-1.188a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.188-.398a2.25 2.25 0 001.423-1.423L16.5 15.75l.398 1.188a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.188.398a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
);


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [aiCourseRef, aiCourseVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const [featuresRef, featuresVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const [modulesRef, modulesVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative text-pure-white bg-corporate-dark overflow-hidden">
        <div
          className="absolute z-0 w-full h-full bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            transform: `translateY(${offsetY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-corporate-dark/80 to-corporate-dark"></div>
        
        <div className="container mx-auto px-6 relative z-10 min-h-screen flex items-center justify-center text-center py-20 sm:py-0">
            <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins mb-4 leading-tight animate-fade-in-down text-glow">
                    {t('home.heroTitle1')} <span className="text-tech-cyan">{t('home.heroTitle2')}</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto mb-8 animate-fade-in-up">
                  {t('home.heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-300">
                    <button onClick={() => navigate('/compra')} className="w-full sm:w-auto btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        {t('home.heroCtaPrimary')}
                    </button>
                    <Link to="/temario" className="w-full sm:w-auto bg-transparent border-2 border-gray-500 text-gray-200 font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-700 hover:border-gray-700 transition-all duration-300">
                        {t('home.heroCtaSecondary')}
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* AI Course Creation Section */}
      <section ref={aiCourseRef} className={`py-20 transition-all duration-1000 ease-out ${aiCourseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-tech-blue/20 p-8 md:p-12 card-glow-border max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex justify-center items-center gap-4 mb-4">
                <StarIcon />
                <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins">{t('home.aiCourse.title')}</h2>
              </div>
              <p className="text-lg text-gray-300">{t('home.aiCourse.intro')}</p>
            </div>
            
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold font-poppins text-tech-cyan mb-4">{t('home.aiCourse.subtitle')}</h3>
              <p className="text-gray-400 max-w-3xl mx-auto">{t('home.aiCourse.whyRadicalTitle')}</p>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-pure-white">{t('home.aiCourse.demoTitle')}</h4>
                <ul className="space-y-4">
                  <li className="flex items-start"><CheckIcon /><div><p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('home.aiCourse.demoPoint1') }}></p></div></li>
                  <li className="flex items-start"><CheckIcon /><div><p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('home.aiCourse.demoPoint2') }}></p></div></li>
                  <li className="flex items-start"><CheckIcon /><div><p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('home.aiCourse.demoPoint3') }}></p></div></li>
                </ul>
              </div>
              
               <div>
                <h4 className="text-xl font-semibold mb-2 text-pure-white">{t('home.aiCourse.updatedTitle')}</h4>
                <p className="text-gray-400">{t('home.aiCourse.updatedText')}</p>
              </div>

               <div>
                <h4 className="text-xl font-semibold mb-2 text-pure-white">{t('home.aiCourse.structureTitle')}</h4>
                <p className="text-gray-400">{t('home.aiCourse.structureText')}</p>
              </div>

              <div className="pt-6 border-t border-tech-blue/20">
                <h3 className="text-2xl font-bold font-poppins text-tech-cyan mb-4">{t('home.aiCourse.commitmentTitle')}</h3>
                <p className="text-gray-300 mb-4">{t('home.aiCourse.commitmentText')}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-poppins text-tech-cyan mb-4">{t('home.aiCourse.learnTitle')}</h3>
                 <ul className="space-y-2">
                    <li className="flex items-start text-gray-300"><CheckIcon />{t('home.aiCourse.learnPoint1')}</li>
                    <li className="flex items-start text-gray-300"><CheckIcon />{t('home.aiCourse.learnPoint2')}</li>
                    <li className="flex items-start text-gray-300"><CheckIcon />{t('home.aiCourse.learnPoint3')}</li>
                    <li className="flex items-start text-gray-300"><CheckIcon />{t('home.aiCourse.learnPoint4')}</li>
                 </ul>
              </div>
              <p className="text-center font-semibold text-lg text-pure-white mt-8">{t('home.aiCourse.outro')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className={`py-20 transition-all duration-1000 ease-out ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="sequential-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins mb-6">{t('home.featuresTitle')}</h2>
                    <p className="text-lg text-gray-400 mb-8">{t('home.featuresSubtitle')}</p>
                    <ul className="space-y-6">
                        <li className="flex items-start" style={{ animationDelay: '100ms' }}>
                            <CheckIcon />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{t('home.feature1Title')}</h3>
                                <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('home.feature1Text') }}></p>
                            </div>
                        </li>
                        <li className="flex items-start" style={{ animationDelay: '200ms' }}>
                            <CheckIcon />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{t('home.feature2Title')}</h3>
                                <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('home.feature2Text') }}></p>
                            </div>
                        </li>
                        <li className="flex items-start" style={{ animationDelay: '300ms' }}>
                            <CheckIcon />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{t('home.feature3Title')}</h3>
                                <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('home.feature3Text') }}></p>
                            </div>
                        </li>
                        <li className="flex items-start" style={{ animationDelay: '400ms' }}>
                            <CheckIcon />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{t('home.feature4Title')}</h3>
                                <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('home.feature4Text') }}></p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="relative h-80 md:h-96 w-full flex items-center justify-center mt-12 md:mt-0">
                    <img 
                        src="https://essjcgcsssyfwkqlshkc.supabase.co/storage/v1/object/sign/recursos/digital-banner.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iY2I2NzRiZi0zZmI5LTQ0NWEtOTJlNi0yNDcyOGQyMzg4M2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWN1cnNvcy9kaWdpdGFsLWJhbm5lci5wbmciLCJpYXQiOjE3NjE2NTYxMjYsImV4cCI6MTc5MzE5MjEyNn0.R8eSBs68D26gIx3o_JqxyX3BNmllDD3S199FxpJDOBQ" 
                        alt="Digital Banner Resource"
                        className="relative z-10 w-full max-w-md rounded-lg shadow-2xl shadow-tech-blue/20 border border-tech-blue/30 transform transition-transform hover:scale-105"
                        loading="lazy" decoding="async"
                    />
                    <img 
                        src="https://essjcgcsssyfwkqlshkc.supabase.co/storage/v1/object/sign/recursos/movil.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iY2I2NzRiZi0zZmI5LTQ0NWEtOTJlNi0yNDcyOGQyMzg4M2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWN1cnNvcy9tb3ZpbC5wbmciLCJpYXQiOjE3NjE2NTYxNzgsImV4cCI6MTc5MzE5MjE3OH0.01nw2lxZLNb8rewv2zH8Y90IteC4uB_rlPB1DiF_iqg" 
                        alt="Mobile Resource"
                        className="absolute z-20 bottom-[-15%] left-[-5%] w-28 rounded-lg shadow-lg transform -rotate-12 transition-transform hover:scale-110 hover:rotate-[-15deg]"
                        loading="lazy" decoding="async"
                    />
                    <img 
                        src="https://essjcgcsssyfwkqlshkc.supabase.co/storage/v1/object/sign/recursos/flyer.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iY2I2NzRiZi0zZmI5LTQ0NWEtOTJlNi0yNDcyOGQyMzg4M2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWN1cnNvcy9mbHllci5wbmciLCJpYXQiOjE3NjE2NTYxNTgsImV4cCI6MTc5MzE5MjE1OH0.SFP_EGX4gICBmiC79UEGhAG5dFPvj_coXmJvol6Jy9E" 
                        alt="Flyer Resource"
                        className="absolute z-0 top-[-15%] right-[-5%] w-40 rounded-lg shadow-lg transform rotate-12 transition-transform hover:scale-110 hover:rotate-[15deg]"
                        loading="lazy" decoding="async"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Modules Preview Section */}
      <section ref={modulesRef} className={`py-20 bg-gray-900/30 transition-all duration-1000 ease-out ${modulesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-pure-white">{t('home.modulesTitle')}</h2>
            <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">{t('home.modulesSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.slice(0, 3).map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/temario" className="bg-tech-blue text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {t('home.modulesCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className={`py-20 transition-all duration-1000 ease-out ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pure-white font-poppins">{t('home.finalCtaTitle')}</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{t('home.finalCtaSubtitle')}</p>
          <button onClick={() => navigate('/compra')} className="btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-4 px-10 rounded-lg text-xl hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('home.finalCtaButton')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;