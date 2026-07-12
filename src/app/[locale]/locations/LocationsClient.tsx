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
  const [activeTab, setActiveTab] = useState('usa');
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const locations = {
    usa: [
      { name: dict.locations.miami, address: dict.locations.miamiAddr, hours: dict.locations.miamiHours, phone: '+1 (786) 318-7029' },
      { name: dict.locations.orlando, address: dict.locations.orlandoAddr, hours: dict.locations.orlandoHours, phone: '+1 (407) 555-0123' },
      { name: dict.locations.atlanta, address: dict.locations.atlantaAddr, hours: dict.locations.atlantaHours, phone: '+1 (404) 555-0199' },
      { name: dict.locations.boston, address: dict.locations.bostonAddr, hours: dict.locations.bostonHours, phone: '+1 (617) 555-0188' },
      { name: dict.locations.lauderhill, address: dict.locations.lauderhillAddr, hours: dict.locations.lauderhillHours, phone: '+1 (954) 555-0177' },
      { name: dict.locations.rhodeIsland, address: dict.locations.rhodeIslandAddr, hours: dict.locations.rhodeIslandHours, phone: '+1 (401) 555-0166' },
      { name: dict.locations.westPalmBeach, address: dict.locations.westPalmBeachAddr, hours: dict.locations.westPalmBeachHours, phone: '+1 (561) 555-0155' },
    ],
    haiti: [
      { name: dict.locations.portauprince, address: dict.locations.portauprinceAddr, hours: dict.locations.portauprinceHours, phone: '+509 2819-0150' },
      { name: dict.locations.caphaitian, address: dict.locations.caphaitianAddr, hours: dict.locations.caphaitianHours, phone: '+509 3214-9800' },
      { name: dict.locations.jacmel, address: dict.locations.jacmelAddr, hours: dict.locations.jacmelHours, phone: '+509 2212-0000' },
      { name: dict.locations.cayes, address: dict.locations.cayesAddr, hours: dict.locations.cayesHours, phone: '+509 2213-0000' },
      { name: dict.locations.gonaives, address: dict.locations.gonaivesAddr, hours: dict.locations.gonaivesHours, phone: '+509 2214-0000' },
      { name: dict.locations.jeremie, address: dict.locations.jeremieAddr, hours: dict.locations.jeremieHours, phone: '+509 2215-0000' },
      { name: dict.locations.stMarc, address: dict.locations.stMarcAddr, hours: dict.locations.stMarcHours, phone: '+509 2216-0000' },
      { name: dict.locations.ouanaminthe, address: dict.locations.ouanamintheAddr, hours: dict.locations.ouanamintheHours, phone: '+509 2217-0000' },
    ],
    dr: [
      { name: dict.locations.santodomingo, address: dict.locations.santodomingoAddr, hours: dict.locations.santodomingoHours, phone: '+1 (809) 616-6633' },
      { name: dict.locations.santiago, address: dict.locations.santiagoAddr, hours: dict.locations.santiagoHours, phone: '+1 (809) 555-0456' },
      { name: dict.locations.puntaCana, address: dict.locations.puntaCanaAddr, hours: dict.locations.puntaCanaHours, phone: '+1 (809) 555-0457' },
      { name: dict.locations.laRomana, address: dict.locations.laRomanaAddr, hours: dict.locations.laRomanaHours, phone: '+1 (809) 555-0458' },
      { name: dict.locations.puertoPlata, address: dict.locations.puertoPlataAddr, hours: dict.locations.puertoPlataHours, phone: '+1 (809) 555-0459' },
      { name: dict.locations.bonao, address: dict.locations.bonaoAddr, hours: dict.locations.bonaoHours, phone: '+1 (809) 555-0460' },
    ],
  };

  const tabs = [
    { key: 'usa', label: dict.locations.usa, flag: '🇺🇸' },
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
                  <span>{loc.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
