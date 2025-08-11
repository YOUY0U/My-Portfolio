import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Formation from "./components/Formation";
import Skills from "./components/Skills";
import BadgesStats from "./components/BadgesStats";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <section id="accueil">
          <Hero />
        </section>
        <Projects />
        <Formation />
        <Skills />
        <BadgesStats />
        <Contact />
      </main>
    </>
  );
}
