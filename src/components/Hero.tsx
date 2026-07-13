'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { gsap, useGSAP } from '@/components/GSAPProvider';

interface HeroProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function Hero({ locale, dict }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Entrance animations on mount
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
  }, { scope: contentRef });

  return (
    <section className="hero-parallax">
      <div className="hero-parallax-bg" aria-hidden="true" />

      {/* Floating particles */}
      <div className="hero-particles" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hero-particle" />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-parallax-content" ref={contentRef}>
          <h1 ref={titleRef}>
            {dict.hero.title.split(' ')[0]}{' '}
            <span>{dict.hero.title.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="hero-subtitle" ref={subtitleRef} style={{ marginBottom: 'var(--space-xl)' }}>
            {dict.hero.subtitle}
          </p>

          <Link
            href={`/${locale}/services`}
            className="btn-outline"
            ref={ctaRef}
            style={{ display: 'inline-flex' }}
          >
            {dict.hero.getStarted}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
