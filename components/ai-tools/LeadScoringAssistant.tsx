import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';

const LeadScoringAssistant: React.FC = () => {
    const { t } = useLanguage();
    const [leadEmail, setLeadEmail] = useState('');
    const [leadSource, setLeadSource] = useState('Website Form');
    const [behavior, setBehavior] = useState('');
    const [emailEngagement, setEmailEngagement] = useState('');
    const [demographics, setDemographics] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');

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
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.leadScoringAssistant.title')}</h2>
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
        </div>
    );
};

export default LeadScoringAssistant;