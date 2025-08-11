export interface Education {
  id: number;
  diplome: string;
  etablissement: string;
  annee: string;
  details: string;
  logo: string;
}

export const educations: Education[] = [
  {
    id: 1,
    diplome: "Ingénieur IT",
    etablissement: "ESME • Paris",
    annee: "Promotion 2025",
    details: "Majeure Transformations Digitales • Spécialisations : Cybersécurité, Data, IA & Machine Learning, Cloud",
    logo: "/ESME_LOGO_BASELINE_QUADRI_2021.webp"
  },
  {
    id: 2,
    diplome: "Semestre International",
    etablissement: "Universiti Putra Malaysia • Kuala Lumpur",
    annee: "2024",
    details: "Cours suivis : Digital Signal Processing, Electronic Devices, Circuits Analysis, Engineering Mathematics I, Computer Programming I",
    logo: "/logo-UPM.png"
  },
  {
    id: 3,
    diplome: "Baccalauréat Scientifique",
    etablissement: "Lycée Buffon • Paris",
    annee: "2020",
    details: "Mention Assez Bien • Série S • Spécialité Mathématiques",
    logo: "/buffon.jpeg"
  }
];