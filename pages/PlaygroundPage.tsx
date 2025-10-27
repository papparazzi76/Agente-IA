import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AdCopyGenerator from '../components/ai-tools/AdCopyGenerator';
import ImageGenerator from '../components/ai-tools/ImageGenerator';
import EmailComposer from '../components/ai-tools/EmailComposer';
import MarketInsightsGenerator from '../components/ai-tools/MarketInsightsGenerator';
import ValuationAssistant from '../components/ai-tools/ValuationAssistant';
import BioOptimizer from '../components/ai-tools/BioOptimizer';
import NegotiationSimulator from '../components/ai-tools/NegotiationSimulator';
import LeadScoringAssistant from '../components/ai-tools/LeadScoringAssistant';
import MortgageCalculator from '../components/ai-tools/MortgageCalculator';

type Tool = 'adCopy' | 'image' | 'email' | 'marketInsights' | 'valuation' | 'bio' | 'negotiation' | 'leadScoring' | 'mortgageCalculator';

const ExternalLinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const PlaygroundPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState<Tool>('mortgageCalculator');

  const renderTool = () => {
    switch (activeTool) {
      case 'mortgageCalculator':
        return <MortgageCalculator />;
      case 'leadScoring':
        return <LeadScoringAssistant />;
      case 'negotiation':
        return <NegotiationSimulator />;
      case 'adCopy':
        return <AdCopyGenerator />;
      case 'valuation':
        return <ValuationAssistant />;
      case 'bio':
        return <BioOptimizer />;
      case 'image':
        return <ImageGenerator />;
      case 'email':
        return <EmailComposer />;
      case 'marketInsights':
        return <MarketInsightsGenerator />;
      default:
        return <MortgageCalculator />;
    }
  };

  const TabButton: React.FC<{ tool: Tool; label: string }> = ({ tool, label }) => (
    <button
      onClick={() => setActiveTool(tool)}
      className={`px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-all duration-300 ${
        activeTool === tool
          ? 'border-tech-cyan text-tech-cyan'
          : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-200'
      }`}
    >
      {label}
    </button>
  );

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
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-8 border-b border-tech-blue/30">
            <div className="flex items-center -mb-px overflow-x-auto">
              <TabButton tool="mortgageCalculator" label={t('playground.mortgageCalculator.title')} />
              <TabButton tool="leadScoring" label={t('playground.leadScoringAssistant.title')} />
              <TabButton tool="negotiation" label={t('playground.negotiationSimulator.title')} />
              <TabButton tool="adCopy" label={t('playground.adCopyGenerator.title')} />
              <TabButton tool="valuation" label={t('playground.valuationAssistant.title')} />
              <TabButton tool="bio" label={t('playground.bioOptimizer.title')} />
              <TabButton tool="image" label={t('playground.imageGenerator.title')} />
              <TabButton tool="email" label={t('playground.emailComposer.title')} />
              <TabButton tool="marketInsights" label={t('playground.marketInsightsGenerator.title')} />
              <a
                href="https://dimgrey-mink-513983.hostingersite.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-300"
              >
                {t('playground.legalAssistantTitle')} <ExternalLinkIcon />
              </a>
              <a
                href="https://mistyrose-crow-572702.hostingersite.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-300"
              >
                {t('playground.expenseCalculatorTitle')} <ExternalLinkIcon />
              </a>
            </div>
          </div>

          <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20 min-h-[400px]">
            {renderTool()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaygroundPage;