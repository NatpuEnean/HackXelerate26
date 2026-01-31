import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FAQ from "./components/Faq";
import EventAgenda from "./components/EventAgenda";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <EventAgenda />
      <Contact />
      <FAQ />
      <Footer />
      
    </main>
  );
}

export default App;
