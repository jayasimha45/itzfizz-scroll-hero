import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import TransitionSection from "./components/TransitionSection.jsx";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />
      <ScrollProgress />

      <main id="main">
        <Hero />
        <TransitionSection />
      </main>

      <Footer />
    </>
  );
}
