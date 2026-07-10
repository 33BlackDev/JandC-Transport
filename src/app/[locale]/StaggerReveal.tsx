'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  style?: React.CSSProperties;
}

export default function StaggerReveal({ children, className = '', threshold = 0.1, style }: StaggerRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
    <div ref={ref} className={`${className} ${isVisible ? 'stagger-active' : 'stagger-hidden'}`} style={style}>
      {children}
    </div>
  );
}
