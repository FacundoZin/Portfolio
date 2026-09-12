export type Locale = "es" | "en";

export interface LinkField {
  url: string;
  label: string;
  type: "github" | "external";
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  type: "employment" | "project";
  description: string;
  tech: readonly string[];
  link?: LinkField;
  image?: string;
  deepDive?: {
    context: string
    challenge: string
    solution: string
    result: string
    architecture?: string
  }
}

export type EducationStatus = "completed" | "inProgress";

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  status: EducationStatus;
  description: string;
}

export interface TerminalDictionary {
  welcome1: string;
  welcome2: string;
  helpTitle: string;
  helpLines: readonly string[];
  aboutLines: readonly string[];
  projectLines: readonly string[];
  skillsLines: readonly string[];
  cvTitle: string;
  cvEsLine: string;
  cvEnLine: string;
  cvOpening: string;
  paletteOpening: string;
  navigatingTo: string;
  sectionNotFound: string;
  notFound: string;
  closeAria: string;
  minimizeAria: string;
}

export interface ActivityDictionary {
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
  monthAgo: string;
  monthsAgo: string;
  yearAgo: string;
  yearsAgo: string;
  pushedCommit: string;
  pushedCommits: string;
  createdWithRef: string;
  createdWithoutRef: string;
  forked: string;
  starred: string;
  pullRequest: string;
  pullRequestNoNumber: string;
  issue: string;
  issueNoNumber: string;
  fallback: string;
  refTypes: {
    branch: string;
    repository: string;
    tag: string;
    unknown: string;
  };
  actions: {
    opened: string;
    closed: string;
    reopened: string;
    created: string;
    deleted: string;
    merged: string;
  };
}

export interface ContributionCalendarDictionary {
  dayLabels: readonly string[];
  monthLabels: readonly string[];
  contributionsInYear: string;
  contributionsInLastYear: string;
  lastYear: string;
  less: string;
  more: string;
  contributionOn: string;
  contributionsOn: string;
  yearSelector: string;
}

export interface PostItem {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
}

interface DictionaryFields {
  portfolio: string;
  subtitle: string;
  scalable: string;
  llms: string;
  llmsHighlight: string;
  andBuild: string;
  enterprise: string;
  activeSearch: string;
  country: string;
  downloadCV: string;
  downloadCVEN: string;
  currently: string;
  softwareEngineer: string;
  currentCompany: string;
  present: string;
  stack: string;
  experienceTitle: string;
  experienceYears: string;
  employment: string;
  project: string;
  experiences: readonly ExperienceItem[];
  deepDiveContext: string;
  deepDiveChallenge: string;
  deepDiveSolution: string;
  deepDiveResult: string;
  deepDiveArchitecture: string;
  viewDeepDive: string;
  closeDeepDive: string;
  githubActivity: string;
  viewProfile: string;
  contributions: string;
  recentActivity: string;
  educationTitle: string;
  educationYears: string;
  completed: string;
  inProgress: string;
  education: readonly EducationItem[];
  postsTitle: string;
  posts: readonly PostItem[];
  readOnLinkedIn: string;
  letsTalk: string;
  openToOpportunities: string;
  findMeOn: string;
  footerRights: string;
  footerDesigned: string;
  aiNative: string;
  terminalTooltip: string;
  terminalClickLabel: string;
  commandPaletteLabel: string;
  commandGroups: {
    navigation: string;
    actions: string;
    social: string;
    info: string;
  };
  commandHints: {
    navigate: string;
    select: string;
    close: string;
  };
  imageUnavailable: string;
  navigateTo: string;
  errorTitle: string;
  errorDescription: string;
  errorRetry: string;
  terminal: TerminalDictionary;
  activity: ActivityDictionary;
  contributionCalendar: ContributionCalendarDictionary;
}

