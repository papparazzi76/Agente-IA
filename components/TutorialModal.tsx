import React, { useState } from 'react';

export interface TutorialStep {
  title: string;
  content: string;
}

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: TutorialStep[];
  toolTitle: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, steps, toolTitle }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      setTimeout(() => setCurrentStep(0), 300);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl max-w-lg w-full border border-tech-blue/30 shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900/50">
          <h3 className="text-xl font-bold font-poppins text-pure-white flex items-center gap-2">
            <span className="text-tech-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Tutorial: {toolTitle}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors rounded-full p-1 hover:bg-gray-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-8 flex-grow overflow-y-auto bg-gray-800">
          <div className="mb-6 min-h-[200px]">
            <div className="flex justify-between items-center mb-4">
               <span className="text-xs font-bold text-tech-blue uppercase tracking-wider bg-tech-blue/10 px-2 py-1 rounded">
                Paso {currentStep + 1} de {steps.length}
              </span>
            </div>
           
            <h4 className="text-2xl font-bold text-white mb-4 font-poppins">{steps[currentStep].title}</h4>
            <div className="text-gray-300 text-lg leading-relaxed font-inter" dangerouslySetInnerHTML={{ __html: steps[currentStep].content }} />
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mb-2">
            {steps.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-tech-cyan' : 'w-2 bg-gray-600 hover:bg-gray-500'}`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-between bg-gray-900/50">
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${currentStep === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
          >
            Anterior
          </button>
          <button 
            onClick={handleNext}
            className="bg-tech-blue text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-500 transition-all shadow-lg shadow-tech-blue/20 transform hover:-translate-y-0.5"
          >
            {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;