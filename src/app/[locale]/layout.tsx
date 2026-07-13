import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { locales, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GSAPProvider from '@/components/GSAPProvider';
import ScrollProgress from '@/components/ScrollProgress';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A192F',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: '/images/black-logo.png' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${outfit.variable} ${plusJakarta.variable}`} data-scroll-behavior="smooth">
      <body className={plusJakarta.className}>
        {/* Animated background orbs */}
        <div className="interactive-bg-container" aria-hidden="true">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <div className="bg-glass-overlay" />
          <div className="bg-dot-grid" />
        </div>

        {/* GSAP engine (client) */}
        <GSAPProvider>
          {/* Scroll progress bar */}
          <ScrollProgress />

          <Header locale={locale as Locale} dict={dict} />
          <main id="main-content">{children}</main>
          <Footer locale={locale as Locale} dict={dict} />
        </GSAPProvider>
      </body>
    </html>
  );
}
