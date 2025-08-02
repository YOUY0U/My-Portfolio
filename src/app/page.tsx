import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
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
        <Skills />
        <Contact />
      </main>
    </>
  );
}
