'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Locale, locales } from '@/i18n/config';

interface HeaderProps {
  locale: Locale;
  dict: Record<string, Record<string, string>>;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const flags: Record<Locale, string> = { en: '🇺🇸', es: '🇩🇴', fr: '🇫🇷', ht: '🇭🇹' };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link href={`/${locale}`} className="header-logo">
          <Image src="/images/logo.jpeg" alt="J and C Transport" width={160} height={160} quality={100} style={{ width: 'auto' }} />
          <span>J and C Transport</span>
        </Link>

        <nav className={`header-nav ${mobileOpen ? 'mobile-open' : ''}`}>
          <Link href={`/${locale}/services`} onClick={() => setMobileOpen(false)}>{dict.nav.services}</Link>
          <Link href={`/${locale}/track`} onClick={() => setMobileOpen(false)}>{dict.nav.track}</Link>
          <Link href={`/${locale}/calculator`} onClick={() => setMobileOpen(false)}>{dict.nav.calculator}</Link>
          <Link href={`/${locale}/locations`} onClick={() => setMobileOpen(false)}>{dict.nav.locations}</Link>
          <Link href={`/${locale}/about`} onClick={() => setMobileOpen(false)}>{dict.nav.about}</Link>
          <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)}>{dict.nav.contact}</Link>
        </nav>

        <div className="header-actions">
          <div className="lang-switcher">
            <button 
              className="lang-switcher-btn" 
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 200)}
            >
              <span>{flags[locale]}</span>
              <span style={{textTransform: 'uppercase'}}>{locale}</span>
              <span style={{fontSize: '0.7rem'}}>▼</span>
            </button>
            <div className={`lang-dropdown ${langOpen ? 'open' : ''}`}>
              {locales.map((l) => (
                <Link 
                  key={l} 
                  href={switchLanguage(l)}
                  className={locale === l ? 'active' : ''}
                >
                  <span>{flags[l]}</span>
                  {dict.nav[l === 'en' ? 'english' : l === 'es' ? 'spanish' : l === 'fr' ? 'french' : 'creole']}
                </Link>
              ))}
            </div>
          </div>
          
          <button 
            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`} 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
