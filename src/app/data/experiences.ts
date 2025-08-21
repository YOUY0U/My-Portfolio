export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  points: string[];    // pour la carte (2–3 bullets)
  logo: string;        // ex: "/logos/cegedimcloud.png"
  website?: string;
  tech?: string[];
  details?: string;    // paragraphe long
  color?: string;      // pour la pastille/anneau
  icon: string;        // garde l'icône pour compatibilité
  category: 'technical' | 'business';
  keyword: string;     // Pour le tooltip
  contract?: string;   // Type de contrat (ex: "Stage", "CDI")
}

export const experiences: Experience[] = [
  {
    id: "cegedim",
    title: "Ingénieur DevSecOps",
    company: "Cegedim.Cloud",
    location: "Boulogne-Billancourt / Paris",
    period: "Avril 2025 – Septembre 2025",
    points: [
      "Dashboard cybersécurité interactif (stack T3 + PostgreSQL) déployé en CI/CD GitLab.",
      "Agrégation via APIs actives (Qualys, Acunetix) et passives (flux CVE, CMDB).",
      "Workflows automatisés par agents IA (Python, n8n) pour tri/priorisation."
    ],
    logo: "/cegedim-cloud-logo-1.svg",
    website: "https://www.cegedim.cloud/",
    tech: ["T3", "PostgreSQL", "CI/CD", "Qualys", "Acunetix", "Python", "n8n"],
    details: "Mise en place d’un dashboard interactif de cybersécurité dans un environnement CI/CD, intégrant plusieurs sources de vulnérabilités et automatisant les workflows de traitement grâce à l’IA.",
    // Résumé concis demandé
    color: "ring-blue-500",
    icon: "⚙️",
    category: "technical",
    keyword: "DevSecOps",
    contract: "Stage"
  },
  {
    id: "etis",
    title: "Assistant Ingénieur de Recherche",
    company: "Laboratoire ETIS, Université CY Cergy Paris",
    location: "Cergy",
    period: "Juillet 2024 – Septembre 2024",
    points: [
      "Classification activités humaines (micro-Doppler), précision 95%.",
      "Optimisation : Matlab → C++ (OpenCV), +30% efficacité."
    ],
    logo: "/etis_lo_SLOGAN_V_RVB.svg",
    website: "https://www.etis-lab.fr/",
    tech: ["C++", "OpenCV", "ML", "Signal Processing"],
    details: "Pipeline features micro-Doppler, optimisation mémoire/CPU, métriques reproductibles, protocole d'évaluation.",
    color: "ring-sky-500",
    icon: "🧪",
    category: "technical",
    keyword: "Recherche IA",
    contract: "Stage"
  },
  {
    id: "monoprix",
    title: "Vendeur",
    company: "Monoprix",
    location: "Paris",
    period: "Août 2022 – Septembre 2022",
    points: [
      "Soutien aux opérations quotidiennes.",
      "Gestion des stocks & service client."
    ],
    logo: "/5a1c2c88f65d84088faf13bf.png",
    website: "https://www.monoprix.fr/",
    tech: ["Retail", "Relation client", "Logistique"],
    details: "Polyvalence rayon/encaissement, réassort, gestion pics d'affluence via indicateurs de disponibilité.",
    color: "ring-emerald-500",
    icon: "🛒",
    category: "business",
    keyword: "Commerce",
    contract: "Stage"
  },
  {
    id: "mille-huiles",
    title: "Assistant Logistique",
    company: "Mille et Une Huiles",
    location: "Paris",
    period: "Juillet 2018",
    points: [
      "Préparation commandes & gestion des stocks.",
      "Travail en équipe pour la satisfaction client."
    ],
    logo: "/1001-huile.png",
    tech: ["Supply", "Picking", "Qualité"],
    details: "Mise en lot, contrôle qualité, réduction erreurs de préparation via checklists.",
    color: "ring-teal-500",
    icon: "📦",
    category: "business",
    keyword: "Logistique",
    contract: "Stage"
  },
  {
    id: "netisse",
    title: "Assistant Chef de Projet",
    company: "Netisse",
    location: "Paris",
    period: "Janvier 2017",
    points: [
      "Support à l'élaboration de solutions numériques.",
      "Participation aux réunions clients et suivi projet."
    ],
    logo: "/logo_netisse_menu.svg",
    website: "https://www.netisse.fr/fr/",
    tech: ["PMO", "Workshops", "Suivi planning"],
    details: "Cadrage des besoins, user stories, préparation des revues d'avancement.",
    color: "ring-cyan-500",
    icon: "💻",
    category: "technical",
    keyword: "Gestion projet",
    contract: "Stage"
  }
];
