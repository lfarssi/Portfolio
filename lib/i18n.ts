import type { Locale, ProjectCategory } from "@/lib/types";

export const locales = ["en", "fr"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "locale";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "fr";
}

const en = {
  meta: {
    description:
      "Junior Cybersecurity & Mobile Developer trained at Zone01 Oujda. Secure web and mobile applications, application security testing.",
    projectsTitle: "Projects",
    projectsDescription:
      "All projects: security, mobile, full-stack, back-end, front-end and systems.",
  },
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
    menu: "Open menu",
    closeMenu: "Close menu",
    primary: "Primary",
    skipToContent: "Skip to content",
  },
  hero: {
    openToWork: "Open to work",
    downloadCv: "Download CV",
    contactMe: "Contact me",
    factSchool: "Zone01 Oujda graduate",
    factProjects: (count: number) => `${count}+ projects`,
    factLanguages: "EN / FR / AR",
    photoAlt: (name: string) => `Portrait of ${name}`,
    socialLabel: "Social links",
  },
  sections: {
    about: { eyebrow: "01 ABOUT", title: "About", intro: "Who I am and what I can bring to your team." },
    whatIBring: "What I bring",
    roles: { eyebrow: "02 TARGET ROLES", title: "Roles I am looking for", intro: "Where I can add value from day one." },
    primaryRole: "Primary",
    secondaryRole: "Secondary",
    skills: { eyebrow: "03 SKILLS", title: "Skills", intro: "Tools and technologies used in real projects." },
    spokenLanguages: "Spoken languages",
    projects: { eyebrow: "04 PROJECTS", title: "Featured projects", intro: "A selection of projects with a security angle." },
    experience: { eyebrow: "05 EXPERIENCE", title: "Experience", intro: "Professional experience." },
    education: { eyebrow: "05 EDUCATION", title: "Education", intro: "A project-based engineering path." },
    certifications: { eyebrow: "06 CERTIFICATIONS", title: "Certifications & achievements", intro: "Credentials, rankings and results." },
    volunteering: { eyebrow: "07 VOLUNTEERING", title: "Volunteering", intro: "Giving time to communities." },
    contact: { eyebrow: "08 CONTACT", title: "Let's talk", intro: "Hiring for a security or mobile role? I reply quickly." },
  },
  projects: {
    filterLabel: "Filter by category",
    all: "All",
    categories: {
      security: "Security",
      mobile: "Mobile",
      fullStack: "Full-Stack",
      backEnd: "Back-End",
      frontEnd: "Front-End",
      systems: "Systems",
    } satisfies Record<ProjectCategory, string>,
    searchLabel: "Search projects",
    searchPlaceholder: "Search by title or technology",
    sortedByDate: "Sorted by date, newest first",
    resultCount: (count: number) => `${count} project${count === 1 ? "" : "s"}`,
    empty: "No project matches these filters.",
    resetFilters: "Reset filters",
    teamSize: "Team size",
    teamOf: (size: number | string) => (size === 1 ? "Solo" : `Team of ${size}`),
    role: "Role",
    date: "Date",
    github: "Source code on GitHub",
    demo: "Live demo",
    store: "Store page",
    viewDetails: "View details",
    securityConsiderations: "Security considerations",
    highlights: "Highlights",
    technologies: "Technologies",
    readme: "README from GitHub",
    previous: "Previous project",
    next: "Next project",
    allProjects: "All projects",
    draft: "Draft, hidden in production",
    pageIntro: "Every project, filterable by domain. Security measures are documented on each project page.",
  },
  contact: {
    name: "Name",
    namePlaceholder: "Jane Doe",
    email: "Email",
    emailPlaceholder: "jane@company.com",
    subject: "Subject",
    subjectPlaceholder: "Junior pentester position",
    message: "Message",
    messagePlaceholder: "Tell me about the role and your team.",
    honeypot: "Leave this field empty",
    send: "Send message",
    sending: "Sending...",
    success: "Thank you, your message was sent. I will get back to you shortly.",
    error: "The message could not be sent. Please try again or email me directly.",
    tooFast: "That was fast. Please wait a few seconds and try again.",
    unavailable: "The contact form is not configured yet. Please email me directly.",
    errors: {
      name: "Please enter your name (2 to 100 characters).",
      email: "Please enter a valid email address.",
      subject: "Please enter a subject (3 to 150 characters).",
      message: "Please write a message of at least 20 characters.",
    },
    direct: "Direct contact",
    phone: "Phone",
    location: "Location",
    availability: "Availability",
    linkedin: "LinkedIn",
    formTitle: "Send a message",
  },
  footer: {
    tagline: "Junior Cybersecurity & Mobile Developer.",
    builtWith: "Built with Next.js. Security headers: A+.",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    description: "This page does not exist or has moved.",
    home: "Back to home",
    projects: "See projects",
  },
  common: {
    downloadCv: "Download CV",
    seeAll: "See all projects",
    back: "Back",
    present: "Present",
    opensInNewTab: "(opens in a new tab)",
    viewCredential: "View credential",
    theme: { toggle: "Toggle theme", light: "Light", dark: "Dark", system: "System" },
    language: { label: "Language", switchTo: "Passer en français", en: "English", fr: "Français" },
  },
};

