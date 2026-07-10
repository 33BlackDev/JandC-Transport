import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Package, Search, Calculator, MapPin, Plane, Ship, PackageOpen, Truck, ClipboardCheck, Building2 } from 'lucide-react';
import Hero from '@/components/Hero';
import StaggerReveal from './StaggerReveal';
import FAQAccordion from '@/components/FAQAccordion';
import StatsCounter from '@/components/StatsCounter';
import ClientReveal from './ClientReveal';

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

      {/* Quick Actions - Symmetrical Grid */}
      <section className="section" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <StaggerReveal className="bento-grid">
            <Link href={`/${locale}/services`} className="bento-card col-span-2 row-span-2">
              <div className="bento-icon"><Package size={48} /></div>
              <h3>{dict.quickActions.sendPackage}</h3>
              <p>{dict.quickActions.sendPackageDesc}</p>
              <span className="quick-action-link" style={{ marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-accent)' }}>{dict.quickActions.learnMore} →</span>
            </Link>

            <Link href={`/${locale}/track`} className="bento-card col-span-2">
              <div className="bento-icon"><Search size={32} /></div>
              <h3>{dict.quickActions.trackPackage}</h3>
              <p>{dict.quickActions.trackPackageDesc}</p>
              <span className="quick-action-link" style={{ marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-accent)' }}>{dict.quickActions.learnMore} →</span>
            </Link>

            <Link href={`/${locale}/calculator`} className="bento-card">
              <div className="bento-icon"><Calculator size={32} /></div>
              <h3>{dict.quickActions.calculator}</h3>
              <p>{dict.quickActions.calculatorDesc}</p>
              <span className="quick-action-link" style={{ marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-accent)' }}>{dict.quickActions.learnMore} →</span>
            </Link>

            <Link href={`/${locale}/locations`} className="bento-card">
              <div className="bento-icon"><MapPin size={32} /></div>
              <h3>{dict.quickActions.locations}</h3>
              <p>{dict.quickActions.locationsDesc}</p>
              <span className="quick-action-link" style={{ marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-accent)' }}>{dict.quickActions.learnMore} →</span>
            </Link>
          </StaggerReveal>
        </div>
      </section>

      {/* Symmetrical Split Pane - Happy Customer */}
      <section className="section section-dark">
        <div className="bg-wave"></div>
        <div className="container">
          <ClientReveal className="split-pane">
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>
                {dict.about.subtitle}
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--color-gray-400)', marginBottom: 'var(--space-xl)' }}>
                {dict.about.story}
              </p>
              <Link href={`/${locale}/about`} className="btn btn-primary">
                {dict.quickActions.learnMore} →
              </Link>
            </div>
            <Image 
              src="/images/happy-customer.png" 
              alt="Happy Caribbean Customer" 
              width={600} 
              height={500} 
              className="split-image"
            />
          </ClientReveal>
        </div>
      </section>

      {/* Services Overview - Symmetrical Grid */}
      <section className="section">
        <div className="container">
          <ClientReveal className="section-header">
            <h2>{dict.services.title}</h2>
          </ClientReveal>
          
          <StaggerReveal className="bento-grid">
            <div className="bento-card col-span-2 row-span-2">
              <div className="bento-icon"><Plane size={48} /></div>
              <h3>{dict.services.airCargo}</h3>
              <p>{dict.services.airCargoDesc}</p>
            </div>
            <div className="bento-card col-span-2">
              <div className="bento-icon"><Ship size={32} /></div>
              <h3>{dict.services.seaFreight}</h3>
              <p>{dict.services.seaFreightDesc}</p>
            </div>
            <div className="bento-card">
              <div className="bento-icon"><PackageOpen size={32} /></div>
              <h3>{dict.services.packageForwarding}</h3>
              <p>{dict.services.packageForwardingDesc}</p>
            </div>
            <div className="bento-card">
              <div className="bento-icon"><Truck size={32} /></div>
              <h3>{dict.services.nationalDelivery}</h3>
              <p>{dict.services.nationalDeliveryDesc}</p>
            </div>
            <div className="bento-card col-span-4 bento-card-horizontal">
              <div className="bento-icon" style={{ marginBottom: 0 }}><ClipboardCheck size={48} /></div>
              <div>
                <h3>{dict.services.customsManagement}</h3>
                <p>{dict.services.customsManagementDesc}</p>
              </div>
            </div>
            <div className="bento-card col-span-4 bento-card-horizontal">
              <div className="bento-icon" style={{ marginBottom: 0 }}><Building2 size={48} /></div>
              <div>
                <h3>{dict.services.businessSolutions}</h3>
                <p>{dict.services.businessSolutionsDesc}</p>
              </div>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section section-dark">
        <div className="container">
           <ClientReveal className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>Connecting The Caribbean</h2>
          </ClientReveal>
          <ClientReveal className="image-gallery">
             <Image src="/images/coastal-delivery.png" alt="Coastal Delivery Van" width={600} height={400} className="gallery-img" />
             <Image src="/images/miami-warehouse.png" alt="Miami Warehouse" width={600} height={400} className="gallery-img" />
          </ClientReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="bg-wave" style={{ opacity: 0.1 }}></div>
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
        <section className="cta-section" style={{ backgroundImage: 'url(/images/sunset-port.png)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 25, 47, 0.85)' }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2>{dict.cta.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>{dict.cta.description}</p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {dict.cta.button} →
            </Link>
          </div>
        </section>
      </ClientReveal>
    </>
  );
}
