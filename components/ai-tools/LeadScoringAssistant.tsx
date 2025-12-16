import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';
import TutorialModal, { TutorialStep } from '../TutorialModal';

const LeadScoringAssistant: React.FC = () => {
    const { t, language } = useLanguage();
    const [leadEmail, setLeadEmail] = useState('');
    const [leadSource, setLeadSource] = useState('Website Form');
    const [behavior, setBehavior] = useState('');
    const [emailEngagement, setEmailEngagement] = useState('');
    const [demographics, setDemographics] = useState('');
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');

    const tutorialSteps: TutorialStep[] = language === 'es' ? [
        {
            title: "Introduce los Datos del Lead",
            content: "Completa los campos con la información que tengas. El <strong>Email</strong> es opcional, pero la <strong>Fuente</strong> es clave (un referido vale más que un lead frío)."
        },
        {
            title: "Describe el Comportamiento",
            content: "¿Qué ha hecho en tu web? Ej: 'Visitó la página de precios 3 veces' o 'Usó la calculadora de hipotecas'. Estas son señales de alta intención."
        },
        {
            title: "Añade Contexto Demográfico",
            content: "Si sabes algo sobre su situación (ej. 'Pareja con hijos buscando colegio'), añádelo en el campo de datos demográficos. Ayuda a la IA a evaluar la urgencia."
        },
        {
            title: "Interpreta el Score",
            content: "La IA te dará una puntuación sobre 100 y una <strong>Prioridad</strong> (Alta, Media, Baja). Úsalo para decidir a quién llamas primero hoy."
        }
    ] : [
        {
            title: "Introduza os Dados do Lead",
            content: "Preencha os campos com a informação que tiver. O <strong>E-mail</strong> é opcional, mas a <strong>Fonte</strong> é chave (uma referência vale mais do que um lead frio)."
        },
        {
            title: "Descreva o Comportamento",
            content: "O que fez no seu site? Ex: 'Visitou a página de preços 3 vezes' ou 'Usou a calculadora de hipotecas'. Estes são sinais de alta intenção."
        },
        {
            title: "Adicione Contexto Demográfico",
            content: "Se souber algo sobre a sua situação (ex. 'Casal com filhos à procura de escola'), adicione-o no campo de dados demográficos. Ajuda a IA a avaliar a urgência."
        },
        {
            title: "Interprete o Score",
            content: "A IA dar-lhe-á uma pontuação sobre 100 e uma <strong>Prioridade</strong> (Alta, Média, Baixa). Use-o para decidir a quem ligar primeiro hoje."
        }
    ];

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
            
            const prompt = `
Eres un experto analista de ventas inmobiliarias especializado en la cualificación de leads. Tu tarea es analizar los datos proporcionados para un cliente potencial (lead) y generar una puntuación predictiva que indique su probabilidad de comprar una propiedad a corto plazo.

Considera estos factores para tu puntuación:
- Páginas de alta intención como /calculadora-hipoteca o páginas de propiedades específicas son más valiosas.
- Una alta interacción con los correos electrónicos es una señal muy positiva.
- Más tiempo en el sitio es generalmente mejor.
- Los referidos son la fuente de mayor calidad.
- Una coincidencia demográfica clara con un tipo de propiedad aumenta la puntuación.

**Datos del Lead:**
- Email: ${leadEmail}
- Fuente: ${leadSource}
- Comportamiento en la Web: ${behavior}
- Interacción con Emails: ${emailEngagement}
- Datos Demográficos y Notas: ${demographics}

**Formato de Salida Requerido (Markdown):**

### Lead Score: [Puntuación]/100
**Prioridad:** [Alta | Media | Baja]

---

#### Justificación del Score
[Un párrafo conciso explicando el razonamiento. Menciona los puntos positivos y negativos.]

---

#### Próximos Pasos Sugeridos
* [Acción 1: Ej. "Llamar inmediatamente. Mencionar la propiedad X que visitó 3 veces."]
* [Acción 2: Ej. "Añadir a la campaña de email para 'Compradores de 3 habitaciones'."]
* [Acción 3: Ej. "Enviar un análisis de mercado para la zona de interés."]
`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setResult(response.text);

        } catch (err) {
            console.error(err);
            setError(t('playground.common.error'));
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderContent = (text: string) => {
        const priorityRegex = /\*\*(Prioridad:)\*\* (Alta|Media|Baja)/;
        const match = text.match(priorityRegex);
        let priorityClass = '';
        if (match) {
            switch(match[2]) {
                case 'Alta': priorityClass = 'bg-red-500/30 text-red-300'; break;
                case 'Media': priorityClass = 'bg-yellow-500/30 text-yellow-300'; break;
                case 'Baja': priorityClass = 'bg-green-500/30 text-green-300'; break;
            }
        }

        return text
            .replace(/### (.*?)\n/g, '<h3 class="text-3xl font-bold font-poppins text-tech-cyan mb-2">$1</h3>')
            .replace(priorityRegex, `<span class="px-3 py-1 text-sm font-bold rounded-full ${priorityClass}">$2</span>`)
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-pure-white">$1</strong>')
            .replace(/#### (.*?)\n/g, '<h4 class="text-xl font-bold font-poppins text-pure-white mt-6 mb-3">$1</h4>')
            .replace(/^\* (.*$)/gm, '<li class="flex items-start"><span class="mr-3 text-tech-cyan mt-1">&#10148;</span><span>$1</span></li>')
            .replace(/---/g, '<hr class="border-gray-700 my-6" />')
            .split('\n')
            .map((line, i) => {
                 if (line.startsWith('<li')) {
                    return <ul key={i} className="space-y-2"><div dangerouslySetInnerHTML={{ __html: line }} /></ul>
                }
                return <div key={i} dangerouslySetInnerHTML={{ __html: line.replace(/>/,'><ul>').replace(/<\/ul><ul/g, '') || '&nbsp;' }} />
            });
    };

    return (
        <div>
            <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold font-poppins">{t('playground.leadScoringAssistant.title')}</h2>
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
            <p className="text-gray-400 mb-6">{t('playground.leadScoringAssistant.description')}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="leadEmail">{t('playground.leadScoringAssistant.leadEmailLabel')}</label>
                        <input type="email" id="leadEmail" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} placeholder={t('playground.leadScoringAssistant.leadEmailPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="leadSource">{t('playground.leadScoringAssistant.leadSourceLabel')}</label>
                        <select id="leadSource" value={leadSource} onChange={e => setLeadSource(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            <option>{t('playground.leadScoringAssistant.sourceOptionWebsite')}</option>
                            <option>{t('playground.leadScoringAssistant.sourceOptionSocial')}</option>
                            <option>{t('playground.leadScoringAssistant.sourceOptionReferral')}</option>
                            <option>{t('playground.leadScoringAssistant.sourceOptionColdCall')}</option>
                            <option>{t('playground.leadScoringAssistant.sourceOptionPortal')}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="behavior">{t('playground.leadScoringAssistant.behaviorLabel')}</label>
                    <textarea id="behavior" value={behavior} onChange={e => setBehavior(e.target.value)} placeholder={t('playground.leadScoringAssistant.behaviorPlaceholder')} rows={3} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="emailEngagement">{t('playground.leadScoringAssistant.emailEngagementLabel')}</label>
                    <textarea id="emailEngagement" value={emailEngagement} onChange={e => setEmailEngagement(e.target.value)} placeholder={t('playground.leadScoringAssistant.emailEngagementPlaceholder')} rows={2} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="demographics">{t('playground.leadScoringAssistant.demographicsLabel')}</label>
                    <textarea id="demographics" value={demographics} onChange={e => setDemographics(e.target.value)} placeholder={t('playground.leadScoringAssistant.demographicsPlaceholder')} rows={3} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                    {isLoading ? t('playground.leadScoringAssistant.generating') : t('playground.leadScoringAssistant.generateButton')}
                </button>
            </form>
            
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            
            {isLoading && (
                <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-md mt-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue mb-4"></div>
                    <p className="text-gray-300">{t('playground.leadScoringAssistant.generating')}</p>
                </div>
            )}
            
            {result && !isLoading && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold font-poppins text-center mb-6">{t('playground.leadScoringAssistant.outputTitle')}</h3>
                    <div className="bg-gray-800/50 p-6 rounded-lg prose prose-invert max-w-none">
                        {renderContent(result)}
                    </div>
                </div>
            )}

            <TutorialModal 
                isOpen={isTutorialOpen} 
                onClose={() => setIsTutorialOpen(false)} 
                steps={tutorialSteps} 
                toolTitle={t('playground.leadScoringAssistant.title')} 
            />
        </div>
    );
};

export default LeadScoringAssistant;