const dictionaries: Record<Locale, DictionaryFields> = {
  es: {
    portfolio: "PORTFOLIO / 2026",
    subtitle: "Software Engineer enfocado en el desarrollo de sistemas",
    scalable: " escalables",
    llms: " integración de",
    llmsHighlight: " LLMs",
    andBuild: " y construcción de aplicaciones y",
    enterprise: " Sistemas Empresariales",
    activeSearch: "Búsqueda activa de nuevas oportunidades",
    country: "Argentina",
    downloadCV: "Descargar CV (ES)",
    downloadCVEN: "Descargar CV (EN)",
    currently: "ACTUALMENTE",
    softwareEngineer: "Software Engineer",
    currentCompany: "Syntrax Software",
    present: "2025 — Presente",
    stack: "STACK",
    experienceTitle: "Experiencia & Proyectos",
    experienceYears: "2024 — 2026",
    employment: "empleo",
    project: "proyecto",
    deepDiveContext: "Contexto",
    deepDiveChallenge: "Desafío",
    deepDiveSolution: "Solución",
    deepDiveResult: "Resultado",
    deepDiveArchitecture: "Arquitectura",
    viewDeepDive: "Ver caso de estudio",
    closeDeepDive: "Cerrar",
    experiences: [
      {
        year: "2025",
        role: "Software Engineer",
        company: "Syntrax Software",
        type: "employment",
        description:
          "Lidero el ciclo de vida completo de proyectos: desde el relevamiento hasta producción. Diseño arquitecturas modulares con DDD, implemento CI/CD con Docker y GitHub Actions, y aplico metodologías AINative como SDD para acelerar el desarrollo sin comprometer la calidad.",
        tech: ["C#", ".NET", "Docker", "GitHub Actions", "DDD", "SDD"],
        image: "/LogoSyntrax.png",
      },
      {
        year: "2025",
        role: "AI Integrator",
        company: "SSI Technologies",
        type: "employment",
        description:
          "Diseñé y desarrollé agentes de IA para automatización de flujos productivos con n8n. Implementé bases de datos vectoriales (Pinecone), ingeniería avanzada de prompts y flujos integrados con webhooks, Firestore y cloud functions.",
        tech: ["n8n", "Pinecone", "LLMs", "Prompt Engineering", "RAG"],
        image: "/ssiTechnologies.jpg",
      },
      {
        year: "2025",
        role: "Becario de Sistemas",
        company: "UTN",
        type: "employment",
        description:
          "Desarrollé un sistema web para la gestión integral de convenios institucionales. Relevé requisitos con stakeholders, implementé gestión documental, alertas de vencimiento y flujos de actualización de datos.",
        tech: ["TypeScript", "NestJS", "React", "PostgreSQL"],
        image: "/imagenUTN.jpg",
      },
      {
        year: "2025",
        role: "ASOCIARG",
        company: "Producto SaaS",
        type: "project",
        description:
          "Plataforma para la gestión integral de asociaciones civiles. Módulos de socios, viajes, cobros, reservas, portal de pagos e integración con Mercado Pago, WhatsApp y ARCA. Arquitectura monolítica y modular lista para deploy en VPS con Docker.",
        tech: ["C#", ".NET", "DDD", "Docker", "Mercado Pago", "Multi-tenant"],
        deepDive: {
          context: "ASOCIARG es un SaaS para gestión de asociaciones civiles argentinas. El producto debía soportar múltiples asociaciones (multi-tenant), integraciones con pagos (Mercado Pago), mensajería (WhatsApp) y facturación (ARCA/AFIP). La web interna está desarrollada en Vue.js para uso de empleados del club, y la app mobile es para los socios.",
          challenge: "El multi-tenancy era el desafío central: cada asociación tiene sus propios datos, configuraciones y flujos. Además, las integraciones externas (MP, WhatsApp, ARCA) requieren manejo de credenciales por tenant y sincronización de estados.",
          solution: "Diseñé una arquitectura monolítica modular con DDD. Cada dominio (Socios, Cobranzas, Viajes, Reservas, Pagos) es un módulo independiente con su propio Aggregate Root, Value Objects y Repositorios. El multi-tenancy se resuelve a nivel de base de datos con Row-Level Security. Las integraciones usan un patrón de Credentials Manager con cifrado de claves privadas.",
          result: "La plataforma está en producción con múltiples asociaciones activas. El sistema procesa pagos automáticos vía Mercado Pago, envía notificaciones por WhatsApp, y genera facturas electrónicas vía ARCA. El deploy es semi-automático con Docker Compose en VPS.",
          architecture: "asociarg",
        },
        link: {
          url: "https://www.asociarg.cloud/",
          label: "Sitio Web",
          type: "external",
        },
        image: "/iconoasociarg.png",
      },
      {
        year: "2025",
        role: "AFRelay",
        company: "Contribución Open Source",
        type: "project",
        description:
          "Diseñé e implementé una arquitectura multi-client y persistencia en base de datos para este middleware de facturación de ARCA. Reemplacé el almacenamiento de certificados en firestore por PostgreSQL con cifrado para claves privadas, y refactoricé los endpoints para la resolución dinámica de credenciales por CUIT.",
        tech: [
          "Python",
          "PostgreSQL",
          "SQLAlchemy",
          "Alembic",
          "Docker",
          "Cryptography",
        ],
        deepDive: {
          context: "AFRelay es un middleware open source que conecta aplicaciones con ARCA (ex AFIP) para facturación electrónica. Originalmente almacenaba certificados en Firestore, lo que limitaba la escalabilidad y generaba costos crecientes.",
          challenge: "El sistema debía soportar múltiples clientes (CUITs) con sus propios certificados digitales. El almacenamiento en Firestore era costoso y no permitía cifrado a nivel de aplicación. Además, la resolución de credenciales por CUIT era estática.",
          solution: "Migré el almacenamiento a PostgreSQL con cifrado AES-256 para claves privadas usando la librería `cryptography` de Python. Implementé un patrón de Credential Manager con resolución dinámica por CUIT. Usé SQLAlchemy ORM con Alembic para migraciones y Docker para containerización.",
          result: "El sistema ahora soporta múltiples clientes de forma eficiente, con costos de infraestructura reducidos en un 80% comparado con Firestore. El cifrado de claves privadas cumple con estándares de seguridad. El proyecto está disponible como open source en GitHub.",
          architecture: "afrelay",
        },
        link: {
          url: "https://github.com/FacundoZin/AFRelay",
          label: "GitHub",
          type: "github",
        },
      },
      {
        year: "2024",
        role: "Rappi Delivery App",
        company: "Proyecto académico",
        type: "project",
        description:
          "Backend monolítico y modular para la materia Metodología de Sistemas 2. Incluye autenticación, roles, gestión de restaurantes, pedidos, carrito y soporte. Documentado con diagramas UML.",
        tech: ["TypeScript", "NestJS", "PostgreSQL", "JWT", "UML"],
        link: {
          url: "https://github.com/FacundoZin/TP-Rappi-Metodolog-aDeSistemas-",
          label: "GitHub",
          type: "github",
        },
      },
    ],
    githubActivity: "Actividad en GitHub",
    viewProfile: "VER PERFIL →",
    contributions: "Contribuciones",
    recentActivity: "Actividad Reciente",
    educationTitle: "Educación",
    educationYears: "2022 — Presente",
    completed: "Completado",
    inProgress: "En curso",
    education: [
      {
        period: "2024 — 2026",
        degree: "Tecnicatura Universitaria en Programación",
        institution: "Universidad Tecnológica Nacional",
        location: "San Francisco, Córdoba",
        status: "completed",
        description:
          "Formación técnica universitaria con énfasis en desarrollo de software, bases de datos, arquitectura de sistemas y metodologías de desarrollo. Actualmente realizando el trabajo final integrador de la carrera.",
      },
      {
        period: "Presente",
        degree: "Ingeniería en Sistemas",
        institution: "Universidad Tecnológica Nacional",
        location: "San Francisco, Córdoba",
        status: "inProgress",
        description:
          "Carrera universitaria con enfoque en el diseño, desarrollo y gestión de sistemas de información. Integrando conocimientos de organización y negocios con arquitectura de software, bases de datos, inteligencia artificial y metodologías de desarrollo.",
      },
    ],
    postsTitle: "Publicaciones",
    posts: [
      {
        title:
          "Arquitectura Multi-tenant en SaaS: ¿Aislamiento por Software o por Infraestructura?",
        excerpt:
          "Una decisión de arquitectura clave en ASOCIARG fue cómo diseñar el multi-tenancy. Analizo las ventajas y desventajas de las distintas estrategias de aislamiento de datos.",
        date: "Hace 1 hora",
        readTime: "3 min",
        link: "https://www.linkedin.com/posts/facundozin_softwarearchitecture-multitenant-saas-share-7484280636321513472-GbNW/",
      },
      {
        title:
          "Gentle AI: Potenciando el Desarrollo Asistido por Agentes de IA",
        excerpt:
          "Descubrí cómo estructurar y potenciar el flujo de desarrollo con agentes de IA usando Gentle AI, Spec-Driven Development (SDD), Engram y CodeGraph.",
        date: "Hace 4 días",
        readTime: "4 min",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7483529244657061888/",
      },
      {
        title: "Integración automática con Mercado Pago dentro de ASOCIARG",
        excerpt:
          "Implementamos el flujo OAuth de Mercado Pago para lograr una vinculación de cuentas al instante, eliminando configuraciones manuales complejas para los usuarios.",
        date: "Hace 2 meses",
        readTime: "2 min",
        link: "https://www.linkedin.com/posts/asociarg_mercadopago-fintech-asociarg-ugcPost-7452339909484322816-B-vy/",
      },
      {
        title: "El camino de seguir actualizando e impulsando ASOCIARG",
        excerpt:
          "Emprender en tecnología es aceptar que nada está terminado. Comparto mis aprendizajes y la convicción detrás de la evolución de esta plataforma para instituciones civiles.",
        date: "Hace 4 meses",
        readTime: "2 min",
        link: "https://www.linkedin.com/posts/facundozin_saas-startups-construyendo-ugcPost-7438335200511737856-SRqx/",
      },
    ],
    readOnLinkedIn: "Leer en LinkedIn",
    letsTalk: "Hablemos",
    openToOpportunities:
      "Abierto a nuevas oportunidades, proyectos y conversaciones.",
    findMeOn: "ENCUENTRAME EN",
    footerRights: "© 2026 Facundo Zin. Todos los derechos reservados.",
    footerDesigned: "Diseñado y desarrollado por Facundo Zin",
    aiNative: "AI Native",
    terminalTooltip: "Terminal interactiva",
    terminalClickLabel: "Clickeá:",
    commandPaletteLabel: "Paleta de comandos",
    commandGroups: {
      navigation: "Navegación",
      actions: "Acciones",
      social: "Social",
      info: "Información",
    },
    commandHints: {
      navigate: "navegar",
      select: "seleccionar",
      close: "cerrar",
    },
    imageUnavailable: "Imagen no disponible",
    navigateTo: "Ir a {section}",
    errorTitle: "Algo salió mal",
    errorDescription:
      "Un error inesperado interrumpió esta página. Podés intentarlo de nuevo.",
    errorRetry: "Reintentar",
    terminal: {
      welcome1: "Bienvenido al shell interactivo de Facundo Zin.",
      welcome2: "Escribí 'help' para ver los comandos disponibles.",
      helpTitle: "Comandos disponibles:",
      helpLines: [
        "  about    - Conocé más sobre Facundo",
        "  projects - Listá los principales proyectos de desarrollo",
        "  skills   - Mostrá el stack técnico principal",
        "  cv       - Descargá el curriculum vitae",
        "  goto     - Navegá a una sección (ej: goto work)",
        "  palette  - Abrí la paleta de comandos (⌘K)",
        "  clear    - Limpiá la pantalla de la terminal",
      ],
      aboutLines: [
        "Facundo Zin - AI Native Software Engineer radicado en Argentina.",
        "Enfocado en sistemas escalables, integración de LLMs y arquitecturas robustas.",
      ],
      projectLines: [
        "• ASOCIARG: SaaS modular en C#/.NET para asociaciones civiles.",
        "• AFRelay: middleware de facturación ARCA en Python con multitenancy.",
        "• Rappi Delivery App: backend académico en NestJS con PostgreSQL.",
      ],
      skillsLines: [
        "Lenguajes y Frameworks:",
        "  C#, .NET, Python, TypeScript, NestJS, React, PostgreSQL",
        "Herramientas y Arquitecturas:",
        "  Docker, Alembic, DDD, SDD, CI/CD, Git",
      ],
      cvTitle: "Enlaces del CV:",
      cvEsLine: "  - [ES] /cv/cv-facundozin-es.pdf",
      cvEnLine: "  - [EN] /cv/cv-facundozin-en.pdf",
      cvOpening: "Abriendo descargas...",
      paletteOpening: "Abriendo la paleta de comandos...",
      navigatingTo: "Navegando a {section}...",
      sectionNotFound:
        'Sección "{section}" no encontrada. Disponibles: {sections}',
      notFound: "comando no encontrado: {cmd}. Escribí 'help' para más opciones.",
      closeAria: "Cerrar terminal",
      minimizeAria: "Minimizar terminal",
    },
    activity: {
      justNow: "ahora mismo",
      minutesAgo: "hace {count} min",
      hoursAgo: "hace {count} h",
      daysAgo: "hace {count} d",
      monthAgo: "hace 1 mes",
      monthsAgo: "hace {count} meses",
      yearAgo: "hace 1 año",
      yearsAgo: "hace {count} años",
      pushedCommit: "Se subió 1 commit a {repo}",
      pushedCommits: "Se subieron {count} commits a {repo}",
      createdWithRef: "Se creó {refType} {ref} en {repo}",
      createdWithoutRef: "Se creó {refType} en {repo}",
      forked: "Se hizo fork de {repo}",
      starred: "Se marcó con estrella {repo}",
      pullRequest: "{action} PR #{number} en {repo}",
      pullRequestNoNumber: "{action} PR en {repo}",
      issue: "{action} issue #{number} en {repo}",
      issueNoNumber: "{action} issue en {repo}",
      fallback: "{type} en {repo}",
      refTypes: {
        branch: "rama",
        repository: "repositorio",
        tag: "etiqueta",
        unknown: "desconocido",
      },
      actions: {
        opened: "Abrió",
        closed: "Cerró",
        reopened: "Reabrió",
        created: "Creó",
        deleted: "Eliminó",
        merged: "Fusionó",
      },
    },
    contributionCalendar: {
      dayLabels: ["", "lun", "", "mié", "", "vie", ""],
      monthLabels: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
      ],
      contributionsInYear: "{count} contribuciones en {year}",
      contributionsInLastYear: "{count} contribuciones en el último año",
      lastYear: "Último año",
      less: "Menos",
      more: "Más",
      contributionOn: "{count} contribución el {date}",
      contributionsOn: "{count} contribuciones el {date}",
      yearSelector: "Seleccionar año",
    },
  },
  en: {
    portfolio: "PORTFOLIO / 2026",
    subtitle: "Software Engineer focused on systems development",
    scalable: " scalable",
    llms: " integration of",
    llmsHighlight: " LLMs",
    andBuild: " and building applications and",
    enterprise: " Enterprise Systems",
    activeSearch: "Actively seeking new opportunities",
    country: "Argentina",
    downloadCV: "Download CV (ES)",
    downloadCVEN: "Download CV (EN)",
    currently: "CURRENTLY",
    softwareEngineer: "Software Engineer",
    currentCompany: "Syntrax Software",
    present: "2025 — Present",
    stack: "STACK",
    experienceTitle: "Experience & Projects",
    experienceYears: "2024 — 2026",
    employment: "employment",
    project: "project",
    deepDiveContext: "Context",
    deepDiveChallenge: "Challenge",
    deepDiveSolution: "Solution",
    deepDiveResult: "Result",
    deepDiveArchitecture: "Architecture",
    viewDeepDive: "View case study",
    closeDeepDive: "Close",
    experiences: [
      {
        year: "2025",
        role: "Software Engineer",
        company: "Syntrax Software",
        type: "employment",
        description:
          "I lead the complete project lifecycle: from requirements gathering to production. I design modular architectures with DDD, implement CI/CD with Docker and GitHub Actions, and apply AINative methodologies like SDD to accelerate development without compromising quality.",
        tech: ["C#", ".NET", "Docker", "GitHub Actions", "DDD", "SDD"],
        image: "/LogoSyntrax.png",
      },
      {
        year: "2025",
        role: "AI Integrator",
        company: "SSI Technologies",
        type: "employment",
        description:
          "Designed and developed AI agents for productive workflow automation with n8n. Implemented vector databases (Pinecone), advanced prompt engineering and integrated flows with webhooks, Firestore and cloud functions.",
        tech: ["n8n", "Pinecone", "LLMs", "Prompt Engineering", "RAG"],
        image: "/ssiTechnologies.jpg",
      },
      {
        year: "2025",
        role: "Systems Intern",
        company: "UTN",
        type: "employment",
        description:
          "Developed a web system for comprehensive management of institutional agreements. Gathered requirements with stakeholders, implemented document management, expiration alerts and data update workflows.",
        tech: ["TypeScript", "NestJS", "React", "PostgreSQL"],
        image: "/imagenUTN.jpg",
      },
      {
        year: "2025",
        role: "ASOCIARG",
        company: "SaaS Product",
        type: "project",
        description:
          "Platform for comprehensive management of civil associations. Modules for members, trips, payments, bookings, payment portal and integration with Mercado Pago, WhatsApp and ARCA. Monolithic and modular architecture ready for VPS deployment with Docker.",
        tech: ["C#", ".NET", "DDD", "Docker", "Mercado Pago", "Multi-tenant"],
        deepDive: {
          context: "ASOCIARG is a SaaS for managing Argentine civil associations. The product needed to support multiple associations (multi-tenant), with integrations for payments (Mercado Pago), messaging (WhatsApp), and invoicing (ARCA/AFIP). The internal web app is built with Vue.js for club employees, while the mobile app serves club members.",
          challenge: "Multi-tenancy was the core challenge: each association has its own data, configurations, and workflows. Additionally, external integrations (MP, WhatsApp, ARCA) require per-tenant credential management and state synchronization.",
          solution: "I designed a modular monolithic architecture with DDD. Each domain (Socios, Cobranzas, Viajes, Reservas, Pagos) is an independent module with its own Aggregate Root, Value Objects, and Repositories. Multi-tenancy is resolved at database level with Row-Level Security. Integrations use a Credentials Manager pattern with encrypted private keys.",
          result: "The platform is in production with multiple active associations. The system processes automatic payments via Mercado Pago, sends WhatsApp notifications, and generates electronic invoices via ARCA. Deployment is semi-automated with Docker Compose on VPS.",
          architecture: "asociarg",
        },
        link: {
          url: "https://www.asociarg.cloud/",
          label: "Website",
          type: "external",
        },
        image: "/iconoasociarg.png",
      },
      {
        year: "2025",
        role: "AFRelay",
        company: "Open Source Contribution",
        type: "project",
        description:
          "Designed and implemented a multi-client architecture and database persistence for this ARCA billing middleware. Replaced certificate storage in Firestore with PostgreSQL with encryption for private keys, and refactored endpoints for dynamic credential resolution by CUIT.",
        tech: [
          "Python",
          "PostgreSQL",
          "SQLAlchemy",
          "Alembic",
          "Docker",
          "Cryptography",
        ],
        deepDive: {
          context: "AFRelay is an open source middleware that connects applications with ARCA (ex-AFIP) for electronic invoicing. It originally stored certificates in Firestore, which limited scalability and generated growing costs.",
          challenge: "The system needed to support multiple clients (CUITs) with their own digital certificates. Firestore storage was expensive and didn't allow application-level encryption. Additionally, credential resolution by CUIT was static.",
          solution: "I migrated storage to PostgreSQL with AES-256 encryption for private keys using Python's `cryptography` library. I implemented a Credential Manager pattern with dynamic resolution by CUIT. Used SQLAlchemy ORM with Alembic for migrations and Docker for containerization.",
          result: "The system now supports multiple clients efficiently, with infrastructure costs reduced by 80% compared to Firestore. Private key encryption meets security standards. The project is available as open source on GitHub.",
          architecture: "afrelay",
        },
        link: {
          url: "https://github.com/FacundoZin/AFRelay",
          label: "GitHub",
          type: "github",
        },
      },
      {
        year: "2024",
        role: "Rappi Delivery App",
        company: "Academic project",
        type: "project",
        description:
          "Modular monolithic backend for the Methodology of Systems 2 course. Includes authentication, roles, restaurant management, orders, cart and support. Documented with UML diagrams.",
        tech: ["TypeScript", "NestJS", "PostgreSQL", "JWT", "UML"],
        link: {
          url: "https://github.com/FacundoZin/TP-Rappi-Metodolog-aDeSistemas-",
          label: "GitHub",
          type: "github",
        },
      },
    ],
    githubActivity: "GitHub Activity",
    viewProfile: "VIEW PROFILE →",
    contributions: "Contributions",
    recentActivity: "Recent Activity",
    educationTitle: "Education",
    educationYears: "2022 — Present",
    completed: "Completed",
    inProgress: "In Progress",
    education: [
      {
        period: "2024 — 2026",
        degree: "University Technician in Programming",
        institution: "Universidad Tecnologica Nacional",
        location: "San Francisco, Cordoba",
        status: "completed",
        description:
          "University technical education focused on software development, databases, systems architecture and development methodologies. Currently completing the final integrated project of the degree.",
      },
      {
        period: "Present",
        degree: "Systems Engineering",
        institution: "Universidad Tecnologica Nacional",
        location: "San Francisco, Cordoba",
        status: "inProgress",
        description:
          "University degree focused on the design, development and management of information systems. Integrating organization and business knowledge with software architecture, databases, artificial intelligence and development methodologies.",
      },
    ],
    postsTitle: "Publications",
    posts: [
      {
        title:
          "Multi-tenant Architecture in SaaS: Software or Infrastructure Isolation?",
        excerpt:
          "A key architecture decision in ASOCIARG was how to design multi-tenancy. I analyze the advantages and disadvantages of different data isolation strategies.",
        date: "1 hour ago",
        readTime: "3 min",
        link: "https://www.linkedin.com/posts/facundozin_softwarearchitecture-multitenant-saas-share-7484280636321513472-GbNW/",
      },
      {
        title: "Gentle AI: Powering AI Agent-Assisted Development",
        excerpt:
          "Discover how to structure and enhance the development flow with AI agents using Gentle AI, Spec-Driven Development (SDD), Engram and CodeGraph.",
        date: "4 days ago",
        readTime: "4 min",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7483529244657061888/",
      },
      {
        title: "Automatic Integration with Mercado Pago in ASOCIARG",
        excerpt:
          "We implemented Mercado Pago's OAuth flow to achieve instant account linking, eliminating complex manual configurations for users.",
        date: "2 months ago",
        readTime: "2 min",
        link: "https://www.linkedin.com/posts/asociarg_mercadopago-fintech-asociarg-ugcPost-7452339909484322816-B-vy/",
      },
      {
        title: "The Journey of Continuously Updating and Driving ASOCIARG",
        excerpt:
          "Entrepreneurship in technology means accepting that nothing is ever finished. I share my learnings and the conviction behind the evolution of this platform for civil institutions.",
        date: "4 months ago",
        readTime: "2 min",
        link: "https://www.linkedin.com/posts/facundozin_saas-startups-construyendo-ugcPost-7438335200511737856-SRqx/",
      },
    ],
    readOnLinkedIn: "Read on LinkedIn",
    letsTalk: "Let's Talk",
    openToOpportunities:
      "Open to new opportunities, projects and conversations.",
    findMeOn: "FIND ME ON",
    footerRights: "© 2026 Facundo Zin. All rights reserved.",
    footerDesigned: "Designed and developed by Facundo Zin",
    aiNative: "AI Native",
    terminalTooltip: "Interactive terminal",
    terminalClickLabel: "Click:",
    commandPaletteLabel: "Command palette",
    commandGroups: {
      navigation: "Navigation",
      actions: "Actions",
      social: "Social",
      info: "Info",
    },
    commandHints: {
      navigate: "navigate",
      select: "select",
      close: "close",
    },
    imageUnavailable: "Image unavailable",
    navigateTo: "Navigate to {section}",
    errorTitle: "Something went wrong",
    errorDescription:
      "An unexpected error interrupted this page. You can try again.",
    errorRetry: "Try again",
    terminal: {
      welcome1: "Welcome to Facundo Zin's interactive shell.",
      welcome2: "Type 'help' to see all available commands.",
      helpTitle: "Available commands:",
      helpLines: [
        "  about    - Learn more about Facundo",
        "  projects - List main software development projects",
        "  skills   - Show primary technical stack",
        "  cv       - Download curriculum vitae",
        "  goto     - Navigate to section (e.g. goto work)",
        "  palette  - Open command palette (⌘K)",
        "  clear    - Clear the terminal screen",
      ],
      aboutLines: [
        "Facundo Zin - AI Native Software Engineer based in Argentina.",
        "Focusing on scalable systems, LLM integrations, and robust architectures.",
      ],
      projectLines: [
        "• ASOCIARG: Modular C#/.NET SaaS for civil associations.",
        "• AFRelay: Python-based ARCA invoicing middleware with multitenancy.",
        "• Rappi Delivery App: NestJS academic backend with PostgreSQL.",
      ],
      skillsLines: [
        "Languages & Frameworks:",
        "  C#, .NET, Python, TypeScript, NestJS, React, PostgreSQL",
        "Tools & Architectures:",
        "  Docker, Alembic, DDD, SDD, CI/CD, Git",
      ],
      cvTitle: "CV Links:",
      cvEsLine: "  - [ES] /cv/cv-facundozin-es.pdf",
      cvEnLine: "  - [EN] /cv/cv-facundozin-en.pdf",
      cvOpening: "Opening download dialogs...",
      paletteOpening: "Opening command palette...",
      navigatingTo: "Navigating to {section}...",
      sectionNotFound:
        'Section "{section}" not found. Available: {sections}',
      notFound: "command not found: {cmd}. Type 'help' for options.",
      closeAria: "Close terminal",
      minimizeAria: "Minimize terminal",
    },
    activity: {
      justNow: "just now",
      minutesAgo: "{count}m ago",
      hoursAgo: "{count}h ago",
      daysAgo: "{count}d ago",
      monthAgo: "1mo ago",
      monthsAgo: "{count}mo ago",
      yearAgo: "1y ago",
      yearsAgo: "{count}y ago",
      pushedCommit: "Pushed 1 commit to {repo}",
      pushedCommits: "Pushed {count} commits to {repo}",
      createdWithRef: "Created {refType} {ref} in {repo}",
      createdWithoutRef: "Created {refType} in {repo}",
      forked: "Forked {repo}",
      starred: "Starred {repo}",
      pullRequest: "{action} PR #{number} in {repo}",
      pullRequestNoNumber: "{action} PR in {repo}",
      issue: "{action} issue #{number} in {repo}",
      issueNoNumber: "{action} issue in {repo}",
      fallback: "{type} in {repo}",
      refTypes: {
        branch: "branch",
        repository: "repository",
        tag: "tag",
        unknown: "unknown",
      },
      actions: {
        opened: "opened",
        closed: "closed",
        reopened: "reopened",
        created: "created",
        deleted: "deleted",
        merged: "merged",
      },
    },
    contributionCalendar: {
      dayLabels: ["", "Mon", "", "Wed", "", "Fri", ""],
      monthLabels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      contributionsInYear: "{count} contributions in {year}",
      contributionsInLastYear: "{count} contributions in the last year",
      lastYear: "Last year",
      less: "Less",
      more: "More",
      contributionOn: "{count} contribution on {date}",
      contributionsOn: "{count} contributions on {date}",
      yearSelector: "Select year",
    },
  },
};

export type Dictionary = DictionaryFields;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
