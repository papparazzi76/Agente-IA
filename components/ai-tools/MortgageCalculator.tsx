import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';

const MortgageCalculator: React.FC = () => {
    const { t, language } = useLanguage();
    const [price, setPrice] = useState('');
    const [financing, setFinancing] = useState('80');
    const [term, setTerm] = useState('30');
    
    const [interestType, setInterestType] = useState<'fixed' | 'variable' | 'mixed'>('fixed');
    const [fixedRate, setFixedRate] = useState('');
    const [euribor, setEuribor] = useState('3.75');
    const [spread, setSpread] = useState('');
    
    const [mixedFixedPeriod, setMixedFixedPeriod] = useState('10');
    const [mixedFixedRate, setMixedFixedRate] = useState('');
    const [mixedVariableSpread, setMixedVariableSpread] = useState('');

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
            setError(t('playground.common.error'));
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
            
            let interestDetails = '';
            switch (interestType) {
                case 'fixed':
                    interestDetails = `Tipo de interés: Fijo, al ${fixedRate}%.`;
                    break;
                case 'variable':
                    interestDetails = `Tipo de interés: Variable, con Euribor al ${euribor}% + un diferencial del ${spread}%.`;
                    break;
                case 'mixed':
                    interestDetails = `Tipo de interés: Mixto. Los primeros ${mixedFixedPeriod} años a un tipo fijo del ${mixedFixedRate}%. El resto del plazo a tipo variable con Euribor al ${euribor}% + un diferencial del ${mixedVariableSpread}%.`;
                    break;
            }
            
            const prompt = `
Actúa como un experto asesor financiero especializado en hipotecas en ${language === 'es' ? 'España' : 'Portugal'}. Tu tarea es calcular la cuota mensual de una hipoteca basándote en los datos proporcionados y ofrecer un análisis claro y profesional.

**Datos de la simulación:**
- Precio de la propiedad: ${price}
- Porcentaje de financiación: ${financing}%
- Plazo del préstamo: ${term} años
- Detalles del interés: ${interestDetails}

**Instrucciones de cálculo:**
1.  Calcula el capital solicitado (Precio * % Financiación).
2.  Utiliza la fórmula estándar de amortización de préstamos (sistema francés) para calcular la cuota mensual. Para el interés, usa el valor proporcionado.
3.  Para la hipoteca **variable**, la cuota inicial se calcula con el Euribor actual más el diferencial.
4.  Para la hipoteca **mixta**, calcula la cuota durante el período fijo y luego una **estimación** de la cuota para el período variable usando el Euribor actual. Debes explicar claramente que esta segunda cuota es una simulación y variará en el futuro.

**Formato de Salida Requerido (Markdown):**

### Simulación Hipotecaria

#### Resumen de la Operación
*   **Capital Solicitado:** [Calcula y muestra el capital]
*   **Tipo de Interés:** [Resume el tipo de interés]
*   **Plazo Total:** ${term} años

---

#### Cuota/s Mensual/es Estimada/s
[Aquí va la parte principal. Sé muy claro.]
[Si es FIJA, muestra una única cuota: **~[Cuota Mensual Fija]**]
[Si es VARIABLE, muestra la cuota inicial: **~[Cuota Mensual Inicial]** y añade una nota explicando que se revisará periódicamente según el Euribor.]
[Si es MIXTA, muestra ambas cuotas:
    *   **Cuota durante los primeros ${mixedFixedPeriod} años (Fija): ~[Cuota Mensual Fija]**
    *   **Cuota estimada para el resto del plazo (Variable): ~[Cuota Mensual Variable Estimada]**
    Y añade una nota explicando la revisión futura.]

---

#### Análisis del Asesor
[Un breve párrafo analizando la opción elegida. Por ejemplo, si es fija, hablar de la seguridad. Si es variable, del riesgo y la oportunidad. Si es mixta, del equilibrio inicial.]

---

**Aviso Legal:**
*Esta es una simulación generada por IA y no constituye asesoramiento financiero. Los cálculos son aproximados y las condiciones del mercado pueden variar. Consulta siempre con una entidad bancaria o un asesor profesional.*
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
        return text
            .replace(/### (.*?)\n/g, '<h3 class="text-2xl font-bold font-poppins text-tech-cyan mb-2">$1</h3>')
            .replace(/#### (.*?)\n/g, '<h4 class="text-xl font-bold text-pure-white mt-4 mb-2">$1</h4>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
            .replace(/---/g, '<hr class="border-gray-700 my-6" />')
            .split('\n')
            .map((line, i) => {
                let processedLine = line;
                if (processedLine.trim().startsWith('*')) {
                    return <li key={i} className="flex items-start ml-4"><span className="mr-3 text-tech-cyan mt-1">&#8226;</span><span dangerouslySetInnerHTML={{ __html: processedLine.replace(/^\*\s?/, '') }} /></li>;
                }
                 if (/^\d\.\s/.test(processedLine.trim())) {
                    return <h5 key={i} className="text-lg font-bold text-pure-white mt-4" dangerouslySetInnerHTML={{ __html: processedLine }} />;
                }
                return <p key={i} dangerouslySetInnerHTML={{ __html: processedLine || '&nbsp;' }} />
            });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.mortgageCalculator.title')}</h2>
            <p className="text-gray-400 mb-6">{t('playground.mortgageCalculator.description')}</p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="price">{t('playground.mortgageCalculator.priceLabel')}</label>
                    <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder={t('playground.mortgageCalculator.pricePlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="financing">{t('playground.mortgageCalculator.financingLabel')}</label>
                        <select id="financing" value={financing} onChange={e => setFinancing(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            {[100, 90, 80, 70, 60, 50].map(v => <option key={v} value={v}>{v}%</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="term">{t('playground.mortgageCalculator.termLabel')}</label>
                        <select id="term" value={term} onChange={e => setTerm(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            {[30, 25, 20, 15, 10].map(v => <option key={v} value={v}>{v} {t('playground.mortgageCalculator.years')}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('playground.mortgageCalculator.interestTypeLabel')}</label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {['fixed', 'variable', 'mixed'].map((type) => (
                            <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="interestType"
                                    value={type}
                                    checked={interestType === type}
                                    onChange={() => setInterestType(type as 'fixed' | 'variable' | 'mixed')}
                                    className="h-4 w-4 text-tech-cyan bg-gray-700 border-gray-600 focus:ring-tech-cyan"
                                />
                                <span>{t(`playground.mortgageCalculator.type${type.charAt(0).toUpperCase() + type.slice(1)}`)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {interestType === 'fixed' && (
                    <div className="animate-fadeIn">
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="fixedRate">{t('playground.mortgageCalculator.interestRateLabel')}</label>
                        <input type="number" step="0.01" id="fixedRate" value={fixedRate} onChange={e => setFixedRate(e.target.value)} placeholder={t('playground.mortgageCalculator.interestRatePlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                )}
                {interestType === 'variable' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                         <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="euribor">{t('playground.mortgageCalculator.euriborLabel')}</label>
                            <input type="number" step="0.01" id="euribor" value={euribor} onChange={e => setEuribor(e.target.value)} placeholder={t('playground.mortgageCalculator.euriborPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="spread">{t('playground.mortgageCalculator.spreadLabel')}</label>
                            <input type="number" step="0.01" id="spread" value={spread} onChange={e => setSpread(e.target.value)} placeholder={t('playground.mortgageCalculator.spreadPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                        </div>
                    </div>
                )}
                {interestType === 'mixed' && (
                     <div className="space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="mixedFixedPeriod">{t('playground.mortgageCalculator.fixedPeriodLabel')}</label>
                                <select id="mixedFixedPeriod" value={mixedFixedPeriod} onChange={e => setMixedFixedPeriod(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                                    {[1, 2, 3, 5, 10].map(v => <option key={v} value={v}>{v} {t('playground.mortgageCalculator.years')}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="mixedFixedRate">{t('playground.mortgageCalculator.fixedRateLabel')}</label>
                                <input type="number" step="0.01" id="mixedFixedRate" value={mixedFixedRate} onChange={e => setMixedFixedRate(e.target.value)} placeholder={t('playground.mortgageCalculator.interestRatePlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="mixedEuribor">{t('playground.mortgageCalculator.euriborLabel')}</label>
                                <input type="number" step="0.01" id="mixedEuribor" value={euribor} onChange={e => setEuribor(e.target.value)} placeholder={t('playground.mortgageCalculator.euriborPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="mixedVariableSpread">{t('playground.mortgageCalculator.variableSpreadLabel')}</label>
                                <input type="number" step="0.01" id="mixedVariableSpread" value={mixedVariableSpread} onChange={e => setMixedVariableSpread(e.target.value)} placeholder={t('playground.mortgageCalculator.spreadPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                            </div>
                        </div>
                    </div>
                )}


                <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                    {isLoading ? t('playground.mortgageCalculator.calculating') : t('playground.mortgageCalculator.calculateButton')}
                </button>
            </form>
            
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            
            {isLoading && (
                <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-md mt-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue mb-4"></div>
                    <p className="text-gray-300">{t('playground.mortgageCalculator.calculating')}</p>
                </div>
            )}
            
            {result && !isLoading && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold font-poppins text-center mb-6">{t('playground.mortgageCalculator.outputTitle')}</h3>
                    <div className="bg-gray-800/50 p-6 rounded-lg prose prose-invert max-w-none">
                        {renderContent(result)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MortgageCalculator;