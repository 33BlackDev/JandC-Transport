import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Jost, Bodoni_Moda } from 'next/font/google';

const jost = Jost({ subsets: ['latin'], variable: '--font-sans' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-heading' });

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: '/images/logo.jpeg' },
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
    <html lang={locale} className={`${jost.variable} ${bodoni.variable}`}>
      <body className={jost.className}>
        <div className="interactive-bg-container">
          <div className="bg-orb bg-orb-1"></div>
          <div className="bg-orb bg-orb-2"></div>
          <div className="bg-orb bg-orb-3"></div>
          <div className="bg-glass-overlay"></div>
          <div className="bg-dot-grid"></div>
        </div>
        <Header locale={locale as Locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
