// FIX: The 'modules' constant was not exported from this file, causing an import error
// in ProgressContext. This change imports all the individual module definitions and
// exports them as a single 'modules' array to be used throughout the application.
import { module0 } from './modules/module_0';
import { module1 } from './modules/module_1';
import { module2 } from './modules/module_2';
import { module3 } from './modules/module_3';
import { module4 } from './modules/module_4';
import { module5 } from './modules/module_5';
import { module6 } from './modules/module_6';
import { module7 } from './modules/module_7';
import { module8 } from './modules/module_8';
import { Module } from './types';

export const documentContents: { [key: string]: string } = {
  "politica_privacidad.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Política de Privacidad - AgenteIA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: auto; color: #333; }
    h1, h2, h3 { color: #000; }
    p, ul, li { text-align: justify; }
    ul { padding-left: 20px; }
    strong { font-weight: 600; }
  </style>
</head>
<body>
  <h1>Política de Privacidad</h1>

  <h2>INFORMACIÓN AL USUARIO</h2>
  <h3>¿Quién es el responsable del tratamiento de tus datos personales?</h3>
  <p><strong>AgenteIA Formación</strong> (en adelante, el "RESPONSABLE") es el RESPONSABLE del tratamiento de los datos personales del USUARIO y le informa de que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril (GDPR), y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).</p>

  <h3>¿Para qué tratamos tus datos personales?</h3>
  <p>Para mantener una relación comercial con el usuario. Las operaciones previstas para realizar el tratamiento son:</p>
  <ul>
    <li>Remisión de comunicaciones comerciales publicitarias por e-mail, fax, SMS, MMS, redes sociales o cualquier otro medio electrónico o físico, presente o futuro, que posibilite realizar comunicaciones comerciales. Estas comunicaciones serán realizadas por el RESPONSABLE y estarán relacionadas con sus productos y servicios, o de sus colaboradores o proveedores, con los que este haya alcanzado algún acuerdo de promoción. En este caso, los terceros nunca tendrán acceso a los datos personales.</li>
    <li>Realizar estudios de mercado y análisis estadísticos.</li>
    <li>Tramitar encargos, solicitudes, dar respuesta a las consultas o cualquier tipo de petición que sea realizada por el USUARIO a través de cualquiera de las formas de contacto que se ponen a su disposición en la página web del RESPONSABLE.</li>
    <li>Remitir el boletín informativo online, sobre novedades, ofertas y promociones en nuestra actividad.</li>
  </ul>

  <h3>¿Por qué motivo podemos tratar tus datos personales?</h3>
  <p>Porque el tratamiento está legitimado por el artículo 6 del GDPR de la siguiente forma:</p>
  <ul>
    <li>Con el consentimiento del USUARIO: remisión de comunicaciones comerciales y del boletín informativo.</li>
    <li>Por interés legítimo del RESPONSABLE: realizar estudios de mercado, análisis estadísticos, etc. y tramitar encargos, solicitudes, etc. a petición del USUARIO.</li>
  </ul>

  <h3>¿Durante cuánto tiempo guardaremos tus datos personales?</h3>
  <p>Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento o existan prescripciones legales que dictaminen su custodia y cuando ya no sea necesario para ello, se suprimirán con medidas de seguridad adecuadas para garantizar la anonimización de los datos o la destrucción total de los mismos.</p>

  <h3>¿A quién facilitamos tus datos personales?</h3>
  <p>No está prevista ninguna comunicación de datos personales a terceros salvo, si fuese necesario para el desarrollo y ejecución de las finalidades del tratamiento, a nuestros proveedores de servicios relacionados con comunicaciones, con los cuales el RESPONSABLE tiene suscritos los contratos de confidencialidad y de encargado de tratamiento exigidos por la normativa vigente de privacidad.</p>

  <h3>¿Cuáles son tus derechos?</h3>
  <p>Los derechos que asisten al USUARIO son:</p>
  <ul>
    <li>Derecho a retirar el consentimiento en cualquier momento.</li>
    <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos, y de limitación u oposición a su tratamiento.</li>
    <li>Derecho a presentar una reclamación ante la autoridad de control (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
  </ul>
  <p><strong>Datos de contacto para ejercer sus derechos:</strong></p>
  <p>AgenteIA Formación. Calle del Futuro, 123 - 28080 Madrid (Madrid). Email: soporte@agenteia.com</p>

  <h2>CARÁCTER OBLIGATORIO O FACULTATIVO DE LA INFORMACIÓN FACILITADA POR EL USUARIO</h2>
  <p>Los USUARIOS, mediante la marcación de las casillas correspondientes y la entrada de datos en los campos, marcados con un asterisco (*) en el formulario de contacto o presentados en formularios de descarga, aceptan expresamente y de forma libre e inequívoca, que sus datos son necesarios para atender su petición, por parte del prestador, siendo voluntaria la inclusión de datos en los campos restantes. El USUARIO garantiza que los datos personales facilitados al RESPONSABLE son veraces y se hace responsable de comunicar cualquier modificación de los mismos. El RESPONSABLE informa de que todos los datos solicitados a través del sitio web son obligatorios, ya que son necesarios para la prestación de un servicio óptimo al USUARIO. En caso de que no se faciliten todos los datos, no se garantiza que la información y servicios facilitados sean completamente ajustados a sus necesidades.</p>

  <h2>MEDIDAS DE SEGURIDAD</h2>
  <p>Que de conformidad con lo dispuesto en las normativas vigentes en protección de datos personales, el RESPONSABLE está cumpliendo con todas las disposiciones de las normativas GDPR y LOPDGDD para el tratamiento de los datos personales de su responsabilidad, y manifiestamente con los principios descritos en el artículo 5 del GDPR, por los cuales son tratados de manera lícita, leal y transparente en relación con el interesado y adecuados, pertinentes y limitados a lo necesario en relación con los fines para los que son tratados.</p>
  <p>El RESPONSABLE garantiza que ha implementado políticas técnicas y organizativas apropiadas para aplicar las medidas de seguridad que establecen el GDPR y la LOPDGDD con el fin de proteger los derechos y libertades de los USUARIOS y les ha comunicado la información adecuada para que puedan ejercerlos.</p>
  <p>Para más información sobre las garantías de privacidad, puedes dirigirte al RESPONSABLE a través de AgenteIA Formación. Calle del Futuro, 123 - 28080 Madrid (Madrid). Email: soporte@agenteia.com</p>
</body>
</html>`,
  "terminos_servicio.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Términos de Servicio - AgenteIA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: auto; color: #333; }
    h1, h2, h3 { color: #000; }
    p, ul, li { text-align: justify; }
    ul, ol { padding-left: 20px; }
    strong { font-weight: 600; }
  </style>
</head>
<body>
  <h1>Términos de Servicio de AgenteIA</h1>
  <p><em>Última actualización: 27/10/2025</em></p>
  <p>Bienvenido a AgenteIA, una plataforma de software como servicio (SaaS) diseñada para proporcionar herramientas de inteligencia artificial a agentes inmobiliarios (en adelante, el "Servicio").</p>
  <p>Estos Términos de Servicio ("Términos") rigen su acceso y uso de nuestro Servicio. Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al Servicio.</p>
  
  <h3>Empresa Responsable:</h3>
  <ul>
      <li><strong>Nombre de la Empresa:</strong> Arca Grupo Carranza S.L.</li>
      <li><strong>Dirección:</strong> C/ Ferrari 5, 47002 Valladolid</li>
      <li><strong>Email de Contacto:</strong> arca@arcasl.es</li>
      <li><strong>Identificación Fiscal CIF:</strong> B09552217</li>
  </ul>

  <h3>1. Definición del Servicio</h3>
  <p>El Servicio consiste en una plataforma online que ofrece herramientas basadas en inteligencia artificial para profesionales del sector inmobiliario. Estas herramientas pueden incluir, entre otras:</p>
  <ul>
      <li>Generación automática de descripciones de propiedades.</li>
      <li>Análisis predictivo de mercado.</li>
      <li>Optimización de captación de clientes.</li>
      <li>Asistentes virtuales o chatbots para atención al cliente.</li>
  </ul>
  <p>Nos reservamos el derecho de modificar o interrumpir el Servicio (o cualquier parte del mismo) con o sin previo aviso.</p>
  
  <h3>2. Cuentas de Usuario</h3>
  <p>Para acceder a la mayoría de las funciones del Servicio, debe registrarse para obtener una cuenta. Usted se compromete a:</p>
  <ul>
      <li>Proporcionar información precisa, actual y completa durante el proceso de registro.</li>
      <li>Mantener la confidencialidad de su contraseña y de su cuenta.</li>
      <li>Ser el único responsable de todas las actividades que ocurran bajo su cuenta.</li>
      <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.</li>
  </ul>

  <h3>3. Uso Aceptable del Servicio</h3>
  <p>Usted acepta no utilizar el Servicio para ningún propósito ilegal o prohibido por estos Términos. Específicamente, usted acepta no:</p>
  <ul>
      <li>Utilizar el Servicio de manera que viole cualquier ley local, nacional o internacional.</li>
      <li>Cargar o transmitir contenido que sea ilegal, difamatorio, obsceno o que infrinja los derechos de propiedad intelectual de terceros.</li>
      <li>Intentar obtener acceso no autorizado a nuestros sistemas, redes o a las cuentas de otros usuarios.</li>
      <li>Utilizar "robots", "spiders" o cualquier otro medio automatizado para acceder al Servicio sin nuestro permiso expreso por escrito.</li>
  </ul>

  <h3>4. Contenido del Usuario y Propiedad Intelectual</h3>
  <p><strong>Su Contenido:</strong> Usted retiene la propiedad total de los datos e información que carga en el Servicio (por ejemplo, datos de propiedades, información de clientes) ("Contenido del Usuario"). Sin embargo, nos otorga una licencia mundial, no exclusiva y libre de regalías para usar, procesar, mostrar y transmitir dicho Contenido del Usuario únicamente en la medida necesaria para proporcionarle el Servicio.</p>
  <p><strong>Nuestro Contenido:</strong> El Servicio y su contenido original (excluyendo el Contenido del Usuario), características y funcionalidades son y seguirán siendo propiedad exclusiva de Arca Grupo Carranza S.L. y sus licenciantes. El Servicio está protegido por derechos de autor, marcas registradas y otras leyes.</p>

  <h3>5. Pagos, Suscripciones y Cancelación</h3>
  <p><strong>Pagos:</strong> El acceso a ciertas funciones del Servicio puede requerir el pago de tarifas. Usted acepta pagar todas las tarifas aplicables según los planes de precios vigentes en el momento de la suscripción.</p>
  <p><strong>Suscripciones y Renovación:</strong> Si se suscribe a un plan de pago, su suscripción se renovará automáticamente al final de cada período de facturación (mensual o anual), a menos que cancele su suscripción antes de la fecha de renovación.</p>
  <p><strong>Cancelación:</strong> Puede cancelar su suscripción en cualquier momento a través de la configuración de su cuenta. La cancelación será efectiva al final del período de facturación actual. No se realizarán reembolsos por períodos parciales.</p>

  <h3>6. Confidencialidad y Protección de Datos</h3>
  <p>El uso que hacemos de su información personal se rige por nuestra Política de Privacidad. Usted acepta que ha leído y entendido nuestra Política de Privacidad.</p>
  <p>Ambas partes (Usted y Arca Grupo Carranza S.L.) se comprometen a tratar como confidencial toda la información obtenida a través del Servicio que no sea de dominio público.</p>

  <h3>7. Exclusión de Garantías y Limitación de Responsabilidad</h3>
  <p>El Servicio se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD".</p>
  <p>Arca Grupo Carranza S.L. no garantiza que: a) El Servicio funcionará de manera ininterrumpida, segura o disponible en cualquier momento o lugar en particular. b) Los resultados obtenidos mediante el uso del Servicio (por ejemplo, las descripciones generadas por IA) sean precisos, fiables o adecuados para un propósito específico. Usted es responsable de revisar y validar todos los resultados generados por la IA antes de su uso público o comercial.</p>
  <p>En ningún caso Arca Grupo Carranza S.L., ni sus directores, empleados o afiliados, serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo resultante de su acceso o uso del Servicio.</p>

  <h3>8. Modificaciones de los Términos</h3>
  <p>Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso con al menos 30 días de antelación antes de que entren en vigor los nuevos términos.</p>

  <h3>9. Legislación Aplicable y Jurisdicción</h3>
  <p>Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus disposiciones sobre conflicto de leyes.</p>
  <p>Para la resolución de cualquier controversia que pudiera surgir del acceso o uso del sitio web, ambas partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de Valladolid.</p>

  <h3>10. Contacto</h3>
  <p>Si tiene alguna pregunta sobre estos Términos, por favor contáctenos en: arca@arcasl.es C/ Ferrari nº 5, 47002 Valladolid</p>
</body>
</html>`,
  "aviso_legal.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Aviso Legal - AgenteIA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: auto; color: #333; }
    h1, h2, h3 { color: #000; }
    p, ul, li { text-align: justify; }
    ul { padding-left: 20px; }
    strong { font-weight: 600; }
  </style>
</head>
<body>
  <h1>Aviso Legal de AgenteIA</h1>
  <p><em>Última actualización: 27/10/2025</em></p>

  <h2>1. Datos Identificativos del Titular</h2>
  <p>En cumplimiento del deber de información estipulado en el artículo 10 de la Ley 34/2002 de 11 de julio de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se comunican los siguientes datos identificativos del titular de este sitio web ("AgenteIA"):</p>
  <ul>
    <li><strong>Razón Social:</strong> Arca Grupo Carranza S.L.</li>
    <li><strong>Nombre Comercial:</strong> AgenteIA</li>
    <li><strong>CIF (NIF):</strong> B09552217</li>
    <li><strong>Domicilio Social:</strong> C/ Ferrari 5, 47002 Valladolid, España.</li>
    <li><strong>Correo Electrónico:</strong> arca@arcasl.es</li>
    <li><strong>Inscrita en el Registro (Mercantil / Público):</strong> VALLADOLID T 1497 , F 182, S 8, H VA 28105, I/A 5 (27.07.17).</li>
  </ul>

  <h2>2. Objeto y Aceptación del Usuario</h2>
  <p>El presente Aviso Legal regula el acceso, navegación y uso del sitio web AgenteIA (en adelante, el "Sitio Web").</p>
  <p>El acceso y/o uso del Sitio Web le atribuye la condición de Usuario, y supone la aceptación plena y sin reservas, desde dicho acceso y/o uso, de todas y cada una de las condiciones incluidas en este Aviso Legal.</p>
  <p>El Sitio Web tiene por objeto la presentación y comercialización de "AgenteIA", una plataforma de software como servicio (SaaS) diseñada para proporcionar herramientas de inteligencia artificial a agentes inmobiliarios. El acceso y contratación de dichos servicios se regirá por los Términos de Servicio específicos.</p>

  <h2>3. Condiciones de Uso del Sitio Web</h2>
  <p>El Usuario se compromete a utilizar el Sitio Web, sus contenidos y servicios de conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden público.</p>
  <p>El Usuario se obliga a no utilizar el Sitio Web con fines o efectos ilícitos, contrarios al contenido de este Aviso Legal, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar o deteriorar el Sitio Web o sus servicios, o impedir un normal disfrute del Sitio Web por otros Usuarios.</p>

  <h2>4. Propiedad Intelectual e Industrial</h2>
  <p>Arca Grupo Carranza S.L. es propietaria de todos los derechos de propiedad intelectual e industrial del Sitio Web, así como de los elementos contenidos en el mismo (a título enunciativo y no exhaustivo: la marca "AgenteIA", logotipos, textos, software, diseño gráfico, etc.).</p>
  <p>Queda expresamente prohibida la reproducción, distribución, comunicación pública y transformación de la totalidad o parte de los contenidos del Sitio Web con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización expresa y por escrito de Arca Grupo Carranza S.L.</p>
  <p>El acceso y uso de la plataforma por parte de los clientes registrados (Contenido del Usuario) se rige por lo dispuesto en la cláusula "Contenido del Usuario y Propiedad Intelectual" de los Términos de Servicio.</p>
  
  <h2>5. Exclusión de Garantías y Responsabilidad</h2>
  <p>Arca Grupo Carranza S.L. no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionarse por el uso del Sitio Web.</p>
  <p>El contenido del Sitio Web es de carácter general y tiene una finalidad meramente informativa. Arca Grupo Carranza S.L. no garantiza la inexistencia de errores en el contenido, ni que el Sitio Web se encuentre libre de virus u otros componentes dañinos.</p>
  <p>En particular, Arca Grupo Carranza S.L. no garantiza la precisión o fiabilidad de los resultados generados por las herramientas de IA ofrecidas en el servicio. Tal y como se especifica en los Términos de Servicio, el Servicio se proporciona "TAL CUAL" y es responsabilidad del Usuario validar los resultados antes de su uso comercial.</p>
  <p>Este Sitio Web puede contener enlaces a sitios web de terceros. Arca Grupo Carranza S.L. no asume ninguna responsabilidad por el contenido, informaciones o servicios que pudieran aparecer en dichos sitios.</p>
  
  <h2>6. Protección de Datos Personales</h2>
  <p>Todo lo relativo al tratamiento de sus datos personales se encuentra regulado en la Política de Privacidad. Le rogamos que lea detenidamente dicho documento antes de facilitarnos sus datos.</p>
  
  <h2>7. Contratación de Servicios</h2>
  <p>El acceso a la plataforma "AgenteIA" y la contratación de los servicios de suscripción (planes de pago, renovaciones, cancelaciones) se regulan de forma específica por los Términos de Servicio. El presente Aviso Legal es de aplicación supletoria a dichos Términos.</p>
  
  <h2>8. Modificaciones</h2>
  <p>Arca Grupo Carranza S.L. se reserva el derecho de modificar unilateralmente el presente Aviso Legal, en cualquier momento y sin necesidad de previo aviso, para adaptarlo a futuras novedades legislativas o jurisprudenciales.</p>
  
  <h2>9. Legislación Aplicable y Jurisdicción</h2>
  <p>La relación entre Arca Grupo Carranza S.L. y el Usuario se regirá por la normativa española vigente.</p>
  <p>Para la resolución de cualquier controversia o conflicto que pudiera surgir del acceso o uso del Sitio Web, ambas partes se someten expresamente, con renuncia a cualquier otro fuero que pudiera corresponderles, a los Juzgados y Tribunales de la ciudad de Valladolid.</p>
</body>
</html>`,
};

export const modules: Module[] = [
  module0,
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
];
