'use client';

import Image from 'next/image';

interface EducationCardProps {
  diplome: string;
  etablissement: string;
  annee: string;
  details: string;
  logo: string;
  index: number;
}

export default function EducationCard({ diplome, etablissement, annee, details, logo, index }: EducationCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-slate-700 hover:border-cyan-500"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 p-2">
          <Image
            src={logo}
            alt={`Logo ${etablissement}`}
            width={64}
            height={64}
            className={`object-contain ${etablissement.includes('Buffon') ? 'rounded-lg' : ''}`}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{diplome}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <p className="text-cyan-400 font-medium">{etablissement}</p>
            <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
              {annee}
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{details}</p>
        </div>
      </div>
    </div>
  );
}