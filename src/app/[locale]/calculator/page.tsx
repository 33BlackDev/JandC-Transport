import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import CalculatorForm from '@/components/CalculatorForm';

type Props = { params: Promise<{ locale: string }> };

export default async function CalculatorPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{dict.calculator.title}</h1>
          <p>{dict.calculator.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CalculatorForm dict={dict.calculator} />
        </div>
      </section>
    </>
  );
}
