/**
 * Normalisation des données de compétences pour garantir des strings sûrs.
 * Certains `skill.name` et `skill.icon` peuvent être indéfinis dans la source;
 * on construit donc des fallbacks côté composant avant le rendu afin d'éviter
 * les erreurs TypeScript (ex: alt nécessite un string, pas undefined).
 */
import { skills } from '../data/skills';
import Image from 'next/image';

export type Skill = {
  name?: string;
  icon?: string;
  level?: number | string;
  emoji?: string;
  scores?: string[];
  [k: string]: unknown;
};

type SkillsProps = { skills?: Array<{ name?: string; items: Skill[] }>; };

export default function Skills(_props?: SkillsProps) {
  return (
    <section id="competences" className="min-h-screen bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-4 text-center">
            Compétences
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Mes expertises techniques en cybersécurité, développement et outils de pentesting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.filter(category => category.name !== "Langues").map((category) => {
              const normalized = (category.items ?? [])
                .filter((s) => {
                  if (!s) return false;
                  const candidate = (s as Skill).name ?? (s as Skill).icon ?? (s as Skill).emoji;
                  return Boolean(candidate);
                })
                .map((s, i) => {
                  const name = (s as Skill).name ?? `Skill ${i + 1}`;
                  const icon = (s as Skill).icon ?? `/icons/${name.toLowerCase().replace(/\s+/g, '-')}.svg`;
                  return { ...(s as Skill), name, icon };
                });
              return (
              <div 
                key={category.name ?? 'categorie'}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {normalized.map((skill, idx) => (
                    <div 
                      key={skill.name ?? `skill-${idx}`}
                      className="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="text-4xl mb-3">
                        {skill.emoji}
                      </div>
                      <span className="text-white font-medium text-center text-sm whitespace-pre-line">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );})}
          </div>
          
          {/* Section Langues séparée et plus grande */}
          {skills.filter(category => category.name === "Langues").map((category) => {
            const normalized = (category.items ?? [])
              .filter((s) => {
                if (!s) return false;
                const candidate = (s as Skill).name ?? (s as Skill).icon ?? (s as Skill).emoji;
                return Boolean(candidate);
              })
              .map((s, i) => {
                const name = (s as Skill).name ?? `Skill ${i + 1}`;
                const icon = (s as Skill).icon ?? `/icons/${name.toLowerCase().replace(/\s+/g, '-')}.svg`;
                return { ...(s as Skill), name, icon };
              });
            return (
            <div key={category.name ?? 'Langues'} className="mt-12">
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-8 text-center">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {normalized.map((skill, idx) => {
                    const displayName = String(skill.name ?? '').split('\n')[0];
                    return (
                    <div 
                      key={skill.name ?? `lang-skill-${idx}`}
                      className="flex flex-col items-center p-6 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="w-16 h-16 mb-4 flex items-center justify-center">
                        {skill.icon ? (
                          <Image
                            src={skill.icon}
                            alt={`${displayName} logo`}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="text-4xl">
                            {skill.emoji}
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h4 className="text-white font-bold text-base mb-2">
                          {displayName}
                        </h4>
                        {skill.scores && (
                          <div className="space-y-1 mb-2">
                            {skill.scores.map((score, index) => (
                              <div key={index} className="bg-cyan-500 text-slate-900 px-2 py-1 rounded-md text-xs font-bold">
                                {score}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="h-6 flex items-center justify-center mt-2">
                          {skill.level && (
                            <div className="text-cyan-400 text-base font-semibold">
                              {skill.level}
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  );})}
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
    </section>
  );
}