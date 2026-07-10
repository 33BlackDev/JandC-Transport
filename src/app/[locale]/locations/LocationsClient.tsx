'use client';
import { useState } from 'react';
import { Locale } from '@/i18n/config';
import { MapPin } from 'lucide-react';

interface LocationsClientProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function LocationsClient({ locale, dict }: LocationsClientProps) {
  const [activeTab, setActiveTab] = useState('usa');

  const locations = {
    usa: [
      { name: dict.locations.miami, address: dict.locations.miamiAddr, hours: dict.locations.miamiHours, phone: '+1 (786) 318-7029' },
      { name: dict.locations.orlando, address: dict.locations.orlandoAddr, hours: dict.locations.orlandoHours, phone: '+1 (407) 555-0123' },
    ],
    haiti: [
      { name: dict.locations.portauprince, address: dict.locations.portauprinceAddr, hours: dict.locations.portauprinceHours, phone: '+509 2819-0150' },
      { name: dict.locations.caphaitian, address: dict.locations.caphaitianAddr, hours: dict.locations.caphaitianHours, phone: '+509 3214-9800' },
    ],
    dr: [
      { name: dict.locations.santodomingo, address: dict.locations.santodomingoAddr, hours: dict.locations.santodomingoHours, phone: '+1 (809) 616-6633' },
      { name: dict.locations.santiago, address: dict.locations.santiagoAddr, hours: dict.locations.santiagoHours, phone: '+1 (809) 555-0456' },
    ],
  };

  const tabs = [
    { key: 'usa', label: dict.locations.usa, flag: '🇺🇸' },
    { key: 'haiti', label: dict.locations.haiti, flag: '🇭🇹' },
    { key: 'dr', label: dict.locations.dr, flag: '🇩🇴' },
  ];

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
          <div style={{ textAlign: 'center' }}>
            <div className="locations-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`location-tab ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.flag} {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="locations-grid">
            {locations[activeTab as keyof typeof locations].map((loc, index) => (
              <div key={index} className="location-card">
                <h3><MapPin size={24} /> {loc.name}</h3>
                <div className="location-detail">
                  <span className="label">{dict.locations.address}:</span>
                  <span>{loc.address}</span>
                </div>
                <div className="location-detail">
                  <span className="label">{dict.locations.phone}:</span>
                  <span>{loc.phone}</span>
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
