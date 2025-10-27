import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';
import PromptManager from './PromptManager';
import VoiceInputButton from './VoiceInputButton';

const defaultBioPrompt = {
    name: "Optimizador de Biografía Estándar",
    content: `
Eres un experto en branding personal y copywriting para profesionales. Crea tres versiones de una biografía profesional para un agente inmobiliario con la siguiente información. Adapta cada biografía al tono solicitado.

**Información del Agente:**
- Años de experiencia: {{experience}}
- Área de especialización: {{specialization}}
- Logros y premios: {{achievements}}
- Filosofía de trabajo: {{philosophy}}
- Tono deseado: {{tone}}

**Formato de Salida Requerido:**

### Biografía Corta (para Redes Sociales)
[Un párrafo conciso y directo, ideal para perfiles de Twitter o Instagram. Máximo 280 caracteres.]

---

### Biografía Media (para Portales Inmobiliarios)
[Uno o dos párrafos, destacando la experiencia y especialización. Ideal para perfiles en portales como Idealista, Zillow, etc.]

---

### Biografía Larga (para Página Web)
[Varios párrafos detallados, contando una historia sobre la trayectoria, la filosofía y los logros del agente. Tono más personal y completo.]
`
};

const BioOptimizer: React.FC = () => {
    const { t } = useLanguage();
    const [experience, setExperience] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [achievements, setAchievements] = useState('');
    const [philosophy, setPhilosophy] = useState('');
    const [tone, setTone] = useState('Profesional y formal');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [bios, setBios] = useState<{ short: string, medium: string, long: string } | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [activePrompt, setActivePrompt] = useState(defaultBioPrompt.content);

    const handlePromptChange = useCallback((newPrompt: string) => {
        setActivePrompt(newPrompt);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setBios(null);

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError("Error de configuración: La clave de API para los servicios de IA no está disponible. Póngase en contacto con el soporte.");
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
             const finalPrompt = activePrompt
                .replace('{{experience}}', experience)
                .replace('{{specialization}}', specialization)
                .replace('{{achievements}}', achievements)
                .replace('{{philosophy}}', philosophy)
                .replace('{{tone}}', tone);

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: finalPrompt,
            });
            
            const text = response.text;
            const parts = text.split('---');
            
            const shortBioMatch = text.match(/### Biografía Corta \(para Redes Sociales\)([\s\S]*?)### Biografía Media/);
            const mediumBioMatch = text.match(/### Biografía Media \(para Portales Inmobiliarios\)([\s\S]*?)### Biografía Larga/);
            const longBioMatch = text.match(/### Biografía Larga \(para Página Web\)([\s\S]*)/);
            
            const shortBio = shortBioMatch ? shortBioMatch[1].trim() : (parts[0]?.replace('### Biografía Corta (para Redes Sociales)', '').trim() || '');
            const mediumBio = mediumBioMatch ? mediumBioMatch[1].trim() : (parts[1]?.replace('### Biografía Media (para Portales Inmobiliarios)', '').trim() || '');
            const longBio = longBioMatch ? longBioMatch[1].trim() : (parts[2]?.replace('### Biografía Larga (para Página Web)', '').trim() || '');
            
            setBios({ short: shortBio, medium: mediumBio, long: longBio });

        } catch (err) {
            console.error(err);
            setError(t('playground.common.error'));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = (text: string, type: 'short' | 'medium' | 'long') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.bioOptimizer.title')}</h2>
            <p className="text-gray-400 mb-6">{t('playground.bioOptimizer.description')}</p>
            
            <PromptManager
                toolKey='bioOptimizer'
                defaultPrompt={defaultBioPrompt}
                onPromptChange={handlePromptChange}
                variables={['experience', 'specialization', 'achievements', 'philosophy', 'tone']}
                warningText={t('playground.promptManager.warningText')}
            />
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="experience">{t('playground.bioOptimizer.experienceLabel')}</label>
                        <input type="number" id="experience" value={experience} onChange={e => setExperience(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="specialization">{t('playground.bioOptimizer.specializationLabel')}</label>
                        <div className="relative">
                            <input type="text" id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} placeholder={t('playground.bioOptimizer.specializationPlaceholder')} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                            <VoiceInputButton onTranscript={setSpecialization} onError={setError} targetId="specialization" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="achievements">{t('playground.bioOptimizer.achievementsLabel')}</label>
                    <div className="relative">
                        <textarea id="achievements" value={achievements} onChange={e => setAchievements(e.target.value)} placeholder={t('playground.bioOptimizer.achievementsPlaceholder')} rows={2} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                        <VoiceInputButton onTranscript={setAchievements} onError={setError} targetId="achievements" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="philosophy">{t('playground.bioOptimizer.philosophyLabel')}</label>
                    <div className="relative">
                        <textarea id="philosophy" value={philosophy} onChange={e => setPhilosophy(e.target.value)} placeholder={t('playground.bioOptimizer.philosophyPlaceholder')} rows={2} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue" />
                        <VoiceInputButton onTranscript={setPhilosophy} onError={setError} targetId="philosophy" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="tone">{t('playground.bioOptimizer.toneLabel')}</label>
                    <select id="tone" value={tone} onChange={e => setTone(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                        <option value="Profesional y formal">{t('playground.bioOptimizer.toneOptionProfessional')}</option>
                        <option value="Cercano y amigable">{t('playground.bioOptimizer.toneOptionFriendly')}</option>
                        <option value="Moderno y tecnológico">{t('playground.bioOptimizer.toneOptionModern')}</option>
                    </select>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                    {isLoading ? t('playground.bioOptimizer.generating') : t('playground.bioOptimizer.generateButton')}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {isLoading && (
                <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-md mt-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue mb-4"></div>
                    <p className="text-gray-300">{t('playground.bioOptimizer.generating')}</p>
                </div>
            )}
            {bios && !isLoading && (
                <div className="mt-8 space-y-8">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{t('playground.bioOptimizer.shortBioTitle')}</h3>
                            <button onClick={() => handleCopy(bios.short, 'short')} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied === 'short' ? t('playground.bioOptimizer.copied') : t('playground.bioOptimizer.copyButton')}</button>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-md text-gray-300">{bios.short}</div>
                    </div>
                     <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{t('playground.bioOptimizer.mediumBioTitle')}</h3>
                            <button onClick={() => handleCopy(bios.medium, 'medium')} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied === 'medium' ? t('playground.bioOptimizer.copied') : t('playground.bioOptimizer.copyButton')}</button>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-md text-gray-300 whitespace-pre-wrap">{bios.medium}</div>
                    </div>
                     <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{t('playground.bioOptimizer.longBioTitle')}</h3>
                            <button onClick={() => handleCopy(bios.long, 'long')} className="bg-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-600">{copied === 'long' ? t('playground.bioOptimizer.copied') : t('playground.bioOptimizer.copyButton')}</button>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-md text-gray-300 whitespace-pre-wrap">{bios.long}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BioOptimizer;