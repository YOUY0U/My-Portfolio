import { skills } from '../data/skills';

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
            {skills.map((category) => (
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
                      <span className="text-white font-medium text-center text-sm">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}