export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Web Vulnerability Scanner",
    description: "Outil avancé d'analyse de vulnérabilités web conçu pour détecter automatiquement les failles critiques telles que les injections SQL, XSS, et XML, en se basant sur les standards OWASP. Il intègre des stratégies de remédiation basées sur l'intelligence artificielle, permettant de réduire les risques de sécurité jusqu'à 40 %.",
    technologies: ["Python", "OWASP", "IA", "SQLi", "XSS"],
    githubUrl: "https://github.com/YOUY0U/web-vuln-scanner"
  },
  {
    id: 2,
    title: "Cluster Cloud",
    description: "Mise en place d'un cluster cloud composé de 3 machines virtuelles, incluant un serveur web, une base de données MariaDB, et un équilibrage de charge via HAProxy. Configuration d'un nom de domaine eu.org ainsi qu'un serveur de messagerie Postfix, avec des fonctionnalités de surveillance et maintenance pour assurer la stabilité et la performance du cluster.",
    technologies: ["HAProxy", "MariaDB", "Postfix", "Linux", "Cloud"]
  },
  {
    id: 3,
    title: "Bras Robotique MyCobot avec Contrôleur Android",
    description: "Développement d'un système de télécommande sans fil pour opérer le bras robotique MyCobot, augmentant sa flexibilité et sa convivialité. Conception et mise en œuvre d'une interface de contrôle intuitive, assurant une utilisation facile et efficace pour les utilisateurs.",
    technologies: ["Android", "Java", "Bluetooth", "Robotique", "UI/UX"]
  }
];