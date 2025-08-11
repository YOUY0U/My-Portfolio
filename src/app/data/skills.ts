export interface Skill {
  name: string;
  emoji?: string;
  icon?: string;
  scores?: string[];
  level?: string;
}

export interface SkillCategory {
  name: string;
  items: Skill[];
}

export const skills: SkillCategory[] = [
  {
    name: "Langages",
    items: [
      { name: "Python", emoji: "🐍" },
      { name: "JavaScript", emoji: "⚡" },
      { name: "TypeScript", emoji: "🔷" },
      { name: "Go", emoji: "🚀" },
      { name: "Bash", emoji: "💻" },
      { name: "C++", emoji: "⚙️" }
    ]
  },
  {
    name: "Cybersécurité",
    items: [
      { name: "Penetration Testing", emoji: "🔍" },
      { name: "Vulnerability Assessment", emoji: "🛡️" },
      { name: "Metasploit", emoji: "💥" },
      { name: "Burp Suite", emoji: "🔧" },
      { name: "Wireshark", emoji: "📡" },
      { name: "OWASP", emoji: "🔐" }
    ]
  },
  {
    name: "Outils & Frameworks",
    items: [
      { name: "Kali Linux", emoji: "🐉" },
      { name: "Docker", emoji: "🐳" },
      { name: "Git", emoji: "📝" },
      { name: "React", emoji: "⚛️" },
      { name: "Node.js", emoji: "💚" },
      { name: "Next.js", emoji: "▲" }
    ]
  },
  {
    name: "Langues",
    items: [
      { name: "Anglais", icon: "/united-kingdom.png", scores: ["IELTS 6/9", "TOEIC 825/990"], level: "Niveau B2/C1" },
      { name: "Français", icon: "/france.png", level: "Natif" },
      { name: "Arabe", icon: "/dhad.png", level: "Natif" },
      { name: "Espagnol", icon: "/spanish.png", level: "Niveau A2" }
    ]
  }
];