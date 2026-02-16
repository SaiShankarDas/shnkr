import { ThemeFocusProvider } from './context/ThemeFocusContext';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Work } from './components/Work/Work';
import { Contact } from './components/Contact/Contact';
import { useEffect } from 'react';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <ThemeFocusProvider>
      <div className="bg-background min-h-screen text-foreground font-sans selection:bg-accent selection:text-white">
        <Hero />
        <About />
        <Work />
        <Contact />
      </div>
    </ThemeFocusProvider>
  );
}

export default App;
