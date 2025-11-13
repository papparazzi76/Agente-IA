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

type EmailMode = 'compose' | 'reply';

const EmailComposer: React.FC = () => {
    const { t } = useLanguage();
    const [mode, setMode] = useState<EmailMode>('compose');

    // State for 'compose' mode
    const [emailType, setEmailType] = useState('followUp');
    const [clientName, setClientName] = useState('');
    const [propertyDetails, setPropertyDetails] = useState('');

    // State for 'reply' mode
    const [receivedEmail, setReceivedEmail] = useState('');
    const [tone, setTone] = useState('professional');
    const [objective, setObjective] = useState('answer');

    // Common state
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
            setError(t('playground.common.error'));
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
            let finalPrompt = '';

            if (mode === 'compose') {
                let promptInstruction = '';
                switch (emailType) {
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
                finalPrompt = activePrompt.replace('{{instruction}}', promptInstruction);
            } else { // 'reply' mode
                const replyPromptTemplate = `
Actúa como un experto agente inmobiliario con excelentes habilidades de comunicación. Tu tarea es redactar una respuesta profesional y efectiva a un email recibido.

**Email recibido al que debes responder:**
"""
{{receivedEmail}}
"""

**Instrucciones para tu respuesta:**
- **Objetivo Principal:** {{responseObjective}}
- **Tono a utilizar:** {{responseTone}}

Basándote en estas instrucciones, redacta el cuerpo del email de respuesta. No incluyas un asunto. Sé claro, conciso y adáptate al tono solicitado.
`;
                const toneKey = `playground.emailComposer.tone${tone.charAt(0).toUpperCase() + tone.slice(1)}`;
                const objectiveKey = `playground.emailComposer.objective${objective.charAt(0).toUpperCase() + objective.slice(1)}`;

                finalPrompt = replyPromptTemplate
                    .replace('{{receivedEmail}}', receivedEmail)
                    .replace('{{responseObjective}}', t(objectiveKey))
                    .replace('{{responseTone}}', t(toneKey));
            }

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

    const renderResult = () => (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{t('playground.emailComposer.outputTitle')}</h3>
                {result && !isLoading && <button onClick={handleCopy} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied ? t('playground.emailComposer.copied') : t('playground.emailComposer.copyButton')}</button>}
            </div>
            <textarea value={result} readOnly placeholder={isLoading ? t('playground.emailComposer.generating') : ''} className="w-full h-64 bg-gray-800/50 p-4 rounded-md font-sans text-base whitespace-pre-wrap" />
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.emailComposer.title')}</h2>
            <p className="text-gray-400 mb-6">{t('playground.emailComposer.description')}</p>
            
            <div className="mb-6 flex justify-center border-b border-gray-700">
                <button
                    onClick={() => setMode('compose')}
                    className={`px-6 py-3 font-semibold transition-colors ${mode === 'compose' ? 'border-b-2 border-tech-cyan text-pure-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {t('playground.emailComposer.modeCompose')}
                </button>
                <button
                    onClick={() => setMode('reply')}
                    className={`px-6 py-3 font-semibold transition-colors ${mode === 'reply' ? 'border-b-2 border-tech-cyan text-pure-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {t('playground.emailComposer.modeReply')}
                </button>
            </div>

            {mode === 'compose' ? (
                <div className="animate-fadeIn">
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
                </div>
            ) : (
                <div className="animate-fadeIn">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="receivedEmail">{t('playground.emailComposer.receivedEmailLabel')}</label>
                            <textarea id="receivedEmail" value={receivedEmail} onChange={e => setReceivedEmail(e.target.value)} placeholder={t('playground.emailComposer.receivedEmailPlaceholder')} required rows={7} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="tone">{t('playground.emailComposer.toneLabel')}</label>
                                <select id="tone" value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                                    <option value="professional">{t('playground.emailComposer.toneProfessional')}</option>
                                    <option value="friendly">{t('playground.emailComposer.toneFriendly')}</option>
                                    <option value="firm">{t('playground.emailComposer.toneFirm')}</option>
                                    <option value="conciliatory">{t('playground.emailComposer.toneConciliatory')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="objective">{t('playground.emailComposer.objectiveLabel')}</label>
                                <select id="objective" value={objective} onChange={e => setObjective(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                                    <option value="answer">{t('playground.emailComposer.objectiveAnswer')}</option>
                                    <option value="accept">{t('playground.emailComposer.objectiveAccept')}</option>
                                    <option value="reject">{t('playground.emailComposer.objectiveReject')}</option>
                                    <option value="requestInfo">{t('playground.emailComposer.objectiveRequestInfo')}</option>
                                    <option value="confirm">{t('playground.emailComposer.objectiveConfirm')}</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                            {isLoading ? t('playground.emailComposer.generating') : t('playground.emailComposer.generateButton')}
                        </button>
                    </form>
                </div>
            )}
            
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {(result || isLoading) && renderResult()}
        </div>
    );
};

export default EmailComposer;