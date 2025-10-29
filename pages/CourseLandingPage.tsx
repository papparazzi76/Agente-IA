import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../supabase';

const pricingTiers = [
  { level: 5, countries: ["España", "Panamá", "Uruguay", "Chile", "Portugal"], price: 197 },
  { level: 4, countries: ["Costa Rica", "Argentina", "República Dominicana", "México"], price: 160 },
  { level: 3, countries: ["Brasil", "Colombia", "Paraguay", "Perú"], price: 130 },
  { level: 2, countries: ["Ecuador", "Guatemala", "El Salvador"], price: 100 },
  { level: 1, countries: ["Bolivia", "Nicaragua", "Honduras"], price: 70 },
];

const countryCurrencyMap = new Map<string, { symbol: string; code: string }>([
    ['España', { symbol: '€', code: 'EUR' }],
    ['Portugal', { symbol: '€', code: 'EUR' }],
    ['Panamá', { symbol: '$', code: 'USD' }],
    ['Uruguay', { symbol: '$U', code: 'UYU' }],
    ['Chile', { symbol: '$', code: 'CLP' }],
    ['Costa Rica', { symbol: '₡', code: 'CRC' }],
    ['Argentina', { symbol: '$', code: 'ARS' }],
    ['República Dominicana', { symbol: 'RD$', code: 'DOP' }],
    ['México', { symbol: '$', code: 'MXN' }],
    ['Brasil', { symbol: 'R$', code: 'BRL' }],
    ['Colombia', { symbol: '$', code: 'COP' }],
    ['Paraguay', { symbol: '₲', code: 'PYG' }],
    ['Perú', { symbol: 'S/', code: 'PEN' }],
    ['Ecuador', { symbol: '$', code: 'USD' }],
    ['Guatemala', { symbol: 'Q', code: 'GTQ' }],
    ['El Salvador', { symbol: '$', code: 'USD' }],
    ['Bolivia', { symbol: 'Bs', code: 'BOB' }],
    ['Nicaragua', { symbol: 'C$', code: 'NIO' }],
    ['Honduras', { symbol: 'L', code: 'HNL' }],
]);

const countryLocaleMap = new Map<string, string>([
    ['Portugal', 'pt-PT'],
    ['Brasil', 'pt-BR'],
    ['España', 'es-ES'],
    ['Panamá', 'en-US'],
    ['Uruguay', 'es-UY'],
    ['Chile', 'es-CL'],
    ['Costa Rica', 'es-CR'],
    ['Argentina', 'es-AR'],
    ['República Dominicana', 'es-DO'],
    ['México', 'es-MX'],
    ['Colombia', 'es-CO'],
    ['Paraguay', 'es-PY'],
    ['Perú', 'es-PE'],
    ['Ecuador', 'en-US'],
    ['Guatemala', 'es-GT'],
    ['El Salvador', 'en-US'],
    ['Bolivia', 'es-BO'],
    ['Nicaragua', 'es-NI'],
    ['Honduras', 'es-HN'],
]);

const exchangeRates = new Map<string, number>([
    ['UYU', 40],
    ['CLP', 950],
    ['CRC', 515],
    ['ARS', 1250],
    ['DOP', 59],
    ['MXN', 18.5],
    ['BRL', 5.1],
    ['COP', 4500],
    ['PYG', 7500],
    ['PEN', 3.8],
    ['BOB', 7],
    ['NIO', 37],
    ['HNL', 25],
]);

const roundPrice = (price: number, currencyCode: string): number => {
  if (['COP', 'CLP', 'PYG', 'ARS'].includes(currencyCode)) {
    return Math.round(price / 1000) * 1000;
  }
  if (currencyCode === 'CRC') {
    return Math.round(price / 100) * 100;
  }
  return Math.round(price);
};

const countryPriceMap = new Map<string, { price: number; symbol: string; code: string }>();
pricingTiers.forEach(tier => {
  tier.countries.forEach(country => {
    const currency = countryCurrencyMap.get(country) || { symbol: '€', code: 'EUR' };
    const basePrice = tier.price;
    let finalPrice = basePrice;
    
    if (currency.code !== 'EUR') {
        const rate = exchangeRates.get(currency.code) || 1;
        const convertedPrice = basePrice * rate;
        finalPrice = roundPrice(convertedPrice, currency.code);
    }

    countryPriceMap.set(country, {
      price: finalPrice,
      symbol: currency.symbol,
      code: currency.code
    });
  });
});

const allCountries = Array.from(countryPriceMap.keys()).sort();

const BenefitCard: React.FC<{ title: string, text: string, delay: string }> = ({ title, text, delay }) => (
  <div className="bg-gray-800/30 p-6 rounded-lg card-glow-border" style={{ animationDelay: delay }}>
    <h3 className="text-2xl font-bold mb-3 text-tech-cyan">{title}</h3>
    <p className="text-gray-300">{text}</p>
  </div>
);

const CourseLandingPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState(language === 'pt' ? 'Brasil' : 'España');
  const [priceAnimationKey, setPriceAnimationKey] = useState(0);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);

  const priceSectionRef = useRef<HTMLElement>(null);
  const [benefitsRef, benefitsVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  useEffect(() => {
    const countryCodeMap: { [key: string]: string } = {
        'ES': 'España', 'PA': 'Panamá', 'UY': 'Uruguay', 'CL': 'Chile',
        'PT': 'Portugal', 'CR': 'Costa Rica', 'AR': 'Argentina', 'DO': 'República Dominicana',
        'MX': 'México', 'BR': 'Brasil', 'CO': 'Colombia', 'PY': 'Paraguay',
        'PE': 'Perú', 'EC': 'Ecuador', 'GT': 'Guatemala', 'SV': 'El Salvador',
        'BO': 'Bolivia', 'NI': 'Nicaragua', 'HN': 'Honduras',
    };

    const detectCountry = async () => {
      setIsDetectingLocation(true);
      try {
        const { data, error: invokeError } = await supabase.functions.invoke('ip-lookup');

        if (invokeError) {
          throw invokeError;
        }

        const detectedCountryCode = data.country; // ipinfo.io returns a country code like 'ES'
        const mappedCountry = countryCodeMap[detectedCountryCode];
        
        if (mappedCountry && allCountries.includes(mappedCountry)) {
          setSelectedCountry(mappedCountry);
        } else {
          // Fallback to default language-based country if not in our list
          setSelectedCountry(language === 'pt' ? 'Brasil' : 'España');
        }
      } catch (error) {
        console.error("Could not detect country via Supabase function, falling back to default:", error);
        setSelectedCountry(language === 'pt' ? 'Brasil' : 'España');
      } finally {
        setIsDetectingLocation(false);
      }
    };
    detectCountry();
  }, [language]);

  const currentPriceInfo = useMemo(() => {
    return countryPriceMap.get(selectedCountry) || { price: 197, symbol: '€', code: 'EUR' };
  }, [selectedCountry]);

  useEffect(() => {
    setPriceAnimationKey(prev => prev + 1);
  }, [currentPriceInfo]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleScrollToPrice = () => {
    priceSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleStripeCheckout = () => {
    alert(`${t('purchase.alertText')}:\n${t('purchase.alertProduct')}: ${t('purchase.alertCourseName')}\n${t('purchase.alertPrice')}: ${currentPriceInfo.price} ${currentPriceInfo.code}\n${t('purchase.alertCountry')}: ${selectedCountry}`);
  };

  const formattedPrice = useMemo(() => {
    if (isDetectingLocation) return '';
    const { price, code } = currentPriceInfo;
    const locale = countryLocaleMap.get(selectedCountry) || 'es-ES';
    const noDecimalsCurrencies = ['COP', 'CLP', 'PYG', 'ARS', 'CRC'];
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: code,
        minimumFractionDigits: noDecimalsCurrencies.includes(code) ? 0 : 2,
        maximumFractionDigits: noDecimalsCurrencies.includes(code) ? 0 : 2,
      }).format(price);
    } catch (e) {
      console.error("Currency formatting error:", e);
      const { symbol } = currentPriceInfo;
      const formattedNumber = new Intl.NumberFormat(locale.split('-')[0]).format(price);
      return code === 'EUR' ? `${formattedNumber} ${symbol}` : `${symbol}${formattedNumber}`;
    }
  }, [currentPriceInfo, selectedCountry, isDetectingLocation]);

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
              {t('purchase.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto mb-8 animate-fade-in-up">
              {t('purchase.heroSubtitle')}
            </p>
            <div className="animate-fade-in-up animation-delay-300">
              <button onClick={handleScrollToPrice} className="btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {t('purchase.heroCta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section ref={priceSectionRef} className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins mb-4">{t('purchase.priceTitle')}</h2>
          <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto mb-8">{t('purchase.priceSubtitle')}</p>
          
          {isDetectingLocation ? (
            <div className="h-48 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-cyan mb-4"></div>
                <p className="text-gray-400">Detectando tu ubicación para mostrarte el precio correcto...</p>
            </div>
          ) : (
            <>
              <div className="max-w-sm mx-auto mb-8">
                <label htmlFor="country-selector" className="sr-only">{t('purchase.countrySelectLabel')}</label>
                <select
                  id="country-selector"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full p-4 bg-gray-800 border-2 border-tech-blue/50 rounded-lg text-pure-white text-lg focus:outline-none focus:ring-2 focus:ring-tech-cyan"
                >
                  {allCountries.map(country => (
                    <option key={country} value={country}>{t(`countries.${country}`)}</option>
                  ))}
                </select>
              </div>

              <div key={priceAnimationKey} className="text-7xl md:text-8xl font-bold font-poppins text-tech-cyan animate-price-pulse">
                {formattedPrice}
              </div>
            </>
          )}

        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className={`py-20 transition-all duration-1000 ease-out ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pure-white font-poppins">{t('purchase.benefitsTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto sequential-fade-in">
            <BenefitCard title={t('purchase.benefit1Title')} text={t('purchase.benefit1Text')} delay="100ms" />
            <BenefitCard title={t('purchase.benefit2Title')} text={t('purchase.benefit2Text')} delay="200ms" />
            <BenefitCard title={t('purchase.benefit3Title')} text={t('purchase.benefit3Text')} delay="300ms" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className={`py-20 transition-all duration-1000 ease-out ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pure-white font-poppins">{t('purchase.finalCtaTitle')}</h2>
          <button onClick={handleStripeCheckout} disabled={isDetectingLocation} className="mt-4 btn-pulse-glow bg-tech-cyan text-corporate-dark font-bold py-4 px-10 rounded-lg text-xl hover:bg-white transition-all duration-300 shadow-lg shadow-tech-cyan/20 hover:shadow-xl hover:shadow-tech-cyan/40 transform hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none disabled:animate-none">
            {isDetectingLocation ? t('auth.loading') : `${t('purchase.finalCtaButton')} – ${formattedPrice}`}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CourseLandingPage;