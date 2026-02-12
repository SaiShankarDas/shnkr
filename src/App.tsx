import { ThemeFocusProvider } from './context/ThemeFocusContext';
import { Hero } from './components/Hero/Hero';
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

        {/* Placeholder for other sections */}
        <div className="h-screen flex items-center justify-center bg-black/50">
          <h2 className="text-4xl font-bold text-white/20">Content Below Fold</h2>
        </div>
      </div>
    </ThemeFocusProvider>
  );
}

export default App;
