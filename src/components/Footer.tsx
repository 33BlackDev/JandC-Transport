import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';

interface FooterProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

const socialLinks = [
  {
    href: 'https://www.facebook.com/jycservicios777',
    label: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/jycservicios777',
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: 'https://wa.me/18298567877',
    label: 'WhatsApp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
];

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Image
              src="/images/black-logo.png"
              alt="JyC Servicios 777 S.R.L"
              width={48}
              height={48}
              style={{ borderRadius: '8px', marginBottom: '1rem', width: '48px', height: '48px', objectFit: 'contain' }}
            />
            <h3 style={{ color: 'var(--color-white)', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
              JyC Servicios 777 S.R.L
            </h3>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              {dict.meta.description}
            </p>
            <div className="footer-social">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>{dict.nav.services}</h4>
            <Link href={`/${locale}/services#global-freight`}>{dict.services.airCargo}</Link>
            <Link href={`/${locale}/services#global-freight`}>{dict.services.seaFreight}</Link>
            <Link href={`/${locale}/services#all-services`}>{dict.services.packageForwarding}</Link>
            <Link href={`/${locale}/services#local-delivery`}>{dict.services.nationalDelivery}</Link>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>{dict.nav.company}</h4>
            <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
            <Link href={`/${locale}/portfolio`}>{dict.nav.portfolio}</Link>
            <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
            <Link href={`/${locale}/locations`}>{dict.nav.locations}</Link>
            <Link href={`/${locale}/faq`}>{dict.nav.faq}</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>{dict.about.followUs}</h4>
            <a href="mailto:info@jycservicios777.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@jycservicios777.com
            </a>
            <a href="tel:+18298567877" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.23l3-.01a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.94-1.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              829-856-7877
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{dict.about.copyright}. {dict.about.rights}</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href={`/${locale}/terms`}>{dict.about.termsOfService}</Link>
            <Link href={`/${locale}/privacy`}>{dict.about.privacyPolicy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