export type Dictionary = typeof en;

const fr: Dictionary = {
  meta: {
    description:
      "Développeur junior en cybersécurité et mobile formé à Zone01 Oujda. Applications web et mobiles sécurisées, tests de sécurité applicative.",
    projectsTitle: "Projets",
    projectsDescription:
      "Tous les projets : sécurité, mobile, full-stack, back-end, front-end et systèmes.",
  },
  nav: {
    home: "Accueil",
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    education: "Formation",
    contact: "Contact",
    menu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primary: "Principale",
    skipToContent: "Aller au contenu",
  },
  hero: {
    openToWork: "Ouvert aux opportunités",
    downloadCv: "Télécharger le CV",
    contactMe: "Me contacter",
    factSchool: "Diplômé de Zone01 Oujda",
    factProjects: (count: number) => `${count}+ projets`,
    factLanguages: "EN / FR / AR",
    photoAlt: (name: string) => `Portrait de ${name}`,
    socialLabel: "Réseaux",
  },
  sections: {
    about: { eyebrow: "01 À PROPOS", title: "À propos", intro: "Qui je suis et ce que je peux apporter à votre équipe." },
    whatIBring: "Ce que j'apporte",
    roles: { eyebrow: "02 POSTES VISÉS", title: "Les postes que je recherche", intro: "Là où je peux être utile dès le premier jour." },
    primaryRole: "Prioritaire",
    secondaryRole: "Secondaire",
    skills: { eyebrow: "03 COMPÉTENCES", title: "Compétences", intro: "Outils et technologies utilisés dans de vrais projets." },
    spokenLanguages: "Langues parlées",
    projects: { eyebrow: "04 PROJETS", title: "Projets phares", intro: "Une sélection de projets avec un angle sécurité." },
    experience: { eyebrow: "05 EXPÉRIENCE", title: "Expérience", intro: "Expérience professionnelle." },
    education: { eyebrow: "05 FORMATION", title: "Formation", intro: "Un parcours d'ingénierie par projets." },
    certifications: { eyebrow: "06 CERTIFICATIONS", title: "Certifications & réalisations", intro: "Certifications, classements et résultats." },
    volunteering: { eyebrow: "07 BÉNÉVOLAT", title: "Bénévolat", intro: "Du temps donné aux communautés." },
    contact: { eyebrow: "08 CONTACT", title: "Parlons-en", intro: "Vous recrutez pour un poste sécurité ou mobile ? Je réponds rapidement." },
  },
  projects: {
    filterLabel: "Filtrer par catégorie",
    all: "Tous",
    categories: {
      security: "Sécurité",
      mobile: "Mobile",
      fullStack: "Full-Stack",
      backEnd: "Back-End",
      frontEnd: "Front-End",
      systems: "Systèmes",
    },
    searchLabel: "Rechercher des projets",
    searchPlaceholder: "Rechercher par titre ou technologie",
    sortedByDate: "Triés par date, du plus récent au plus ancien",
    resultCount: (count: number) => `${count} projet${count > 1 ? "s" : ""}`,
    empty: "Aucun projet ne correspond à ces filtres.",
    resetFilters: "Réinitialiser les filtres",
    teamSize: "Taille de l'équipe",
    teamOf: (size: number | string) => (size === 1 ? "Solo" : `Équipe de ${size}`),
    role: "Rôle",
    date: "Date",
    github: "Code source sur GitHub",
    demo: "Démo en ligne",
    store: "Page du store",
    viewDetails: "Voir le détail",
    securityConsiderations: "Mesures de sécurité",
    highlights: "Points clés",
    technologies: "Technologies",
    readme: "README depuis GitHub",
    previous: "Projet précédent",
    next: "Projet suivant",
    allProjects: "Tous les projets",
    draft: "Brouillon, masqué en production",
    pageIntro: "Tous les projets, filtrables par domaine. Les mesures de sécurité sont détaillées sur chaque page projet.",
  },
  contact: {
    name: "Nom",
    namePlaceholder: "Jeanne Dupont",
    email: "E-mail",
    emailPlaceholder: "jeanne@entreprise.com",
    subject: "Objet",
    subjectPlaceholder: "Poste de pentester junior",
    message: "Message",
    messagePlaceholder: "Parlez-moi du poste et de votre équipe.",
    honeypot: "Laissez ce champ vide",
    send: "Envoyer le message",
    sending: "Envoi en cours...",
    success: "Merci, votre message a bien été envoyé. Je vous réponds très vite.",
    error: "Le message n'a pas pu être envoyé. Réessayez ou écrivez-moi directement.",
    tooFast: "C'était rapide. Patientez quelques secondes puis réessayez.",
    unavailable: "Le formulaire n'est pas encore configuré. Écrivez-moi directement par e-mail.",
    errors: {
      name: "Indiquez votre nom (2 à 100 caractères).",
      email: "Indiquez une adresse e-mail valide.",
      subject: "Indiquez un objet (3 à 150 caractères).",
      message: "Écrivez un message d'au moins 20 caractères.",
    },
    direct: "Contact direct",
    phone: "Téléphone",
    location: "Localisation",
    availability: "Disponibilité",
    linkedin: "LinkedIn",
    formTitle: "Envoyer un message",
  },
  footer: {
    tagline: "Développeur junior Cybersécurité & Mobile.",
    builtWith: "Construit avec Next.js. En-têtes de sécurité : A+.",
    rights: "Tous droits réservés.",
  },
  notFound: {
    title: "Page introuvable",
    description: "Cette page n'existe pas ou a été déplacée.",
    home: "Retour à l'accueil",
    projects: "Voir les projets",
  },
  common: {
    downloadCv: "Télécharger le CV",
    seeAll: "Voir tous les projets",
    back: "Retour",
    present: "Aujourd'hui",
    opensInNewTab: "(s'ouvre dans un nouvel onglet)",
    viewCredential: "Voir le certificat",
    theme: { toggle: "Changer de thème", light: "Clair", dark: "Sombre", system: "Système" },
    language: { label: "Langue", switchTo: "Switch to English", en: "English", fr: "Français" },
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Formats yyyy-mm or yyyy-mm-dd as "Apr 2024"; placeholders are returned as is. */
export function formatMonth(value: string, locale: Locale): string {
  const match = value.match(/^(\d{4})-(\d{2})/);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
