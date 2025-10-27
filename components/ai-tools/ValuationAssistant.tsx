import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';
import PromptManager from './PromptManager';
import VoiceInputButton from './VoiceInputButton';

const defaultValuationPrompt = {
    name: "Informe de Valoración Estándar",
    content: `
Eres un analista inmobiliario experto. Realiza un Análisis Comparativo de Mercado (CMA) preliminar para la siguiente propiedad. Genera un informe estructurado en formato Markdown. El informe debe ser realista pero basado en datos ficticios para los comparables.

**Datos de la Propiedad:**
- Dirección: {{address}}
- Tipo: {{propertyType}}
- Superficie: {{area}} m²
- Habitaciones: {{bedrooms}}
- Baños: {{bathrooms}}
- Estado: {{condition}}
- Características Extra: {{features}}

**Formato del Informe Requerido:**

### Rango de Precio Estimado
**[precio_minimo] - [precio_maximo]**

### Resumen del Análisis
[Un párrafo explicando los factores clave considerados para la valoración, como la ubicación, el estado, la demanda en la zona y las características únicas.]

### Propiedades Comparables (Testigos Ficticios)
1. **[Tipo de propiedad similar] en [zona cercana]**
   - **Vendido por:** [Precio de venta]
   - **Datos:** [X hab, Y baños, Z m²]
   - **Similitud:** [Breve explicación de por qué es comparable, ej: 'similar en tamaño y estado, vendido hace 2 meses']

2. **[Tipo de propiedad similar] en [zona cercana]**
   - **Vendido por:** [Precio de venta]
   - **Datos:** [X hab, Y baños, Z m²]
   - **Similitud:** [Breve explicación]

3. **[Tipo de propiedad similar] en [zona cercana]**
   - **Vendido por:** [Precio de venta]
   - **Datos:** [X hab, Y baños, Z m²]
   - **Similitud:** [Breve explicación]

**Aviso Legal:**
*Esta es una valoración preliminar generada por IA y no sustituye a una tasación profesional.*
`
};

interface ValuationAssistantProps {
    initialData?: {
        address: string;
        propertyType: string;
        area: string;
        bedrooms: string;
        bathrooms: string;
        features: string;
    };
    onSave?: (summary: string) => void;
}

const ValuationAssistant: React.FC<ValuationAssistantProps> = ({ initialData, onSave }) => {
    const { t } = useLanguage();
    const [address, setAddress] = useState('');
    const [propertyType, setPropertyType] = useState('Piso');
    const [area, setArea] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [condition, setCondition] = useState('Buen estado');
    const [features, setFeatures] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);
    const [activePrompt, setActivePrompt] = useState(defaultValuationPrompt.content);

    useEffect(() => {
        if(initialData) {
            setAddress(initialData.address || '');
            setPropertyType(initialData.propertyType || 'Piso');
            setArea(initialData.area || '');
            setBedrooms(initialData.bedrooms || '');
            setBathrooms(initialData.bathrooms || '');
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
                .replace('{{address}}', address)
                .replace('{{propertyType}}', propertyType)
                .replace('{{area}}', area)
                .replace('{{bedrooms}}', bedrooms)
                .replace('{{bathrooms}}', bathrooms)
                .replace('{{condition}}', condition)
                .replace('{{features}}', features);
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
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
    
    const handleCopyAndSave = () => {
        const summaryMatch = result.match(/### Resumen del Análisis\n\n([\s\S]*?)\n\n###/);
        const summary = summaryMatch ? summaryMatch[1] : result;
        navigator.clipboard.writeText(summary);
        setCopied(true);
        if (onSave) {
            onSave(summary);
        }
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = (text: string) => {
        return text
            .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-pure-white mt-4 mb-2">$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-tech-cyan">$1</strong>')
            .replace(/^\d+\.\s/gm, (match) => `<br>${match}`)
            .split('\n')
            .map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/^- |^\* /g, '• ') || '&nbsp;' }} />
            ));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.valuationAssistant.title')}</h2>
            <p className="text-gray-400 mb-6">{t('playground.valuationAssistant.description')}</p>

            <PromptManager
                toolKey='valuationAssistant'
                defaultPrompt={defaultValuationPrompt}
                onPromptChange={handlePromptChange}
                variables={['address', 'propertyType', 'area', 'bedrooms', 'bathrooms', 'condition', 'features']}
                warningText={t('playground.promptManager.warningText')}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="address">{t('playground.valuationAssistant.addressLabel')}</label>
                    <div className="relative">
                        <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder={t('playground.valuationAssistant.addressPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                        <VoiceInputButton onTranscript={setAddress} onError={setError} targetId="address" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="propertyType">{t('playground.valuationAssistant.propertyTypeLabel')}</label>
                        <select id="propertyType" value={propertyType} onChange={e => setPropertyType(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            <option value="Piso">{t('playground.valuationAssistant.propertyTypeOptionFlat')}</option>
                            <option value="Chalet">{t('playground.valuationAssistant.propertyTypeOptionHouse')}</option>
                            <option value="Adosado">{t('playground.valuationAssistant.propertyTypeOptionTownhouse')}</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="area">{t('playground.valuationAssistant.areaLabel')}</label>
                        <input type="number" id="area" value={area} onChange={e => setArea(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="bedrooms">{t('playground.valuationAssistant.bedroomsLabel')}</label>
                        <input type="number" id="bedrooms" value={bedrooms} onChange={e => setBedrooms(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="bathrooms">{t('playground.valuationAssistant.bathroomsLabel')}</label>
                        <input type="number" id="bathrooms" value={bathrooms} onChange={e => setBathrooms(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="condition">{t('playground.valuationAssistant.conditionLabel')}</label>
                         <select id="condition" value={condition} onChange={e => setCondition(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            <option value="A reformar">{t('playground.valuationAssistant.conditionOptionToRenovate')}</option>
                            <option value="Buen estado">{t('playground.valuationAssistant.conditionOptionGood')}</option>
                            <option value="Reformado">{t('playground.valuationAssistant.conditionOptionRenovated')}</option>
                            <option value="Nuevo">{t('playground.valuationAssistant.conditionOptionNew')}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="features">{t('playground.valuationAssistant.featuresLabel')}</label>
                    <div className="relative">
                        <textarea id="features" value={features} onChange={e => setFeatures(e.target.value)} placeholder={t('playground.valuationAssistant.featuresPlaceholder')} rows={2} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                        <VoiceInputButton onTranscript={setFeatures} onError={setError} targetId="features" />
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                    {isLoading ? t('playground.valuationAssistant.generating') : t('playground.valuationAssistant.generateButton')}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
             {isLoading && (
                <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-md mt-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue mb-4"></div>
                    <p className="text-gray-300">{t('playground.valuationAssistant.generating')}</p>
                </div>
            )}
            {result && !isLoading && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{t('playground.valuationAssistant.outputTitle')}</h3>
                        <button onClick={handleCopyAndSave} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied ? t('playground.valuationAssistant.copied') : (onSave ? "Guardar y Copiar Resumen" : t('playground.valuationAssistant.copySummaryButton'))}</button>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-md prose prose-invert max-w-none max-h-96 overflow-y-auto">
                        {renderContent(result)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ValuationAssistant;