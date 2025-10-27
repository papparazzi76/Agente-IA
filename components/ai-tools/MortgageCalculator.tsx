import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';

const MortgageCalculator: React.FC = () => {
    const { t } = useLanguage();
    const [price, setPrice] = useState('');
    const [financing, setFinancing] = useState('80');
    const [term, setTerm] = useState('30');
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
            
            const prompt = `
Actúa como un asesor financiero especializado en hipotecas. Basándote en los siguientes datos, calcula una cuota mensual **aproximada** y sugiere 2-3 productos financieros. Asume un tipo de interés de mercado actual realista para la zona (España/Portugal).

**Datos de la simulación:**
- Precio de la propiedad: ${price}
- Porcentaje de financiación: ${financing}%
- Plazo del préstamo: ${term} años

**Formato de Salida Requerido (Markdown):**

### Simulación Hipotecaria

#### Cuota Mensual Estimada
**~[Cuota Mensual]**

---

#### Sugerencias de Productos Financieros

1.  **[Nombre del Producto 1, ej. Hipoteca a Tipo Fijo]**
    *   **Pros:** [Breve explicación de las ventajas, ej. 'Cuota estable, seguridad ante subidas de tipos...']
    *   **Contras:** [Breve explicación de las desventajas, ej. 'Suele tener una cuota inicial más alta...']

2.  **[Nombre del Producto 2, ej. Hipoteca a Tipo Variable]**
    *   **Pros:** [Breve explicación]
    *   **Contras:** [Breve explicación]

---

**Aviso Legal:**
*Esta es una simulación generada por IA y no constituye asesoramiento financiero. Los tipos de interés y las condiciones pueden variar. Consulta siempre con una entidad bancaria o un asesor profesional.*
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

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="price">{t('playground.mortgageCalculator.priceLabel')}</label>
                    <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder={t('playground.mortgageCalculator.pricePlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="financing">{t('playground.mortgageCalculator.financingLabel')}</label>
                        <select id="financing" value={financing} onChange={e => setFinancing(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            <option value="100">100%</option>
                            <option value="90">90%</option>
                            <option value="80">80%</option>
                            <option value="70">70%</option>
                            <option value="60">60%</option>
                            <option value="50">50%</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="term">{t('playground.mortgageCalculator.termLabel')}</label>
                        <select id="term" value={term} onChange={e => setTerm(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            <option value="30">30 {t('playground.mortgageCalculator.years')}</option>
                            <option value="25">25 {t('playground.mortgageCalculator.years')}</option>
                            <option value="20">20 {t('playground.mortgageCalculator.years')}</option>
                            <option value="15">15 {t('playground.mortgageCalculator.years')}</option>
                            <option value="10">10 {t('playground.mortgageCalculator.years')}</option>
                        </select>
                    </div>
                </div>
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