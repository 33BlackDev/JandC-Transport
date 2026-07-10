'use client';
import { useEffect, useState, useRef } from 'react';

interface StatsCounterProps {
  stats: Array<{ value: number; suffix: string; label: string; desc?: string }>;
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            const duration = 2500;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            
            // Add a slight stagger delay based on index
            setTimeout(() => {
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                  current = stat.value;
                  clearInterval(timer);
                }
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(current);
                  return newCounts;
                });
              }, duration / steps);
            }, index * 200); // 200ms stagger between each stat
          });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  return (
    <div className="stats-grid" ref={ref}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`stat-card reveal ${hasAnimated ? 'active' : ''}`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="stat-number">
            {counts[index].toLocaleString()}{stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
          {stat.desc && <div className="stat-desc">{stat.desc}</div>}
        </div>
      ))}
    </div>
  );
}
