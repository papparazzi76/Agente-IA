import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => (
    <svg className="w-6 h-6 text-tech-cyan mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const FaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => (
  <tr className="border-b border-gray-700 last:border-b-0">
    <td className="p-4 font-semibold text-gray-200 align-top md:w-1/3">{question}</td>
    <td className="p-4 text-gray-400 align-top" dangerouslySetInnerHTML={{ __html: answer }}></td>
  </tr>
);

const WebDesignPage: React.FC = () => {

    const faqs1 = [
        { q: "¿Cómo garantizan la entrega en 72 horas?", a: "El plazo de 72 horas laborables comienza una vez que hemos recibido toda la información y materiales necesarios de tu parte (textos iniciales, logo si ya lo tienes, y confirmación del diseño seleccionado). Nuestro proceso es altamente optimizado para asegurar la máxima velocidad." },
        { q: "¿Qué ocurre si no me gusta el diseño inicial?", a: "Trabajamos con plantillas profesionales y personalizables. Si bien la base se entrega en 72 horas, incluimos un ciclo de revisiones para ajustar elementos clave como colores, tipografía y estructura, asegurando que el resultado final te encante." },
        { q: "¿Necesito tener mi propio dominio o hosting?", a: "No es necesario. Nuestro paquete es todo incluido: gestionamos el registro de tu dominio (sujeto a disponibilidad) y proporcionamos el servicio de hosting y mantenimiento para que no tengas que preocuparte por nada técnico." },
    ];

    const faqs2 = [
        { q: "¿Qué tan 'personalizada' es la web?", a: "Utilizamos una estructura base probada en el sector inmobiliario, pero la personalizamos completamente con tu Identidad Visual Exprés (logo y colores), tu información de contacto, tus textos, y las propiedades que nos indiques. El objetivo es que la web sea un reflejo profesional de tu marca personal." },
        { q: "¿Cómo subo mis propiedades a la web?", a: "La web está preparada para una carga de inmuebles sencilla. Dependiendo del plan, podemos ofrecer integraciones con software de gestión inmobiliaria (CRM) o un panel intuitivo para que añadas, edites y elimines tus propiedades fácilmente." },
        { q: "¿Qué pasa con mi logo si elijo la Identidad Visual Exprés?", a: "Te ayudamos a definir un logo básico y la paleta de colores para que tu marca se vea profesional y coherente desde el primer día. Los archivos finales del logo serán tuyos." },
    ];

    const faqs3 = [
        { q: "¿El precio de 97 €/año es definitivo? ¿Qué incluye?", a: "El precio 'Desde 97 €/año' corresponde a nuestro plan de entrada. Este precio incluye el hosting, el dominio (normalmente el primer año) y el mantenimiento básico de la plataforma. Para conocer los detalles exactos de cada plan (y qué incluye la Identidad Visual Exprés), por favor, haz clic en 'Ver Planes y Comenzar'." },
        { q: "¿Qué cubre el mantenimiento que incluyen?", a: "El mantenimiento cubre la actualización del sistema y plugins para garantizar la seguridad de la web y el correcto funcionamiento técnico de la misma, previniendo caídas y errores comunes." },
        { q: "¿Puedo cancelar el servicio en cualquier momento?", a: "El servicio se factura anualmente, como se indica. Puedes decidir no renovar el servicio al final del ciclo anual sin penalización." },
    ];

    return (
        <div className="animate-fadeIn">
            <section className="relative py-20 md:py-32 text-pure-white bg-corporate-dark/50">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-corporate-dark/80 to-corporate-dark"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/marketplace" className="text-tech-blue hover:underline font-semibold mb-6 inline-block">
                        &larr; Volver al Marketplace
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4 leading-tight text-glow">
                        💻 Web y Diseño: ¡Digitaliza tu Presencia Online en Minutos!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-inter max-w-4xl">
                        🚀 Tu Web Profesional, Lista en 72 Horas (Días Laborables)
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-gray-900/50 p-8 rounded-lg border border-tech-blue/20 shadow-xl">
                        <p className="text-lg text-gray-300 mb-8">
                            ¿Eres un agente inmobiliario o trabajas en el sector y necesitas una presencia online profesional, atractiva y funcional, sin complicaciones? Nuestro servicio de Web y Diseño está diseñado para ti. Te ofrecemos la solución completa para digitalizar tu negocio en cuestión de minutos y, lo más importante, ¡garantizamos la entrega de tu sitio web en solo 72 horas (días laborables)! Concéntrate en vender, nosotros nos ocupamos de tu presencia digital.
                        </p>

                        <h2 className="text-3xl font-bold font-poppins text-pure-white mb-6">✨ ¿Qué Incluye este Servicio Completo?</h2>
                        <p className="text-gray-400 mb-8">Este paquete integral te proporciona todas las herramientas esenciales para lanzar tu plataforma digital, destacando tu marca personal y tus propiedades de forma inmediata:</p>

                        <ul className="space-y-6 mb-10">
                            <li className="flex items-start">
                                <CheckIcon />
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Webs Personalizadas para Agentes</h3>
                                    <p className="text-gray-400">Diseño web profesional, moderno y optimizado, totalmente adaptado a tus necesidades específicas como agente inmobiliario.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <CheckIcon />
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Hosting + Dominio + Mantenimiento</h3>
                                    <p className="text-gray-400">Solución técnica integral. Incluimos el alojamiento web seguro (hosting), el registro de tu nombre de dominio y nos encargamos del mantenimiento continuo para una operatividad 24/7.</p>
                                </div>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon />
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Identidad Visual Exprés (Logo + Colores)</h3>
                                    <p className="text-gray-400">Establece rápidamente tu marca. Te ayudamos a crear una identidad visual coherente y profesional que incluye un logo distintivo y la paleta de colores corporativos.</p>
                                </div>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon />
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Landing Pages Automáticas de Inmuebles</h3>
                                    <p className="text-gray-400">Genera automáticamente páginas de destino de alta conversión para cada una de tus propiedades, facilitando la captación de leads cualificados y la promoción eficiente de tus ofertas.</p>
                                </div>
                            </li>
                        </ul>
                        
                        <div className="bg-gray-800/50 border border-tech-cyan/30 rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-poppins font-semibold text-gray-300 mb-2">💰 Inversión y Lanzamiento</h3>
                            <p className="text-5xl font-bold text-tech-cyan mb-4">Desde 97 €/año</p>
                            <p className="text-gray-400 mb-6">➡️ ¡No Esperes Más para Estar Online! Si buscas velocidad, profesionalidad y un enfoque 100% inmobiliario con un plazo de entrega garantizado, esta es tu solución. En 72 horas puedes tener la herramienta digital que impulsará tus ventas.</p>
                            <button className="btn-pulse-glow bg-tech-cyan text-corporate-dark font-bold py-3 px-8 rounded-lg text-lg hover:bg-white transition-all duration-300 shadow-lg shadow-tech-cyan/20 transform hover:-translate-y-1">
                                Ver Planes y Comenzar
                            </button>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-4xl font-bold font-poppins text-center text-pure-white mb-10">❓ Preguntas Frecuentes (FAQ)</h2>
                        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">Hemos recopilado las dudas más comunes sobre nuestro servicio de Web y Diseño para agentes inmobiliarios:</p>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-semibold font-poppins text-tech-cyan mb-6 border-b-2 border-tech-blue/30 pb-2">1. Sobre la Entrega y Puesta en Marcha</h3>
                                <div className="bg-gray-900/50 rounded-lg border border-tech-blue/20 overflow-hidden"><table className="w-full"><tbody>{faqs1.map(faq => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}</tbody></table></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold font-poppins text-tech-cyan mb-6 border-b-2 border-tech-blue/30 pb-2">2. Sobre la Personalización y Contenido</h3>
                                <div className="bg-gray-900/50 rounded-lg border border-tech-blue/20 overflow-hidden"><table className="w-full"><tbody>{faqs2.map(faq => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}</tbody></table></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold font-poppins text-tech-cyan mb-6 border-b-2 border-tech-blue/30 pb-2">3. Sobre Precios y Mantenimiento</h3>
                                <div className="bg-gray-900/50 rounded-lg border border-tech-blue/20 overflow-hidden"><table className="w-full"><tbody>{faqs3.map(faq => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}</tbody></table></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebDesignPage;
