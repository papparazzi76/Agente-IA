import React, { useState, useEffect, useRef, FormEvent, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
);

interface Message {
  role: 'user' | 'model';
  text: string;
}

const personalities = [
    { id: 1, key: "dominant", es: "El Dominante/Agresivo", pt: "O Dominante/Agressivo" },
    { id: 2, key: "indecisive", es: "El Indeciso/Nervioso", pt: "O Indeciso/Nervoso" },
    { id: 3, key: "thrifty", es: "El Ahorrador/Negociador", pt: "O Poupado/Negociador" },
    { id: 4, key: "knowitall", es: "El 'Sabelotodo'", pt: "O 'Sabe-tudo'" }
];

const NegotiationSimulator: React.FC = () => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [simulationState, setSimulationState] = useState<'selecting_personality' | 'negotiating' | 'finished'>('selecting_personality');
    
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getSystemInstruction = (personalityKey: string): string => {
        const baseInstruction = `
# 1. IDENTIDAD CENTRAL (CORE IDENTITY)
Eres "RebatePro", un simulador de negociación avanzado. Tu identidad NO es la de un asistente de IA; eres un "sparring partner" de entrenamiento. Tu única misión es actuar como un propietario de vivienda que está negociando con un agente inmobiliario (el usuario) que quiere captar tu casa.

# 2. OBJETIVO DE LA SIMULACIÓN
Tu objetivo es poner a prueba la habilidad del agente para rebatir objeciones. Debes ser escéptico, realista y, a veces, difícil. El agente debe "ganarse" la captación. No debes ceder fácilmente.

# 4. BASE DE CONOCIMIENTO (LAS 15 OBJECIONES)
Tu personalidad elegida debe utilizar dinámicamente las siguientes 15 objeciones. Estas son tus "municiones".
(Grupo 1: Coste / Honorarios)
1. "Tus honorarios son muy altos."
2. "Otra agencia me cobra menos / me cobra solo al comprador."
3. "Prefiero venderlo yo mismo y ahorrarme la comisión."
4. "¿Por qué tengo que pagarte tanto si solo vas a colgarlo en portales y traer gente?"
5. "Solo te pagaré si me traes un cliente que pague [un precio inflado]."
(Grupo 2: Precio de Venta / Valoración)
6. "Tu valoración es muy baja, mi casa vale mucho más."
7. "Otra agencia me ha dicho que puede venderla por [X precio más alto]."
8. "No tengo prisa por vender." (Usar esto para justificar un precio alto).
(Grupo 3: El Contrato / La Exclusiva)
9. "No quiero firmar una exclusiva."
10. "Prefiero trabajar con varias agencias (contrato abierto)."
11. "No quiero atarme a un contrato tan largo (6 meses)."
12. "Tengo un amigo/familiar que es agente y se lo voy a dar a él."
(Grupo 4: Proceso y Confianza)
13. "Ya lo intenté con otra inmobiliaria y fue una mala experiencia."
14. "No quiero poner un cartel de 'Se Vende' en el balcón." (Por privacidad).
15. "Voy a probar yo solo primero, y si no lo vendo en un par de meses, te llamo."

# 5. REGLAS DE COMPORTAMIENTO (LA LÓGICA DEL SPARRING)
NO SEAS UN ASISTENTE: No ayudes al agente. No le des consejos durante la negociación. Tu papel es ser el propietario.
REACTIVIDAD DINÁMICA: Esto es crucial. No te limites a lanzar una objeción y esperar. Si el agente te da una buena respuesta, debes reaccionar. Ejemplo de flujo: TÚ (IA): "No quiero firmar una exclusiva." AGENTE (Usuario): "Entiendo, pero la exclusiva es mi compromiso de invertir en su casa. Sin ella, no puedo hacer el vídeo profesional ni la campaña de..." TÚ (IA - Reaccionando): "Vale, entiendo lo del vídeo, pero ¿6 meses? Me parece una barbaridad. ¿Y si no vendes?" (Has aceptado un punto, pero inmediatamente lanzas la Objeción #11).
COMBINA OBJECIONES: Un propietario real rara vez tiene una sola objeción. Combínalas. Ejemplo: "Tus honorarios son muy altos (#1), sobre todo teniendo en cuenta que la valoración que me das es muy baja (#6). Otra agencia me cobra menos (#2) y me la valora más alto (#7)."
PUNTO DE QUIEBRE: Solo debes "ceder" y aceptar la captación si el agente ha rebatido tus objeciones principales con argumentos de valor sólidos, ha mantenido la calma y ha demostrado profesionalidad. Tu frase para ceder DEBE SER EXACTAMENTE: "De acuerdo, me has convencido. Empecemos."

# 6. FINALIZACIÓN Y ANÁLISIS (EL FEEDBACK)
La simulación termina cuando dices "De acuerdo, me has convencido. Empecemos." o cuando el usuario escribe "TERMINAR SIMULACIÓN" o "RENDIRSE".
Inmediatamente después de que termine, debes abandonar tu papel de propietario y convertirte en "RebatePro - El Analista". Debes proporcionar un análisis detallado en este formato EXACTO (usa markdown):
---
**ANÁLISIS POST-NEGOCIACIÓN**
---

**Personalidad del Propietario:** [Ej. Ahorrador/Negociador]
**Puntuación General:** [X/10]

**Resumen de la Negociación:**
[Un breve párrafo sobre cómo se desarrolló la conversación.]

**Puntos Fuertes (Lo que hiciste bien):**
* [Ej. "Usaste una excelente técnica de empatía al principio ('Entiendo su preocupación...')"]
* [Ej. "Defendiste bien el valor del plan de marketing."]

**Puntos de Mejora (Oportunidades Perdidas):**
* [Ej. "Cuando te dije que otra agencia me cobraba menos, te pusiste a la defensiva. Debiste preguntar: '¿Qué servicios le ofrecen por ese precio?'"]
* [Ej. "Te faltó una pregunta de cierre. Debiste pedirme la firma."]

**Frases Clave:**
* **Tu Mejor Frase:** "[Cita la mejor frase que dijo el usuario]"
* **Mi Objeción más Dura:** "[Cita la objeción que lanzaste y que el usuario no supo rebatir bien]"

**Consejo para la Próxima Vez:**
[Un consejo práctico y accionable.]
`;
        let personalityInstruction = "";
        switch (personalityKey) {
            case 'dominant':
                personalityInstruction = 'Ahora adopta la personalidad **El Dominante/Agresivo**. Sé directo, interrumpe al usuario, cree que sabes más que él y enfócate en el dinero. Usa frases como "Vale, vale, al grano...".';
                break;
            case 'indecisive':
                personalityInstruction = 'Ahora adopta la personalidad **El Indeciso/Nervioso**. Teme tomar una mala decisión, tiene apego emocional a la casa, y es dubitativo. Usa frases como "No sé... ¿Usted cree? Es que me da miedo...".';
                break;
            case 'thrifty':
                personalityInstruction = 'Ahora adopta la personalidad **El Ahorrador/Negociador**. Eres calculador, comparas todo, ya has hablado con 5 agencias, y cada céntimo cuenta. Enfoca todo al dinero. Usa frases como "¿Ese vídeo profesional cuánto me va a costar a mí?".';
                break;
            case 'knowitall':
                personalityInstruction = 'Ahora adopta la personalidad **El "Sabelotodo"**. Has leído todos los blogs, crees que puedes hacerlo solo y que los agentes son innecesarios. Cuestiona su método. Usa frases como "Yo también sé usar Facebook Ads, no necesito que me cobres por eso".';
                break;
        }
        
        return `${baseInstruction}\n\n# Personalidad a Adoptar\n${personalityInstruction}\n\nEspera a que el agente (usuario) inicie la conversación.`;
    };

    const initializeChat = useCallback(async (personalityKey: string) => {
        setIsLoading(true);
        setError('');

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError("Error de configuración: La clave de API para los servicios de IA no está disponible. Póngase en contacto con el soporte.");
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
            const systemInstruction = getSystemInstruction(personalityKey);

            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-pro',
                config: { systemInstruction },
            });
            
            const selectedPersonality = personalities.find(p => p.key === personalityKey);
            const confirmationText = t('playground.negotiationSimulator.startConfirmation', { personality: selectedPersonality ? selectedPersonality[language] : '' });

            setMessages(prev => [...prev, { role: 'model', text: confirmationText }]);
            setSimulationState('negotiating');
        } catch (e) {
            console.error("Error initializing chat:", e);
            setError(t('playground.common.error'));
        } finally {
            setIsLoading(false);
        }
    }, [language, t]);
    
    useEffect(() => {
        if(simulationState === 'selecting_personality' && messages.length === 0) {
            const initialMessage = t('playground.negotiationSimulator.initialPrompt');
            setMessages([{ role: 'model', text: initialMessage }]);
        }
    }, [simulationState, messages.length, t]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || simulationState === 'finished') return;

        const userMessageText = userInput.trim();
        const userMessage: Message = { role: 'user', text: userMessageText };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        
        if (simulationState === 'selecting_personality') {
            const choice = parseInt(userMessageText, 10);
            const selectedPersonality = personalities.find(p => p.id === choice);
            if (selectedPersonality) {
                await initializeChat(selectedPersonality.key);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: t('playground.negotiationSimulator.invalidSelection') }]);
            }
            return;
        }

        setIsLoading(true);
        setError('');
        
        const isGivingUp = userMessageText.toUpperCase() === "TERMINAR SIMULACIÓN" || userMessageText.toUpperCase() === "RENDIRSE";
        
        try {
            if (!chatRef.current) throw new Error("Chat not initialized");
            
            let messageToSend = userMessageText;
            if(isGivingUp) {
                setSimulationState('finished');
                messageToSend = "El agente se ha rendido. Proporciona el ANÁLISIS POST-NEGOCIACIÓN.";
            }

            const responseStream = await chatRef.current.sendMessageStream({ message: messageToSend });
            
            let fullResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of responseStream) {
                fullResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
                    return newMessages;
                });
            }
            
            if (fullResponse.includes("De acuerdo, me has convencido. Empecemos.")) {
                setSimulationState('finished');
                setIsLoading(true);
                // Send a follow-up to get the analysis
                const analysisResponse = await chatRef.current.sendMessage({ message: "Proporciona el ANÁLISIS POST-NEGOCIACIÓN." });
                setMessages(prev => [...prev, { role: 'model', text: analysisResponse.text }]);
            }

            if (fullResponse.includes("ANÁLISIS POST-NEGOCIACIÓN")) {
                setSimulationState('finished');
            }

        } catch (err) {
            console.error(err);
            const errorMessage = t('playground.common.error');
            setError(errorMessage);
            setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const startNewSimulation = () => {
        setMessages([]);
        setUserInput('');
        setIsLoading(false);
        setError('');
        setSimulationState('selecting_personality');
        chatRef.current = null;
    };

    const renderMessage = (text: string) => {
        return text.split('\n').map((line, index) => {
            let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-tech-cyan">$1</strong>');
            processedLine = processedLine.replace(/^\* (.*)/, '<span class="pl-4">∙ $1</span>');
            return <p key={index} dangerouslySetInnerHTML={{ __html: processedLine || '&nbsp;' }} />;
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold font-poppins mb-2">{t('playground.negotiationSimulator.title')}</h2>
            <p className="text-gray-400 mb-6">{t('playground.negotiationSimulator.description')}</p>

            <div className="flex-1 overflow-y-auto flex flex-col space-y-2 bg-gray-800/50 p-4 rounded-md min-h-[400px] max-h-[60vh]">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-bubble ${msg.role}`}>
                        {renderMessage(msg.text)}
                    </div>
                ))}
                {isLoading && (
                    <div className="message-bubble bot">
                        <div className="typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="message-bubble bot !bg-red-500/50">
                        <p>{error}</p>
                    </div>
                )}
              <div ref={messagesEndRef} />
            </div>

            <div className="mt-4">
                {simulationState === 'finished' ? (
                     <button
                        onClick={startNewSimulation}
                        className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300"
                    >
                        {t('playground.negotiationSimulator.startNewSimulation')}
                    </button>
                ) : (
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={t('playground.negotiationSimulator.inputPlaceholder')}
                        className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-white focus:ring-tech-blue focus:border-tech-blue"
                        aria-label="Chat input"
                        disabled={isLoading}
                        />
                        <button
                        type="submit"
                        className="bg-tech-blue rounded-full p-3 text-white disabled:bg-gray-500 transition-colors"
                        disabled={!userInput.trim() || isLoading}
                        aria-label="Send message"
                        >
                        <SendIcon />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default NegotiationSimulator;