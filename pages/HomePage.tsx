import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

const CheckIcon: React.FC = () => (
    <svg className="w-6 h-6 text-tech-cyan mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [playgroundRef, playgroundVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const [marketplaceRef, marketplaceVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
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
                    <button onClick={() => navigate('/precios')} className="w-full sm:w-auto btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        {t('home.heroCtaPrimary')}
                    </button>
                    <Link to="/marketplace" className="w-full sm:w-auto bg-transparent border-2 border-gray-500 text-gray-200 font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-700 hover:border-gray-700 transition-all duration-300">
                        {t('home.heroCtaSecondary')}
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Playground Section */}
      <section ref={playgroundRef} className={`py-20 transition-all duration-1000 ease-out ${playgroundVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="sequential-fade-in">
                  <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins mb-6">{t('home.playgroundTitle')}</h2>
                  <p className="text-lg text-gray-400 mb-8">{t('home.playgroundSubtitle')}</p>
                  <ul className="space-y-4">
                      <li className="flex items-start"><CheckIcon /> <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('home.playgroundFeature1') }}></p></li>
                      <li className="flex items-start"><CheckIcon /> <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('home.playgroundFeature2') }}></p></li>
                      <li className="flex items-start"><CheckIcon /> <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('home.playgroundFeature3') }}></p></li>
                  </ul>
                  <div className="mt-8">
                    <Link to="/precios" className="bg-tech-blue text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      {t('home.playgroundCta')}
                    </Link>
                  </div>
              </div>
              <div className="relative h-80 md:h-96 w-full flex items-center justify-center mt-12 md:mt-0 group cursor-pointer" onClick={() => navigate('/playground')}>
                  <img 
                      src="https://essjcgcsssyfwkqlshkc.supabase.co/storage/v1/object/sign/recursos/a-smiling-real-estate-agent-sits-at-a-mo_7BUPzkcYTwWRlaUQNUeuIA_3_lyyjugSGOZV7DGjJzemg.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iY2I2NzRiZi0zZmI5LTQ0NWEtOTJlNi0yNDcyOGQyMzg4M2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWN1cnNvcy9hLXNtaWxpbmctcmVhbC1lc3RhdGUtYWdlbnQtc2l0cy1hdC1hLW1vXzdCVVB6a2NZVHdXUmxhVVFOVWV1SUFfM19seXlqdWdTR09aVjdER2pKemVtZy5qcGVnIiwiaWF0IjoxNzYyNTMyNjAzLCJleHAiOjE3OTQwNjg2MDN9.zHqedhFm1f1J6KnJuXRvtgMgdTbRTVsPvIXLJ8Uxwfc"
                      alt="Playground IA"
                      className="relative z-10 w-full max-w-lg rounded-lg shadow-2xl shadow-tech-blue/20 border border-tech-blue/30 transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy" decoding="async"
                  />
              </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section ref={marketplaceRef} className={`py-20 bg-gray-900/30 transition-all duration-1000 ease-out ${marketplaceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-80 md:h-96 w-full flex items-center justify-center mt-12 md:mt-0 md:order-2">
                   <img 
                      src="https://essjcgcsssyfwkqlshkc.supabase.co/storage/v1/object/sign/recursos/Gemini_Generated_Image_a8g1qta8g1qta8g1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iY2I2NzRiZi0zZmI5LTQ0NWEtOTJlNi0yNDcyOGQyMzg4M2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWN1cnNvcy9HZW1pbmlfR2VuZXJhdGVkX0ltYWdlX2E4ZzFxdGE4ZzFxdGE4ZzEucG5nIiwiaWF0IjoxNzYyNTMzMjA2LCJleHAiOjE3OTQwNjkyMDZ9.uFpq2IlxewTvXwoOCWGK1E1l2vSeRSNbOtOYY8X3tg8" 
                      alt="Marketplace de Servicios"
                      className="relative z-10 w-full max-w-lg rounded-lg shadow-2xl shadow-tech-cyan/20 border border-tech-cyan/30 transform transition-transform hover:scale-105"
                      loading="lazy" decoding="async"
                  />
              </div>
              <div className="sequential-fade-in md:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins mb-6">{t('home.marketplaceTitle')}</h2>
                  <p className="text-lg text-gray-400 mb-8">{t('home.marketplaceSubtitle')}</p>
                   <ul className="space-y-4">
                      <li className="flex items-start"><CheckIcon /> <p className="text-gray-300">{t('home.marketplaceFeature1')}</p></li>
                      <li className="flex items-start"><CheckIcon /> <p className="text-gray-300">{t('home.marketplaceFeature2')}</p></li>
                      <li className="flex items-start"><CheckIcon /> <p className="text-gray-300">{t('home.marketplaceFeature3')}</p></li>
                  </ul>
                  <div className="mt-8">
                    <Link to="/marketplace" className="bg-transparent border-2 border-tech-cyan text-tech-cyan font-semibold py-3 px-8 rounded-lg text-lg hover:bg-tech-cyan hover:text-white transition-all duration-300">
                      {t('home.marketplaceCta')}
                    </Link>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className={`py-20 transition-all duration-1000 ease-out ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pure-white font-poppins">{t('home.finalCtaTitle')}</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{t('home.finalCtaSubtitle')}</p>
          <button onClick={() => navigate('/precios')} className="btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-4 px-10 rounded-lg text-xl hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('home.finalCtaButton')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;