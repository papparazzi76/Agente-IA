import React, { useState, useEffect, useCallback } from 'react';
import { Flashcard } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// Icons
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const ResetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ExplainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

interface FlashcardViewerProps {
  flashcards: Flashcard[];
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ flashcards }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  }, [currentIndex, totalCards]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  }, [currentIndex]);
  
  const handleFlip = useCallback(() => setIsFlipped(prev => !prev), []);

  const handleReset = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(0), 150);
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showExplanation) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') handleNext();
      else if (e.code === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleFlip, showExplanation]);

  return (
    <div className="relative overflow-hidden bg-gray-900/50 p-6 sm:p-8 rounded-lg border border-tech-blue/20">
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-tech-blue rounded-full blur-3xl breathing-glow-blue"></div>
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-tech-cyan rounded-full blur-3xl breathing-glow-cyan"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold font-poppins text-pure-white">Tarjetas de Conocimiento</h3>
          <p className="text-sm text-gray-400">Toca la tarjeta o pulsa <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">espacio</kbd> para girarla. Usa las flechas para navegar.</p>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 my-6">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ArrowLeftIcon />
          </button>
          
          <div className="w-full max-w-xl h-80 sm:h-96 [perspective:1200px] cursor-pointer" onClick={handleFlip}>
            <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
              {/* Front (Question) */}
              <div className="absolute w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-corporate-dark to-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col justify-center items-center text-center">
                <h4 className="text-2xl sm:text-3xl font-poppins font-semibold text-pure-white">{currentCard.question[language]}</h4>
                <p className="absolute bottom-6 text-sm text-gray-400">Toca para ver la respuesta</p>
              </div>
              
              {/* Back (Answer) */}
              <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-pure-white rounded-2xl shadow-2xl p-6 flex flex-col justify-center items-center text-center">
                <p className="text-xl sm:text-2xl font-inter text-corporate-dark mb-6">{currentCard.answer[language]}</p>
                <button onClick={(e) => { e.stopPropagation(); setShowExplanation(true); }} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tech-blue">
                  <ExplainIcon />
                  Explicar
                </button>
              </div>
            </div>
          </div>

          <button onClick={handleNext} disabled={currentIndex === totalCards - 1} className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ArrowRightIcon />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 max-w-xl mx-auto text-gray-300">
          <button onClick={handleReset} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"><ResetIcon /></button>
          <div className="flex-grow mx-4 h-1.5 bg-gray-700 rounded-full">
            <div className="h-1.5 bg-tech-cyan rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }} />
          </div>
          <span className="font-mono text-sm">{currentIndex + 1} / {totalCards}</span>
        </div>
      </div>

      {/* Explanation Modal */}
      {showExplanation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn" onClick={() => setShowExplanation(false)}>
          <div className="bg-gray-800 rounded-lg max-w-3xl w-full border border-tech-blue/30 shadow-2xl relative max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 flex justify-between items-center border-b border-gray-700">
              <h4 className="text-xl font-bold font-poppins text-pure-white">Explicación Detallada</h4>
              <button onClick={() => setShowExplanation(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-700">
                <CloseIcon />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-li:text-gray-300 prose-headings:text-tech-cyan whitespace-pre-line">
                {currentCard.explanation[language]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardViewer;