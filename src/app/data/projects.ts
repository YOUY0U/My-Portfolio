export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "SecScan Pro",
    description: "Outil automatisé de scan de vulnérabilités développé en Python. Capable d'identifier les failles OWASP Top 10 et de générer des rapports détaillés avec recommandations de sécurisation.",
    technologies: ["Python", "Nmap", "SQLMap", "Flask", "Docker"],
    githubUrl: "https://github.com/yousseftounekti/secscan-pro",
    demoUrl: "https://secscan-demo.com"
  },
  {
    id: 2,
    title: "PentestKit",
    description: "Suite d'outils de pentest personnalisés incluant un générateur de payload, un scanner de ports avancé et un module d'exploitation automatisé. Interface CLI intuitive avec support multi-threading.",
    technologies: ["Go", "Bash", "Metasploit", "Burp Suite API", "Linux"],
    githubUrl: "https://github.com/yousseftounekti/pentestkit",
  },
  {
    id: 3,
    title: "CyberSecure Dashboard",
    description: "Dashboard en temps réel pour le monitoring de sécurité avec détection d'intrusions, analyse de logs et alertes automatiques. Interface web moderne avec graphiques interactifs.",
    technologies: ["React", "Node.js", "ELK Stack", "MongoDB", "WebSocket"],
    githubUrl: "https://github.com/yousseftounekti/cybersecure-dashboard",
    demoUrl: "https://cybersecure-dashboard-demo.com"
  }
];