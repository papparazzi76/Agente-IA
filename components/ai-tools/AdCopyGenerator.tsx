import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';
import PromptManager from './PromptManager';
import VoiceInputButton from './VoiceInputButton';
import TutorialModal, { TutorialStep } from '../TutorialModal';

const defaultAdCopyPrompt = {
    name: "Generador de Anuncios Estándar",
    content: `
Eres un experto copywriter inmobiliario. Crea tres opciones de texto para un anuncio de una propiedad con las siguientes características:
- Tipo de propiedad: {{propertyType}}
- Ubicación: {{location}}
- Características clave: {{features}}
- Público objetivo: {{targetAudience}}

Genera tres versiones:
1.  **Anuncio para Portal Inmobiliario:** Detallado, profesional y optimizado para SEO. Usa emojis apropiados.
2.  **Publicación para Redes Sociales (Instagram/Facebook):** Breve, atractivo y con un fuerte llamado a la acción. Usa hashtags relevantes.
3.  **Fragmento para Newsletter por Email:** Tono cercano y exclusivo, enfocado en crear urgencia e interés.

Formatea la respuesta claramente con los títulos de cada sección en negrita.
`
};

interface AdCopyGeneratorProps {
    initialData?: {
        propertyType: string;
        location: string;
        features: string;
    };
    onSave?: (fullText: string) => void;
}

const AdCopyGenerator: React.FC<AdCopyGeneratorProps> = ({ initialData, onSave }) => {
    const { t, language } = useLanguage();
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [features, setFeatures] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);
    const [activePrompt, setActivePrompt] = useState(defaultAdCopyPrompt.content);
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);

    const tutorialSteps: TutorialStep[] = language === 'es' ? [
        {
            title: "Define la Propiedad",
            content: "Comienza ingresando los datos básicos de la propiedad: <strong>Tipo</strong> (ej. Ático), <strong>Ubicación</strong> y las <strong>Características clave</strong>. Cuanto más específico seas, mejor será el resultado."
        },
        {
            title: "Usa el Micrófono",
            content: "Para ahorrar tiempo, puedes usar el botón del <strong>micrófono</strong> en los campos de texto y dictar la información en lugar de escribirla."
        },
        {
            title: "Define tu Audiencia",
            content: "El campo <strong>Público Objetivo</strong> es crucial. No es lo mismo escribir para 'inversores' que para 'familias con niños'. La IA adaptará el tono del mensaje según lo que pongas aquí."
        },
        {
            title: "Gestiona los Prompts",
            content: "Usa la sección <strong>'Gestionar Prompts'</strong> arriba para modificar cómo la IA debe escribir el anuncio. Puedes guardar tus propias estructuras (ej. 'Anuncio corto y agresivo') para usarlas siempre."
        }
    ] : [
        {
            title: "Defina a Propriedade",
            content: "Comece por inserir os dados básicos da propriedade: <strong>Tipo</strong> (ex. Cobertura), <strong>Localização</strong> e as <strong>Características chave</strong>. Quanto mais específico for, melhor será o resultado."
        },
        {
            title: "Use o Microfone",
            content: "Para poupar tempo, pode usar o botão do <strong>microfone</strong> nos campos de texto e ditar a informação em vez de escrever."
        },
        {
            title: "Defina a sua Audiência",
            content: "O campo <strong>Público-Alvo</strong> é crucial. Não é a mesma coisa escrever para 'investidores' do que para 'famílias com crianças'. A IA adaptará o tom da mensagem conforme o que colocar aqui."
        },
        {
            title: "Gerencie os Prompts",
            content: "Use a secção <strong>'Gerir Prompts'</strong> acima para modificar como a IA deve escrever o anúncio. Pode guardar as suas próprias estruturas (ex. 'Anúncio curto e agressivo') para usar sempre."
        }
    ];

    useEffect(() => {
        if (initialData) {
            setPropertyType(initialData.propertyType || '');
            setLocation(initialData.location || '');
            setFeatures(initialData.features || '');
        }
    }, [initialData]);

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
            const finalPrompt = activePrompt
                .replace('{{propertyType}}', propertyType)
                .replace('{{location}}', location)
                .replace('{{features}}', features)
                .replace('{{targetAudience}}', targetAudience);

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: finalPrompt,
            });

            setResult(response.text);

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
            <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold font-poppins">{t('playground.adCopyGenerator.title')}</h2>
                <button 
                    onClick={() => setIsTutorialOpen(true)}
                    className="ml-3 text-gray-400 hover:text-tech-cyan transition-colors"
                    title="Ver Tutorial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <p className="text-gray-400 mb-6">{t('playground.adCopyGenerator.description')}</p>
            
            <PromptManager 
                toolKey='adCopyGenerator'
                defaultPrompt={defaultAdCopyPrompt}
                onPromptChange={handlePromptChange}
                variables={['propertyType', 'location', 'features', 'targetAudience']}
            />
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="propertyType">{t('playground.adCopyGenerator.propertyTypeLabel')}</label>
                        <div className="relative">
                            <input type="text" id="propertyType" value={propertyType} onChange={e => setPropertyType(e.target.value)} placeholder={t('playground.adCopyGenerator.propertyTypePlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                            <VoiceInputButton onTranscript={setPropertyType} onError={setError} targetId="propertyType" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="location">{t('playground.adCopyGenerator.locationLabel')}</label>
                         <div className="relative">
                            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder={t('playground.adCopyGenerator.locationPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                            <VoiceInputButton onTranscript={setLocation} onError={setError} targetId="location" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="features">{t('playground.adCopyGenerator.featuresLabel')}</label>
                    <div className="relative">
                        <textarea id="features" value={features} onChange={e => setFeatures(e.target.value)} placeholder={t('playground.adCopyGenerator.featuresPlaceholder')} required rows={3} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                        <VoiceInputButton onTranscript={setFeatures} onError={setError} targetId="features" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="targetAudience">{t('playground.adCopyGenerator.targetAudienceLabel')}</label>
                    <div className="relative">
                        <input type="text" id="targetAudience" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder={t('playground.adCopyGenerator.targetAudiencePlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                        <VoiceInputButton onTranscript={setTargetAudience} onError={setError} targetId="targetAudience" />
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                    {isLoading ? t('playground.adCopyGenerator.generating') : t('playground.adCopyGenerator.generateButton')}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {result && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{t('playground.adCopyGenerator.outputTitle')}</h3>
                        <div className="flex gap-2">
                            {onSave && (
                                <button onClick={() => onSave(result)} className="bg-green-600 text-white text-sm py-1 px-3 rounded-md hover:bg-green-500">
                                    Usar este texto
                                </button>
                            )}
                            <button onClick={handleCopy} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied ? t('playground.adCopyGenerator.copied') : t('playground.adCopyGenerator.copyButton')}</button>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-md whitespace-pre-wrap font-mono text-sm max-h-96 overflow-y-auto">
                        {result.replace(/\*\*(.*?)\*\*/g, '<strong class="text-tech-cyan">$1</strong>').split('\n').map((line, i) => (
                          <p key={i} dangerouslySetInnerHTML={{ __html: line || ' ' }}/>
                        ))}
                    </div>
                </div>
            )}
            
            <TutorialModal 
                isOpen={isTutorialOpen} 
                onClose={() => setIsTutorialOpen(false)} 
                steps={tutorialSteps} 
                toolTitle={t('playground.adCopyGenerator.title')} 
            />
        </div>
    );
};

export default AdCopyGenerator;