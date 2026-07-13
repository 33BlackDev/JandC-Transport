import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Handshake, Search, Globe2, Lightbulb } from 'lucide-react';
import ClientReveal from '../ClientReveal';
import StaggerReveal from '../StaggerReveal';

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const values = [
    { icon: <Handshake size={48} />, title: dict.about.value1, desc: dict.about.value1Desc },
    { icon: <Search size={48} />, title: dict.about.value2, desc: dict.about.value2Desc },
    { icon: <Globe2 size={48} />, title: dict.about.value3, desc: dict.about.value3Desc },
    { icon: <Lightbulb size={48} />, title: dict.about.value4, desc: dict.about.value4Desc },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <ClientReveal>
            <h1>{dict.about.title}</h1>
            <p>{dict.about.subtitle}</p>
          </ClientReveal>
        </div>
      </section>

      {/* Symmetrical Split Pane - Story */}
      <section className="section">
        <div className="container">
          <ClientReveal className="split-pane">
            <Image 
              src="/images/miami-warehouse.png" 
              alt="Miami Warehouse" 
              width={600} 
              height={500} 
              className="split-image"
            />
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{dict.about.ourStoryTitle}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-400)', lineHeight: 1.8, marginBottom: 'var(--space-xl)', whiteSpace: 'pre-line' }}>
                {dict.about.story}
              </p>
              <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
                <div>
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-sm)' }}>{dict.about.mission}</h3>
                  <p style={{ color: 'var(--color-gray-400)', lineHeight: 1.7 }}>{dict.about.missionText}</p>
                </div>
                <div>
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-sm)' }}>{dict.about.vision}</h3>
                  <p style={{ color: 'var(--color-gray-400)', lineHeight: 1.7 }}>{dict.about.visionText}</p>
                </div>
              </div>
            </div>
          </ClientReveal>
        </div>
      </section>

      {/* Symmetrical Values Grid - MAX PRO */}
      <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="bg-wave" style={{ opacity: 0.15, filter: 'hue-rotate(15deg) blur(5px)' }}></div>
        <div className="container">
          <ClientReveal className="section-header" style={{ marginBottom: 'var(--space-4xl)' }}>
            <h2 style={{ fontSize: '3rem', textShadow: '0 0 20px rgba(0,229,255,0.3)' }}>{dict.about.values}</h2>
          </ClientReveal>
          
          <StaggerReveal className="bento-grid">
            {values.map((v, i) => (
              <div key={i} className={`bento-card ${i === 0 ? 'col-span-2 row-span-2' : ''} ${i === 1 ? 'col-span-2' : ''}`} data-index={`0${i + 1}`}>
                <div className="value-card-max-content">
                  <div className="bento-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  {v.desc && <p>{v.desc}</p>}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
