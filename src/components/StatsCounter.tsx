'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/components/GSAPProvider';

interface StatsCounterProps {
  stats: Array<{ value: number; suffix: string; label: string; desc?: string }>;
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLDivElement>('.stat-card');

    cards.forEach((card, index) => {
      const numberEl = card.querySelector<HTMLElement>('.stat-number');
      if (!numberEl) return;

      const target = stats[index].value;
      const suffix = stats[index].suffix;
      const counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 2,
        delay: index * 0.15,
        ease: 'power2.out',
        onUpdate() {
          numberEl.textContent = `${Math.floor(counter.val).toLocaleString()}${suffix}`;
        },
        onComplete() {
          numberEl.textContent = `${target.toLocaleString()}${suffix}`;
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Stagger card entrance
      gsap.fromTo(card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div className="stats-grid" ref={containerRef}>
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-number" aria-label={`${stat.value.toLocaleString()}${stat.suffix} ${stat.label}`}>
            0{stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
          {stat.desc && <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', marginTop: '0.25rem' }}>{stat.desc}</div>}
        </div>
      ))}
    </div>
  );
}
