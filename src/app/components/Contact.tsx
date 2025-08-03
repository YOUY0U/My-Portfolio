export default function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-slate-800 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Contactez-moi
          </h2>
          <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto">
            Prêt à collaborer sur vos projets de cybersécurité ? N&apos;hésitez pas à me contacter !
          </p>
          
          <div className="flex justify-center mb-16">
            <a 
              href="mailto:yousseftounekti1@gmail.com"
              className="group bg-slate-900 rounded-xl p-8 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 border border-slate-700 hover:border-cyan-500 max-w-md w-full"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-cyan-500/20 p-4 rounded-full group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
              <p className="text-cyan-400 font-medium">yousseftounekti1@gmail.com</p>
            </a>
          </div>
          
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/YOUY0U"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900 p-4 rounded-full hover:bg-slate-700 transition-all duration-300 transform hover:scale-110 border border-slate-700 hover:border-cyan-500"
            >
              <svg className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/yoto/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900 p-4 rounded-full hover:bg-slate-700 transition-all duration-300 transform hover:scale-110 border border-slate-700 hover:border-cyan-500"
            >
              <svg className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}