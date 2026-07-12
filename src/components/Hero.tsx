'use client';
import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { gsap, useGSAP } from '@/components/GSAPProvider';

interface HeroProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function Hero({ locale, dict }: HeroProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Entrance animations on mount
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(formWrapRef.current, { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, '-=0.3')
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
  }, { scope: contentRef });

  // Mouse tilt effect on the form (desktop only)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return; // Skip on touch devices
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    gsap.to(formWrapRef.current, {
      rotateY: x * 4,
      rotateX: -y * 4,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(formWrapRef.current, {
      rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)',
    });
  }, []);

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

          <p className="hero-subtitle" ref={subtitleRef}>
            {dict.hero.subtitle}
          </p>

          {/* Tracking form with tilt */}
          <div
            ref={formWrapRef}
            style={{ perspective: '1000px', marginBottom: 'var(--space-xl)', maxWidth: '600px', margin: '0 auto var(--space-xl)' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <form
              ref={formRef}
              className="hero-tracking"
              onSubmit={(e) => {
                e.preventDefault();
                if (trackingNumber.trim()) {
                  window.location.href = `/${locale}/track?number=${encodeURIComponent(trackingNumber)}`;
                }
              }}
            >
              <input
                type="text"
                placeholder={dict.hero.trackPlaceholder}
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                aria-label={dict.hero.trackPlaceholder}
                autoComplete="off"
              />
              <button type="submit" className="btn-primary">
                {dict.hero.trackButton}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>

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
