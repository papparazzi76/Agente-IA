import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const BenefitCard: React.FC<{ title: string, text: string, delay: string }> = ({ title, text, delay }) => (
  <div className="bg-gray-800/30 p-6 rounded-lg card-glow-border" style={{ animationDelay: delay }}>
    <h3 className="text-2xl font-bold mb-3 text-tech-cyan">{title}</h3>
    <p className="text-gray-300">{text}</p>
  </div>
);

const PricingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const priceSectionRef = useRef<HTMLElement>(null);
  const [benefitsRef, benefitsVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  const priceInfo = { price: 15, code: 'EUR' };

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceInfo.price);

  const handleScrollToPrice = () => {
    priceSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleStripeCheckout = () => {
    alert(`${t('pricing.alertText')}:\n${t('pricing.alertProduct')}: ${t('pricing.alertProductName')}\n${t('pricing.alertPrice')}: ${priceInfo.price} ${priceInfo.code}/mes`);
  };

  const handleCtaClick = () => {
    if (currentUser) {
      handleStripeCheckout();
    } else {
      navigate('/auth');
    }
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative text-pure-white bg-corporate-dark overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover opacity-20">
          <source src="https://videos.pexels.com/video-files/4784400/4784400-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-corporate-dark/80 to-corporate-dark"></div>
        <div className="container mx-auto px-6 relative z-10 min-h-screen flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold font-poppins mb-4 leading-tight animate-fade-in-down text-glow">
              {t('pricing.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto mb-8 animate-fade-in-up">
              {t('pricing.heroSubtitle')}
            </p>
            <div className="animate-fade-in-up animation-delay-300">
              <button onClick={handleScrollToPrice} className="btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {t('pricing.heroCta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section ref={priceSectionRef} className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins mb-4">{t('pricing.priceTitle')}</h2>
          <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto mb-8">{t('pricing.priceSubtitle')}</p>
          
          <div className="text-7xl md:text-8xl font-bold font-poppins text-tech-cyan animate-price-pulse">
            {formattedPrice}
          </div>
           <p className="text-2xl text-gray-400 mt-2">{t('pricing.perMonth')}</p>

            <button onClick={handleCtaClick} className="mt-8 btn-pulse-glow bg-tech-cyan text-corporate-dark font-bold py-4 px-10 rounded-lg text-xl hover:bg-white transition-all duration-300 shadow-lg shadow-tech-cyan/20 transform hover:-translate-y-1">
              {currentUser ? t('pricing.finalCtaButton') : t('header.navLogin')}
            </button>

        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className={`py-20 transition-all duration-1000 ease-out ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins">{t('pricing.benefitsTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto sequential-fade-in">
            <BenefitCard title={t('pricing.benefit1Title')} text={t('pricing.benefit1Text')} delay="100ms" />
            <BenefitCard title={t('pricing.benefit2Title')} text={t('pricing.benefit2Text')} delay="200ms" />
            <BenefitCard title={t('pricing.benefit3Title')} text={t('pricing.benefit3Text')} delay="300ms" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;