import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * SmoothScroll — activates Lenis momentum scrolling site-wide.
 * Drop this inside App (or any root provider). No JSX needed.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    // Let framer-motion hash-anchor scrolls go through Lenis
    lenis.on('scroll', () => {});

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}
