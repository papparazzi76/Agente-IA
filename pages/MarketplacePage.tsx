import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

// Category Icons
const WebIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ChipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414M19.778 19.778l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.834 9.168-4.432l.256-.506M4 19l.777-2.89A5.002 5.002 0 0110.08 9.5H12" /></svg>;
const GearsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const GavelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-tech-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-tech-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

interface CategoryCardProps {
    icon: React.ReactNode;
    titleKey: string;
    descKey: string;
    items: string[];
    priceKey: string;
    linkTo?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, titleKey, descKey, items, priceKey, linkTo }) => {
    const { t } = useLanguage();

    const ButtonOrLink = linkTo ? (
        <Link to={linkTo} className="bg-transparent border-2 border-tech-cyan text-tech-cyan font-semibold py-2 px-4 rounded-lg group-hover:bg-tech-cyan group-hover:text-white transition-all duration-300">
            {t('marketplace.viewProducts')}
        </Link>
    ) : (
        <button className="bg-transparent border-2 border-tech-cyan text-tech-cyan font-semibold py-2 px-4 rounded-lg group-hover:bg-tech-cyan group-hover:text-white transition-all duration-300">
            {t('marketplace.viewProducts')}
        </button>
    );

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-tech-blue/20 group card-glow-border h-full flex flex-col">
            <div className="p-8">
                <div className="w-20 h-20 mb-6 rounded-full bg-tech-blue/10 border border-tech-blue/30 flex items-center justify-center shadow-inner shadow-black/20 group-hover:bg-tech-blue/25 transition-colors duration-300">
                    {icon}
                </div>
                <h3 className="font-poppins text-2xl font-bold text-pure-white mb-3">{t(titleKey)}</h3>
                <p className="font-inter text-gray-400 mb-6">{t(descKey)}</p>
                <ul className="space-y-3 mb-6">
                    {items.map(itemKey => (t(itemKey) && 
                        <li key={itemKey} className="flex items-center text-gray-300">
                            <CheckCircleIcon /> {t(itemKey)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-auto bg-gray-900/40 px-8 py-4 border-t border-tech-blue/20 flex justify-between items-center">
                <span className="font-bold text-lg text-tech-cyan">{t(priceKey)}</span>
                {ButtonOrLink}
            </div>
        </div>
    );
};

const MarketplacePage: React.FC = () => {
    const { t } = useLanguage();
    const categoriesRef = useRef<HTMLElement>(null);
    const [offsetY, setOffsetY] = useState(0);
    // The useScrollAnimation hook is generic. The 'gridRef' is attached to a <div> element,
    // so we specify HTMLDivElement as the type to ensure type safety.
    const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleExploreClick = () => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const categories: CategoryCardProps[] = [
        { icon: <WebIcon />, titleKey: 'marketplace.cat1Title', descKey: 'marketplace.cat1Desc', items: ['marketplace.cat1Item1', 'marketplace.cat1Item2', 'marketplace.cat1Item3', 'marketplace.cat1Item4'], priceKey: 'marketplace.cat1Price', linkTo: '/marketplace/web-design' },
        { icon: <ChipIcon />, titleKey: 'marketplace.cat2Title', descKey: 'marketplace.cat2Desc', items: ['marketplace.cat2Item1', 'marketplace.cat2Item2', 'marketplace.cat2Item3', 'marketplace.cat2Item4'], priceKey: 'marketplace.cat2Price', linkTo: '/marketplace/applied-ai'},
        { icon: <MegaphoneIcon />, titleKey: 'marketplace.cat3Title', descKey: 'marketplace.cat3Desc', items: ['marketplace.cat3Item1', 'marketplace.cat3Item2', 'marketplace.cat3Item3', 'marketplace.cat3Item4'], priceKey: 'marketplace.cat3Price', linkTo: '/marketplace/digital-marketing'},
        { icon: <GearsIcon />, titleKey: 'marketplace.cat4Title', descKey: 'marketplace.cat4Desc', items: ['marketplace.cat4Item1', 'marketplace.cat4Item2', 'marketplace.cat4Item3', 'marketplace.cat4Item4'], priceKey: 'marketplace.cat4Price', linkTo: '/marketplace/automation-productivity'},
        { icon: <GavelIcon />, titleKey: 'marketplace.cat5Title', descKey: 'marketplace.cat5Desc', items: ['marketplace.cat5Item1', 'marketplace.cat5Item2', 'marketplace.cat5Item3'], priceKey: 'marketplace.cat5Price', linkTo: '/marketplace/legal-documentation'},
        { icon: <StarIcon />, titleKey: 'marketplace.cat6Title', descKey: 'marketplace.cat6Desc', items: ['marketplace.cat6Item1', 'marketplace.cat6Item2', 'marketplace.cat6Item3', 'marketplace.cat6Item4'], priceKey: 'marketplace.cat6Price', linkTo: '/marketplace/premium-extras'},
    ];


    return (
        <div className="animate-fadeIn">
            <section className="relative text-pure-white bg-corporate-dark overflow-hidden">
                <div
                    className="absolute z-0 w-full h-full bg-cover bg-center opacity-30"
                    style={{ 
                        backgroundImage: `url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                        transform: `translateY(${offsetY * 0.4}px)`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-corporate-dark/70 to-corporate-dark"></div>
                
                <div className="container mx-auto px-6 relative z-10 min-h-[80vh] flex items-center justify-center text-center py-20">
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins mb-4 leading-tight animate-fade-in-down text-glow">
                            {t('marketplace.heroTitle')}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto mb-8 animate-fade-in-up">
                          {t('marketplace.heroSubtitle')}
                        </p>
                        <div className="animate-fade-in-up animation-delay-300">
                            <button onClick={handleExploreClick} className="btn-pulse-glow bg-tech-cyan/20 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-tech-cyan/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                {t('marketplace.heroCta')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
            <section ref={categoriesRef} className="py-20">
                 <div ref={gridRef} className={`container mx-auto px-6 transition-all duration-1000 ease-out ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map(cat => (
                            <CategoryCard key={cat.titleKey} {...cat} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarketplacePage;