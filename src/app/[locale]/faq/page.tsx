import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import FAQAccordion from '@/components/FAQAccordion';

type Props = { params: Promise<{ locale: string }> };

export default async function FAQPage({ params }: Props) {
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
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{dict.faq.title}</h1>
          <p>{dict.faq.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FAQAccordion items={faqItems} />

          <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--space-lg)', fontSize: '1.1rem' }}>
              {dict.cta.description}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {dict.common.contactUs} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
