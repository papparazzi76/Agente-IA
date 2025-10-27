import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';
import PromptManager from './PromptManager';
import VoiceInputButton from './VoiceInputButton';

const defaultMarketPrompt = {
    name: "Analista de Mercado Estándar",
    content: `
Actúa como un analista senior de mercado inmobiliario. Proporciona un resumen conciso y bien estructurado sobre el siguiente tema. 
El resumen debe ser fácil de leer, utilizando puntos clave, negritas para destacar conceptos importantes y un tono profesional y directo.

Tema: "{{topic}}"
`
};


const MarketInsightsGenerator: React.FC = () => {
    const { t } = useLanguage();
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);
    const [activePrompt, setActivePrompt] = useState(defaultMarketPrompt.content);

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
            const finalPrompt = activePrompt.replace('{{topic}}', topic);

            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: finalPrompt,
            });

            let buffer = "";
            for await (const chunk of responseStream) {
                buffer += chunk.text;
                setResult(buffer);
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
    
    const renderContent = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-tech-cyan">$1</strong>')
            .split('\n')
            .map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/^- |^\* /g, '• ') || '&nbsp;' }} />
            ));
    };


    return (
        <div>
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.marketInsightsGenerator.title')}</h2>
            <p className="text-gray-400 mb-6">{t('playground.marketInsightsGenerator.description')}</p>

            <PromptManager
                toolKey="marketInsightsGenerator"
                defaultPrompt={defaultMarketPrompt}
                onPromptChange={handlePromptChange}
                variables={['topic']}
            />
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="topic">{t('playground.marketInsightsGenerator.topicLabel')}</label>
                    <div className="relative">
                        <textarea id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder={t('playground.marketInsightsGenerator.topicPlaceholder')} required rows={3} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                        <VoiceInputButton onTranscript={setTopic} onError={setError} targetId="topic" />
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                    {isLoading ? t('playground.marketInsightsGenerator.generating') : t('playground.marketInsightsGenerator.generateButton')}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {(result || isLoading) && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{t('playground.marketInsightsGenerator.outputTitle')}</h3>
                        {result && !isLoading && <button onClick={handleCopy} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied ? t('playground.marketInsightsGenerator.copied') : t('playground.marketInsightsGenerator.copyButton')}</button>}
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-md prose prose-invert max-w-none">
                        {renderContent(result)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketInsightsGenerator;