import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Plane, Ship, PackageOpen, Truck, ClipboardCheck, Building2 } from 'lucide-react';
import ClientReveal from '../ClientReveal';

type Props = { params: Promise<{ locale: string }> };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const services = [
    { icon: <Plane size={36} />, title: dict.services.airCargo, desc: dict.services.airCargoDesc },
    { icon: <Ship size={36} />, title: dict.services.seaFreight, desc: dict.services.seaFreightDesc },
    { icon: <PackageOpen size={36} />, title: dict.services.packageForwarding, desc: dict.services.packageForwardingDesc },
    { icon: <Truck size={36} />, title: dict.services.nationalDelivery, desc: dict.services.nationalDeliveryDesc },
    { icon: <ClipboardCheck size={36} />, title: dict.services.customsManagement, desc: dict.services.customsManagementDesc },
    { icon: <Building2 size={36} />, title: dict.services.businessSolutions, desc: dict.services.businessSolutionsDesc },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <ClientReveal>
            <h1>{dict.services.pageTitle}</h1>
            <p>{dict.services.pageSubtitle}</p>
          </ClientReveal>
        </div>
      </section>

      {/* Symmetrical Split Pane - Air & Sea Freight */}
      <section id="global-freight" className="section">
        <div className="container">
          <ClientReveal className="split-pane">
            <Image 
              src="/images/sunset-port.png" 
              alt="Sea Freight Port" 
              width={600} 
              height={500} 
              className="split-image"
            />
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{dict.services.globalFreightTitle}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-400)', marginBottom: 'var(--space-xl)' }}>
                {dict.services.globalFreightDesc}
              </p>
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {dict.common.contactUs} →
              </Link>
            </div>
          </ClientReveal>
        </div>
      </section>

      {/* All Services Grid */}
      <section id="all-services" className="section section-dark">
        <div className="bg-wave" style={{ opacity: 0.1 }}></div>
        <div className="container">
          <ClientReveal className="section-header">
            <h2>{dict.services.comprehensiveServices}</h2>
          </ClientReveal>
          <ClientReveal className="bento-grid">
            {services.map((service, index) => (
              <div key={index} className={`bento-card ${index === 0 || index === 5 ? 'col-span-2' : ''}`}>
                <div className="bento-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </ClientReveal>
        </div>
      </section>

      {/* Symmetrical Split Pane - Local Delivery */}
      <section id="local-delivery" className="section">
        <div className="container">
          <ClientReveal className="split-pane">
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{dict.services.localDeliveryTitle}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-400)', marginBottom: 'var(--space-xl)' }}>
                {dict.services.localDeliveryDesc}
              </p>
            </div>
            <Image 
              src="/images/coastal-delivery.png" 
              alt="Coastal Delivery" 
              width={600} 
              height={500} 
              className="split-image"
            />
          </ClientReveal>
        </div>
      </section>

      {/* CTA */}
      <ClientReveal>
        <section className="cta-section">
          <div className="container">
            <h2>{dict.services.ctaTitle}</h2>
            <p>{dict.services.ctaDesc}</p>
            <Link href={`/${locale}/contact`} className="cta-button">
              {dict.services.ctaButton} →
            </Link>
          </div>
        </section>
      </ClientReveal>
    </>
  );
}
