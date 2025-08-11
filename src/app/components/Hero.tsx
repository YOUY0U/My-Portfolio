export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Youssef Tounekti
          </h1>
          <h2 className="text-2xl md:text-3xl text-cyan-400 mb-8 font-light">
            Ingénieur Cybersécurité | Sécurité Offensive & DevSecOps
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Spécialisé en cybersécurité offensive et en intégration DevSecOps, je conçois des solutions innovantes pour la détection et la remédiation des vulnérabilités. 
            Passionné par l&apos;automatisation, l&apos;IA appliquée à la sécurité et le développement d&apos;outils de pentesting pour renforcer la résilience des systèmes d&apos;information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projets" 
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Découvrir mes projets
            </a>
            <a 
              href="#contact" 
              className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Me contacter
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}