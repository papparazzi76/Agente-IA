import React from 'react';
import { Link } from 'react-router-dom';
import { useForum } from '../../contexts/ForumContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SectionIcon: React.FC<{ slug: string }> = ({ slug }) => {
  const iconProps = { className: "w-10 h-10 text-tech-cyan", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" };
  switch (slug) {
    case 'dudas-y-consultas':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'nuevas-herramientas-ia':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6.5 8.5l-1.414-1.414M11.5 3.5L10 5m-1.5 3.5l1.414-1.414M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;
    case 'propuestas-de-mejora':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11" /></svg>;
    default: return null;
  }
};


const ForumHomePage: React.FC = () => {
    const { sections } = useForum();
    const { language } = useLanguage();
    const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

    return (
        <div ref={gridRef} className={`transition-all duration-1000 ease-out ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                {sections.map(section => (
                    <Link to={`/foro/${section.slug}`} key={section.id} className="block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-tech-blue/20 group card-glow-border h-full">
                        <div className="p-8 flex flex-col items-start h-full">
                            <div className="w-20 h-20 mb-6 rounded-full bg-tech-blue/10 border border-tech-blue/30 flex items-center justify-center shadow-inner shadow-black/20 group-hover:bg-tech-blue/25 transition-colors duration-300">
                                <SectionIcon slug={section.slug} />
                            </div>
                            <h3 className="font-poppins text-2xl font-bold text-pure-white mb-3">{section.title[language]}</h3>
                            <p className="font-inter text-gray-300 flex-grow">{section.description[language]}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ForumHomePage;
