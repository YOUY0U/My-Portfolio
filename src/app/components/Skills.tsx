import { skills } from '../data/skills';
import Image from 'next/image';

export default function Skills() {
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
            {skills.filter(category => category.name !== "Langues").map((category) => (
              <div 
                key={category.name}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.items.map((skill) => (
                    <div 
                      key={skill.name}
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
            ))}
          </div>
          
          {/* Section Langues séparée et plus grande */}
          {skills.filter(category => category.name === "Langues").map((category) => (
            <div key={category.name} className="mt-12">
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-8 text-center">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((skill) => (
                    <div 
                      key={skill.name}
                      className="flex flex-col items-center p-6 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="w-16 h-16 mb-4 flex items-center justify-center">
                        {skill.icon ? (
                          <Image
                            src={skill.icon}
                            alt={skill.name.split('\n')[0]}
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
                          {skill.name.split('\n')[0]}
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
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}