'use client';
import { useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/components/GSAPProvider';

interface ClientRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  threshold?: number;
  style?: React.CSSProperties;
}

export default function ClientReveal({ children, className = '', direction = 'up', style }: ClientRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    };

    if (direction === 'up') {
      gsap.fromTo(ref.current, { opacity: 0, y: 24 }, { ...toVars, y: 0 });
    } else if (direction === 'left') {
      gsap.fromTo(ref.current, { opacity: 0, x: -40 }, { ...toVars, x: 0 });
    } else {
      gsap.fromTo(ref.current, { opacity: 0, x: 40 }, { ...toVars, x: 0 });
    }
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
