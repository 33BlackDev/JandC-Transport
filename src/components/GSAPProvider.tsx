'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger after fonts/images load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      gsap.globalTimeline.timeScale(100); // Effectively skip animations
    }

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return <>{children}</>;
}

export { gsap, ScrollTrigger, useGSAP };
