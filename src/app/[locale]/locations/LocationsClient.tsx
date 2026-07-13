'use client';
import { useState, useRef, useEffect } from 'react';
import { Locale } from '@/i18n/config';
import { MapPin } from 'lucide-react';
import { gsap } from '@/components/GSAPProvider';

interface LocationsClientProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function LocationsClient({ locale: _locale, dict }: LocationsClientProps) {
  const [activeTab, setActiveTab] = useState('haiti');
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const locations = {
    haiti: [
      { name: dict.locations.portauprince, address: dict.locations.portauprinceAddr, hours: dict.locations.portauprinceHours, phone: '829-856-7877' },
      { name: dict.locations.caphaitian, address: dict.locations.caphaitianAddr, hours: dict.locations.caphaitianHours, phone: '829-856-7877' },
    ],
    dr: [
      { name: dict.locations.santodomingo, address: dict.locations.santodomingoAddr, hours: dict.locations.santodomingoHours, phone: '829-856-7877' },
      { name: dict.locations.santiago, address: dict.locations.santiagoAddr, hours: dict.locations.santiagoHours, phone: '829-856-7877' },
    ],
  };

  const tabs = [
    { key: 'haiti', label: dict.locations.haiti, flag: '🇭🇹' },
    { key: 'dr', label: dict.locations.dr, flag: '🇩🇴' },
  ];

  // Animate cards whenever tab changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll<HTMLElement>('.location-card');
    gsap.from(cards, {
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: 0.4,
      stagger: { each: 0.05, from: 'start' },
      ease: 'back.out(1.4)',
      clearProps: 'all',
    });
  }, [activeTab]);

  const currentLocations = locations[activeTab as keyof typeof locations];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{dict.locations.title}</h1>
          <p>{dict.locations.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Scrollable tab bar */}
          <div style={{ textAlign: 'center', overflowX: 'auto' }}>
            <div className="locations-tabs" role="tablist" aria-label="Country tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  className={`location-tab ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                  aria-selected={activeTab === tab.key}
                  aria-controls={`tab-panel-${tab.key}`}
                  id={`tab-${tab.key}`}
                >
                  <span aria-hidden="true">{tab.flag}</span>
                  {' '}{tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location cards */}
          <div
            ref={gridRef}
            className="locations-grid"
            role="tabpanel"
            id={`tab-panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {currentLocations.map((loc, index) => (
              <div key={`${activeTab}-${index}`} className="location-card">
                <h3>
                  <MapPin size={20} aria-hidden="true" />
                  {loc.name}
                </h3>
                <div className="location-detail">
                  <span className="label">{dict.locations.address}:</span>
                  <span>{loc.address}</span>
                </div>
                <div className="location-detail">
                  <span className="label">{dict.locations.phone}:</span>
                  <a href={`tel:${loc.phone.replace(/[^+\d]/g, '')}`} style={{ color: 'var(--color-accent-light)' }}>
                    {loc.phone}
                  </a>
                </div>
                <div className="location-detail">
                  <span className="label">{dict.locations.hours}:</span>
                  <span style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{loc.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
