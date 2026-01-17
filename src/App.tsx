import { About } from './components/About';
import { Benefits } from './components/Benefits';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Process } from './components/Process';
import { Services } from './components/Services';


function App() {
  return (
    <div className="bg-[var(--color-background)]">
      <Navbar />
      <main style={{ marginBottom: 0 }}>
        <Hero />
        <Services />
        <Benefits />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
