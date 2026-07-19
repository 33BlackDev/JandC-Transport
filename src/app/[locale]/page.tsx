import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Package, Search, MapPin, Plane, Ship, PackageOpen, Truck, ClipboardCheck, Building2, Gift, Globe, FileText, ShieldCheck } from 'lucide-react';
import Hero from '@/components/Hero';
import StaggerReveal from './StaggerReveal';
import FAQAccordion from '@/components/FAQAccordion';
import StatsCounter from '@/components/StatsCounter';
import ClientReveal from './ClientReveal';

// Arrow SVG to replace emoji arrows
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: '0.4rem' }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const faqItems = [
    { question: dict.faq.q1, answer: dict.faq.a1 },
    { question: dict.faq.q2, answer: dict.faq.a2 },
    { question: dict.faq.q3, answer: dict.faq.a3 },
    { question: dict.faq.q4, answer: dict.faq.a4 },
    { question: dict.faq.q5, answer: dict.faq.a5 },
    { question: dict.faq.q6, answer: dict.faq.a6 },
    { question: dict.faq.q7, answer: dict.faq.a7 },
    { question: dict.faq.q8, answer: dict.faq.a8 },
    { question: dict.faq.q9, answer: dict.faq.a9 },
    { question: dict.faq.q10, answer: dict.faq.a10 },
  ];

  const statsData = [
    { value: 50000, suffix: '+', label: dict.stats.packages },
    { value: 12000, suffix: '+', label: dict.stats.customers },
    { value: 15, suffix: '+', label: dict.stats.cities },
    { value: 5, suffix: '+', label: dict.stats.years },
  ];

  return (
    <>
      <Hero locale={locale as Locale} dict={dict} />

      {/* Quick Actions — Bento Grid */}
      <section className="section" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <StaggerReveal className="bento-grid">
            <Link href={`/${locale}/services`} className="bento-card col-span-2 row-span-2" data-index="01">
              <div className="bento-icon"><Package size={48} aria-hidden="true" /></div>
              <h3>{dict.quickActions.sendPackage}</h3>
              <p>{dict.quickActions.sendPackageDesc}</p>
              <span className="quick-action-link" style={{ marginTop: 'auto' }}>
                {dict.quickActions.learnMore}<ArrowRight />
              </span>
            </Link>


            <Link href={`/${locale}/locations`} className="bento-card" data-index="03">
              <div className="bento-icon"><MapPin size={32} aria-hidden="true" /></div>
              <h3>{dict.quickActions.locations}</h3>
              <p>{dict.quickActions.locationsDesc}</p>
              <span className="quick-action-link" style={{ marginTop: 'auto' }}>
                {dict.quickActions.learnMore}<ArrowRight />
              </span>
            </Link>

          </StaggerReveal>
        </div>
      </section>

      {/* Split Pane — About Story */}
      <section className="section section-dark">
        <div className="container">
          <ClientReveal className="split-pane">
            <div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 'var(--space-md)' }}>
                {dict.about.subtitle}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-400)', marginBottom: 'var(--space-xl)', lineHeight: '1.7' }}>
                {dict.about.story}
              </p>
              <Link href={`/${locale}/about`} className="btn btn-primary">
                {dict.quickActions.learnMore}<ArrowRight />
              </Link>
            </div>
            <Image
              src="/images/happy-customer.png"
              alt="Happy Caribbean Customer with JyC Servicios 777 S.R.L"
              width={600}
              height={500}
              className="split-image"
            />
          </ClientReveal>
        </div>
      </section>

      {/* Services Overview — Bento Grid */}
      <section className="section">
        <div className="container">
          <ClientReveal className="section-header">
            <h2>{dict.services.title}</h2>
          </ClientReveal>

          <StaggerReveal className="bento-grid">
            <div className="bento-card col-span-2 row-span-2" data-index="01">
              <div className="bento-icon"><Plane size={48} aria-hidden="true" /></div>
              <h3>{dict.services.airCargo}</h3>
              <p>{dict.services.airCargoDesc}</p>
            </div>
            <div className="bento-card col-span-2" data-index="02">
              <div className="bento-icon"><Ship size={32} aria-hidden="true" /></div>
              <h3>{dict.services.seaFreight}</h3>
              <p>{dict.services.seaFreightDesc}</p>
            </div>
            <div className="bento-card" data-index="03">
              <div className="bento-icon"><PackageOpen size={32} aria-hidden="true" /></div>
              <h3>{dict.services.packageForwarding}</h3>
              <p>{dict.services.packageForwardingDesc}</p>
            </div>
            <div className="bento-card" data-index="04">
              <div className="bento-icon"><Truck size={32} aria-hidden="true" /></div>
              <h3>{dict.services.nationalDelivery}</h3>
              <p>{dict.services.nationalDeliveryDesc}</p>
            </div>
            <div className="bento-card col-span-4 bento-card-horizontal" data-index="05">
              <div className="bento-icon" style={{ marginBottom: 0 }}><ClipboardCheck size={48} aria-hidden="true" /></div>
              <div>
                <h3>{dict.services.customsManagement}</h3>
                <p>{dict.services.customsManagementDesc}</p>
              </div>
            </div>
            <div className="bento-card col-span-4 bento-card-horizontal" data-index="06">
              <div className="bento-icon" style={{ marginBottom: 0 }}><Building2 size={48} aria-hidden="true" /></div>
              <div>
                <h3>{dict.services.businessSolutions}</h3>
                <p>{dict.services.businessSolutionsDesc}</p>
              </div>
            </div>
            <div className="bento-card col-span-2" data-index="08">
              <div className="bento-icon"><FileText size={32} aria-hidden="true" /></div>
              <h3>{dict.services.preAlerts}</h3>
              <p>{dict.services.preAlertsDesc}</p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section section-dark">
        <div className="container">
          <ClientReveal className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>{dict.hero.connectingCaribbean}</h2>
          </ClientReveal>
          <ClientReveal className="image-gallery">
            <Image src="/images/coastal-delivery.png" alt="Coastal Delivery Van" width={600} height={400} className="gallery-img" />
            <Image src="/images/miami-warehouse.png" alt="Miami Warehouse" width={600} height={400} className="gallery-img" />
          </ClientReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <ClientReveal className="section-header">
            <h2>{dict.stats.title}</h2>
            <p>{dict.stats.subtitle}</p>
          </ClientReveal>
          <StatsCounter stats={statsData} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-dark">
        <div className="container">
          <ClientReveal className="section-header">
            <h2>{dict.faq.title}</h2>
            <p>{dict.faq.subtitle}</p>
          </ClientReveal>
          <ClientReveal>
            <FAQAccordion items={faqItems} />
          </ClientReveal>
        </div>
      </section>

      {/* CTA */}
      <ClientReveal>
        <section
          className="cta-section"
          style={{
            backgroundImage: 'url(/images/sunset-port.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 25, 47, 0.85)', borderRadius: 'inherit' }} aria-hidden="true" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2>{dict.cta.title}</h2>
            <p>{dict.cta.description}</p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {dict.cta.button}<ArrowRight />
            </Link>
          </div>
        </section>
      </ClientReveal>
    </>
  );
}
