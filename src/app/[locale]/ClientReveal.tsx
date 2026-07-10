'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ClientRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  threshold?: number;
}

export default function ClientReveal({ children, className = '', direction = 'up', threshold = 0.15 }: ClientRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: disconnect after first reveal
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const dirClass = direction === 'up' ? 'reveal' : direction === 'left' ? 'reveal-left' : 'reveal-right';

  return (
    <div ref={ref} className={`${dirClass} ${isVisible ? 'active' : ''} ${className}`}>
      {children}
    </div>
  );
}
