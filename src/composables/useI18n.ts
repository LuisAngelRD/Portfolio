import { ref, computed } from 'vue'

export type Locale = 'es' | 'en'

const locale = ref<Locale>('es')

const translations: Record<string, Record<Locale, string>> = {
  // Nav
  'nav.timeline':  { es: 'Trayectoria', en: 'Journey' },
  'nav.projects':  { es: 'Proyectos',   en: 'Projects' },
  'nav.papers':    { es: 'Papers',      en: 'Papers' },
  'nav.tech':      { es: 'Tecnologías', en: 'Technologies' },
  'nav.contact':   { es: 'Contacto',    en: 'Contact' },

  // Hero
  'hero.greeting': { es: 'Hola, soy', en: 'Hi, I\'m' },
  'hero.typing': { es: 'Ingeniero de Software', en: 'Software Engineer' },
  'hero.description': {
    es: 'Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales, con enfoque en arquitectura limpia y tecnolog\u00edas modernas.',
    en: 'Full Stack Developer passionate about creating exceptional digital experiences, focused on clean architecture and modern technologies.'
  },

  // Timeline
  'timeline.title': { es: 'Mi Trayectoria', en: 'My Journey' },
  'timeline.subtitle': {
    es: 'Un recorrido por mi formaci\u00f3n y los proyectos que han marcado mi camino como desarrollador.',
    en: 'A walkthrough of my education and the projects that have shaped my path as a developer.'
  },
  'timeline.clickHint': { es: 'Click para ver m\u00e1s', en: 'Click to see more' },
  'timeline.close': { es: 'Cerrar', en: 'Close' },
  'timeline.viewPaper': { es: 'Ver paper en IEEE Xplore', en: 'View paper on IEEE Xplore' },

  // Timeline items
  'timeline.0.title': { es: 'Universidad Veracruzana', en: 'Universidad Veracruzana' },
  'timeline.0.subtitle': { es: 'Ingenier\u00eda de Software', en: 'Software Engineering' },
  'timeline.0.description': {
    es: 'Inicio de la carrera en la Facultad de Contadur\u00eda y Administraci\u00f3n, Campus Coatzacoalcos, desarrollando bases s\u00f3lidas en programaci\u00f3n, estructuras de datos y buenas pr\u00e1cticas.',
    en: 'Started my degree at the Faculty of Accounting and Administration, Coatzacoalcos Campus, building strong foundations in programming, data structures and best practices.'
  },
  'timeline.0.details': {
    es: 'Comenc\u00e9 mi formaci\u00f3n profesional en la Facultad de Contadur\u00eda y Administraci\u00f3n en la Universidad Veracruzana Campus Coatzacoalcos, cursando la carrera de Ingenier\u00eda de Software. Durante los primeros semestres adquir\u00ed fundamentos s\u00f3lidos en l\u00f3gica de programaci\u00f3n, estructuras de datos, algoritmos, bases de datos relacionales y paradigmas de programaci\u00f3n orientada a objetos, as\u00ed como buenas pr\u00e1cticas en codificaci\u00f3n y dise\u00f1o de interfaces de usuario.',
    en: 'I began my professional education at the Faculty of Accounting and Administration at Universidad Veracruzana, Coatzacoalcos Campus, pursuing a Software Engineering degree. During the first semesters I acquired strong foundations in programming logic, data structures, algorithms, relational databases and object-oriented programming paradigms, as well as best practices in coding and user interface design.'
  },

  'timeline.1.title': { es: 'Base de Datos relacional del IMSS', en: 'IMSS Relational Database' },
  'timeline.1.subtitle': { es: 'Proyecto acad\u00e9mico', en: 'Academic project' },
  'timeline.1.description': {
    es: 'Dise\u00f1o de una Base de Datos Relacional con Script para el registro de hospitales, personal y pacientes del IMSS.',
    en: 'Design of a Relational Database with Script for registering hospitals, staff and patients of the IMSS.'
  },
  'timeline.1.details': {
    es: 'Proyecto acad\u00e9mico realizado con el fin de dise\u00f1ar una Base de Datos Relacional con Script que permite registrar hospitales, personal trabajador seccionado por \u00e1reas, as\u00ed como pacientes del "Instituto Mexicano del Seguro Social" para la clase "Base de Datos" impartida en el 3er Semestre.',
    en: 'Academic project carried out to design a Relational Database with Script that allows registering hospitals, staff organized by departments, as well as patients of the "Instituto Mexicano del Seguro Social" (Mexican Social Security Institute) for the "Database" course taught in the 3rd Semester.'
  },

  'timeline.2.title': { es: 'SINAPTEA', en: 'SINAPTEA' },
  'timeline.2.subtitle': { es: 'Proyecto acad\u00e9mico \u2013 Unity / C#', en: 'Academic project \u2013 Unity / C#' },
  'timeline.2.description': {
    es: 'Programa en Unity y p\u00e1gina web para ayudar a sobrellevar el Trastorno del Espectro Autista en infantes, en colaboraci\u00f3n con profesionales en psicolog\u00eda.',
    en: 'Unity program and website to help manage Autism Spectrum Disorder in children, in collaboration with psychology professionals.'
  },
  'timeline.2.details': {
    es: 'Programa realizado en Unity para la clase "Desarrollo de Software" en el lenguaje de programaci\u00f3n C# cuya finalidad era ayudar a sobrellevar un problema social com\u00fan como lo es el Trastorno del Espectro Autista en infantes de 6 a 11 a\u00f1os, un trabajo en conjunto con profesionales en la psicolog\u00eda para poder orientar al Equipo de Desarrollo con informaci\u00f3n profesional sobre el manejo de este Trastorno. P\u00e1gina Web enfocada a tutores padres de familia a cargo de pacientes con dicha condici\u00f3n para la ayuda de la comprensi\u00f3n y orientaci\u00f3n de su debido cuidado.',
    en: 'Program developed in Unity for the "Software Development" course using C# programming language, aimed at helping manage a common social issue such as Autism Spectrum Disorder in children aged 6 to 11. A collaborative effort with psychology professionals to guide the Development Team with professional information on managing this Disorder. Website focused on parent guardians of patients with this condition to help with understanding and guidance for their proper care.'
  },

  'timeline.3.title': { es: 'Dat-IA', en: 'Dat-IA' },
  'timeline.3.subtitle': { es: 'Proyecto de Marketing 5.0 con IA', en: 'Marketing 5.0 project with AI' },
  'timeline.3.description': {
    es: 'Aplicaci\u00f3n de Marketing 5.0 con IA Gemini para ayudar a emprendimientos locales a crecer su exposici\u00f3n en redes sociales.',
    en: 'Marketing 5.0 application with Gemini AI to help local businesses grow their social media exposure.'
  },
  'timeline.3.details': {
    es: 'Aplicaci\u00f3n enfocada en el Marketing 5.0 con uso de la inteligencia artificial Gemini, con un enfoque en ayudar a emprendimientos locales, peque\u00f1os y con poca visibilidad gracias a la implementaci\u00f3n de generar estrategias de marketing potenciadas con IA para poder hacer crecer un negocio y su exposici\u00f3n en redes sociales como Facebook e Instagram.',
    en: 'Application focused on Marketing 5.0 using Gemini artificial intelligence, with a focus on helping local, small and low-visibility businesses through the implementation of AI-powered marketing strategies to grow a business and its exposure on social media platforms like Facebook and Instagram.'
  },

  'timeline.4.title': { es: 'IEEE ENC 2025 — Ponente', en: 'IEEE ENC 2025 — Speaker' },
  'timeline.4.subtitle': { es: 'Congreso internacional de Ciencias de la Computación', en: 'International Conference on Computer Science' },
  'timeline.4.description': {
    es: 'Participación como ponente en el IEEE Mexican International Conference on Computer Science con el paper "Implementation of the Personal Software Process (PSP) in Software Engineering Education: A Case Study".',
    en: 'Participated as a speaker at the IEEE Mexican International Conference on Computer Science presenting the paper "Implementation of the Personal Software Process (PSP) in Software Engineering Education: A Case Study".'
  },
  'timeline.4.details': {
    es: 'Participé como ponente en el IEEE Mexican International Conference on Computer Science (IEEE ENC 2025), celebrado del 10 al 13 de noviembre de 2025 en Orizaba, Veracruz, organizado por el Tecnológico Nacional de México a través del Instituto Tecnológico de Orizaba.\n\nPresenté el paper "Implementation of the Personal Software Process (PSP) in Software Engineering Education: A Case Study", en coautoría con Patricia Martínez Moreno, José Antonio Vergara Camacho y Gerardo Contreras Vega. El trabajo aborda la implementación del Proceso de Software Personal (PSP) como metodología de enseñanza en la educación de Ingeniería de Software, evaluando su impacto a través de un caso de estudio.',
    en: 'I participated as a speaker at the IEEE Mexican International Conference on Computer Science (IEEE ENC 2025), held from November 10 to 13, 2025 in Orizaba, Veracruz, organized by the Tecnológico Nacional de México through the Instituto Tecnológico de Orizaba.\n\nI presented the paper "Implementation of the Personal Software Process (PSP) in Software Engineering Education: A Case Study", co-authored with Patricia Martínez Moreno, José Antonio Vergara Camacho and Gerardo Contreras Vega. The work addresses the implementation of the Personal Software Process (PSP) as a teaching methodology in Software Engineering education, evaluating its impact through a case study.'
  },

  // Projects
  'projects.title': { es: 'Proyectos', en: 'Projects' },
  'projects.subtitle': {
    es: 'Una selecci\u00f3n de proyectos en los que he trabajado, cada uno con sus propios desaf\u00edos y aprendizajes.',
    en: 'A selection of projects I\'ve worked on, each with its own challenges and learnings.'
  },
  'projects.viewProject': { es: 'Ver proyecto', en: 'View project' },
  'projects.viewOnGithub': { es: 'Ver en GitHub', en: 'View on GitHub' },
  'projects.close': { es: 'Cerrar', en: 'Close' },

  'projects.0.title': { es: 'Base de Datos relacional del IMSS', en: 'IMSS Relational Database' },
  'projects.0.description': {
    es: 'Dise\u00f1o de una Base de Datos Relacional con Script para el registro de hospitales, personal trabajador seccionado por \u00e1reas y pacientes del Instituto Mexicano del Seguro Social.',
    en: 'Design of a Relational Database with Script for registering hospitals, staff organized by departments and patients of the Mexican Social Security Institute.'
  },
  'projects.0.details': {
    es: 'Proyecto acad\u00e9mico realizado con el fin de dise\u00f1ar una Base de Datos Relacional con Script que permite registrar hospitales, personal trabajador seccionado por \u00e1reas, as\u00ed como pacientes del "Instituto Mexicano del Seguro Social" para la clase "Base de Datos" impartida en el 3er Semestre.',
    en: 'Academic project carried out to design a Relational Database with Script that allows registering hospitals, staff organized by departments, as well as patients of the "Instituto Mexicano del Seguro Social" (Mexican Social Security Institute) for the "Database" course taught in the 3rd Semester.'
  },
  'projects.1.title': { es: 'SINAPTEA', en: 'SINAPTEA' },
  'projects.1.description': {
    es: 'Programa en Unity y p\u00e1gina web para ayudar a sobrellevar el Trastorno del Espectro Autista en infantes de 6 a 11 a\u00f1os, en colaboraci\u00f3n con profesionales en psicolog\u00eda.',
    en: 'Unity program and website to help manage Autism Spectrum Disorder in children aged 6 to 11, in collaboration with psychology professionals.'
  },
  'projects.1.details': {
    es: 'Programa realizado en Unity para la clase "Desarrollo de Software" en el lenguaje de programaci\u00f3n C# cuya finalidad era ayudar a sobrellevar un problema social com\u00fan como lo es el Trastorno del Espectro Autista en infantes de 6 a 11 a\u00f1os, un trabajo en conjunto con profesionales en la psicolog\u00eda para poder orientar al Equipo de Desarrollo con informaci\u00f3n profesional sobre el manejo de este Trastorno. P\u00e1gina Web enfocada a tutores padres de familia a cargo de pacientes con dicha condici\u00f3n para la ayuda de la comprensi\u00f3n y orientaci\u00f3n de su debido cuidado.',
    en: 'Program developed in Unity for the "Software Development" course using C# programming language, aimed at helping manage a common social issue such as Autism Spectrum Disorder in children aged 6 to 11. A collaborative effort with psychology professionals to guide the Development Team with professional information on managing this Disorder. Website focused on parent guardians of patients with this condition to help with understanding and guidance for their proper care.'
  },
  'projects.2.title': { es: 'Dat-IA', en: 'Dat-IA' },
  'projects.2.description': {
    es: 'Aplicaci\u00f3n de Marketing 5.0 con inteligencia artificial Gemini para ayudar a emprendimientos locales a generar estrategias y crecer su exposici\u00f3n en redes sociales.',
    en: 'Marketing 5.0 application with Gemini AI to help local businesses generate strategies and grow their social media exposure.'
  },
  'projects.2.details': {
    es: 'Aplicaci\u00f3n enfocada en el Marketing 5.0 con uso de la inteligencia artificial Gemini, con un enfoque en ayudar a emprendimientos locales, peque\u00f1os y con poca visibilidad gracias a la implementaci\u00f3n de generar estrategias de marketing potenciadas con IA para poder hacer crecer un negocio y su exposici\u00f3n en redes sociales como Facebook e Instagram.',
    en: 'Application focused on Marketing 5.0 using Gemini artificial intelligence, with a focus on helping local, small and low-visibility businesses through the implementation of AI-powered marketing strategies to grow a business and its exposure on social media platforms like Facebook and Instagram.'
  },
  'projects.3.title': { es: 'Proyecto personal en desarrollo', en: 'Personal project in development' },
  'projects.3.description': {
    es: 'Pendiente de detalles.',
    en: 'Details pending.'
  },
  'projects.3.details': {
    es: 'Pendiente de detalles.',
    en: 'Details pending.'
  },

  // Papers
  'papers.title': { es: 'Papers Publicados', en: 'Published Papers' },
  'papers.subtitle': {
    es: 'Investigaciones y publicaciones académicas en conferencias internacionales.',
    en: 'Research and academic publications at international conferences.'
  },
  'papers.viewOnIEEE': { es: 'Ver en IEEE Xplore', en: 'View on IEEE Xplore' },

  'papers.0.title': {
    es: 'Implementation of the Personal Software Process (PSP) in Software Engineering Education: A Case Study',
    en: 'Implementation of the Personal Software Process (PSP) in Software Engineering Education: A Case Study'
  },
  'papers.0.authors': {
    es: 'Luis Ángel Rueda Díaz, Patricia Martínez Moreno, José Antonio Vergara Camacho, Gerardo Contreras Vega',
    en: 'Luis Ángel Rueda Díaz, Patricia Martínez Moreno, José Antonio Vergara Camacho, Gerardo Contreras Vega'
  },
  'papers.0.abstract': {
    es: 'Estudio de caso sobre la implementación del Proceso de Software Personal (PSP) como metodología de enseñanza en la educación de Ingeniería de Software, evaluando su impacto en la calidad del código y los hábitos de desarrollo de los estudiantes.',
    en: 'Case study on the implementation of the Personal Software Process (PSP) as a teaching methodology in Software Engineering education, evaluating its impact on code quality and student development habits.'
  },

  // Tech
  'tech.title': { es: 'Tecnolog\u00edas', en: 'Technologies' },
  'tech.subtitle': {
    es: 'Herramientas y lenguajes con los que trabajo d\u00eda a d\u00eda para construir soluciones de software.',
    en: 'Tools and languages I work with daily to build software solutions.'
  },
  'tech.frontend': { es: 'Front End', en: 'Front End' },
  'tech.backend': { es: 'Back End', en: 'Back End' },
  'tech.learning': { es: 'Aprendiendo', en: 'Learning' },
  'tech.tools': { es: 'Herramientas', en: 'Tools' },

  // Contact
  'contact.title': { es: 'Contacto', en: 'Contact' },
  'contact.subtitle': {
    es: '\u00bfTienes un proyecto en mente o quieres colaborar? No dudes en escribirme.',
    en: 'Have a project in mind or want to collaborate? Don\'t hesitate to reach out.'
  },
  'contact.email': { es: 'Email', en: 'Email' },
  'contact.location': { es: 'Ubicaci\u00f3n', en: 'Location' },
  'contact.locationValue': { es: 'Veracruz, M\u00e9xico', en: 'Veracruz, Mexico' },
  'contact.findMe': { es: 'Encu\u00e9ntrame en', en: 'Find me on' },

  // Shared
  'seeMore': { es: 'Ver m\u00e1s', en: 'See more' },
  'seeLess': { es: 'Ver menos', en: 'See less' },

  // Footer
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
}

function t(key: string): string {
  return translations[key]?.[locale.value] ?? key
}

function toggleLocale() {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

export function useI18n() {
  return {
    locale,
    t,
    toggleLocale,
  }
}
