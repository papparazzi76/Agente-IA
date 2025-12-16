import React, { useState, useEffect, useRef, FormEvent, useCallback } from 'react';
import { GoogleGenAI, Chat, Content } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';

// Icons
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-corporate-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

interface Message {
  role: 'user' | 'model';
  text: string;
}

const CHAT_HISTORY_KEY = 'agenteia_chat_history';

const generateAppContext = (lang: 'es' | 'pt'): string => {
    const contextParts: string[] = [];
    contextParts.push("Información de AgenteIA:");
    
    if (lang === 'es') {
        contextParts.push("Ofrecemos dos productos principales: Playground IA y Marketplace.");
        contextParts.push("Playground IA es una suscripción mensual que da acceso a un conjunto de herramientas de IA para agentes inmobiliarios. El precio varía por país, por ejemplo, 19€/mes en España. El usuario puede ver los precios en la página /precios.");
        contextParts.push("Marketplace es una tienda de servicios digitales a medida: diseño web, automatización, marketing, etc. Los clientes solicitan un presupuesto personalizado para estos servicios a través de la página /marketplace.");
        contextParts.push("Puedes ayudar a los usuarios a navegar el sitio. Las secciones son: Inicio (/), Marketplace (/marketplace), Playground IA (/playground) y Precios (/precios).");
        
        contextParts.push("\n**CONSEJOS DE NEGOCIACIÓN INMOBILIARIA (Actúa como MENTOR EXPERTO):**");
        contextParts.push("Si el usuario pregunta sobre cómo vender, captar o negociar, usa estas estrategias:");
        contextParts.push("1. **Objeción de Precio (Honorarios):** Si dicen 'cobras mucho', no bajes tu comisión inmediatamente. Responde: 'Un agente barato le puede salir caro si malvende su casa. Yo invierto en marketing para conseguirle el precio más alto'.");
        contextParts.push("2. **Objeción de Precio (Valoración):** Si el propietario pide un precio fuera de mercado, responde: 'Entiendo que quiera X, pero el mercado dice Y. Si salimos caros, ayudaremos a vender las casas de los vecinos. ¿Quiere vender su casa o ayudar a vender las otras?'.");
        contextParts.push("3. **Objeción de Exclusiva:** Si dicen 'no firmo exclusivas', responde: 'La exclusiva es la única forma de que yo pueda invertir mi propio dinero en marketing premium (vídeo, destacados) para su casa. Sin exclusiva, el agente compite por ser el primero, no el mejor'.");
        contextParts.push("4. **Cierre:** Sugiere técnicas como el 'Cierre de Doble Opción' (¿Prefiere firmar el martes o el jueves?) o el 'Cierre por Escasez' (Tengo otros compradores interesados, el momento es ahora).");
    } else {
        contextParts.push("Oferecemos dois produtos principais: Playground IA e Marketplace.");
        contextParts.push("O Playground IA é uma subscrição mensal que dá acesso a um conjunto de ferramentas de IA para agentes imobiliários. O preço varia por país, por exemplo, 19€/mês em Espanha. O utilizador pode ver os preços na página /precios.");
        contextParts.push("O Marketplace é uma loja de serviços digitais à medida: design web, automação, marketing, etc. Os clientes solicitam um orçamento personalizado para estes serviços através da página /marketplace.");
        contextParts.push("Pode ajudar os utilizadores a navegar no site. As secções são: Início (/), Marketplace (/marketplace), Playground IA (/playground) e Preços (/precios).");

        contextParts.push("\n**CONSELHOS DE NEGOCIAÇÃO IMOBILIÁRIA (Atue como MENTOR ESPECIALISTA):**");
        contextParts.push("Se o utilizador perguntar sobre como vender, angariar ou negociar, use estas estratégias:");
        contextParts.push("1. **Objeção de Preço (Comissão):** Se disserem 'cobra muito', não baixe a comissão imediatamente. Responda: 'Um agente barato pode sair caro se vender mal a sua casa. Eu invisto em marketing para conseguir o preço mais alto'.");
        contextParts.push("2. **Objeção de Preço (Avaliação):** Se o proprietário pedir um preço fora de mercado, responda: 'Entendo que queira X, mas o mercado diz Y. Se sairmos caros, ajudaremos a vender as casas dos vizinhos. Quer vender a sua casa ou ajudar a vender as outras?'.");
        contextParts.push("3. **Objeção de Exclusividade:** Se disserem 'não assino exclusividade', responda: 'A exclusividade é a única forma de eu poder investir o meu próprio dinheiro em marketing premium (vídeo, destaques) para a sua casa. Sem exclusividade, o agente compete para ser o primeiro, não o melhor'.");
        contextParts.push("4. **Fecho:** Sugira técnicas como o 'Fecho de Dupla Opção' (Prefere assinar terça ou quinta?) ou o 'Fecho por Escassez' (Tenho outros interessados, o momento é agora).");
    }

    return contextParts.join('\n');
};


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Load initial state from localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
      try {
          const saved = localStorage.getItem(CHAT_HISTORY_KEY);
          return saved ? JSON.parse(saved) : [];
      } catch (e) {
          console.error("Error loading chat history:", e);
          return [];
      }
  });

  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(messages.length === 0);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  // Save to localStorage whenever messages change
  useEffect(() => {
      try {
          if (messages.length > 0) {
              localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
          } else {
              localStorage.removeItem(CHAT_HISTORY_KEY);
          }
      } catch (e) {
          console.error("Error saving chat history:", e);
      }
  }, [messages]);

  const initializeChat = useCallback(async () => {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
          setError("Error de configuración: La clave de API no está disponible, por lo que el asistente no puede funcionar.");
          return;
      }
      try {
        const ai = new GoogleGenAI({ apiKey });
        const appContext = generateAppContext(language);
        const systemInstruction = `Eres 'AgenteIA Asistente', un chatbot amigable y experto para el sitio web 'IA para Agentes Inmobiliarios'.
        
        **TUS DOS ROLES PRINCIPALES:**
        1. **Asistente de Navegación:** Ayuda a los usuarios con dudas sobre los productos (Playground y Marketplace) y guíalos por la plataforma.
        2. **Mentor de Ventas Inmobiliarias:** Eres un coach experto en el sector inmobiliario. Si el usuario te hace preguntas sobre cómo negociar, cómo captar propiedades o cómo manejar clientes difíciles, utiliza tu conocimiento experto para darle consejos tácticos y profesionales.

        - Sé conciso y directo.
        - Utiliza la siguiente información de contexto para tus respuestas:
        ${appContext}
        - Si no sabes una respuesta sobre la web, di que no tienes esa información.
        - Si te piden consejos de negociación que no están en el contexto, usa tu "conocimiento general" como experto inmobiliario para dar una respuesta lógica y profesional.
        - Responde siempre en el idioma de la conversación (español o portugués).
        - Puedes usar formato Markdown simple (negritas y listas) para estructurar tus consejos.`;
        
        let history: Content[] = [];

        // If we have saved messages, reconstruct history for the API
        if (messages.length > 0) {
            history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));
            setShowSuggestions(false);
        } else {
            // Default initialization if no history
            history = [
                { role: 'user', parts: [{ text: "Hola" }] },
                { role: 'model', parts: [{ text: language === 'es' ? "¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?" : "Olá! Sou o seu assistente de IA. Em que posso ajudá-lo hoje?" }] }
            ];
            // Sync UI state with default history
            setMessages([{ role: 'model', text: history[1].parts[0].text as string }]);
            setShowSuggestions(true);
        }

        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-pro',
            history,
            config: {
                systemInstruction,
            },
        });

      } catch (e) {
        console.error("Error initializing chat:", e);
        setError("No se pudo iniciar el asistente. Por favor, recarga la página.");
      }
  }, [language, messages]); // messages is a dependency to ensure we capture the loaded state on init

  const analyzeSentiment = useCallback(async (text: string): Promise<'positive' | 'neutral' | 'negative'> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API Key not available for sentiment analysis.");
        return 'neutral';
    }
    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Analyze the sentiment of the following user text and respond with a single word: 'positive', 'negative', or 'neutral'. Do not add any other text or punctuation. User text: "${text}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const sentiment = response.text?.trim().toLowerCase();

        if (sentiment === 'negative') return 'negative';
        if (sentiment === 'positive') return 'positive';
        return 'neutral';
    } catch (e) {
        console.error("Sentiment analysis failed:", e);
        return 'neutral';
    }
  }, []);

  useEffect(() => {
    // Only initialize if open and chatRef is null (first open)
    // or if we have an error we want to retry clearing
    if (isOpen && !chatRef.current && !error) {
        initializeChat();
    }
  }, [isOpen, initializeChat, error]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const clearHistory = () => {
      if (window.confirm(language === 'es' ? "¿Estás seguro de que quieres borrar el historial del chat?" : "Tem a certeza que deseja apagar o histórico do chat?")) {
          setMessages([]);
          localStorage.removeItem(CHAT_HISTORY_KEY);
          chatRef.current = null;
          setError('');
          setShowSuggestions(true);
          // Re-initialize will be triggered by useEffect because chatRef.current is null and isOpen is true
          setTimeout(() => initializeChat(), 100); 
      }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: messageText.trim() };
    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    setIsLoading(true);
    setError('');

    const sentiment = await analyzeSentiment(messageText);

    if (sentiment === 'negative') {
        const empatheticMessage: Message = { role: 'model', text: t('chatbot.sentimentNegative') };
        setMessages(prev => [...prev, empatheticMessage]);
        setIsLoading(false);
        // We still send to model to maintain context, or just return here. 
        // Returning here prevents the "real" answer to the query, which might frustrate further.
        // Let's proceed to send to model as well, but maybe after a delay or just let the model handle it next turn.
        // For simplicity in this implementation, we return to show empathy first.
        return; 
    }

    try {
        if (!chatRef.current) {
            // Should not happen if initialized, but safety check
            await initializeChat();
            if(!chatRef.current) throw new Error("Chat could not be initialized");
        }
        
        const responseStream = await chatRef.current.sendMessageStream({ message: messageText.trim() });
        
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

    } catch (err) {
        console.error(err);
        const errorMessage = t('playground.common.error');
        setError(errorMessage);
        setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendMessage(userInput);
    setUserInput('');
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };
  
  const suggestedQuestions = [
    t('chatbot.suggestion1'),
    t('chatbot.suggestion2'),
    t('chatbot.suggestion3'),
    t('chatbot.suggestion4'),
  ];

  const renderMarkdown = (text: string) => {
      const html = text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
          .replace(/^\* (.*$)/gm, '<ul><li>$1</li></ul>')
          .replace(/<\/ul>\n<ul>/g, ''); // Join consecutive lists
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <>
      <style>{`
        @keyframes messageSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .message-anim {
          animation: messageSlideIn 0.3s ease-out forwards;
        }
      `}</style>
      <button
        className="chatbot-fab bg-tech-cyan shadow-lg shadow-tech-cyan/30 transform hover:scale-110 transition-transform duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      <div className={`chatbot-window bg-corporate-dark/90 backdrop-blur-md border border-tech-blue/30 shadow-2xl ${isOpen ? '' : 'closed'}`}>
        <header className="bg-tech-blue p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg font-poppins">{language === 'es' ? 'Asistente IA' : 'Assistente IA'}</h3>
          <div className="flex items-center space-x-3">
            <button 
                onClick={clearHistory} 
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors hover:scale-110" 
                aria-label="Clear history" 
                title={language === 'es' ? 'Borrar historial' : 'Apagar histórico'}
            >
                <TrashIcon />
            </button>
            <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close chat" 
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors hover:scale-110"
            >
                <CloseIcon />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
            {messages.map((msg, index) => (
                <div key={index} className={`message-bubble ${msg.role} message-anim`}>
                    {renderMarkdown(msg.text)}
                </div>
            ))}
            {isLoading && (
                <div className="message-bubble bot message-anim">
                    <div className="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            )}
            {error && !messages.some(m => m.text === error) && (
                <div className="message-bubble bot !bg-red-500/50 message-anim">
                    <p>{error}</p>
                </div>
            )}
          <div ref={messagesEndRef} />
        </div>
        
        {showSuggestions && (
          <div className="p-4 border-t border-tech-blue/20">
            <p className="text-sm font-bold text-gray-400 mb-2">{t('chatbot.suggestionsTitle')}</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(q)}
                  className="bg-gray-700 text-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-600 hover:shadow-md hover:scale-105 hover:border hover:border-tech-cyan/50 transition-all duration-300"
                  disabled={isLoading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-tech-blue/30">
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={language === 'es' ? "Escribe tu pregunta..." : "Escreva a sua pergunta..."}
              className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-white focus:ring-tech-blue focus:border-tech-blue"
              aria-label="Chat input"
              disabled={isLoading || (!!error && !messages.some(m => m.text === error))}
            />
            <button
              type="submit"
              className="bg-tech-blue rounded-full p-3 text-white disabled:bg-gray-500 transition-all hover:scale-110 hover:shadow-lg active:scale-95 duration-200"
              disabled={!userInput.trim() || isLoading || (!!error && !messages.some(m => m.text === error))}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;