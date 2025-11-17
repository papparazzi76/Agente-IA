import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AdCopyGenerator from '../components/ai-tools/AdCopyGenerator';
import ImageGenerator from '../components/ai-tools/ImageGenerator';
import EmailComposer from '../components/ai-tools/EmailComposer';
import MarketInsightsGenerator from '../components/ai-tools/MarketInsightsGenerator';
import BioOptimizer from '../components/ai-tools/BioOptimizer';
import NegotiationSimulator from '../components/ai-tools/NegotiationSimulator';
import LeadScoringAssistant from '../components/ai-tools/LeadScoringAssistant';
import MortgageCalculator from '../components/ai-tools/MortgageCalculator';

type ToolId = 'adCopy' | 'image' | 'email' | 'marketInsights' | 'bio' | 'negotiation' | 'leadScoring' | 'mortgageCalculator';

const MortgageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>;
const LeadScoringIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" /></svg>;
const NegotiationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a.375.375 0 01.265-.112c2.836-.051 5.483-.97 7.23-2.617.632-.587.996-1.396.996-2.231s-.364-1.644-.996-2.231C16.94 5.978 14.293 5.05 11.457 5c-1.502-.016-2.972.19-4.395.584A3.743 3.743 0 003.75 9.01z" /></svg>;
const AdCopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>;
const BioIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.158 0a.225.225 0 11-.45 0 .225.225 0 01.45 0z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const MarketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>;
const LegalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-1.07-1.07a59.905 59.905 0 0117.622-5.841l1.07 1.07m-17.622 0l17.622 0" /></svg>;
const ExpenseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3-6h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zM6 6h12v2.25a2.25 2.25 0 01-2.25 2.25H8.25A2.25 2.25 0 016 8.25V6zM4.5 6a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6z" /></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;

const PlaygroundPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const toolContainerRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: 'mortgageCalculator', icon: <MortgageIcon />, titleKey: 'playground.mortgageCalculator.title', descriptionKey: 'playground.mortgageCalculator.description' },
    { id: 'leadScoring', icon: <LeadScoringIcon />, titleKey: 'playground.leadScoringAssistant.title', descriptionKey: 'playground.leadScoringAssistant.description' },
    { id: 'negotiation', icon: <NegotiationIcon />, titleKey: 'playground.negotiationSimulator.title', descriptionKey: 'playground.negotiationSimulator.description' },
    { id: 'adCopy', icon: <AdCopyIcon />, titleKey: 'playground.adCopyGenerator.title', descriptionKey: 'playground.adCopyGenerator.description' },
    { id: 'bio', icon: <BioIcon />, titleKey: 'playground.bioOptimizer.title', descriptionKey: 'playground.bioOptimizer.description' },
    { id: 'image', icon: <ImageIcon />, titleKey: 'playground.imageGenerator.title', descriptionKey: 'playground.imageGenerator.description' },
    { id: 'email', icon: <EmailIcon />, titleKey: 'playground.emailComposer.title', descriptionKey: 'playground.emailComposer.description' },
    { id: 'marketInsights', icon: <MarketIcon />, titleKey: 'playground.marketInsightsGenerator.title', descriptionKey: 'playground.marketInsightsGenerator.description' },
    { id: 'legalAssistant', icon: <LegalIcon />, titleKey: 'playground.legalAssistantTitle', descriptionKey: 'playground.legalAssistantDescription', href: 'https://dimgrey-mink-513983.hostingersite.com/' },
    { id: 'expenseCalculator', icon: <ExpenseIcon />, titleKey: 'playground.expenseCalculatorTitle', descriptionKey: 'playground.expenseCalculatorDescription', href: 'https://mistyrose-crow-572702.hostingersite.com/' },
  ];
  
  useEffect(() => {
    if (activeTool && toolContainerRef.current) {
      const selectedTool = tools.find(tool => tool.id === activeTool);
      if (selectedTool && !selectedTool.href) {
        setTimeout(() => {
            toolContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [activeTool, tools]);

  const renderTool = () => {
    switch (activeTool) {
      case 'mortgageCalculator': return <MortgageCalculator />;
      case 'leadScoring': return <LeadScoringAssistant />;
      case 'negotiation': return <NegotiationSimulator />;
      case 'adCopy': return <AdCopyGenerator />;
      case 'bio': return <BioOptimizer />;
      case 'image': return <ImageGenerator />;
      case 'email': return <EmailComposer />;
      case 'marketInsights': return <MarketInsightsGenerator />;
      default: return null;
    }
  };

  // FIX: Explicitly typed the props for the locally-defined `ToolCard` component.
  // This resolves a TypeScript error where the special `key` prop from a `.map()` was being
  // incorrectly treated as a regular prop because TypeScript could not properly infer
  // that `ToolCard` was a React component without explicit types.
  const ToolCard: React.FC<{
    tool: (typeof tools)[number];
    isActive: boolean;
    onClick: () => void;
  }> = ({ tool, isActive, onClick }) => {
    const cardContent = (
      <>
        <div className="w-16 h-16 mb-5 rounded-lg bg-gray-900/50 border border-tech-blue/30 flex items-center justify-center shadow-inner shadow-black/20 group-hover:bg-gray-700/50 transition-colors duration-300">
          {tool.icon}
        </div>
        <h3 className="font-poppins text-lg font-bold text-pure-white mb-2">{t(tool.titleKey)}</h3>
        <p className="font-inter text-sm text-gray-400 flex-grow">{t(tool.descriptionKey)}</p>
      </>
    );
    
    const baseClasses = "text-left p-6 rounded-xl h-full flex flex-col items-start transition-all duration-300 card-glow-border group";
    const activeClasses = "border-2 border-tech-cyan bg-tech-blue/10";
    const inactiveClasses = "border-2 border-gray-700 bg-gray-800/50";
    
    if (tool.href) {
      return (
        <a href={tool.href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${inactiveClasses}`}>
          {cardContent}
           <div className="flex items-center text-tech-cyan text-sm font-semibold mt-4">
              Abrir herramienta <ExternalLinkIcon />
           </div>
        </a>
      );
    }

    return (
      <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
        {cardContent}
      </button>
    );
  };


  return (
    <div className="animate-fadeIn">
      <section className="relative py-20 md:py-24 text-pure-white bg-corporate-dark">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 leading-tight text-glow">
            {t('playground.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto">
            {t('playground.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-corporate-dark">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-poppins text-gray-300">Selecciona una herramienta para empezar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isActive={activeTool === tool.id}
                onClick={() => setActiveTool(tool.id as ToolId)}
              />
            ))}
          </div>

          {activeTool && (
            <div ref={toolContainerRef} className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20 min-h-[400px] animate-fadeIn">
              {renderTool()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PlaygroundPage;