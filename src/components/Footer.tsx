import Link from 'next/link';
import { Locale } from '@/i18n/config';

interface FooterProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 style={{ color: 'var(--color-white)', fontSize: '1.5rem', marginBottom: 'var(--space-md)' }}>
              J and C Transport
            </h3>
            <p>{dict.meta.description}</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="Twitter">X</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{dict.nav.services}</h4>
            <Link href={`/${locale}/services#global-freight`}>{dict.services.airCargo}</Link>
            <Link href={`/${locale}/services#global-freight`}>{dict.services.seaFreight}</Link>
            <Link href={`/${locale}/services#all-services`}>{dict.services.packageForwarding}</Link>
            <Link href={`/${locale}/services#local-delivery`}>{dict.services.nationalDelivery}</Link>
          </div>

          <div className="footer-col">
            <h4>{dict.nav.company}</h4>
            <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
            <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
            <Link href={`/${locale}/locations`}>{dict.nav.locations}</Link>
            <Link href={`/${locale}/faq`}>{dict.nav.faq}</Link>
          </div>

          <div className="footer-col">
            <h4>{dict.about.followUs}</h4>
            <a href="mailto:info@jandctransport.com">info@jandctransport.com</a>
            <p style={{ marginTop: '0.5rem' }}>+1 (786) 318-7029</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{dict.about.copyright}. {dict.about.rights}</p>
          <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
            <Link href={`/${locale}/terms`}>{dict.about.termsOfService}</Link>
            <Link href={`/${locale}/privacy`}>{dict.about.privacyPolicy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
