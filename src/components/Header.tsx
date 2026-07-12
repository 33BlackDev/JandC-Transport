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

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const flags: Record<Locale, string> = { en: '🇺🇸', es: '🇩🇴', fr: '🇫🇷', ht: '🇭🇹' };

  const navLinks = [
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/track`, label: dict.nav.track },
    { href: `/${locale}/calculator`, label: dict.nav.calculator },
    { href: `/${locale}/locations`, label: dict.nav.locations },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Logo */}
        <Link href={`/${locale}`} className="header-logo" onClick={() => setMobileOpen(false)}>
          <Image
            src="/images/logo.jpeg"
            alt="J and C Transport"
            width={160}
            height={160}
            quality={100}
            style={{ width: 'auto' }}
            priority
          />
          <span>J and C Transport</span>
        </Link>

        {/* Desktop nav */}
        <nav className="header-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile full-screen drawer nav */}
        <nav
          className={`header-nav ${mobileOpen ? 'mobile-open' : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
          style={{ display: mobileOpen ? undefined : 'none' }}
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {/* Language switcher */}
          <div className="lang-switcher">
            <button
              className="lang-switcher-btn"
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 200)}
              aria-label={`Language: ${locale.toUpperCase()}`}
              aria-expanded={langOpen}
            >
              <span aria-hidden="true">{flags[locale]}</span>
              <span style={{ textTransform: 'uppercase' }}>{locale}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="currentColor"
                aria-hidden="true"
                style={{ transition: 'transform 0.2s ease', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </button>
            <div className={`lang-dropdown ${langOpen ? 'open' : ''}`} role="menu">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={switchLanguage(l)}
                  className={locale === l ? 'active' : ''}
                  role="menuitem"
                  onClick={() => setLangOpen(false)}
                >
                  <span aria-hidden="true">{flags[l]}</span>
                  {dict.nav[l === 'en' ? 'english' : l === 'es' ? 'spanish' : l === 'fr' ? 'french' : 'creole']}
                </Link>
              ))}
            </div>
          </div>

          {/* Hamburger */}
          <button
            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
