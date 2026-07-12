'use client';
import { useRef, ReactNode } from 'react';
import { gsap, useGSAP } from '@/components/GSAPProvider';

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  style?: React.CSSProperties;
}

export default function StaggerReveal({ children, className = '', style }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const items = ref.current.children;
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: {
          each: 0.06,
          from: 'start',
        },
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
