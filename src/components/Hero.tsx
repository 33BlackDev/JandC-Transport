'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';

interface HeroProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function Hero({ locale, dict }: HeroProps) {
  const [trackingNumber, setTrackingNumber] = useState('');

  return (
    <section className="hero-parallax">
      <div className="hero-parallax-bg"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-parallax-content reveal active">
          <h1>
            {dict.hero.title.split(' ')[0]}{' '}
            <span>{dict.hero.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.5rem', color: 'var(--color-gray-400)', marginBottom: 'var(--space-3xl)' }}>
            {dict.hero.subtitle}
          </p>

          <form
            className="hero-tracking"
            style={{ 
              background: 'rgba(255,255,255,0.03)', 
              backdropFilter: 'blur(20px)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              border: '1px solid rgba(255,255,255,0.1)',
              maxWidth: '600px',
              margin: '0 auto var(--space-2xl)'
            }}
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
              style={{ background: 'transparent', border: 'none', color: '#fff', padding: '0 1.5rem', flex: 1, fontSize: '1.1rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '1rem 2rem', border: 'none', fontWeight: 'bold' }}>{dict.hero.trackButton} →</button>
          </form>

          <Link href={`/${locale}/services`} className="btn-outline" style={{ display: 'inline-flex', padding: '1rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 'bold', color: '#D97706', borderColor: 'rgba(217, 119, 6, 0.3)' }}>
            {dict.hero.getStarted} →
          </Link>
        </div>
      </div>
    </section>
  );
}
