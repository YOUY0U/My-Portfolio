'use client';

import { educations } from '../data/education';
import EducationCard from './EducationCard';

export default function Formation() {
  return (
    <section id="formation" className="min-h-screen bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Formation
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Mon parcours académique et mes expériences de formation qui ont façonné mon expertise en ingénierie informatique et cybersécurité.
            </p>
          </div>
          
          <div className="space-y-6">
            {educations.map((education) => (
              <EducationCard
                key={education.id}
                diplome={education.diplome}
                etablissement={education.etablissement}
                annee={education.annee}
                details={education.details}
                logo={education.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}