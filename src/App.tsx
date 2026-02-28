import { ThemeFocusProvider } from './context/ThemeFocusContext';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Work } from './components/Work/Work';
import { Contact } from './components/Contact/Contact';
import { Metrics } from './components/Metrics/Metrics';
import { Testimonials } from './components/Testimonials/Testimonials';
import { Process } from './components/Process/Process';
import { CTABanner } from './components/CTABanner/CTABanner';
import { FAQ } from './components/FAQ/FAQ';
import { BookingCTA } from './components/BookingCTA/BookingCTA';
import { Comparison } from './components/Comparison/Comparison';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { SoundToggle } from './components/SoundToggle/SoundToggle';
import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

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

    return () => lenis.destroy();
  }, [isLoaded]);

  return (
    <ThemeFocusProvider>
      {/* Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Main Site */}
      <div className={`bg-background min-h-screen text-foreground font-sans selection:bg-accent selection:text-white ${!isLoaded ? 'opacity-0 overflow-hidden h-screen' : ''}`}>
        {/* Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]"
        />
        {/* Fixed Logo Icon */}
        <a href="/" className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
          <img
            src="/logo-icon.svg"
            alt="SHNKR.DEV"
            className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform duration-300"
          />
        </a>
        <SoundToggle />
        <Hero />
        <About />
        <Metrics />
        <Work />
        <Testimonials />
        <Process />
        <Comparison />
        <CTABanner />
        <FAQ />
        <BookingCTA />
        <Contact />
      </div>
    </ThemeFocusProvider>
  );
}

export default App;
