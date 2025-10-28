import { Module } from '../types';

export const module4: Module = {
    id: "4",
    title: { es: "4. Asistentes Virtuales y Chatbots", pt: "4. Assistentes Virtuais e Chatbots" },
    description: { es: "Configura asistentes que trabajan 24/7 para ti, calificando leads, agendando visitas y respondiendo preguntas frecuentes.", pt: "Configure assistentes que trabalham 24/7 para si, qualificando leads, agendando visitas e respondendo a perguntas frequentes." },
    icon: "assistants",
    hero: {
      title: { es: "Tu Equipo de IA, Siempre Activo", pt: "A sua Equipa de IA, Sempre Ativa" },
      subtitle: { es: "Automatiza la comunicación inicial y asegúrate de no perder nunca un cliente potencial.", pt: "Automatize a comunicação inicial e garanta que nunca perde um potencial cliente." },
      image: "https://picsum.photos/1200/600?random=4",
    },
    content: {
      learnTitle: { es: "Qué aprenderás a configurar", pt: "O que vai aprender a configurar" },
      points: [
        { es: "Crear y 'entrenar' un chatbot para tu web o WhatsApp con una personalidad alineada a tu marca.", pt: "Criar e 'treinar' um chatbot para o seu site ou WhatsApp com uma personalidade alinhada à sua marca." },
        { es: "Construir una base de conocimiento sólida (FAQs) para que tu asistente responda con precisión.", pt: "Construir uma base de conhecimento sólida (FAQs) para que o seu assistente responda com precisão." },
        { es: "Diseñar flujos de conversación efectivos para calificar leads de compra, venta o alquiler.", pt: "Desenhar fluxos de conversação eficazes para qualificar leads de compra, venda ou aluguer." },
        { es: "Integrar tu chatbot con un calendario para agendar visitas y reuniones de forma automática.", pt: "Integrar o seu chatbot com um calendário para agendar visitas e reuniões de forma automática." },
        { es: "Establecer un protocolo de 'escalada' para transferir conversaciones complejas a un agente humano de forma fluida.", pt: "Estabelecer um protocolo de 'escalada' para transferir conversas complexas para um agente humano de forma fluida." }
      ],
    },
    resources: {
      title: { es: "Recursos y Plantillas para Chatbots", pt: "Recursos e Modelos para Chatbots" },
      downloads: [
        { 
          text: { es: "Plantilla: Flujo de Conversación para Chatbot", pt: "Modelo: Fluxo de Conversação para Chatbot" },
          url: "/docs/plantilla_flujo_chatbot.pdf" 
        },
        { 
          text: { es: "Guía Rápida: Entrenando tu Chatbot Inmobiliario", pt: "Guia Rápido: Treinando o seu Chatbot Imobiliário" },
          url: "/docs/guia_entrenamiento_chatbot.pdf" 
        },
        { 
          text: { es: "Checklist: Lanzamiento de tu Chatbot", pt: "Checklist: Lançamento do seu Chatbot" },
          url: "/docs/checklist_chatbot_lanzamiento.pdf" 
        }
      ],
    },
    videos: [
      {
        title: { es: "Tutorial: Configurando tu Primer Chatbot Inmobiliario sin Código", pt: "Tutorial: Configurando o seu Primeiro Chatbot Imobiliário sem Código" },
        embedUrl: "https://www.youtube.com/embed/n_MGPa2igcE",
      },
      {
        title: { es: "Video Tutorial Adicional 1", pt: "Vídeo Tutorial Adicional 1" },
        embedUrl: "https://www.youtube.com/embed/C_Yq-mD_AMA",
      },
      {
        title: { es: "Video Tutorial Adicional 2", pt: "Vídeo Tutorial Adicional 2" },
        embedUrl: "https://www.youtube.com/embed/C_Yq-mD_AMA",
      },
      {
        title: { es: "Video Tutorial Adicional 3", pt: "Vídeo Tutorial Adicional 3" },
        embedUrl: "https://www.youtube.com/embed/C_Yq-mD_AMA",
      }
    ],
    flashcards: [
        {
          question: { es: "¿Qué es un chatbot?", pt: "O que é um chatbot?" },
          answer: { es: "Es un programa de software que simula conversaciones humanas a través de texto o voz, actuando como un asistente virtual.", pt: "É um programa de software que simula conversas humanas através de texto ou voz, atuando como um assistente virtual." },
          explanation: { es: "Un chatbot puede ser tan simple como un menú de opciones o tan complejo como un asistente de IA que entiende el lenguaje natural. Para un agente inmobiliario, es una herramienta que automatiza la comunicación, disponible 24/7 en canales como sitios web, WhatsApp o Facebook Messenger.", pt: "Um chatbot pode ser tão simples como um menu de opções ou tão complexo como um assistente de IA que entende a linguagem natural. Para um agente imobiliário, é uma ferramenta que automatiza a comunicação, disponível 24/7 em canais como websites, WhatsApp ou Facebook Messenger." }
        },
        {
          question: { es: "Diferencia entre chatbot basado en reglas y chatbot con IA.", pt: "Diferença entre chatbot baseado em regras e chatbot com IA." },
          answer: { es: "El de reglas sigue un guion fijo (árbol de decisión). El de IA usa Procesamiento de Lenguaje Natural (PLN) para entender y responder a preguntas abiertas.", pt: "O de regras segue um guião fixo (árvore de decisão). O de IA usa Processamento de Linguagem Natural (PLN) para entender e responder a perguntas abertas." },
          explanation: { es: "Un chatbot basado en reglas es limitado; si el usuario escribe algo fuera del guion, no lo entenderá. Un chatbot con IA es mucho más flexible. Puede entender sinónimos, errores ortográficos y la intención detrás de una pregunta, lo que permite una conversación más natural y humana.", pt: "Um chatbot baseado em regras é limitado; se o utilizador escrever algo fora do guião, não o entenderá. Um chatbot com IA é muito mais flexível. Consegue entender sinónimos, erros ortográficos e a intenção por trás de uma pergunta, o que permite uma conversa mais natural e humana." }
        },
        {
          question: { es: "¿Cuál es el principal beneficio de un chatbot para un agente inmobiliario?", pt: "Qual é o principal benefício de um chatbot para um agente imobiliário?" },
          answer: { es: "La disponibilidad 24/7 y la automatización de la calificación de leads, lo que ahorra tiempo y asegura que no se pierda ninguna oportunidad.", pt: "A disponibilidade 24/7 e a automação da qualificação de leads, o que poupa tempo e garante que nenhuma oportunidade seja perdida." },
          explanation: { es: "Muchos clientes potenciales buscan propiedades por la noche o durante el fin de semana. Un chatbot puede atenderlos instantáneamente, responder sus preguntas básicas y recopilar su información de contacto. Esto garantiza una experiencia de cliente inmediata y entrega al agente leads ya filtrados por la mañana, permitiéndole centrarse en los contactos de mayor calidad.", pt: "Muitos potenciais clientes procuram imóveis à noite ou durante o fim de semana. Um chatbot pode atendê-los instantaneamente, responder às suas perguntas básicas e recolher as suas informações de contacto. Isto garante uma experiência de cliente imediata e entrega ao agente leads já filtrados pela manhã, permitindo-lhe focar-se nos contactos de maior qualidade." }
        },
        {
          question: { es: "¿Qué es un 'flujo de conversación'?", pt: "O que é um 'fluxo de conversação'?" },
          answer: { es: "Es el mapa o guion lógico que sigue el chatbot para guiar al usuario a través de una serie de preguntas y respuestas hacia un objetivo específico.", pt: "É o mapa ou roteiro lógico que o chatbot segue para guiar o utilizador através de uma série de perguntas e respostas em direção a um objetivo específico." },
          explanation: { es: "Diseñar un buen flujo es crucial. Por ejemplo, un flujo para un comprador podría empezar con '¿Qué tipo de propiedad buscas?', luego '¿En qué zona?', y '¿Cuál es tu presupuesto?'. Cada respuesta lleva a la siguiente pregunta de forma lógica. Un buen flujo hace que la interacción sea eficiente y se sienta natural.", pt: "Desenhar um bom fluxo é crucial. Por exemplo, um fluxo para um comprador pode começar com 'Que tipo de imóvel procura?', depois 'Em que zona?', e 'Qual é o seu orçamento?'. Cada resposta leva à pergunta seguinte de forma lógica. Um bom fluxo torna a interação eficiente e natural." }
        },
        {
          question: { es: "¿Qué es la 'calificación de leads' que hace un chatbot?", pt: "O que é a 'qualificação de leads' que um chatbot faz?" },
          answer: { es: "Es el proceso de hacer preguntas clave a un visitante para determinar su nivel de interés y si es un cliente potencial viable.", pt: "É o processo de fazer perguntas-chave a um visitante para determinar o seu nível de interesse e se é um potencial cliente viável." },
          explanation: { es: "Un chatbot puede calificar un lead preguntando sobre su presupuesto, urgencia, si necesita financiación, o si tiene otra propiedad que vender. Al final de la conversación, puede asignar una puntuación al lead (ej. 'Lead Caliente' o 'Lead Frío') y pasarle al agente un resumen, ahorrándole el tiempo de hacer estas preguntas iniciales a cada contacto.", pt: "Um chatbot pode qualificar um lead perguntando sobre o seu orçamento, urgência, se precisa de financiamento, ou se tem outro imóvel para vender. No final da conversa, pode atribuir uma pontuação ao lead (ex. 'Lead Quente' ou 'Lead Frio') e passar ao agente um resumo, poupando-lhe o tempo de fazer estas perguntas iniciais a cada contacto." }
        },
        {
          question: { es: "¿Qué es la 'escalada a humano'?", pt: "O que é a 'escalada para humano'?" },
          answer: { es: "Es el proceso de transferir una conversación del chatbot a un agente humano cuando el bot no puede resolver la consulta o el usuario lo solicita.", pt: "É o processo de transferir uma conversa do chatbot para um agente humano quando o bot não consegue resolver a consulta ou o utilizador o solicita." },
          explanation: { es: "Ningún bot puede responderlo todo. Un buen chatbot debe reconocer sus limitaciones. Cuando una pregunta es demasiado compleja, el bot debe decir algo como: 'Para esto, necesitarás hablar con un experto. ¿Quieres que notifique a un agente para que te contacte?'. Luego, debe recopilar los datos de contacto y enviar una alerta al agente con el historial de la conversación.", pt: "Nenhum bot consegue responder a tudo. Um bom chatbot deve reconhecer as suas limitações. Quando uma pergunta é demasiado complexa, o bot deve dizer algo como: 'Para isso, precisará de falar com um especialista. Quer que eu notifique um agente para o contactar?'. Depois, deve recolher os dados de contacto e enviar um alerta ao agente com o histórico da conversa." }
        },
        {
          question: { es: "¿Qué es la 'base de conocimiento' de un chatbot?", pt: "O que é a 'base de conhecimento' de um chatbot?" },
          answer: { es: "Es la colección de información (FAQs, datos de propiedades, información de la agencia) con la que se 'entrena' al bot para que pueda responder preguntas.", pt: "É a coleção de informação (FAQs, dados de imóveis, informação da agência) com a qual o bot é 'treinado' para que possa responder a perguntas." },
          explanation: { es: "La calidad de la base de conocimiento determina la inteligencia del bot. Debe incluir respuestas a las preguntas más frecuentes que recibe un agente, como '¿Qué comisiones cobráis?', '¿Qué gastos tiene la compra de una vivienda?', etc. Esta base de conocimiento debe ser actualizada constantemente para mantener al bot informado.", pt: "A qualidade da base de conhecimento determina a inteligência do bot. Deve incluir respostas às perguntas mais frequentes que um agente recebe, como 'Que comissões cobram?', 'Que despesas tem a compra de uma casa?', etc. Esta base de conhecimento deve ser atualizada constantemente para manter o bot informado." }
        },
        {
          question: { es: "Dame un ejemplo de un buen mensaje de bienvenida para un chatbot inmobiliario.", pt: "Dê-me um exemplo de uma boa mensagem de boas-vindas para um chatbot imobiliário." },
          answer: { es: "'¡Hola! Soy tu asistente virtual de [Agencia]. Puedo buscar propiedades por ti, responder tus dudas o agendar una visita. ¿Cómo te ayudo hoy?'", pt: "'Olá! Sou o seu assistente virtual da [Agência]. Posso procurar imóveis para si, responder às suas dúvidas ou agendar uma visita. Como posso ajudar hoje?'" },
          explanation: { es: "Un buen mensaje de bienvenida cumple 3 funciones: 1. Se presenta (y deja claro que es un bot). 2. Expone sus capacidades (qué puede hacer). 3. Guía al usuario con una pregunta abierta o con botones de opción (ej. [Buscar Propiedades], [Tengo una duda]). Esto inicia la conversación de forma efectiva.", pt: "Uma boa mensagem de boas-vindas cumpre 3 funções: 1. Apresenta-se (e deixa claro que é um bot). 2. Expõe as suas capacidades (o que pode fazer). 3. Guia o utilizador com uma pergunta aberta ou com botões de opção (ex. [Procurar Imóveis], [Tenho uma dúvida]). Isto inicia a conversa de forma eficaz." }
        },
        {
          question: { es: "¿Cómo se integra un chatbot con un calendario?", pt: "Como se integra um chatbot com um calendário?" },
          answer: { es: "Conectándolo a través de una API a herramientas como Google Calendar o Calendly. El bot consulta la disponibilidad del agente y permite al usuario reservar un hueco.", pt: "Conectando-o através de uma API a ferramentas como o Google Calendar ou o Calendly. O bot consulta a disponibilidade do agente e permite ao utilizador reservar um horário." },
          explanation: { es: "Esta es una de las automatizaciones más potentes. El flujo es: 1. El usuario solicita una visita. 2. El bot le pregunta '¿Qué día y hora te viene bien?'. 3. El bot consulta el calendario del agente para ver los huecos disponibles. 4. Le presenta al usuario las opciones válidas. 5. Cuando el usuario elige una, el bot crea el evento en el calendario del agente y envía una confirmación a ambos.", pt: "Esta é uma das automações mais potentes. O fluxo é: 1. O utilizador solicita uma visita. 2. O bot pergunta-lhe 'Que dia e hora lhe convém?'. 3. O bot consulta o calendário do agente para ver os horários disponíveis. 4. Apresenta ao utilizador as opções válidas. 5. Quando o utilizador escolhe uma, o bot cria o evento no calendário do agente e envia uma confirmação a ambos." }
        },
        {
          question: { es: "¿Qué es el Procesamiento de Lenguaje Natural (PLN)?", pt: "O que é o Processamento de Linguagem Natural (PLN)?" },
          answer: { es: "Es una rama de la IA que da a los ordenadores la capacidad de entender, interpretar y generar lenguaje humano. Es el 'cerebro' que permite a un chatbot conversacional funcionar.", pt: "É um ramo da IA que dá aos computadores a capacidade de entender, interpretar e gerar linguagem humana. É o 'cérebro' que permite a um chatbot conversacional funcionar." },
          explanation: { es: "Gracias al PLN, un chatbot puede entender que 'busco piso de 3 habs' y 'quiero un apartamento con tres dormitorios' significan lo mismo. El PLN maneja la gramática, los sinónimos y el contexto para descifrar la intención del usuario, haciendo la conversación fluida y menos robótica.", pt: "Graças ao PLN, um chatbot pode entender que 'procuro apartamento de 3 assoalhadas' e 'quero um T3' significam o mesmo. O PLN lida com a gramática, os sinónimos e o contexto para decifrar a intenção do utilizador, tornando a conversa fluida e menos robótica." }
        },
        {
          question: { es: "¿Por qué es importante darle una 'personalidad' a tu chatbot?", pt: "Porque é importante dar uma 'personalidade' ao seu chatbot?" },
          answer: { es: "Para que su tono de comunicación sea coherente con tu marca personal. Un bot para propiedades de lujo no debería hablar igual que uno para alquileres de estudiantes.", pt: "Para que o seu tom de comunicação seja coerente com a sua marca pessoal. Um bot para imóveis de luxo não deve falar da mesma forma que um para arrendamento de estudantes." },
          explanation: { es: "La personalidad se define con el tono y el vocabulario. ¿Es formal y respetuoso ('Estimado cliente...')? ¿O es casual y amigable ('¡Hola! ¿Qué tal?')? Definir una personalidad consistente hace que la experiencia sea más agradable y refuerza la imagen de marca que quieres proyectar.", pt: "A personalidade define-se com o tom e o vocabulário. É formal e respeitoso ('Estimado cliente...')? Ou é casual e amigável ('Olá! Tudo bem?')? Definir uma personalidade consistente torna a experiência mais agradável e reforça a imagem de marca que quer projetar." }
        },
        {
          question: { es: "¿Qué es un 'chatbot proactivo'?", pt: "O que é um 'chatbot proativo'?" },
          answer: { es: "Es un chatbot que inicia la conversación, en lugar de esperar a que el usuario le hable. Por ejemplo, si un usuario pasa mucho tiempo en una página, el bot puede aparecer y ofrecer ayuda.", pt: "É um chatbot que inicia a conversa, em vez de esperar que o utilizador lhe fale. Por exemplo, se um utilizador passa muito tempo numa página, o bot pode aparecer e oferecer ajuda." },
          explanation: { es: "Los 'triggers' o disparadores proactivos se pueden configurar según el comportamiento del usuario. Un trigger común es 'si el usuario pasa más de 60 segundos en una ficha de propiedad, iniciar chat'. El mensaje podría ser: 'Veo que te interesa esta propiedad. ¿Tienes alguna pregunta sobre ella?'. Esto puede convertir a un visitante indeciso en un lead activo.", pt: "Os 'gatilhos' ou disparadores proativos podem ser configurados de acordo com o comportamento do utilizador. Um gatilho comum é 'se o utilizador passar mais de 60 segundos numa ficha de imóvel, iniciar chat'. A mensagem poderia ser: 'Vejo que está interessado neste imóvel. Tem alguma pergunta sobre ele?'. Isto pode transformar um visitante indeciso num lead ativo." }
        },
        {
          question: { es: "¿Qué métricas se usan para medir el éxito de un chatbot?", pt: "Que métricas são usadas para medir o sucesso de um chatbot?" },
          answer: { es: "Número de conversaciones, tasa de captura de leads, tasa de resolución de consultas, y la satisfacción del usuario (medida con una pequeña encuesta al final).", pt: "Número de conversas, taxa de captura de leads, taxa de resolução de consultas, e a satisfação do utilizador (medida com um pequeno inquérito no final)." },
          explanation: { es: "Medir es clave para mejorar. Un buen dashboard de chatbot debería mostrarte: cuántas personas lo usan, cuántos de ellos acaban dejando sus datos de contacto (leads), qué porcentaje de preguntas puede responder sin ayuda humana, y una puntuación de satisfacción. Analizar las preguntas que el bot no pudo responder es la mejor fuente de información para mejorar su base de conocimiento.", pt: "Medir é fundamental para melhorar. Um bom painel de controlo de chatbot deve mostrar-lhe: quantas pessoas o usam, quantas delas acabam por deixar os seus dados de contacto (leads), que percentagem de perguntas consegue responder sem ajuda humana, e uma pontuação de satisfação. Analisar as perguntas que o bot не conseguiu responder é a melhor fonte de informação para melhorar a sua base de conhecimento." }
        },
        {
          question: { es: "¿Cómo puede un chatbot ayudar en la venta de una propiedad?", pt: "Como um chatbot pode ajudar na venda de uma propriedade?" },
          answer: { es: "Calificando a los vendedores potenciales, recopilando información básica de la propiedad para una pre-valoración y agendando la visita de captación.", pt: "Qualificando os potenciais vendedores, recolhendo informação básica da propriedade para uma pré-avaliação e agendando a visita de angariação." },
          explanation: { es: "Un chatbot puede tener un flujo específico para vendedores. Puede preguntar: '¿Estás pensando en vender? Para darte una valoración orientativa, ¿podrías decirme la dirección y características de tu casa?'. Recopila los datos y agenda una llamada o visita para que el agente pueda hacer el seguimiento, ya con la información inicial en la mano.", pt: "Um chatbot pode ter um fluxo específico para vendedores. Pode perguntar: 'Está a pensar em vender? Para lhe dar uma avaliação indicativa, poderia dizer-me a morada e as características da sua casa?'. Recolhe os dados e agenda uma chamada ou visita para que o agente possa dar seguimento, já com a informação inicial em mãos." }
        },
        {
          question: { es: "¿Cómo se usa un chatbot en WhatsApp?", pt: "Como se usa um chatbot no WhatsApp?" },
          answer: { es: "A través de la API de WhatsApp Business. Permite automatizar respuestas a los mensajes que llegan a tu número de empresa, funcionando de forma similar a un chatbot web.", pt: "Através da API do WhatsApp Business. Permite automatizar respostas às mensagens que chegam ao seu número de empresa, funcionando de forma semelhante a um chatbot de website." },
          explanation: { es: "La integración con WhatsApp es muy potente porque es un canal de comunicación muy personal. Un cliente puede escanear un código QR en un cartel de 'Se Vende' e iniciar una conversación instantánea con el bot para obtener más información o agendar una visita, todo sin salir de WhatsApp. Requiere una aprobación de Meta y a menudo se gestiona a través de plataformas intermediarias.", pt: "A integração com o WhatsApp é muito potente porque é um canal de comunicação muito pessoal. Um cliente pode digitalizar um código QR num cartaz de 'Vende-se' e iniciar uma conversa instantânea com o bot para obter mais informações ou agendar uma visita, tudo sem sair do WhatsApp. Requer uma aprovação da Meta e é frequentemente gerida através de plataformas intermediárias." }
        },
        {
          question: { es: "¿Qué es el 'análisis de sentimiento' en una conversación de chatbot?", pt: "O que é a 'análise de sentimento' numa conversa de chatbot?" },
          answer: { es: "Es la capacidad de la IA para detectar la emoción en el texto del usuario (frustración, alegría, urgencia) y reaccionar en consecuencia.", pt: "É a capacidade da IA para detetar a emoção no texto do utilizador (frustração, alegria, urgência) e reagir em conformidade." },
          explanation: { es: "Si un usuario escribe '¡¡¡llevo 10 minutos esperando y nadie me contesta!!!', la IA puede detectar el sentimiento negativo y la urgencia. En lugar de dar una respuesta estándar, podría activar una escalada a humano inmediatamente con una alerta de alta prioridad. Esto ayuda a gestionar proactivamente a los clientes insatisfechos.", pt: "Se um utilizador escreve '!!!estou há 10 minutos à espera e ninguém me responde!!!', a IA pode detetar o sentimento negativo e a urgência. Em vez de dar uma resposta padrão, poderia ativar uma escalada para humano imediatamente com um alerta de alta prioridade. Isto ajuda a gerir proativamente os clientes insatisfeitos." }
        },
        {
          question: { es: "¿Un chatbot puede recordar conversaciones pasadas?", pt: "Um chatbot pode recordar conversas passadas?" },
          answer: { es: "Sí, los chatbots avanzados conectados a un CRM pueden acceder al historial de un usuario para tener una conversación contextualizada.", pt: "Sim, os chatbots avançados ligados a um CRM podem aceder ao histórico de um utilizador para ter uma conversa contextualizada." },
          explanation: { es: "Si un usuario vuelve a tu web una semana después, el chatbot puede saludarle con: '¡Hola de nuevo, Juan! La última vez hablamos sobre pisos de 2 habitaciones en el centro. ¿Quieres continuar la búsqueda o te interesa algo nuevo?'. Esta memoria contextual hace que la experiencia sea mucho más personal y eficiente.", pt: "Se um utilizador volta ao seu site uma semana depois, o chatbot pode saudá-lo com: 'Olá novamente, João! Da última vez falámos sobre apartamentos T2 no centro. Quer continuar a busca ou interessa-lhe algo novo?'. Esta memória contextual torna a experiência muito mais pessoal e eficiente." }
        },
        {
          question: { es: "¿Es caro implementar un chatbot con IA?", pt: "É caro implementar um chatbot com IA?" },
          answer: { es: "No necesariamente. Existen muchas plataformas 'no-code' con planes asequibles o gratuitos para empezar. El coste varía mucho según la complejidad y el volumen de conversaciones.", pt: "Não necessariamente. Existem muitas plataformas 'no-code' com planos acessíveis ou gratuitos para começar. O custo varia muito dependendo da complexidade e do volume de conversas." },
          explanation: { es: "Las soluciones van desde herramientas gratuitas o de bajo coste (menos de 50€/mes) para chatbots simples, hasta miles de euros para implementaciones empresariales a medida. Para un agente independiente o una pequeña agencia, hay muchas opciones potentes y asequibles que ofrecen un gran retorno de la inversión.", pt: "As soluções vão desde ferramentas gratuitas ou de baixo custo (menos de 50€/mês) para chatbots simples, até milhares de euros para implementações empresariais à medida. Para um agente independente ou uma pequena agência, existem muitas opções potentes e acessíveis que oferecem um grande retorno do investimento." }
        },
        {
          question: { es: "Dame 3 preguntas clave para calificar a un comprador.", pt: "Dê-me 3 perguntas-chave para qualificar um comprador." },
          answer: { es: "1. ¿Cuál es tu presupuesto máximo? 2. ¿Para cuándo necesitas mudarte? 3. ¿Necesitas vender una propiedad antes de comprar?", pt: "1. Qual é o seu orçamento máximo? 2. Para quando precisa de se mudar? 3. Precisa de vender um imóvel antes de comprar?" },
          explanation: { es: "Estas tres preguntas determinan la viabilidad, la urgencia y la complejidad de la operación. Un cliente con un presupuesto claro, una fecha límite cercana y sin necesidad de vender, es un lead de altísima prioridad. Un chatbot puede hacer estas preguntas de forma sistemática a cada nuevo contacto.", pt: "Estas três perguntas determinam a viabilidade, a urgência e a complexidade da operação. Um cliente com um orçamento claro, um prazo próximo e sem necessidade de vender, é um lead de altíssima prioridade. Um chatbot pode fazer estas perguntas de forma sistemática a cada novo contacto." }
        },
        {
          question: { es: "Dame 3 preguntas clave para calificar a un vendedor.", pt: "Dê-me 3 perguntas-chave para qualificar um vendedor." },
          answer: { es: "1. ¿Cuál es tu principal motivación para vender? 2. ¿Qué plazos tienes en mente? 3. ¿Has hablado ya con otras agencias?", pt: "1. Qual é a sua principal motivação para vender? 2. Que prazos tem em mente? 3. Já falou com outras agências?" },
          explanation: { es: "La motivación (traslado laboral, divorcio, herencia) revela la urgencia y el poder de negociación. Los plazos confirman esa urgencia. Saber si compites con otras agencias te prepara para la reunión de captación. Un bot puede recopilar esta información preliminar para que el agente llegue a la visita mucho mejor preparado.", pt: "A motivação (mudança de emprego, divórcio, herança) revela a urgência e o poder de negociação. Os prazos confirmam essa urgência. Saber se está a competir com outras agências prepara-o para a reunião de angariação. Um bot pode recolher esta informação preliminar para que o agente chegue à visita muito mais bem preparado." }
        },
        {
          question: { es: "¿Qué es la 'intención' en una conversación con un bot?", pt: "O que é a 'intenção' numa conversa com um bot?" },
          answer: { es: "Es el objetivo o propósito real del usuario. La IA intenta identificar la 'intención' (ej. 'agendar_visita') a partir de la frase del usuario ('quiero ver la casa').", pt: "É o objetivo ou propósito real do utilizador. A IA tenta identificar a 'intenção' (ex. 'agendar_visita') a partir da frase do utilizador ('quero ver a casa')." },
          explanation: { es: "El PLN funciona identificando 'intenciones' y 'entidades'. Si un usuario dice 'quiero ver el piso de la calle Mayor mañana por la tarde', la IA lo desglosa: Intención: 'agendar_visita'. Entidades: 'piso' (tipo), 'calle Mayor' (ubicación), 'mañana por la tarde' (fecha/hora). Identificar correctamente la intención es el primer paso para que el bot pueda responder de forma útil.", pt: "O PLN funciona identificando 'intenções' e 'entidades'. Se um utilizador diz 'quero ver o apartamento na rua Principal amanhã à tarde', a IA decompõe-no: Intenção: 'agendar_visita'. Entidades: 'apartamento' (tipo), 'rua Principal' (localização), 'amanhã à tarde' (data/hora). Identificar corretamente a intenção é o primeiro passo para que o bot possa responder de forma útil." }
        },
        {
          question: { es: "¿Puede un chatbot mostrar propiedades dentro del chat?", pt: "Pode um chatbot mostrar imóveis dentro do chat?" },
          answer: { es: "Sí, puede mostrar 'tarjetas' o 'carruseles' con la imagen de la propiedad, el precio y un botón para 'Ver más detalles' o 'Agendar visita'.", pt: "Sim, pode mostrar 'cartões' ou 'carrosséis' com a imagem do imóvel, o preço e um botão para 'Ver mais detalhes' ou 'Agendar visita'." },
          explanation: { es: "En lugar de solo dar un enlace, un chatbot moderno puede presentar la información de forma visual y interactiva. Después de calificar al usuario, el bot podría decir 'Basado en tu búsqueda, aquí tienes 3 propiedades que podrían gustarte' y mostrar un carrusel de imágenes por el que el usuario puede deslizarse, haciendo la experiencia mucho más rica y atractiva.", pt: "Em vez de apenas dar um link, um chatbot moderno pode apresentar a informação de forma visual e interativa. Depois de qualificar o utilizador, o bot poderia dizer 'Com base na sua pesquisa, aqui estão 3 imóveis de que poderá gostar' e mostrar um carrossel de imagens pelo qual o utilizador pode deslizar, tornando a experiência muito mais rica e atrativa." }
        },
        {
          question: { es: "¿Qué es un 'agente de voz' o 'voicebot'?", pt: "O que é um 'agente de voz' ou 'voicebot'?" },
          answer: { es: "Es un chatbot que se comunica a través de la voz, como los que atienden en las centralitas telefónicas de grandes empresas. Puede realizar tareas como calificar leads por teléfono.", pt: "É um chatbot que se comunica através da voz, como os que atendem nas centrais telefónicas de grandes empresas. Pode realizar tarefas como qualificar leads por telefone." },
          explanation: { es: "Los agentes de voz son cada vez más sofisticados. En el sector inmobiliario, se pueden usar para realizar llamadas de prospección iniciales o para el seguimiento de leads. Un voicebot puede llamar a un nuevo lead y decir: 'Hola, te llamo de [Agencia] porque solicitaste información. ¿Sería un buen momento para hacerte un par de preguntas rápidas?'. Esto permite un primer contacto ultrarrápido y a gran escala.", pt: "Os agentes de voz são cada vez mais sofisticados. No setor imobiliário, podem ser usados para fazer chamadas de prospeção iniciais ou para o acompanhamento de leads. Um voicebot pode ligar para um novo lead e dizer: 'Olá, ligo-lhe da [Agência] porque solicitou informação. Seria um bom momento para lhe fazer umas perguntas rápidas?'. Isto permite um primeiro contacto ultrarrápido e em grande escala." }
        },
        {
          question: { es: "¿Cómo se debe informar al usuario de que está hablando con un bot?", pt: "Como se deve informar o utilizador de que está a falar com um bot?" },
          answer: { es: "De forma clara y al principio de la conversación. Es una cuestión de transparencia y de gestionar las expectativas del usuario.", pt: "De forma clara e no início da conversa. É uma questão de transparência e de gerir as expectativas do utilizador." },
          explanation: { es: "Intentar engañar a un usuario haciéndole creer que habla con un humano siempre acaba en frustración. Un buen mensaje de bienvenida debe incluir una frase como 'Soy tu asistente virtual' o 'Estás hablando con el bot de [Agencia]'. Esta honestidad genera confianza y hace que los usuarios sean más pacientes si el bot comete un error.", pt: "Tentar enganar um utilizador fazendo-o crer que está a falar com um humano acaba sempre em frustração. Uma boa mensagem de boas-vindas deve incluir uma frase como 'Sou o seu assistente virtual' ou 'Está a falar com o bot da [Agência]'. Esta honestidade gera confiança e faz com que os utilizadores sejam mais pacientes se o bot cometer um erro." }
        },
        {
          question: { es: "¿Cuál es el error más común al implementar un chatbot?", pt: "Qual é o erro mais comum ao implementar um chatbot?" },
          answer: { es: "Lanzarlo sin una base de conocimiento suficiente o sin flujos de conversación bien definidos, lo que lleva a que responda 'no te entiendo' constantemente.", pt: "Lançá-lo sem uma base de conhecimento suficiente ou sem fluxos de conversação bem definidos, o que leva a que responda 'não o entendo' constantemente." },
          explanation: { es: "Un chatbot 'tonto' es peor que no tener chatbot. Antes del lanzamiento, es crucial dedicar tiempo a 'entrenarlo' con las preguntas más frecuentes y a diseñar los flujos para las tareas principales (calificar comprador, vendedor, etc.). Es mejor tener un bot que haga 3 cosas bien que uno que intente hacer 20 cosas mal.", pt: "Um chatbot 'burro' é pior do que não ter chatbot. Antes do lançamento, é crucial dedicar tempo a 'treiná-lo' com as perguntas mais frequentes e a desenhar os fluxos para as tarefas principais (qualificar comprador, vendedor, etc.). É melhor ter um bot que faz 3 coisas bem do que um que tenta fazer 20 coisas mal." }
        },
        {
          question: { es: "¿Puede un chatbot hablar varios idiomas?", pt: "Um chatbot pode falar vários idiomas?" },
          answer: { es: "Sí, la mayoría de las plataformas de IA modernas son multilingües. Pueden detectar el idioma del usuario y responder en el mismo.", pt: "Sim, a maioria das plataformas de IA modernas são multilingues. Podem detetar o idioma do utilizador e responder no mesmo." },
          explanation: { es: "Para agentes que trabajan en zonas turísticas o con clientes internacionales, esta es una función clave. El chatbot puede ser entrenado con respuestas en varios idiomas. Cuando un usuario escribe en inglés, el bot responderá en inglés. Esto amplía enormemente el mercado potencial y ofrece un servicio excelente a clientes extranjeros.", pt: "Para agentes que trabalham em zonas turísticas ou com clientes internacionais, esta é uma função-chave. O chatbot pode ser treinado com respostas em vários idiomas. Quando um utilizador escreve em inglês, o bot responderá em inglês. Isto amplia enormemente o mercado potencial e oferece um serviço excelente a clientes estrangeiros." }
        },
        {
          question: { es: "¿Qué es la 'analítica conversacional'?", pt: "O que é a 'analítica conversacional'?" },
          answer: { es: "Es el análisis de los datos de las conversaciones del chatbot para extraer insights de negocio, como cuáles son las preguntas más frecuentes o los puntos de fricción de los clientes.", pt: "É a análise dos dados das conversas do chatbot para extrair insights de negócio, como quais são as perguntas mais frequentes ou os pontos de atrito dos clientes." },
          explanation: { es: "Las conversaciones de tu chatbot son una mina de oro de datos. Analizarlas te puede revelar qué información falta en tu web (si mucha gente pregunta lo mismo), qué características de las propiedades son las más demandadas, o en qué punto del flujo de calificación abandonan más usuarios. Esta información es vital para mejorar tanto el chatbot como tu estrategia de marketing general.", pt: "As conversas do seu chatbot são uma mina de ouro de dados. Analisá-las pode revelar-lhe que informação falta no seu site (se muita gente pergunta o mesmo), que características dos imóveis são as mais procuradas, ou em que ponto do fluxo de qualificação mais utilizadores desistem. Esta informação é vital para mejorar tanto o chatbot como a sua estratégia de marketing geral." }
        },
        {
          question: { es: "Un usuario pregunta al bot: '¿Cuál es el mejor colegio de la zona?'. ¿Cómo debería responder?", pt: "Um utilizador pergunta ao bot: 'Qual é a melhor escola da zona?'. Como deve responder?" },
          answer: { es: "De forma objetiva y sin dar una opinión. 'Hay varios colegios bien valorados en la zona, como [Colegio A], [Colegio B] y [Colegio C]. Te recomiendo consultar sus webs para más detalles'.", pt: "De forma objetiva e sem dar uma opinião. 'Existem várias escolas bem avaliadas na zona, como [Escola A], [Escola B] e [Escola C]. Recomendo que consulte os seus websites para mais detalhes'." },
          explanation: { es: "Un chatbot no debe dar opiniones subjetivas, ya que podría tener implicaciones legales o ser percibido como un mal consejo. Su función es proporcionar datos objetivos. En lugar de decir 'el mejor', debe listar las opciones más populares o cercanas. Siempre debe redirigir al usuario a las fuentes oficiales para obtener información crítica como la calidad de los colegios.", pt: "Um chatbot não deve dar opiniões subjetivas, pois isso poderia ter implicações legais ou ser percebido como um mau conselho. A sua função é fornecer dados objetivos. Em vez de dizer 'a melhor', deve listar as opções mais populares ou próximas. Deve sempre redirecionar o utilizador para as fontes oficiais para obter informação crítica como a qualidade das escolas." }
        },
        {
          question: { es: "¿Cómo se puede usar un chatbot para registrar asistentes a un 'open house'?", pt: "Como se pode usar um chatbot para registar participantes num 'open house'?" },
          answer: { es: "Creando un flujo donde el bot da los detalles del evento y presenta un formulario simple para que el usuario deje su nombre y email para confirmar su asistencia.", pt: "Criando um fluxo onde o bot dá os detalhes do evento e apresenta um formulário simples para que o utilizador deixe o seu nome e e-mail para confirmar a sua presença." },
          explanation: { es: "Se puede poner un código QR en el anuncio del 'open house' que lleve al chatbot. El flujo sería: Bot: '¡Hola! ¿Quieres registrarte para nuestro open house en Calle Mayor?'. Usuario: 'Sí'. Bot: 'Genial, es este sábado a las 11h. Para añadirte a la lista, ¿cuál es tu nombre y email?'. Esto automatiza el registro y crea una lista de asistentes a los que se puede enviar un recordatorio el día antes.", pt: "Pode-se colocar um código QR no anúncio do 'open house' que leve ao chatbot. O fluxo seria: Bot: 'Olá! Quer registar-se para o nosso open house na Rua Principal?'. Utilizador: 'Sim'. Bot: 'Ótimo, é este sábado às 11h. Para o adicionar à lista, qual é o seu nome e e-mail?'. Isto automatiza o registo e cria uma lista de participantes aos quais se pode enviar um lembrete no dia anterior." }
        },
        {
          question: { es: "¿Qué es el 'contexto' en una conversación de IA?", pt: "O que é o 'contexto' numa conversa de IA?" },
          answer: { es: "Es la información de los mensajes anteriores que la IA retiene para que la conversación tenga sentido y no tenga que preguntar lo mismo varias veces.", pt: "É a informação das mensagens anteriores que a IA retém para que a conversa faça sentido e não tenha de perguntar a mesma coisa várias vezes." },
          explanation: { es: "Un bot sin contexto es frustrante. Usuario: 'Busco un piso de 3 habitaciones'. Bot: 'Ok'. Usuario: '¿Tienes alguno en el centro?'. Un bot con contexto recordaría '3 habitaciones' y buscaría 'piso de 3 habitaciones en el centro'. Mantener el contexto es clave para que la conversación sea coherente y útil.", pt: "Um bot sem contexto é frustrante. Utilizador: 'Procuro um apartamento de 3 quartos'. Bot: 'Ok'. Utilizador: 'Tem algum no centro?'. Um bot com contexto lembraria '3 quartos' e procuraria 'apartamento de 3 quartos no centro'. Manter o contexto é fundamental para que a conversa seja coerente e útil." }
        },
        {
          question: { es: "Si el bot detecta que un usuario está 'atascado' en un bucle, ¿qué debería hacer?", pt: "Se o bot detetar que um utilizador está 'preso' num loop, o que deve fazer?" },
          answer: { es: "Debería romper el bucle proactivamente y ofrecer la escalada a un humano.", pt: "Deveria quebrar o loop proativamente e oferecer a escalada para um humano." },
          explanation: { es: "Si el bot responde 'no te entiendo' dos o tres veces seguidas, un sistema bien diseñado debería reconocer este patrón de fallo. En lugar de una cuarta respuesta de 'no te entiendo', debería cambiar su respuesta a: 'Parece que no estoy logrando ayudarte. Mis disculpas. ¿Te gustaría que un agente humano se ponga en contacto contigo para resolver esto?'.", pt: "Se o bot responder 'não o entendo' duas ou três vezes seguidas, um sistema bem desenhado deve reconhecer este padrão de falha. Em vez de uma quarta resposta de 'não o entendo', deve mudar a sua resposta para: 'Parece que não estou a conseguir ajudar. As minhas desculpas. Gostaria que um agente humano entrasse em contacto consigo para resolver isto?'." }
        },
        {
          question: { es: "¿Cómo puede un chatbot mejorar el SEO de una web?", pt: "Como um chatbot pode melhorar o SEO de um site?" },
          answer: { es: "Indirectamente. Al mejorar la experiencia del usuario y aumentar el 'tiempo en página', envía señales positivas a Google de que el sitio es valioso.", pt: "Indiretamente. Ao mejorar a experiência do utilizador e aumentar o 'tempo na página', envia sinais positivos ao Google de que o site é valioso." },
          explanation: { es: "El SEO no solo se trata de palabras clave. Google valora mucho las 'métricas de usuario'. Si un visitante entra en tu web, interactúa con el chatbot durante 5 minutos y navega a varias páginas que el bot le sugiere, esto le dice a Google que el usuario encontró el sitio útil y relevante. Este 'engagement' (interacción) puede contribuir a mejorar tu ranking a largo plazo.", pt: "O SEO не se trata apenas de palavras-chave. O Google valoriza muito as 'métricas do utilizador'. Se um visitante entra no seu site, interage com o chatbot durante 5 minutos e navega para várias páginas que o bot lhe sugere, isto diz ao Google que o utilizador achou o site útil e relevante. Este 'engagement' (interação) pode contribuir para mejorar a sua classificação a longo prazo." }
        },
        {
          question: { es: "¿Qué es la 'intención de salida' (exit intent)?", pt: "O que é a 'intenção de saída' (exit intent)?" },
          answer: { es: "Es una tecnología que detecta cuando un usuario está a punto de abandonar una página (moviendo el ratón hacia el botón de cerrar). Se puede usar para activar un chatbot proactivo.", pt: "É uma tecnologia que deteta quando um utilizador está prestes a abandonar uma página (movendo o rato em direção ao botão de fechar). Pode ser usada para ativar um chatbot proativo." },
          explanation: { es: "La 'intención de salida' es una última oportunidad para retener a un visitante. Justo cuando el usuario va a cerrar la pestaña, se puede lanzar un pop-up con el chatbot diciendo: '¡Espera! Antes de que te vayas, ¿hay algo en lo que pueda ayudarte? Quizás no encontraste lo que buscabas'. Esta intervención puede convertir a un visitante perdido en un lead.", pt: "A 'intenção de saída' é uma última oportunidade para reter um visitante. Exatamente quando o utilizador vai fechar o separador, pode-se lançar um pop-up com o chatbot a dizer: 'Espere! Antes de ir, há algo em que possa ajudar? Talvez não tenha encontrado o que procurava'. Esta intervenção pode transformar um visitante perdido num lead." }
        },
        {
          question: { es: "¿Puede un chatbot enviar documentos?", pt: "Um chatbot pode enviar documentos?" },
          answer: { es: "Sí, puede proporcionar enlaces de descarga para documentos como un dossier de propiedad, una guía para compradores o un formulario de oferta.", pt: "Sim, pode fornecer links de download para documentos como um dossiê do imóvel, um guia para compradores ou um formulário de oferta." },
          explanation: { es: "Esto es muy útil para la eficiencia. Un usuario puede solicitar 'Quiero más detalles sobre la propiedad 123'. El chatbot puede responder 'Claro, aquí tienes el dossier completo en PDF para descargar' y proporcionar el enlace. Esto da al cliente la información que necesita al instante, sin que el agente tenga que enviar un email manualmente.", pt: "Isto é muito útil para a eficiência. Um utilizador pode solicitar 'Quero mais detalhes sobre o imóvel 123'. O chatbot pode responder 'Claro, aqui tem o dossiê completo em PDF para download' e fornecer o link. Isto dá ao cliente a informação de que precisa instantaneamente, sem que o agente tenha de enviar um e-mail manualmente." }
        },
        {
          question: { es: "¿Qué son los 'rich media' en una conversación de chatbot?", pt: "O que são 'rich media' numa conversa de chatbot?" },
          answer: { es: "Son elementos no textuales como imágenes, GIFs, vídeos o mapas interactivos que se pueden mostrar dentro de la ventana de chat para hacer la conversación más visual.", pt: "São elementos não textuais como imagens, GIFs, vídeos ou mapas interativos que podem ser mostrados dentro da janela de chat para tornar a conversa mais visual." },
          explanation: { es: "En lugar de solo describir una propiedad, un chatbot puede mostrar una galería de fotos o un pequeño vídeo. Si el usuario pregunta por la ubicación, el bot puede mostrar un mapa interactivo de Google Maps. El uso de 'rich media' hace que la interacción sea mucho más atractiva y efectiva que una simple conversación de texto.", pt: "Em vez de apenas descrever um imóvel, um chatbot pode mostrar uma galeria de fotos ou um pequeno vídeo. Se o utilizador perguntar pela localização, o bot pode mostrar um mapa interativo do Google Maps. O uso de 'rich media' torna a interação muito mais atrativa e eficaz do que uma simples conversa de texto." }
        },
        {
          question: { es: "¿Cómo se personaliza un chatbot según la fuente del tráfico?", pt: "Como se personaliza um chatbot de acordo com a fonte do tráfego?" },
          answer: { es: "Detectando de dónde viene el usuario (ej. un anuncio de Facebook sobre alquileres) y adaptando el mensaje de bienvenida.", pt: "Detetando de onde vem o utilizador (ex. um anúncio do Facebook sobre arrendamentos) e adaptando a mensagem de boas-vindas." },
          explanation: { es: "Si un usuario llega a tu web haciendo clic en un anuncio específico, sabes cuál es su interés inicial. Se puede configurar el chatbot para que lo reconozca. En lugar de un saludo genérico, el bot podría decir: '¡Hola! Veo que vienes de nuestro anuncio sobre alquileres para estudiantes. ¿Te gustaría ver las mejores opciones que tenemos cerca de la universidad?'. Esta personalización inmediata aumenta drásticamente la relevancia y la conversión.", pt: "Se um utilizador chega ao seu site clicando num anúncio específico, sabe qual é o seu interesse inicial. Pode-se configurar o chatbot para o reconhecer. Em vez de uma saudação genérica, o bot poderia dizer: 'Olá! Vejo que vem do nosso anúncio sobre arrendamentos para estudantes. Gostaria de ver as melhores opções que temos perto da universidade?'. Esta personalização imediata aumenta drasticamente a relevância e a conversão." }
        }
    ]
};