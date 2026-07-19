import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import PortfolioGallery from './PortfolioGallery';

type Props = { params: Promise<{ locale: string }> };

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const images = Array.from({ length: 14 }, (_, i) => `/images/portfolio/jyc${i + 1}.jpeg`);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{dict.portfolio?.title || 'Our Portfolio'}</h1>
          <p>{dict.portfolio?.subtitle || 'A glimpse into our track record of excellence.'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PortfolioGallery images={images} />
        </div>
      </section>
    </>
  );
}
