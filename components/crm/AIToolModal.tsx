import React from 'react';
import { Property } from '../../types';
import AdCopyGenerator from '../ai-tools/AdCopyGenerator';
import ValuationAssistant from '../ai-tools/ValuationAssistant';

interface AIToolModalProps {
    tool: 'adCopy' | 'valuation';
    property: Property;
    onClose: () => void;
    onSaveDescription: (text: string) => void;
    onSaveNotes: (text: string) => void;
}

const AIToolModal: React.FC<AIToolModalProps> = ({ tool, property, onClose, onSaveDescription, onSaveNotes }) => {
    const renderTool = () => {
        switch (tool) {
            case 'adCopy':
                return (
                    <AdCopyGenerator
                        initialData={{
                            propertyType: property.type,
                            location: property.address,
                            features: property.features,
                        }}
                        onSave={onSaveDescription}
                    />
                );
            case 'valuation':
                 return (
                    <ValuationAssistant
                        initialData={{
                            address: property.address,
                            propertyType: property.type,
                            area: String(property.area),
                            bedrooms: String(property.bedrooms),
                            bathrooms: String(property.bathrooms),
                            features: property.features,
                        }}
                        onSave={onSaveNotes}
                    />
                );
            default:
                return null;
        }
    };
    
    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn" 
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 rounded-lg max-w-4xl w-full border border-tech-blue/30 shadow-2xl relative max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold font-poppins text-pure-white">Asistente IA</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                   {renderTool()}
                </div>
            </div>
        </div>
    );
};

export default AIToolModal;