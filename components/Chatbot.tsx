import React, { useState, useEffect, useRef, FormEvent, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, Content } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';
import { modules } from '../constants';

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

interface Message {
  role: 'user' | 'model';
  text: string;
}

const generateCourseContext = (lang: 'es' | 'pt'): string => {
    const contextParts: string[] = [];
    contextParts.push("Información del curso 'IA para Agentes Inmobiliarios':");
    
    modules.forEach(module => {
        contextParts.push(`- Módulo ${module.id}: ${module.title[lang]}. Descripción: ${module.description[lang]}.`);
    });

    const playgroundInfo = lang === 'es'
        ? "El curso tiene un precio base de 197€ (ajustado por país) y da acceso perpetuo al contenido. Incluye 30 días de acceso gratuito al 'Playground IA'. Después, el Playground es una membresía opcional de 19 €/mes en España, con pago recurrente y cancelación con 24h de antelación."
        : "O curso tem um preço base de 197€ (ajustado por país) e dá acesso perpétuo ao conteúdo. Inclui 30 dias de acesso gratuito ao 'Playground IA'. Depois, o Playground é uma subscrição opcional de 19 €/mês em Espanha, com pagamento recorrente e cancelamento com 24h de antecedência.";

    contextParts.push(playgroundInfo);
    contextParts.push("El curso se ofrece en español y portugués.");
    contextParts.push("Puedes ayudar a los usuarios a navegar el sitio. Las secciones son: Inicio (/), Temario (/temario), Área de Miembros (/dashboard), Playground IA (/playground) y Compra (/compra).");

    return contextParts.join('\n');
};


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const initializeChat = useCallback(async () => {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
          setError("Error de configuración: La clave de API no está disponible, por lo que el asistente no puede funcionar.");
          return;
      }
      try {
        const ai = new GoogleGenAI({ apiKey });
        const courseContext = generateCourseContext(language);
        const systemInstruction = `Eres 'AgenteIA Asistente', un chatbot amigable y servicial para el sitio web 'IA para Agentes Inmobiliarios'. Tu objetivo es ayudar a los usuarios respondiendo sus preguntas sobre el curso y guiándolos por la plataforma.
        - Sé conciso y directo.
        - Utiliza la siguiente información para responder preguntas sobre el contenido y la estructura del curso:
        ${courseContext}
        - Si no sabes una respuesta, di que no tienes esa información pero que puedes ayudar con otros temas del curso.
        - Responde siempre en el idioma de la conversación (español o portugués).
        - No inventes información. Basa tus respuestas en el contexto proporcionado.
        - Puedes usar formato Markdown simple (negritas y listas).`;
        
        const history: Content[] = [
            { role: 'user', parts: [{ text: "Hola" }] },
            { role: 'model', parts: [{ text: language === 'es' ? "¡Hola! Soy tu asistente de IA. ¿Cómo puedo ayudarte a conocer nuestro curso para agentes inmobiliarios?" : "Olá! Sou o seu assistente de IA. Como posso ajudá-lo a conhecer o nosso curso para agentes imobiliários?" }] }
        ];

        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-pro',
            history,
            config: {
                systemInstruction,
            },
        });
        
        setMessages([{ role: 'model', text: history[1].parts[0].text as string }]);

      } catch (e) {
        console.error("Error initializing chat:", e);
        setError("No se pudo iniciar el asistente. Por favor, recarga la página.");
      }
  }, [language]);


  useEffect(() => {
    if (isOpen && !chatRef.current && !error) {
        initializeChat();
    }
  }, [isOpen, initializeChat, error]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: userInput.trim() };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError('');

    try {
        if (!chatRef.current) throw new Error("Chat not initialized");

        const responseStream = await chatRef.current.sendMessageStream({ message: userInput.trim() });
        
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
        setError(t('playground.common.error'));
        setMessages(prev => [...prev, { role: 'model', text: t('playground.common.error') }]);
    } finally {
        setIsLoading(false);
    }
  };

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
      <button
        className="chatbot-fab bg-tech-cyan shadow-lg shadow-tech-cyan/30"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      <div className={`chatbot-window bg-corporate-dark/90 backdrop-blur-md border border-tech-blue/30 shadow-2xl ${isOpen ? '' : 'closed'}`}>
        <header className="bg-tech-blue p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg font-poppins">{language === 'es' ? 'Asistente IA' : 'Assistente IA'}</h3>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
            {messages.map((msg, index) => (
                <div key={index} className={`message-bubble ${msg.role}`}>
                    {renderMarkdown(msg.text)}
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

        <div className="p-4 border-t border-tech-blue/30">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={language === 'es' ? "Escribe tu pregunta..." : "Escreva a sua pergunta..."}
              className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-white focus:ring-tech-blue focus:border-tech-blue"
              aria-label="Chat input"
              disabled={isLoading || !!error}
            />
            <button
              type="submit"
              className="bg-tech-blue rounded-full p-3 text-white disabled:bg-gray-500 transition-colors"
              disabled={!userInput.trim() || isLoading || !!error}
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