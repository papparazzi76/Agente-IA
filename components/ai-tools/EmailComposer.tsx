import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';
import PromptManager from './PromptManager';
import VoiceInputButton from './VoiceInputButton';

const defaultEmailPrompt = {
    name: "Redactor de Emails Estándar",
    content: `
Actúa como un asistente de agente inmobiliario experto. Redacta un borrador de email basado en la siguiente instrucción. El tono debe ser profesional pero cercano. No incluyas un asunto, solo el cuerpo del email.

Instrucción: {{instruction}}
`
};

const EmailComposer: React.FC = () => {
    const { t } = useLanguage();
    const [emailType, setEmailType] = useState('followUp');
    const [clientName, setClientName] = useState('');
    const [propertyDetails, setPropertyDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);
    const [activePrompt, setActivePrompt] = useState(defaultEmailPrompt.content);

    const handlePromptChange = useCallback((newPrompt: string) => {
        setActivePrompt(newPrompt);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setResult('');

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError("Error de configuración: La clave de API para los servicios de IA no está disponible. Póngase en contacto con el soporte.");
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
            
            let promptInstruction = '';
            switch(emailType) {
                case 'followUp':
                    promptInstruction = `Escribe un email de seguimiento amable y profesional para ${clientName} después de su visita a la propiedad en ${propertyDetails}. Pregunta por sus impresiones y ofrécete para resolver cualquier duda.`;
                    break;
                case 'newProperty':
                    promptInstruction = `Escribe un email anunciando una nueva propiedad en ${propertyDetails} a un cliente potencial llamado ${clientName}. Destaca que podría encajar en su búsqueda y anímale a pedir más información o una visita.`;
                    break;
                case 'priceReduction':
                     promptInstruction = `Escribe un email para informar a ${clientName} de una bajada de precio en la propiedad en ${propertyDetails}. Crea un sentido de oportunidad y anímale a reconsiderar la propiedad.`;
                     break;
            }

            const finalPrompt = activePrompt.replace('{{instruction}}', promptInstruction);

            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: finalPrompt,
            });

            for await (const chunk of responseStream) {
                setResult(prev => prev + chunk.text);
            }

        } catch (err) {
            console.error(err);
            setError(t('playground.common.error'));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.emailComposer.title')}</h2>
            <p className="text-gray-400 mb-6">{t('playground.emailComposer.description')}</p>
            
            <PromptManager
                toolKey='emailComposer'
                defaultPrompt={defaultEmailPrompt}
                onPromptChange={handlePromptChange}
                variables={['instruction']}
            />
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="emailType">{t('playground.emailComposer.emailTypeLabel')}</label>
                    <select id="emailType" value={emailType} onChange={e => setEmailType(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                        <option value="followUp">{t('playground.emailComposer.emailTypeFollowUp')}</option>
                        <option value="newProperty">{t('playground.emailComposer.emailTypeNewProperty')}</option>
                        <option value="priceReduction">{t('playground.emailComposer.emailTypePriceReduction')}</option>
                    </select>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="clientName">{t('playground.emailComposer.clientNameLabel')}</label>
                        <div className="relative">
                            <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} placeholder={t('playground.emailComposer.clientNamePlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                            <VoiceInputButton onTranscript={setClientName} onError={setError} targetId="clientName" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="propertyDetails">{t('playground.emailComposer.propertyDetailsLabel')}</label>
                        <div className="relative">
                            <input type="text" id="propertyDetails" value={propertyDetails} onChange={e => setPropertyDetails(e.target.value)} placeholder={t('playground.emailComposer.propertyDetailsPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                            <VoiceInputButton onTranscript={setPropertyDetails} onError={setError} targetId="propertyDetails" />
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                    {isLoading ? t('playground.emailComposer.generating') : t('playground.emailComposer.generateButton')}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {(result || isLoading) && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{t('playground.emailComposer.outputTitle')}</h3>
                        {result && !isLoading && <button onClick={handleCopy} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied ? t('playground.emailComposer.copied') : t('playground.emailComposer.copyButton')}</button>}
                    </div>
                    <textarea value={result} readOnly className="w-full h-64 bg-gray-800/50 p-4 rounded-md font-sans text-base whitespace-pre-wrap" />
                </div>
            )}
        </div>
    );
};

export default EmailComposer;