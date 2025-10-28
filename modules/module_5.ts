import { Module } from '../types';

export const module5: Module = {
    id: "5",
    title: { es: "5. Marketing Digital Automatizado", pt: "5. Marketing Digital Automatizado" },
    description: { es: "Crea campañas de email, publicaciones para redes sociales y anuncios de forma automática y personalizada.", pt: "Crie campanhas de email, publicações para redes sociais e anúncios de forma automática e personalizada." },
    icon: "marketing",
    hero: {
      title: { es: "Marketing que Trabaja por Ti", pt: "Marketing que Trabalha por Si" },
      subtitle: { es: "Llega a más clientes con menos esfuerzo, creando contenido relevante y segmentado con IA.", pt: "Chegue a mais clientes com menos esforço, criando conteúdo relevante e segmentado com IA." },
      image: "https://picsum.photos/1200/600?random=5",
    },
    content: {
      learnTitle: { es: "Qué aprenderás a automatizar", pt: "O que vai aprender a automatizar" },
      points: [
        { es: "Generar textos persuasivos (copy) para anuncios, portales y redes sociales.", pt: "Gerar textos persuasivos (copy) para anúncios, portais e redes sociais." },
        { es: "Crear secuencias de email automatizadas (drip campaigns) para nutrir leads.", pt: "Criar sequências de email automatizadas (drip campaigns) para nutrir leads." },
        { es: "Diseñar y programar un calendario de contenidos para tus redes sociales.", pt: "Desenhar e programar um calendário de conteúdos para as suas redes sociais." },
        { es: "Segmentar audiencias para crear campañas de anuncios hiper-dirigidas en Facebook e Instagram.", pt: "Segmentar audiências para criar campanhas de anúncios hiper-direcionadas no Facebook e Instagram." },
        { es: "Crear guiones para vídeos cortos (Reels/Shorts) y tours de propiedades.", pt: "Criar guiões para vídeos curtos (Reels/Shorts) e tours de propriedades." },
        { es: "Analizar el rendimiento de tus campañas para optimizar la inversión.", pt: "Analisar o desempenho das suas campanhas para otimizar o investimento." }
      ],
    },
    resources: {
      title: { es: "Plantillas y Guías de Marketing", pt: "Modelos e Guias de Marketing" },
      downloads: [
        { 
          text: { es: "Plantilla: Prompts para Redes Sociales", pt: "Modelo: Prompts para Redes Sociais" },
          url: "/docs/plantilla_prompts_redes_sociales.pdf" 
        },
        { 
          text: { es: "Guía: Creando un Embudo de Email con IA", pt: "Guia: Criando um Funil de Email com IA" },
          url: "/docs/guia_email_funnel_ia.pdf" 
        },
        { 
          text: { es: "Checklist: Tu Campaña de Marketing con IA", pt: "Checklist: A sua Campanha de Marketing com IA" },
          url: "/docs/checklist_campana_ia.pdf" 
        }
      ],
    },
    videos: [
      {
        title: { es: "Tutorial Práctico: Creando Contenido para Redes Sociales con IA", pt: "Tutorial Prático: Criando Conteúdo para Redes Sociais com IA" },
        embedUrl: "https://www.youtube.com/embed/R_262rxyS_w",
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
        question: { es: "¿Qué es el 'copywriting' con IA en marketing inmobiliario?", pt: "O que é 'copywriting' com IA em marketing imobiliário?" },
        answer: { es: "Es el uso de inteligencia artificial para generar textos persuasivos y atractivos para anuncios, emails y redes sociales, con el fin de captar la atención y motivar a la acción.", pt: "É o uso de inteligência artificial para gerar textos persuasivos e atraentes para anúncios, e-mails e redes sociais, com o objetivo de captar a atenção e motivar a uma ação." },
        explanation: { es: "La IA puede analizar las características de una propiedad y el perfil del comprador ideal para crear múltiples versiones de un texto. Puede generar un título llamativo, una descripción que evoque un estilo de vida y una llamada a la acción efectiva. Esto ahorra horas de trabajo y permite realizar pruebas A/B para ver qué versión del texto convierte mejor.", pt: "A IA pode analisar as características de um imóvel e o perfil do comprador ideal para criar múltiplas versões de um texto. Pode gerar um título chamativo, uma descrição que evoque um estilo de vida e uma chamada à ação eficaz. Isto poupa horas de trabalho e permite realizar testes A/B para ver qual versão do texto converte melhor." }
      },
      {
        question: { es: "¿Qué es una 'Marketing Persona'?", pt: "O que é uma 'Marketing Persona'?" },
        answer: { es: "Es una representación semi-ficticia de tu cliente ideal, basada en datos y estudios de mercado. Ayuda a personalizar y dirigir mejor el marketing.", pt: "É uma representação semi-fictícia do seu cliente ideal, baseada em dados e estudos de mercado. Ajuda a personalizar e a direcionar melhor o marketing." },
        explanation: { es: "Una 'persona' tiene nombre, edad, profesión, motivaciones, y 'puntos de dolor'. Por ejemplo, 'Ana, 35 años, abogada, busca su primera casa familiar cerca de buenos colegios'. La IA puede ayudar a crear estas personas analizando tu base de datos de clientes. Todo el marketing (textos, imágenes, canales) se diseña pensando en 'hablarle a Ana', lo que lo hace mucho más efectivo.", pt: "Uma 'persona' tem nome, idade, profissão, motivações e 'pontos de dor'. Por exemplo, 'Ana, 35 anos, advogada, procura a sua primeira casa de família perto de boas escolas'. A IA pode ajudar a criar estas personas analisando a sua base de dados de clientes. Todo o marketing (textos, imagens, canais) é concebido a pensar em 'falar com a Ana', o que o torna muito mais eficaz." }
      },
      {
        question: { es: "¿Qué es un 'mapa del viaje del cliente' (Customer Journey Map)?", pt: "O que é um 'mapa da jornada do cliente' (Customer Journey Map)?" },
        answer: { es: "Es una visualización de todas las interacciones que un cliente tiene con tu marca, desde que te descubre hasta que se convierte en cliente y más allá.", pt: "É uma visualização de todas as interações que um cliente tem com a sua marca, desde o momento em que a descobre até se tornar cliente e depois." },
        explanation: { es: "El mapa identifica cada 'punto de contacto' (touchpoint): la primera vez que ve un anuncio, su visita a la web, el primer email que recibe, la visita a la propiedad, la negociación, etc. La IA ayuda a automatizar y personalizar la comunicación en cada una de estas etapas para crear una experiencia fluida y positiva, guiando al cliente suavemente a través del embudo de ventas.", pt: "O mapa identifica cada 'ponto de contacto' (touchpoint): a primeira vez que vê um anúncio, a sua visita ao site, o primeiro e-mail que recebe, a visita ao imóvel, a negociação, etc. A IA ajuda a automatizar e a personalizar a comunicação em cada uma destas etapas para criar uma experiência fluida e positiva, guiando o cliente suavemente através do funil de vendas." }
      },
      {
        question: { es: "¿Cómo se usa la IA para crear un calendario de contenidos?", pt: "Como se usa a IA para criar um calendário de conteúdos?" },
        answer: { es: "Pidiéndole ideas de publicaciones para un mes, especificando temas, fechas clave y formatos. Por ejemplo: 'Genera 12 ideas de posts para Instagram para un agente inmobiliario en [tu ciudad]'.", pt: "Pedindo-lhe ideias de publicações para um mês, especificando temas, datas importantes e formatos. Por exemplo: 'Gera 12 ideias de posts para o Instagram para um agente imobiliário em [a sua cidade]'." },
        explanation: { es: "La IA puede actuar como un estratega de contenidos. Puedes darle un prompt como: 'Crea un calendario de contenidos para mayo. Incluye 2 posts sobre nuevas propiedades, 1 sobre una bajada de precio, 2 consejos para vendedores, 2 sobre el barrio X, y 1 para el Día de la Madre'. La IA te devolverá una lista estructurada con ideas para cada día, que luego puedes usar para generar el texto e imagen específicos.", pt: "A IA pode atuar como um estratega de conteúdos. Pode dar-lhe um prompt como: 'Cria um calendário de conteúdos para maio. Inclui 2 posts sobre novos imóveis, 1 sobre uma baixa de preço, 2 dicas para vendedores, 2 sobre o bairro X, e 1 para o Dia da Mãe'. A IA devolver-lhe-á uma lista estruturada com ideias para cada dia, que pode depois usar para gerar o texto e a imagem específicos." }
      },
      {
        question: { es: "¿Qué es una 'drip campaign' o campaña de goteo?", pt: "O que é uma 'drip campaign' ou campanha de gotejamento?" },
        answer: { es: "Es una secuencia de emails automatizada que se envía a un lead durante un período de tiempo. Su objetivo es 'nutrir' al lead con información valiosa hasta que esté listo para comprar.", pt: "É uma sequência de e-mails automatizada enviada a um lead durante um período de tempo. O seu objetivo é 'nutrir' o lead com informação valiosa até que esteja pronto para comprar." },
        explanation: { es: "Cuando un lead descarga una guía, entra en una 'drip campaign'. El Día 1 recibe la guía. El Día 3 recibe un email con un testimonio. El Día 7 recibe un análisis del mercado. El Día 12 recibe una invitación a una consulta. La IA puede redactar todos estos emails, asegurando que sean coherentes y aporten valor, manteniendo tu marca en la mente del cliente de forma no intrusiva.", pt: "Quando um lead descarrega um guia, entra numa 'drip campaign'. No Dia 1, recebe o guia. No Dia 3, recebe um e-mail com um testemunho. No Dia 7, recebe uma análise de mercado. No Dia 12, recebe um convite para uma consulta. A IA pode redigir todos estes e-mails, garantindo que sejam coerentes e agreguem valor, mantendo a sua marca na mente do cliente de forma não intrusiva." }
      },
      {
        question: { es: "¿Qué es el A/B testing en un email o anuncio?", pt: "O que é o teste A/B num e-mail ou anúncio?" },
        answer: { es: "Es crear dos versiones de un mismo elemento (ej. dos asuntos de email diferentes) y enviarlas a dos mitades de tu audiencia para ver cuál funciona mejor.", pt: "É criar duas versões de um mesmo elemento (ex. dois assuntos de e-mail diferentes) e enviá-las para duas metades da sua audiência para ver qual funciona melhor." },
        explanation: { es: "La IA facilita enormemente el A/B testing. Puedes pedirle: 'Genera 5 asuntos de email diferentes para anunciar una bajada de precio'. Luego, tu plataforma de email marketing envía el Asunto A al 50% de tu lista y el Asunto B al otro 50%. La plataforma mide cuál tiene una mayor 'tasa de apertura'. El asunto ganador se usará en futuras campañas. Esto permite optimizar tu marketing basándote en datos reales, no en suposiciones.", pt: "A IA facilita enormemente o teste A/B. Pode pedir-lhe: 'Gera 5 assuntos de e-mail diferentes para anunciar uma baixa de preço'. Depois, a sua plataforma de e-mail marketing envia o Assunto A para 50% da sua lista e o Assunto B para os outros 50%. A plataforma mede qual tem uma maior 'taxa de abertura'. O assunto vencedor será usado em futuras campanhas. Isto permite otimizar o seu marketing com base em dados reais, não em suposições." }
      },
      {
        question: { es: "Diferencia entre 'Tasa de Apertura' y 'CTR' en email marketing.", pt: "Diferença entre 'Taxa de Abertura' e 'CTR' em e-mail marketing." },
        answer: { es: "La Tasa de Apertura es el % de gente que abrió el email. El CTR (Click-Through Rate) es el % de gente que, habiéndolo abierto, hizo clic en un enlace dentro del email.", pt: "A Taxa de Abertura é a % de pessoas que abriram o e-mail. A CTR (Click-Through Rate) é a % de pessoas que, tendo-o aberto, clicaram num link dentro do e-mail." },
        explanation: { es: "Ambas son métricas clave. Una alta Tasa de Apertura indica que tu asunto fue atractivo. Un alto CTR indica que el contenido del email y tu llamada a la acción fueron persuasivos. Puedes tener una alta apertura pero un bajo CTR, lo que significa que el asunto fue bueno pero el contenido no convenció. La IA puede ayudarte a mejorar ambos, generando asuntos y cuerpos de email efectivos.", pt: "Ambas são métricas-chave. Uma alta Taxa de Abertura indica que o seu assunto foi atrativo. Uma alta CTR indica que o conteúdo do e-mail e a sua chamada à ação foram persuasivos. Pode ter uma alta abertura mas uma baixa CTR, o que significa que o assunto foi bom mas o conteúdo não convenceu. A IA pode ajudá-lo a mejorar ambos, gerando assuntos e corpos de e-mail eficazes." }
      },
      {
        question: { es: "¿Cómo ayuda la IA en la segmentación de una lista de emails?", pt: "Como a IA ajuda na segmentação de uma lista de e-mails?" },
        answer: { es: "Analizando el comportamiento de los usuarios (qué emails abren, en qué enlaces hacen clic) para agruparlos automáticamente en segmentos de interés (ej. 'interesados en chalets', 'buscan alquilar').", pt: "Analisando o comportamento dos utilizadores (que e-mails abrem, em que links clicam) para os agrupar automaticamente em segmentos de interesse (ex. 'interessados em moradias', 'procuram arrendar')." },
        explanation: { es: "Enviar el mismo email a toda tu lista es ineficaz. La IA puede automatizar la segmentación. Si un usuario hace clic repetidamente en enlaces de propiedades en el barrio X, la IA puede etiquetarlo automáticamente como 'interesado_en_barrio_X'. La próxima vez que tengas una nueva propiedad en ese barrio, puedes enviar un email solo a ese segmento, haciendo la comunicación mucho más relevante y efectiva.", pt: "Enviar o mesmo e-mail para toda a sua lista é ineficaz. A IA pode automatizar a segmentação. Se um utilizador clica repetidamente em links de imóveis no bairro X, a IA pode etiquetá-lo automaticamente como 'interessado_no_bairro_X'. Da próxima vez que tiver um novo imóvel nesse bairro, pode enviar um e-mail apenas para esse segmento, tornando a comunicação muito mais relevante e eficaz." }
      },
      {
        question: { es: "¿Cómo puede la IA mejorar los asuntos de los emails?", pt: "Como a IA pode mejorar os assuntos dos e-mails?" },
        answer: { es: "Generando múltiples opciones creativas, incluyendo emojis, preguntas, o un sentido de urgencia para maximizar la tasa de apertura.", pt: "Gerando múltiplas opções criativas, incluindo emojis, perguntas, ou um sentido de urgência para maximizar a taxa de abertura." },
        explanation: { es: "El asunto es la parte más importante de un email. Un agente puede pedir a la IA: 'Genera 5 asuntos para un email sobre una nueva propiedad en el centro'. La IA podría sugerir: '✨ ¡Novedad en el Centro que te enamorará!', '¿Buscas piso en el corazón de la ciudad? Lo hemos encontrado.', 'Oportunidad Única: Tu nuevo hogar te espera (visítalo hoy)'. Esto da al agente opciones para probar y elegir la que mejor se adapte a su audiencia.", pt: "O assunto é a parte mais importante de um e-mail. Um agente pode pedir à IA: 'Gera 5 assuntos para um e-mail sobre um novo imóvel no centro'. A IA poderia sugerir: '✨ Novidade no Centro que o vai apaixonar!', 'Procura apartamento no coração da cidade? Nós encontrámo-lo.', 'Oportunidade Única: A sua nova casa espera por si (visite-a hoje)'. Isto dá ao agente opções para testar e escolher a que melhor se adapta à sua audiência." }
      },
      {
        question: { es: "¿Qué es el 'Social Listening' con IA?", pt: "O que é 'Social Listening' com IA?" },
        answer: { es: "Es el uso de herramientas de IA para monitorear redes sociales y foros en busca de palabras clave que indiquen una intención de mudanza, compra o venta (ej. 'buscando piso en Madrid').", pt: "É o uso de ferramentas de IA para monitorizar redes sociais e fóruns em busca de palavras-chave que indiquem uma intenção de mudança, compra ou venda (ex. 'procurando apartamento em Lisboa')." },
        explanation: { es: "El 'Social Listening' permite la prospección proactiva. En lugar de esperar a que un cliente te encuentre, tú lo encuentras a él. Las herramientas de IA pueden configurarse para que te envíen una alerta en tiempo real cuando alguien en tu área geográfica publica algo relevante. Esto te da la oportunidad de ofrecer ayuda de forma natural y oportuna, adelantándote a la competencia.", pt: "O 'Social Listening' permite a prospeção proativa. Em vez de esperar que um cliente o encontre, você encontra-o a ele. As ferramentas de IA podem ser configuradas para lhe enviar um alerta em tempo real quando alguém na sua área geográfica publica algo relevante. Isto dá-lhe a oportunidade de oferecer ajuda de forma natural e oportuna, antecipando-se à concorrência." }
      },
      {
        question: { es: "¿Cómo puede la IA ayudar a definir una estrategia de hashtags?", pt: "Como a IA pode ajudar a definir uma estratégia de hashtags?" },
        answer: { es: "Analizando publicaciones de la competencia y del sector para identificar los hashtags más efectivos que combinan alcance amplio (ej. #inmobiliaria) y especificidad local (ej. #pisosmadrid).", pt: "Analisando publicações da concorrência e do setor para identificar os hashtags mais eficazes que combinam alcance amplo (ex. #imobiliaria) e especificidade local (ex. #apartamentoslisboa)." },
        explanation: { es: "Una buena estrategia de hashtags usa una mezcla de diferentes tipos. Puedes pedir a la IA: 'Sugiere 10 hashtags para una publicación sobre un chalet de lujo en Marbella'. La IA te dará una lista combinada: de alto volumen (#realestate, #luxuryhomes), de nicho (#marbellalifestyle, #luxuryvilla), y locales (#costadelsol, #goldenmilemarbella).", pt: "Uma boa estratégia de hashtags usa uma mistura de diferentes tipos. Pode pedir à IA: 'Sugere 10 hashtags para uma publicação sobre uma moradia de luxo no Algarve'. A IA dar-lhe-á uma lista combinada: de alto volume (#realestate, #luxuryhomes), de nicho (#algarvelifestyle, #luxuryvilla), e locais (#visitalgarve, #quintadolago)." }
      },
      {
        question: { es: "¿Cómo puede la IA crear imágenes para redes sociales?", pt: "Como a IA pode criar imagens para as redes sociais?" },
        answer: { es: "Generando imágenes desde cero a partir de una descripción (ej. 'un logo para un agente inmobiliario moderno') o creando gráficos y banners para anuncios con herramientas como Canva Magic Design.", pt: "Gerando imagens do zero a partir de uma descrição (ex. 'um logótipo para um agente imobiliário moderno') ou criando gráficos e banners para anúncios com ferramentas como o Canva Magic Design." },
        explanation: { es: "Las herramientas de IA generativa de imágenes pueden ser un gran recurso para el marketing. Más allá de generar imágenes de propiedades (Módulo 3), pueden crear contenido de marca. Por ejemplo, para un post sobre 'consejos para comprar', puedes pedirle a la IA 'crea una ilustración flat de una pareja feliz recibiendo las llaves de su casa'. Esto te permite tener contenido visual original y profesional sin ser un diseñador.", pt: "As ferramentas de IA generativa de imagens podem ser um grande recurso para o marketing. Além de gerar imagens de imóveis (Módulo 3), podem criar conteúdo de marca. Por exemplo, para um post sobre 'dicas para comprar', pode pedir à IA 'cria uma ilustração flat de um casal feliz a receber as chaves de casa'. Isto permite-lhe ter conteúdo visual original e profissional sem ser um designer." }
      },
      {
        question: { es: "¿Cómo determina la IA los mejores horarios para publicar en redes sociales?", pt: "Como a IA determina os melhores horários para publicar nas redes sociais?" },
        answer: { es: "Analizando los datos de interacción de tu propia audiencia. Identifica los días y horas en que tus seguidores están más activos y han interactuado más con tus publicaciones pasadas.", pt: "Analisando os dados de interação da sua própria audiência. Identifica os dias e horas em que os seus seguidores estão mais ativos e interagiram mais com as suas publicações passadas." },
        explanation: { es: "Muchas herramientas de gestión de redes sociales (como Buffer o Later) tienen esta función impulsada por IA. El sistema analiza cuándo recibiste más 'me gusta', comentarios y compartidos en el pasado y te sugiere los 'slots' de tiempo óptimos para maximizar la visibilidad de tus nuevas publicaciones.", pt: "Muitas ferramentas de gestão de redes sociais (como Buffer ou Later) têm esta função impulsionada por IA. O sistema analisa quando recebeu mais 'gostos', comentários e partilhas no passado e sugere-lhe os 'slots' de tempo ideais para maximizar a visibilidade das suas novas publicações." }
      },
      {
        question: { es: "¿Qué es la 'segmentación por comportamiento' en los anuncios?", pt: "O que é a 'segmentação por comportamento' nos anúncios?" },
        answer: { es: "Es dirigir anuncios a personas basándose en sus acciones online, como visitar tu web, interactuar con tu página de Facebook o ver un vídeo de una propiedad.", pt: "É direcionar anúncios para pessoas com base nas suas ações online, como visitar o seu site, interagir com a sua página do Facebook ou ver um vídeo de um imóvel." },
        explanation: { es: "Esta es una de las formas más efectivas de publicidad. Usando el Píxel de Meta, puedes crear una audiencia de 'Visitantes de la web en los últimos 30 días' y mostrarles anuncios de 'retargeting'. La IA de la plataforma publicitaria (como Facebook Ads) puede ir más allá y crear audiencias 'similares' (lookalike), buscando a millones de otros usuarios que tienen un comportamiento online parecido al de tus mejores clientes, ampliando enormemente tu alcance potencial a un público muy cualificado.", pt: "Esta é uma das formas mais eficazes de publicidade. Usando o Pixel da Meta, pode criar uma audiência de 'Visitantes do site nos últimos 30 dias' e mostrar-lhes anúncios de 'retargeting'. A IA da plataforma de publicidade (como o Facebook Ads) pode ir mais além e criar audiências 'semelhantes' (lookalike), procurando milhões de outros utilizadores que têm um comportamento online parecido com o dos seus melhores clientes, ampliando enormemente o seu alcance potencial a um público muito qualificado." }
      },
      {
        question: { es: "¿Cómo se crea un guion de vídeo para un Reel con IA?", pt: "Como se cria um guião de vídeo para um Reel com IA?" },
        answer: { es: "Pidiéndole a la IA que estructure una historia visual de 15-30 segundos, indicando qué tomas mostrar y qué texto o música usar para cada escena.", pt: "Pedindo à IA que estruture uma história visual de 15-30 segundos, indicando que tomadas mostrar e que texto ou música usar para cada cena." },
        explanation: { es: "Un prompt podría ser: 'Crea un guion para un Reel de 15 segundos sobre un ático con terraza. Formato: 3 escenas de 5 segundos. Escena 1: Vista panorámica desde la terraza. Texto: 'Las vistas que soñabas'. Escena 2: Transición rápida por el salón luminoso. Texto: 'Luz y espacio'. Escena 3: Detalle de la cocina moderna y llamada a la acción. Texto: '¿Quieres visitarlo? ¡Link en bio!'. Sugiere una canción de fondo 'upbeat y elegante'.", pt: "Um prompt poderia ser: 'Cria um guião para um Reel de 15 segundos sobre uma penthouse com terraço. Formato: 3 cenas de 5 segundos. Cena 1: Vista panorâmica a partir do terraço. Texto: 'As vistas com que sonhava'. Cena 2: Transição rápida pela sala luminosa. Texto: 'Luz e espaço'. Cena 3: Detalhe da cozinha moderna e chamada à ação. Texto: 'Quer visitá-lo? Link na bio!'. Sugere uma música de fundo 'upbeat e elegante'." }
      },
      {
        question: { es: "¿Qué es el 'marketing omnicanal'?", pt: "O que é o 'marketing omnicanal'?" },
        answer: { es: "Es una estrategia que busca crear una experiencia de cliente unificada y coherente a través de todos los canales de comunicación (web, email, redes sociales, chatbot, en persona).", pt: "É uma estratégia que procura criar uma experiência de cliente unificada e coerente através de todos os canais de comunicação (site, e-mail, redes sociais, chatbot, presencial)." },
        explanation: { es: "En un enfoque omnicanal, los canales trabajan juntos. Un cliente puede descubrir una propiedad en Instagram, hacer una pregunta al chatbot en la web, recibir un email de seguimiento y agendar una visita por WhatsApp. La IA es el pegamento que une estos canales, asegurando que el historial y el contexto de la conversación se mantengan de un canal a otro, para que el cliente no tenga que repetirse y la experiencia sea fluida.", pt: "Numa abordagem omnicanal, os canais trabalham em conjunto. Um cliente pode descobrir um imóvel no Instagram, fazer uma pergunta ao chatbot no site, receber um e-mail de acompanhamento e agendar uma visita por WhatsApp. A IA é a cola que une estes canais, garantindo que o histórico e o contexto da conversa se mantenham de um canal para o outro, para que o cliente não tenha de se repetir e a experiência seja fluida." }
      },
      {
        question: { es: "¿Puede la IA analizar el marketing de la competencia?", pt: "Pode a IA analisar o marketing da concorrência?" },
        answer: { es: "Sí, puede analizar sus publicaciones en redes sociales para identificar qué tipo de contenido les funciona mejor, qué hashtags usan y cuál es su tono de comunicación.", pt: "Sim, pode analisar as suas publicações nas redes sociais para identificar que tipo de conteúdo lhes funciona melhor, que hashtags usam e qual é o seu tom de comunicação." },
        explanation: { es: "Un agente puede 'alimentar' a la IA con los últimos 20 posts de un competidor y preguntarle: 'Analiza este contenido. ¿Cuáles son los 3 temas principales que publica? ¿Cuál es su post con más engagement? ¿Qué tono de voz utiliza?'. La IA generará un informe que te permitirá entender la estrategia de tu competencia y encontrar huecos u oportunidades para diferenciarte.", pt: "Um agente pode 'alimentar' a IA com os últimos 20 posts de um concorrente e perguntar-lhe: 'Analisa este conteúdo. Quais são os 3 temas principais que publica? Qual é o seu post com mais engagement? Que tom de voz utiliza?'. A IA gerará um relatório que lhe permitirá entender a estratégia da sua concorrência e encontrar lacunas ou oportunidades para se diferenciar." }
      },
      {
        question: { es: "¿Qué es el 'contenido generado por el usuario' (UGC)?", pt: "O que é o 'conteúdo gerado pelo utilizador' (UGC)?" },
        answer: { es: "Es cualquier contenido (fotos, vídeos, reseñas) creado por tus clientes en lugar de por ti. Es muy auténtico y genera mucha confianza.", pt: "É qualquer conteúdo (fotos, vídeos, avaliações) criado pelos seus clientes em vez de por si. É muito autêntico e gera muita confiança." },
        explanation: { es: "Un ejemplo de UGC es una foto que un cliente publica en Instagram de su nueva casa, etiquetándote y dándote las gracias. Con su permiso, puedes 'repostear' este contenido. La IA puede ayudar a encontrar este contenido monitoreando menciones de tu marca. El UGC actúa como una prueba social muy poderosa porque es una recomendación genuina y no pagada.", pt: "Um exemplo de UGC é uma foto que um cliente publica no Instagram da sua nova casa, etiquetando-o e agradecendo-lhe. Com a sua permissão, pode 'repostar' este conteúdo. A IA pode ajudar a encontrar este conteúdo monitorizando menções da sua marca. O UGC atua como uma prova social muito poderosa porque é uma recomendação genuína e não paga." }
      },
      {
        question: { es: "¿Cómo ayuda la IA a optimizar un presupuesto de publicidad online?", pt: "Como a IA ajuda a otimizar um orçamento de publicidade online?" },
        answer: { es: "Las plataformas como Google Ads o Facebook Ads usan IA para mostrar tus anuncios a las personas con más probabilidades de estar interesadas, y para asignar más presupuesto a los anuncios que están funcionando mejor.", pt: "As plataformas como o Google Ads ou o Facebook Ads usam IA para mostrar os seus anúncios às pessoas com maior probabilidade de estarem interessadas, e para alocar mais orçamento aos anúncios que estão a ter melhor desempenho." },
        explanation: { es: "Cuando creas una campaña, la IA de la plataforma realiza miles de micro-experimentos en tiempo real. Prueba a mostrar tu anuncio a diferentes perfiles, en diferentes horarios y en diferentes ubicaciones. Aprende qué combinaciones generan más clics o leads y, automáticamente, empieza a invertir más dinero en esas combinaciones ganadoras. Esto maximiza el retorno de tu inversión publicitaria (ROAS) sin que tengas que hacerlo manualmente.", pt: "Quando cria uma campanha, a IA da plataforma realiza milhares de micro-experiências em tempo real. Testa mostrar o seu anúncio a diferentes perfis, em diferentes horários e em diferentes locais. Aprende que combinações geram mais cliques ou leads e, automaticamente, começa a investir mais dinheiro nessas combinações vencedoras. Isto maximiza o retorno do seu investimento publicitário (ROAS) sem que tenha de o fazer manualmente." }
      }
    ]
};