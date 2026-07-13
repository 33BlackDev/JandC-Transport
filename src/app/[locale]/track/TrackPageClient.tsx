'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/i18n/config';
import ClientReveal from '../ClientReveal';
import StaggerReveal from '../StaggerReveal';
import { Package, MapPin, CheckCircle2 } from 'lucide-react';

interface TrackPageClientProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function TrackPageClient({ locale, dict }: TrackPageClientProps) {
  const searchParams = useSearchParams();
  const initialNumber = searchParams.get('number') || '';
  const [trackingNumber, setTrackingNumber] = useState(initialNumber);
  const [showResults, setShowResults] = useState(!!initialNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setShowResults(true);
    }
  };

  const timelineSteps = [
    { title: dict.track.received, desc: dict.track.receivedDesc, status: 'completed', date: '2025-01-15 09:30 AM' },
    { title: dict.track.processing, desc: dict.track.processingDesc, status: 'completed', date: '2025-01-15 02:15 PM' },
    { title: dict.track.inTransit, desc: dict.track.inTransitDesc, status: 'active', date: '2025-01-16 08:00 AM' },
    { title: dict.track.customs, desc: dict.track.customsDesc, status: 'pending', date: '' },
    { title: dict.track.delivered, desc: dict.track.deliveredDesc, status: 'pending', date: '' },
  ];

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 'var(--space-4xl)' }}>
        <div className="container">
          <ClientReveal>
            <h1 style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>{dict.track.title}</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-400)', marginBottom: 'var(--space-2xl)' }}>{dict.track.subtitle}</p>
          </ClientReveal>

          <ClientReveal>
            <form className="tracking-form-glass" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={dict.track.placeholder}
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                {dict.track.button}
              </button>
            </form>
          </ClientReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {showResults ? (
            <StaggerReveal className="bento-grid">
              
              {/* Card 1: Current Status & ETA (Spans 2 columns) */}
              <div className="bento-card col-span-2">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'var(--space-xl)' }}>
                  <div className="status-pulse"></div>
                  <h3 style={{ margin: 0, fontSize: '2.5rem' }}>{dict.tracking?.inTransit || 'IN TRANSIT'}</h3>
                </div>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-400)', marginBottom: 'var(--space-2xl)' }}>
                  {dict.tracking?.transitDesc || 'Your package is currently navigating through customs clearance. All documentation has been verified.'}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2xl)', marginTop: 'auto' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{dict.tracking?.estimatedDelivery || 'Estimated Delivery'}</span>
                    <span style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-white)', fontFamily: 'var(--font-heading)' }}>{dict.tracking?.jan18 || 'Jan 18, 2026'}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{dict.tracking?.trackingId || 'Tracking ID'}</span>
                    <span style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-white)', fontFamily: 'var(--font-heading)' }}>{trackingNumber || 'JC-882910'}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Aesthetic Route Map (Spans 2 columns) */}
              <div className="bento-card col-span-2" style={{ padding: 0 }}>
                <div className="bento-map-placeholder">
                  <div className="bento-map-overlay">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', width: '100%', background: 'rgba(17,24,39,0.6)', padding: '1rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(10px)' }}>
                      <MapPin size={24} color="var(--color-accent)" />
                      <div>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-300)' }}>{dict.tracking?.currentLocation || 'Current Location'}</span>
                        <span style={{ display: 'block', fontWeight: 'bold', color: 'var(--color-white)' }}>{dict.tracking?.mockLocation || 'Santo Domingo, DR'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: The Historical Timeline (Full Width) */}
              <div className="bento-card col-span-4">
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                  Tracking History
                </h3>
                <div className="bento-timeline">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className={`bento-timeline-item ${step.status}`}>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                      {step.date && <p style={{ fontSize: '0.85rem', color: 'var(--color-accent)', marginTop: '0.25rem' }}>{step.date}</p>}
                    </div>
                  ))}
                </div>
              </div>
              
            </StaggerReveal>
          ) : (
            <ClientReveal>
              <div style={{ textAlign: 'center', padding: 'var(--space-4xl) 0' }}>
                <Package size={64} color="var(--color-gray-600)" style={{ marginBottom: 'var(--space-xl)' }} />
                <h3 style={{ color: 'var(--color-gray-400)' }}>{dict.track.noResults}</h3>
              </div>
            </ClientReveal>
          )}
        </div>
      </section>
    </>
  );
}
