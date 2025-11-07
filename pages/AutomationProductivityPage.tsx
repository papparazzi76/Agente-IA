import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuote } from '../contexts/QuoteContext';

const CheckIcon = () => (
    <svg className="w-6 h-6 text-tech-cyan mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const FaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => (
  <tr className="border-b border-gray-700 last:border-b-0">
    <td className="p-4 font-semibold text-gray-200 align-top md:w-1/3">{question}</td>
    <td className="p-4 text-gray-400 align-top" dangerouslySetInnerHTML={{ __html: answer }}></td>
  </tr>
);

const AutomationProductivityPage: React.FC = () => {
    const { t } = useLanguage();
    const { openModal } = useQuote();

    const productKeys = [
        'marketplace.cat4Item1',
        'marketplace.cat4Item2',
        'marketplace.cat4Item3',
        'marketplace.cat4Item4',
    ];

    const handleQuoteRequest = () => {
        openModal(productKeys);
    };

    const faqs1 = [
        { q: t('automationProductivity.faq1q1'), a: t('automationProductivity.faq1a1') },
        { q: t('automationProductivity.faq1q2'), a: t('automationProductivity.faq1a2') },
        { q: t('automationProductivity.faq1q3'), a: t('automationProductivity.faq1a3') },
    ];
    
    const faqs2 = [
        { q: t('automationProductivity.faq2q1'), a: t('automationProductivity.faq2a1') },
        { q: t('automationProductivity.faq2q2'), a: t('automationProductivity.faq2a2') },
        { q: t('automationProductivity.faq2q3'), a: t('automationProductivity.faq2a3') },
    ];

    const faqs3 = [
        { q: t('automationProductivity.faq3q1'), a: t('automationProductivity.faq3a1') },
        { q: t('automationProductivity.faq3q2'), a: t('automationProductivity.faq3a2') },
    ];

    return (
        <div className="animate-fadeIn">
            <section className="relative py-20 md:py-32 text-pure-white bg-corporate-dark/50">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-corporate-dark/80 to-corporate-dark"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/marketplace" className="text-tech-blue hover:underline font-semibold mb-6 inline-block">
                       &larr; {t('automationProductivity.backLink')}
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4 leading-tight text-glow">
                        <span className="text-3xl md:text-5xl">⚙️</span> {t('automationProductivity.heroTitle')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-inter max-w-4xl">
                        {t('automationProductivity.heroSubtitle')}
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-gray-900/50 p-8 rounded-lg border border-tech-blue/20 shadow-xl">
                        <p className="text-lg text-gray-300 mb-8">
                            {t('automationProductivity.mainDescription')}
                        </p>

                        <h2 className="text-3xl font-bold font-poppins text-pure-white mb-6">{t('automationProductivity.includesTitle')}</h2>
                        <p className="text-gray-400 mb-8">{t('automationProductivity.includesSubtitle')}</p>

                        <ul className="space-y-6 mb-10">
                            <li className="flex items-start"><CheckIcon /><div><h3 className="text-xl font-semibold mb-1">{t('automationProductivity.feature1Title')}</h3><p className="text-gray-400">{t('automationProductivity.feature1Text')}</p></div></li>
                            <li className="flex items-start"><CheckIcon /><div><h3 className="text-xl font-semibold mb-1">{t('automationProductivity.feature2Title')}</h3><p className="text-gray-400">{t('automationProductivity.feature2Text')}</p></div></li>
                            <li className="flex items-start"><CheckIcon /><div><h3 className="text-xl font-semibold mb-1">{t('automationProductivity.feature3Title')}</h3><p className="text-gray-400">{t('automationProductivity.feature3Text')}</p></div></li>
                            <li className="flex items-start"><CheckIcon /><div><h3 className="text-xl font-semibold mb-1">{t('automationProductivity.feature4Title')}</h3><p className="text-gray-400">{t('automationProductivity.feature4Text')}</p></div></li>
                        </ul>
                        
                        <div className="bg-gray-800/50 border border-tech-cyan/30 rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-poppins font-semibold text-gray-300 mb-2">{t('automationProductivity.ctaTitle')}</h3>
                            <p className="text-5xl font-bold text-tech-cyan mb-4">{t('automationProductivity.ctaPrice')}</p>
                            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{t('automationProductivity.ctaSubtitle')}</p>
                            <button onClick={handleQuoteRequest} className="btn-pulse-glow bg-tech-cyan text-corporate-dark font-bold py-3 px-8 rounded-lg text-lg hover:bg-white transition-all duration-300 shadow-lg shadow-tech-cyan/20 transform hover:-translate-y-1">
                                {t('automationProductivity.ctaButton')}
                            </button>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-4xl font-bold font-poppins text-center text-pure-white mb-10">{t('automationProductivity.faqTitle')}</h2>
                        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">{t('automationProductivity.faqSubtitle')}</p>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-semibold font-poppins text-tech-cyan mb-6 border-b-2 border-tech-blue/30 pb-2">{t('automationProductivity.faq1Title')}</h3>
                                <div className="bg-gray-900/50 rounded-lg border border-tech-blue/20 overflow-hidden"><table className="w-full"><tbody>{faqs1.map(faq => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}</tbody></table></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold font-poppins text-tech-cyan mb-6 border-b-2 border-tech-blue/30 pb-2">{t('automationProductivity.faq2Title')}</h3>
                                <div className="bg-gray-900/50 rounded-lg border border-tech-blue/20 overflow-hidden"><table className="w-full"><tbody>{faqs2.map(faq => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}</tbody></table></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold font-poppins text-tech-cyan mb-6 border-b-2 border-tech-blue/30 pb-2">{t('automationProductivity.faq3Title')}</h3>
                                <div className="bg-gray-900/50 rounded-lg border border-tech-blue/20 overflow-hidden"><table className="w-full"><tbody>{faqs3.map(faq => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}</tbody></table></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AutomationProductivityPage;