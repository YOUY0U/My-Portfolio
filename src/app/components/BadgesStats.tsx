import FaceitElo from "./FaceitElo";
import Image from "next/image";
import RootMeCard from "./RootMeCard";
import ChessComCard from "./ChessComCard";

export default function BadgesStats() {
  return (
    <section id="badges-stats" className="min-h-screen bg-slate-800 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-4 text-center">
            Badges & Statistiques
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Mes accomplissements et performances sur différentes plateformes.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-center items-start">
            {/* TryHackMe */}
            <div className="text-center w-full max-w-[768px] lg:mt-6">
              <div className="mb-6 flex items-center justify-center gap-4">
                <Image src="/tryhackme.svg" alt="TryHackMe" width={96} height={96} />
                <h3 className="text-2xl font-bold text-cyan-400 m-0">TryHackMe</h3>
              </div>
              <div className="transition-all duration-300 w-full">
                <div className="mx-auto" style={{ width: 768, height: 192 }}>
                  <div className="mx-auto origin-top scale-[1.6] sm:scale-[1.8]" style={{ width: 480, height: 120 }}>
                    <iframe 
                      src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3812796" 
                      className="w-[480px] h-[120px]"
                      style={{ border: 'none' }}
                      title="TryHackMe Badge"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* FACEIT ELO (CS2) */}
            <div className="text-center w-full max-w-[768px]">
              <div className="mb-6 flex items-center justify-center gap-4">
                <Image src="/faceit-logo.png" alt="FACEIT" width={96} height={96} className="rounded-lg shadow-sm" />
                <h3 className="text-2xl font-bold text-cyan-400 m-0">FACEIT ELO (CS2)</h3>
              </div>
              <div className="transition-all duration-300 hover:scale-105 w-full">
                <FaceitElo nickname="TSARUIS63" />
              </div>
            </div>

            {/* Root-Me */}
            <RootMeCard />

            {/* Chess.com */}
            <ChessComCard />
          </div>

          {/* Placeholder pour futures stats */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Plus de statistiques à venir : GitHub, HackerRank, LeetCode...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}